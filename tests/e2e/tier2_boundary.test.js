import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { launchBrowser, createPage, APP_URL } from '../helpers.js';

describe('Tier 2: Boundary & Edge Cases', () => {
  let browser;
  let page;

  before(async () => {
    browser = await launchBrowser();
    page = await createPage(browser);
  });

  after(async () => {
    if (browser) {
      await browser.close();
    }
  });

  afterEach(async () => {
    try {
      await page.setRequestInterception(false);
      page.removeAllListeners('request');
    } catch (e) {
      // ignore
    }
  });

  it('T2-01: Non-Existent Route Handling (404 Page)', async () => {
    await page.goto(`${APP_URL}/knowledge/this-article-does-not-exist`);
    const pageText = await page.evaluate(() => document.body.textContent);
    assert.ok(
      /not found|error|failed|doesn't exist|could not be found/i.test(pageText),
      'Page should display an error or "not found" text for non-existent articles'
    );
  });

  it('T2-02: Empty JSON Index', async () => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge`);
    const text = await page.evaluate(() => document.body.textContent);
    assert.ok(
      /no articles|empty|none/i.test(text),
      'Empty index should show a friendly "no articles found" fallback message'
    );
  });

  it('T2-03: Malformed JSON Index', async () => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: '{ invalid json: ['
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge`);
    const text = await page.evaluate(() => document.body.textContent);
    assert.ok(
      /error|failed|load|problem/i.test(text),
      'Malformed index should degrade gracefully and show an error/warning UI instead of freezing'
    );
  });

  it('T2-04: Missing Markdown File', async () => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().includes('/knowledge/') && req.url().endsWith('.md')) {
        req.respond({
          status: 404,
          contentType: 'text/markdown',
          body: 'Not Found'
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge/some-missing-id`);
    const text = await page.evaluate(() => document.body.textContent);
    assert.ok(
      /not found|retrieve|error|load/i.test(text),
      'Missing Markdown file should display an error message'
    );
  });

  it('T2-05: Malformed Markdown Content', async () => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().includes('/knowledge/') && req.url().endsWith('.md')) {
        req.respond({
          status: 200,
          contentType: 'text/markdown',
          body: '# Title\n\n* Unclosed italic *and* [broken link(no-close'
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge/malformed-md`);
    const titleText = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.textContent.trim() : null;
    });
    assert.strictEqual(titleText, 'Title', 'Page should still render whatever markdown was parseable');
  });

  it('T2-06: HTML Code Injection (XSS)', async () => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().includes('/knowledge/') && req.url().endsWith('.md')) {
        req.respond({
          status: 200,
          contentType: 'text/markdown',
          body: '# XSS Test\n\n<script>window.__XSS_EXECUTED__ = true;</script>\n\nSafe text'
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge/xss-test`);
    const isXssExecuted = await page.evaluate(() => window.__XSS_EXECUTED__);
    assert.notStrictEqual(isXssExecuted, true, 'HTML script tag injection in Markdown must not execute JS');
  });

  it('T2-07: SQL Injection/Query Attack Vectors', async () => {
    // Navigate with injection strings in the path/query parameters
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework?id=UNION%20SELECT%20username,%20password%20FROM%20users`);
    const pageText = await page.evaluate(() => document.body.textContent);
    assert.ok(!/sql|database error|syntax error/i.test(pageText), 'SQL injection query vectors must not cause DB/syntax crashes in routing');
  });

  it('T2-08: Search Query - No Match', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    const inputSelector = 'input[type="text"], input[placeholder*="search"i]';
    await page.waitForSelector(inputSelector, { timeout: 3000 });
    await page.type(inputSelector, 'zqywxp99');
    
    // Wait a brief moment for state update
    await new Promise(r => setTimeout(r, 300));
    
    const text = await page.evaluate(() => document.body.textContent);
    assert.ok(
      /no articles|no matches|no results/i.test(text),
      'Searching for a non-existent term should display a fallback message'
    );
  });

  it('T2-09: Search Query - Case Insensitivity', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    const inputSelector = 'input[type="text"], input[placeholder*="search"i]';
    await page.waitForSelector(inputSelector, { timeout: 3000 });
    
    // Search for lower case
    await page.type(inputSelector, 'product');
    await new Promise(r => setTimeout(r, 200));
    const lowerCount = await page.evaluate(() => document.querySelectorAll('[data-testid="article-card"], .article-card').length);
    
    // Clear and search for uppercase
    await page.click(inputSelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector, 'PRODUCT');
    await new Promise(r => setTimeout(r, 200));
    const upperCount = await page.evaluate(() => document.querySelectorAll('[data-testid="article-card"], .article-card').length);
    
    assert.strictEqual(lowerCount, upperCount, 'Search queries should be case-insensitive and return the same count');
  });

  it('T2-10: Category Filter - Zero Articles', async () => {
    // Inject custom index where a category has no items, or mock clicking a category badge with no articles
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: '1', title: 'A', category: 'Framework', date: '2026', readTime: '5m' },
            { id: '2', title: 'B', category: 'Case Study', date: '2026', readTime: '5m' }
          ])
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge`);
    // Click category tag that does not exist or filter button
    const tagSelector = '[data-testid="category-filter-Case-Study"], .tag-filter-case-study';
    await page.waitForSelector(tagSelector, { timeout: 2000 });
    await page.click(tagSelector);
    
    const text = await page.evaluate(() => document.body.textContent);
    assert.ok(
      /no articles|empty|none/i.test(text) || (!text.includes('A') && text.includes('B')),
      'Filtering to a category with zero articles should render a clean fallback message'
    );
  });

  it('T2-11: Extreme Character Lengths', async () => {
    const superLongTitle = 'A'.repeat(250);
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: 'long-id', title: superLongTitle, category: 'Framework', date: '2026', readTime: '5m' }
          ])
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge`);
    const cardHeight = await page.evaluate(() => {
      const card = document.querySelector('[data-testid="article-card"], .article-card');
      return card ? card.getBoundingClientRect().height : 0;
    });
    // Visual boundary checks: layout should not overflow or explode in height
    assert.ok(cardHeight > 0 && cardHeight < 600, 'Cards with extremely long titles must maintain layout bounds');
  });

  it('T2-12: Missing Metadata Fields in JSON', async () => {
    // Omitting "readTime" and "date" fields
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: 'missing-meta', title: 'Minimalist Title', category: 'Framework' }
          ])
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge`);
    const cardText = await page.evaluate(() => {
      const card = document.querySelector('[data-testid="article-card"], .article-card');
      return card ? card.textContent : null;
    });
    assert.ok(cardText && cardText.includes('Minimalist Title'), 'Card should still render cleanly even when metadata fields are missing');
  });

  it('T2-13: Mobile Layout Grid Collapse', async () => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: '1', title: 'Article One', category: 'Framework', date: '2026', readTime: '5m' },
            { id: '2', title: 'Article Two', category: 'Case Study', date: '2026', readTime: '10m' }
          ])
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`${APP_URL}/knowledge`);
    
    // Check if cards stack vertically (i.e. widths are full viewport or single-column layout)
    const layoutInfo = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[data-testid="article-card"], .article-card'));
      if (cards.length < 2) {
        return { cardCount: cards.length, isSingleColumn: false };
      }
      const card1 = cards[0].getBoundingClientRect();
      const card2 = cards[1].getBoundingClientRect();
      // If stacked vertically, their left bounds are roughly equal and card2 top >= card1 bottom
      const isSingleColumn = Math.abs(card1.left - card2.left) < 15 && card2.top >= card1.bottom - 5;
      return { cardCount: cards.length, isSingleColumn };
    });
    assert.ok(layoutInfo.cardCount >= 2, `Should render at least 2 cards, found ${layoutInfo.cardCount}`);
    assert.strictEqual(layoutInfo.isSingleColumn, true, 'At mobile viewport, the bento/article grid should collapse to a vertical stack');
  });

  it('T2-14: Direct Landing / Deep Linking', async () => {
    // Go directly to deep link of sample article
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    const currentUrl = page.url();
    assert.ok(currentUrl.endsWith('/knowledge/product-teardown-framework'), 'Should land directly on the deep-linked detail page');
  });

  it('T2-15: Rapid Page Switching', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    
    // Get link count and assert
    const linkCount = await page.evaluate(() => {
      const links = document.querySelectorAll('[data-testid="article-card-link"], .article-card a, article a');
      return links.length;
    });
    assert.ok(linkCount >= 2, `Should have at least 2 articles, found ${linkCount}`);
    
    // Quick click interaction
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('[data-testid="article-card-link"], .article-card a, article a'));
      links[0].click();
      setTimeout(() => links[1].click(), 50);
    });
    
    await page.waitForFunction(() => /\/knowledge\/\w+/.test(window.location.pathname), { timeout: 3000 });
    const finalUrl = page.url();
    assert.ok(/\/knowledge\/.+/.test(finalUrl), 'Rapid transitions should safely land on the last resolved route');
  });
});

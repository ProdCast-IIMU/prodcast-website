import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { launchBrowser, createPage, APP_URL } from '../helpers.js';

describe('Tier 4: Real-world User Journeys', () => {
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

  it('T4-01: Complete Reader Lifecycle', async () => {
    // 1. User lands on home
    await page.goto(APP_URL);

    // 2. Click header link and transition to /knowledge
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('header nav a, header a'));
      const knowledgeLink = links.find(a => a.textContent.trim().toUpperCase() === 'KNOWLEDGE');
      if (knowledgeLink) {
        knowledgeLink.click();
      } else {
        throw new Error('Knowledge link not found in header');
      }
    });
    await page.waitForFunction((expectedUrl) => window.location.href.includes(expectedUrl), {}, 'knowledge');

    // 3. Search input query
    const inputSelector = 'input[type="text"], input[placeholder*="search"i]';
    await page.waitForSelector(inputSelector, { timeout: 3000 });
    await page.type(inputSelector, 'sample');
    await new Promise(r => setTimeout(r, 200));

    // 4. Click article card and navigate to detail page
    const cardLinkSelector = '[data-testid="article-card-link"], .article-card a, article a';
    await page.waitForSelector(cardLinkSelector, { timeout: 3000 });
    await page.click(cardLinkSelector);

    // Verify detail page elements
    await page.waitForSelector('.knowledge-detail-container h1, h1', { timeout: 3000 });
    const hasProse = await page.evaluate(() => {
      const art = document.querySelector('.knowledge-detail-container article, .prose');
      return art ? art.classList.contains('prose') : false;
    });
    assert.strictEqual(hasProse, true, 'Detail page article container must use "prose" typography class');

    // 5. Click "Back to Hub" and return
    const backBtnSelector = '[data-testid="back-to-hub"], .back-to-hub, a[href="/knowledge"]';
    await page.waitForSelector(backBtnSelector, { timeout: 3000 });
    await page.click(backBtnSelector);
    
    await page.waitForFunction(() => window.location.pathname === '/knowledge', { timeout: 3000 });
    assert.strictEqual(new URL(page.url()).pathname, '/knowledge', 'Should return to the Hub path');
  });

  it('T4-02: Deep-Linked Reference Session', async () => {
    // 1. External user follows a deep-link directly to /knowledge/product-teardown-framework
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    const pageText = await page.evaluate(() => document.body.textContent);
    assert.ok(pageText.length > 0, 'Deep link should load page content directly');

    // 2. Select text on the page to simulate reading
    const textSelected = await page.evaluate(() => {
      const heading = document.querySelector('h1');
      if (!heading) return false;
      const range = document.createRange();
      range.selectNodeContents(heading);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      return selection.toString().length > 0;
    });
    assert.strictEqual(textSelected, true, 'User should be able to select text on the page');

    // 3. Click back button/link to explore other resources
    const backBtnSelector = '[data-testid="back-to-hub"], .back-to-hub, a[href="/knowledge"]';
    await page.waitForSelector(backBtnSelector, { timeout: 3000 });
    await page.click(backBtnSelector);
    await page.waitForFunction(() => window.location.pathname === '/knowledge', { timeout: 3000 });

    // 4. Select a category filter chip and click a second article
    const filterSelector = '[data-testid="category-filter-Framework"], .tag-filter-framework';
    await page.waitForSelector(filterSelector, { timeout: 3000 });
    await page.click(filterSelector);

    const cardLinkSelector = '[data-testid="article-card-link"], .article-card a, article a';
    await page.waitForSelector(cardLinkSelector, { timeout: 3000 });
    await page.click(cardLinkSelector);

    assert.ok(/\/knowledge\/.+/.test(page.url()), 'Should successfully navigate to another article from filtered hub');
  });

  it('T4-03: Simulated Network Latency Resilience', async () => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        setTimeout(() => {
          req.respond({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
              { id: 'delayed-id', title: 'Delayed Article', category: 'Framework', date: '2026', readTime: '5m' }
            ])
          }).catch(() => {});
        }, 1000);
      } else {
        req.continue().catch(() => {});
      }
    });

    const navPromise = page.goto(`${APP_URL}/knowledge`);
    
    // Check loading indicator is visible while fetching is delayed
    await new Promise(r => setTimeout(r, 150));
    const loadingStateVisible = await page.evaluate(() => {
      const loader = document.querySelector('.animate-pulse, .shimmer, .spinner, [data-testid="loading"]');
      return !!loader;
    });
    assert.strictEqual(loadingStateVisible, true, 'Skeletal loader or loading spinner should be visible during data fetching');

    // Wait for page to fully load
    await navPromise;
    await page.waitForSelector('[data-testid="article-card"], .article-card', { timeout: 3000 });
    const renderedCardTitle = await page.evaluate(() => {
      const card = document.querySelector('[data-testid="article-card"], .article-card');
      return card ? card.textContent : '';
    });
    assert.ok(renderedCardTitle.includes('Delayed Article'), 'Page should render fetched article once network resolves');
  });

  it('T4-04: Theme and Accessibility Style Audit', async () => {
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);

    const themeColors = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      const article = document.querySelector('.knowledge-detail-container article, .prose');
      const articleStyle = article ? window.getComputedStyle(article) : null;
      
      return {
        bodyBg: computedStyle.backgroundColor,
        bodyColor: computedStyle.color,
        articleColor: articleStyle ? articleStyle.color : null
      };
    });

    // Hex #F8FAFC -> rgb(248, 250, 252)
    // Hex #0F172A -> rgb(15, 23, 42)
    // Hex #020617 -> rgb(2, 6, 23) (Slate-950)
    // Verify soft off-white/icy blue background
    const bgMatch = themeColors.bodyBg.includes('248, 250, 252') || themeColors.bodyBg.includes('f8fafc') || themeColors.bodyBg.includes('240, 246, 252') || themeColors.bodyBg.includes('255, 255, 255');
    assert.ok(bgMatch, `Background should be a soft, light shade. Got: ${themeColors.bodyBg}`);

    // Verify dark slate text (slate-900 is rgb(15, 23, 42), slate-800 is rgb(30, 41, 59))
    const textMatch = themeColors.bodyColor.includes('15, 23, 42') || themeColors.bodyColor.includes('30, 41, 59') || themeColors.bodyColor.includes('0, 0, 0') || themeColors.bodyColor.includes('0f172a');
    assert.ok(textMatch, `Text color should be high contrast dark slate/black. Got: ${themeColors.bodyColor}`);
  });

  it('T4-05: Category Filter Flow', async () => {
    // Load hub with a structured mock list
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.url().endsWith('/knowledge/index.json')) {
        req.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: '1', title: 'Product Vision', category: 'Framework', date: '2026', readTime: '5m' },
            { id: '2', title: 'Amazon Success', category: 'Case Study', date: '2026', readTime: '10m' }
          ])
        }).catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${APP_URL}/knowledge`);
    await page.waitForSelector('[data-testid="article-card"], .article-card', { timeout: 3000 });

    // Initial count should be 2
    let cardsCount = await page.evaluate(() => document.querySelectorAll('[data-testid="article-card"], .article-card').length);
    assert.strictEqual(cardsCount, 2, 'Should initially render both articles');

    // Click Category "Case Study" filter
    const filterSelector = '[data-testid="category-filter-Case-Study"], .tag-filter-case-study';
    await page.waitForSelector(filterSelector, { timeout: 3000 });
    await page.click(filterSelector);
    await new Promise(r => setTimeout(r, 200));

    // Count should drop to 1
    cardsCount = await page.evaluate(() => document.querySelectorAll('[data-testid="article-card"], .article-card').length);
    assert.strictEqual(cardsCount, 1, 'Filtering should show only the single matching Case Study article');

    // Verify title of filtered card matches
    const cardTitle = await page.evaluate(() => {
      const card = document.querySelector('[data-testid="article-card"], .article-card');
      return card ? card.textContent : '';
    });
    assert.ok(cardTitle.includes('Amazon Success'), 'Filtered article title should match the clicked category');
  });
});

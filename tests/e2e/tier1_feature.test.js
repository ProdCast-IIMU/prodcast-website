import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { launchBrowser, createPage, APP_URL } from '../helpers.js';

describe('Tier 1: Feature Coverage', () => {
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

  it('T1-01: Header Nav Link Presence', async () => {
    await page.goto(APP_URL);
    await page.waitForSelector('header nav a, header a', { timeout: 5000 });
    const linkText = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('header nav a, header a'));
      const knowledgeLink = links.find(a => a.textContent.trim().toUpperCase() === 'KNOWLEDGE');
      return knowledgeLink ? knowledgeLink.textContent.trim() : null;
    });
    assert.ok(linkText, 'Header should contain a navigation link labeled "KNOWLEDGE"');
  });

  it('T1-02: Header Nav Link Click', async () => {
    await page.goto(APP_URL);
    await page.waitForSelector('header nav a, header a', { timeout: 5000 });
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
    const currentUrl = page.url();
    assert.ok(currentUrl.endsWith('/knowledge'), `URL should navigate to /knowledge, got ${currentUrl}`);
  });

  it('T1-03: Hub Route Access', async () => {
    const response = await page.goto(`${APP_URL}/knowledge`);
    assert.strictEqual(response.status(), 200, 'Direct navigation to /knowledge should return status 200');
  });

  it('T1-04: Hub Page Main Heading', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    await page.waitForSelector('h1', { timeout: 5000 });
    const headingText = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.textContent.trim() : null;
    });
    assert.ok(headingText && /knowledge/i.test(headingText), 'Main heading should contain "Knowledge"');
  });

  it('T1-05: Article Grid Rendering', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    await page.waitForSelector('[data-testid="article-card"], .article-card, article', { timeout: 5000 });
    const cardCount = await page.evaluate(() => {
      const cards = document.querySelectorAll('[data-testid="article-card"], .article-card, article');
      return cards.length;
    });
    assert.ok(cardCount >= 2, `Should render at least 2 article cards, found ${cardCount}`);
  });

  it('T1-06: Article Card Metadata', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    await page.waitForSelector('[data-testid="article-card"], .article-card, article', { timeout: 5000 });
    const metaData = await page.evaluate(() => {
      const card = document.querySelector('[data-testid="article-card"], .article-card, article');
      if (!card) return null;
      return {
        title: !!(card.querySelector('h2, h3, .title') || card.textContent.includes('Title')),
        category: !!(card.querySelector('.category, .tag') || card.textContent.includes('Framework') || card.textContent.includes('Article')),
        date: !!(card.querySelector('.date, .publish-date') || /\b\d{4}\b/.test(card.textContent)),
        readTime: !!(card.querySelector('.read-time') || /min/i.test(card.textContent))
      };
    });
    assert.ok(metaData, 'Should find at least one article card');
    assert.strictEqual(metaData.title, true, 'Article card must display a title');
    assert.strictEqual(metaData.category, true, 'Article card must display a category badge');
    assert.strictEqual(metaData.date, true, 'Article card must display a date');
    assert.strictEqual(metaData.readTime, true, 'Article card must display a read time estimation');
  });

  it('T1-07: Category Tag Styling', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    await page.waitForSelector('.category, .tag, [data-testid="category-badge"]', { timeout: 5000 });
    const tagClasses = await page.evaluate(() => {
      const badge = document.querySelector('.category, .tag, [data-testid="category-badge"]');
      return badge ? Array.from(badge.classList) : null;
    });
    assert.ok(tagClasses, 'Category tag badge should be present');
    assert.ok(
      tagClasses.includes('font-mono') || tagClasses.includes('text-xs') || tagClasses.some(c => c.includes('slate') || c.includes('blue')),
      'Category badge should contain styling classes (e.g., mono font, small text, slate/blue color)'
    );
  });

  it('T1-08: Hub to Detail Navigation', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    await page.waitForSelector('[data-testid="article-card-link"], .article-card a, article a', { timeout: 5000 });
    await page.evaluate(() => {
      const cardLink = document.querySelector('[data-testid="article-card-link"], .article-card a, article a');
      if (cardLink) {
        cardLink.click();
      } else {
        throw new Error('Article link not found');
      }
    });
    await page.waitForFunction(() => /\/knowledge\/\w+/.test(window.location.pathname), { timeout: 3000 });
    const currentUrl = page.url();
    assert.ok(/\/knowledge\/.+/.test(currentUrl), `Should navigate to article detail page, got ${currentUrl}`);
  });

  it('T1-09: Detail Route Direct Access', async () => {
    const response = await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    assert.strictEqual(response.status(), 200, 'Direct navigation to valid /knowledge/:id should return 200');
  });

  it('T1-10: Detail Title Rendering', async () => {
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    await page.waitForSelector('.knowledge-detail-container h1, h1', { timeout: 5000 });
    const titleText = await page.evaluate(() => {
      const h1 = document.querySelector('.knowledge-detail-container h1, h1');
      return h1 ? h1.textContent.trim() : null;
    });
    assert.ok(titleText, 'Detail page should render the article title');
  });

  it('T1-11: Detail Metadata Block', async () => {
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    await page.waitForSelector('.metadata-container, .article-metadata', { timeout: 5000 });
    const hasMetadata = await page.evaluate(() => {
      const container = document.querySelector('.metadata-container, .article-metadata');
      if (!container) return false;
      return container.textContent.length > 0;
    });
    assert.strictEqual(hasMetadata, true, 'Detail page should render metadata block');
  });

  it('T1-12: MD Paragraph Rendering', async () => {
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    await page.waitForSelector('.knowledge-detail-container p, article p', { timeout: 5000 });
    const hasParagraphs = await page.evaluate(() => {
      const paragraphs = document.querySelectorAll('.knowledge-detail-container p, article p');
      return paragraphs.length > 0;
    });
    assert.strictEqual(hasParagraphs, true, 'Markdown content should render as HTML paragraph tags');
  });

  it('T1-13: MD Header Rendering', async () => {
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    await page.waitForSelector('.knowledge-detail-container h2, .knowledge-detail-container h3, article h2, article h3', { timeout: 5000 });
    const hasHeaders = await page.evaluate(() => {
      const headers = document.querySelectorAll('.knowledge-detail-container h2, .knowledge-detail-container h3, article h2, article h3');
      return headers.length > 0;
    });
    assert.strictEqual(hasHeaders, true, 'Markdown sub-headers should render as h2/h3 HTML tags');
  });

  it('T1-14: MD List Rendering', async () => {
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    await page.waitForSelector('.knowledge-detail-container li, article li', { timeout: 5000 });
    const hasLists = await page.evaluate(() => {
      const listItems = document.querySelectorAll('.knowledge-detail-container li, article li');
      return listItems.length > 0;
    });
    assert.strictEqual(hasLists, true, 'Markdown lists should render as standard list elements');
  });

  it('T1-15: Tailwind Typography Class', async () => {
    await page.goto(`${APP_URL}/knowledge/product-teardown-framework`);
    await page.waitForSelector('.knowledge-detail-container article, .prose', { timeout: 5000 });
    const hasProse = await page.evaluate(() => {
      const container = document.querySelector('.knowledge-detail-container article, .prose');
      return container ? container.classList.contains('prose') : false;
    });
    assert.strictEqual(hasProse, true, 'Markdown container must possess Tailwind "prose" typography class');
  });
});

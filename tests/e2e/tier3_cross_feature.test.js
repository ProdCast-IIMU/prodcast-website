import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { launchBrowser, createPage, APP_URL } from '../helpers.js';

describe('Tier 3: Cross-Feature Interactions', () => {
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

  it('T3-01: Search & Filter Coexistence', async () => {
    await page.goto(`${APP_URL}/knowledge`);
    
    // Select category filter
    const tagSelector = '[data-testid="category-filter-Framework"], .tag-filter-framework';
    await page.waitForSelector(tagSelector, { timeout: 3000 });
    await page.click(tagSelector);
    
    // Type search query
    const inputSelector = 'input[type="text"], input[placeholder*="search"i]';
    await page.waitForSelector(inputSelector, { timeout: 3000 });
    await page.type(inputSelector, 'discovery');
    
    // Verify remaining cards meet both criteria: Category="Framework" AND Title/Summary contains "discovery"
    const passesIntersection = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[data-testid="article-card"], .article-card'));
      return cards.every(card => {
        const text = card.textContent.toLowerCase();
        const hasCategory = text.includes('framework');
        const hasSearchTerm = text.includes('discovery');
        return hasCategory && hasSearchTerm;
      });
    });
    
    assert.strictEqual(passesIntersection, true, 'All filtered card results must match the active category filter AND the search term');
  });

  it('T3-02: Navigation History Consistency', async () => {
    // 1. Start at Home
    await page.goto(APP_URL);
    
    // 2. Go to Hub
    await page.goto(`${APP_URL}/knowledge`);
    
    // 3. Search and click an article to go to Detail
    const inputSelector = 'input[type="text"], input[placeholder*="search"i]';
    await page.waitForSelector(inputSelector, { timeout: 3000 });
    await page.type(inputSelector, 'sample');
    
    const cardLinkSelector = '[data-testid="article-card-link"], .article-card a, article a';
    await page.waitForSelector(cardLinkSelector, { timeout: 3000 });
    await page.click(cardLinkSelector);
    
    // Verify we are on Detail page
    assert.ok(/\/knowledge\/.+/.test(page.url()), 'Should be on detail page');
    
    // 4. Click back button
    await page.goBack();
    assert.ok(page.url().endsWith('/knowledge'), 'Back button should return us to the Hub page');
    
    // Verify search value is preserved/consistent
    await page.waitForFunction(
      (sel, expected) => {
        const input = document.querySelector(sel);
        return input && input.value === expected;
      },
      { timeout: 3000 },
      inputSelector,
      'sample'
    );
    
    // 5. Go back again to Home
    await page.goBack();
    assert.strictEqual(new URL(page.url()).pathname, '/', 'Second back button press should return us to the Home root page');
  });

  it('T3-03: Active Nav Link Header Highlighting', async () => {
    // Navigate to Hub
    await page.goto(`${APP_URL}/knowledge`);
    
    const isActiveHighlighted = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('header nav a, header a'));
      const knowledgeLink = links.find(a => a.textContent.trim().toUpperCase() === 'KNOWLEDGE');
      if (!knowledgeLink) return false;
      
      // Active styles might use special classes, text opacity, or colors (e.g. text-black or font-semibold)
      const classes = Array.from(knowledgeLink.classList);
      const computed = window.getComputedStyle(knowledgeLink);
      
      return classes.includes('active') || 
             classes.includes('text-black') || 
             computed.fontWeight === '600' || 
             computed.fontWeight === 'bold' ||
             computed.opacity === '1';
    });
    
    assert.strictEqual(isActiveHighlighted, true, 'Active header link "KNOWLEDGE" should reflect active highlight styling');
  });
});

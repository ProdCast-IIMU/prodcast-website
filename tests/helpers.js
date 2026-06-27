import puppeteer from 'puppeteer';

export const APP_URL = process.env.APP_URL || 'http://localhost:5173';

/**
 * Launches a Puppeteer browser instance with headless flags optimized for CI/CLI.
 */
export async function launchBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-web-security' // Helpful for interception / cross-origin if any
    ]
  });
}

/**
 * Creates a new page with a standard desktop viewport.
 */
export async function createPage(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  return page;
}

/**
 * Helper to check if an element is visible in the page.
 */
export async function isVisible(page, selector, timeout = 2000) {
  try {
    await page.waitForSelector(selector, { visible: true, timeout });
    return true;
  } catch {
    return false;
  }
}

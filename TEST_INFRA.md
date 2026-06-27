# PM Knowledge Centre E2E Test Infrastructure

This document describes the End-to-End (E2E) testing architecture, layout, execution flows, and configurations implemented for the PM Knowledge Centre.

---

## 1. Test Architecture & Runner

The E2E test suite is designed for high reliability, minimal overhead, and absolute isolation:
* **Test Runner**: Node.js native `node:test` runner. This avoids bulky testing dependencies (like Jest or Cypress), supports native ES Modules, and runs tests out-of-the-box on Node 18+.
* **Assertion Library**: Node.js native `node:assert`.
* **Browser Automation**: **Puppeteer** (headless mode). It communicates directly with Chrome/Chromium via DevTools Protocol.
* **Mocking Strategy**: Puppeteer's native request interception is used to mock API/file responses (e.g. `index.json`, `.md` content) for edge cases and boundary tests without relying on a real database or static file system.

---

## 2. Directory Layout

The E2E tests are located in the `tests/` directory at the project root:

```text
tests/
├── helpers.js                    # Shared Puppeteer launcher, viewport configurations, and DOM utilities
└── e2e/
    ├── tier1_feature.test.js     # Tier 1: Core Feature Coverage (15 tests)
    ├── tier2_boundary.test.js    # Tier 2: Boundary & Edge Cases (15 tests)
    ├── tier3_cross_feature.test.js # Tier 3: Cross-Feature Interactions (3 tests)
    └── tier4_real_world.test.js  # Tier 4: Real-world User Journeys (5 tests)
```

### Component Details
* **`tests/helpers.js`**: Exposes the `launchBrowser()` utility which launches Chrome in headless mode with flags configured for headless/CLI environments (`--no-sandbox`, `--disable-dev-shm-usage`, etc.), and viewport utilities (`createPage`).
* **`tier1_feature.test.js`**: Verifies normal operation of the routing, hub, detail pages, category badges, markdown rendering headers/lists, and navigation links.
* **`tier2_boundary.test.js`**: Verifies behavior under abnormal conditions, such as: empty index JSONs, malformed markdown, XSS scripting injection, SQL/Query parameter attacks, 404 paths, mobile grid collapse, and rapid route transitions.
* **`tier3_cross_feature.test.js`**: Verifies that components behave correctly in conjunction (e.g. search + filters active together, history back-button states, header link highlight active states).
* **`tier4_real_world.test.js`**: Verifies end-to-end user flows, deep-linking directly to articles, latency loading states (pulsing/shimmers), color contrast conformity, and category filter filtering.

---

## 3. How to Execute the E2E Test Suite

### Step 1: Start the Local Development Server
Make sure the web application is running locally. By default, the test suite targets `http://localhost:5173`.
```bash
npm run dev
```

### Step 2: Run the E2E Tests
To run all tests in the E2E suite, execute:
```bash
npm run test:e2e
```
Or run the native Node command:
```bash
node --test tests/e2e/*.test.js
```

### Configuration Options
You can configure the target URL of the application by passing the `APP_URL` environment variable:
```bash
$env:APP_URL="http://localhost:4173"; npm run test:e2e
```

---

## 4. Expected Results on Clean Repository
Because the PM Knowledge Centre features (routing, markdown parser, CSS classes, components) are unimplemented at the start of Milestone 1, **it is the expected and correct behavior that the tests fail on initial execution** when trying to query non-existent pages, header elements, or selectors. The tests verify the *specification* and are designed to fail until the actual codebase matches the requirements.

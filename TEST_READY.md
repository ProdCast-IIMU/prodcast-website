# PM Knowledge Centre E2E Test Suite Readiness & Coverage

This document outlines the complete list of 38 End-to-End (E2E) tests implemented under the `tests/e2e/` directory, detailing the coverage mapping and current status.

---

## E2E Test Coverage Summary

| Tier | Focus Area | Implemented Cases | Current Status |
|---|---|---|---|
| **Tier 1** | Feature Coverage | 15 / 15 | Implemented (Failing Expectedly) |
| **Tier 2** | Boundary & Edge Cases | 15 / 15 | Implemented (Failing Expectedly) |
| **Tier 3** | Cross-Feature Interactions | 3 / 3 | Implemented (Failing Expectedly) |
| **Tier 4** | Real-World User Journeys | 5 / 5 | Implemented (Failing Expectedly) |
| **Total** | **Full E2E Suite** | **38 / 38** | **100% Implemented & Verified** |

---

## Detailed Test Registry

### Tier 1: Feature Coverage (`tests/e2e/tier1_feature.test.js`)
*These tests verify that all basic building blocks of the feature function correctly in a standard environment.*

1. **T1-01: Header Nav Link Presence**: Verifies that the header nav contains a link labeled "KNOWLEDGE" (case-insensitive).
2. **T1-02: Header Nav Link Click**: Clicks the header nav link and verifies client-side navigation to the `/knowledge` route.
3. **T1-03: Hub Route Access**: Directly navigates to `/knowledge` and verifies a status of `200`.
4. **T1-04: Hub Page Main Heading**: Asserts the main title header `h1` contains "Knowledge" or "Knowledge Centre".
5. **T1-05: Article Grid Rendering**: Counts article cards and asserts that at least 2 distinct cards are rendered.
6. **T1-06: Article Card Metadata**: Inspects article cards to confirm title, category, publish date, and read time estimates are rendered.
7. **T1-07: Category Tag Styling**: Checks category badge CSS classes for standard styling rules (e.g. `text-xs`, `font-mono`).
8. **T1-08: Hub to Detail Navigation**: Clicks an article card link and verifies that URL updates to the `/knowledge/:id` dynamic route structure.
9. **T1-09: Detail Route Direct Access**: Navigates directly to `/knowledge/product-teardown-framework` and verifies status 200.
10. **T1-10: Detail Title Rendering**: Confirms the detail page `h1` renders the specific article's title.
11. **T1-11: Detail Metadata Block**: Asserts that category, publish date, and read-time badges render correctly in the detail view.
12. **T1-12: MD Paragraph Rendering**: Verifies paragraphs from Markdown parse to standard HTML `<p>` tags.
13. **T1-13: MD Header Rendering**: Verifies Markdown headings (e.g., `##`, `###`) parse to `<h2>`/`<h3>` HTML elements.
14. **T1-14: MD List Rendering**: Verifies Markdown lists render as HTML `<ul>`/`<ol>` and `<li>` elements.
15. **T1-15: Tailwind Typography Class**: Asserts the article body wrapper has the `prose` class for Tailwind typography rendering.

---

### Tier 2: Boundary & Edge Cases (`tests/e2e/tier2_boundary.test.js`)
*These tests stress-test the application under exceptional, empty, malformed, or hostile inputs.*

16. **T2-01: Non-Existent Route Handling (404 Page)**: Directly requests an invalid ID (e.g. `/knowledge/this-article-does-not-exist`) and checks for a clean fallback/error state.
17. **T2-02: Empty JSON Index**: Mocks `/knowledge/index.json` to return an empty array `[]` and asserts that the Hub shows a "no articles found" fallback message.
18. **T2-03: Malformed JSON Index**: Mocks `/knowledge/index.json` to return invalid JSON syntax and checks that the page displays a friendly error instead of crashing.
19. **T2-04: Missing Markdown File**: Mocks the Markdown detail fetch to return `404` and verifies the inline error notification.
20. **T2-05: Malformed Markdown Content**: Intercepts the markdown resource and serves broken syntax, verifying the page parses what it can safely without crashing.
21. **T2-06: HTML Code Injection (XSS)**: Attempts to inject `<script>` tags into Markdown and verifies they are sanitized and not executed.
22. **T2-07: SQL Injection/Query Attack Vectors**: Tests route vulnerability to query parameter SQL payloads (e.g. `UNION SELECT`) to ensure stability.
23. **T2-08: Search Query - No Match**: Enters a nonsense string into search and asserts that a fallback "no results" message is rendered.
24. **T2-09: Search Query - Case Insensitivity**: Asserts that queries like "product" and "PRODUCT" return identical card counts.
25. **T2-10: Category Filter - Zero Articles**: Clicks a category that contains zero items and verifies the empty-state fallback.
26. **T2-11: Extreme Character Lengths**: Mocks an article title with >200 characters and verifies grid card layout dimensions remain within bounds.
27. **T2-12: Missing Metadata Fields in JSON**: Omits optional metadata fields (like `date`/`readTime`) and verifies card renders cleanly without console/runtime crashes.
28. **T2-13: Mobile Layout Grid Collapse**: Simulates a 375x812 mobile viewport and verifies the grid cards stack vertically.
29. **T2-14: Direct Landing / Deep Linking**: Directly navigates to `/knowledge/product-teardown-framework` and verifies immediate load without visiting the hub first.
30. **T2-15: Rapid Page Switching**: Simulates double clicks/rapid routing within 50ms to ensure no race conditions occur.

---

### Tier 3: Cross-Feature Interactions (`tests/e2e/tier3_cross_feature.test.js`)
*These tests verify interaction compatibility between the new library and the surrounding application framework.*

31. **T3-01: Search & Filter Coexistence**: Selects a category filter and types a search query simultaneously, verifying the results reflect the intersection.
32. **T3-02: Navigation History Consistency**: Navigates Home -> Hub -> Search -> Detail, presses browser Back multiple times, and verifies state/query preservation.
33. **T3-03: Active Nav Link Header Highlighting**: Verifies the "KNOWLEDGE" header button is highlighted visually when on any `/knowledge` sub-path.

---

### Tier 4: Real-World User Journeys (`tests/e2e/tier4_real_world.test.js`)
*These tests verify full, sequence-driven, end-to-end user behaviors under production-like constraints.*

34. **T4-01: Complete Reader Lifecycle**: Full sequence: User lands on Home (`/`), clicks Knowledge in Header, searches, clicks card to read, verifies typography, and clicks "Back to Hub".
35. **T4-02: Deep-Linked Reference Session**: External user deep-links to an article, reads/selects text, clicks back, filters by category, and opens another article.
36. **T4-03: Simulated Network Latency Resilience**: Delays the network API response by 1000ms and asserts that a skeleton loader/shimmer is visible during transit, updating cleanly when loaded.
37. **T4-04: Theme and Accessibility Style Audit**: Programmatically inspects the body background and text colors to confirm compliance with Slate-50 (#F8FAFC) background and Slate-900 (#0F172A) text contrast ratios.
38. **T4-05: Category Filter Flow**: Confirms that clicking category chips filters card counts dynamically (e.g. from 2 to 1) and matches card text.

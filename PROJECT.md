# Project: PM Knowledge Centre

## Architecture
The PM Knowledge Centre is a static content library integrated into an existing Vite + React + Tailwind CSS single-page application.
- **Routing**: Handled by `react-router-dom`. We add `/knowledge` (hub) and `/knowledge/:id` (detail view).
- **Navigation**: The Header component is updated with a navigation link to `/knowledge`.
- **Data Flow**:
  - The site reads a JSON index (`/public/knowledge/index.json`) containing article metadata (id, title, summary, category, date, readTime).
  - The hub page fetches this index and displays the list of articles.
  - The detail page fetches the article Markdown file from `/public/knowledge/:id.md` dynamically at runtime, parses it using `react-markdown`, and displays it using Tailwind CSS typography classes (`prose`).
- **Aesthetic**: Slate text, soft icy-blue backgrounds, high legibility, matching the existing "Trust & Knowledge" minimal theme.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Test Suite Setup | Set up Puppeteer E2E test infra, write Tier 1-4 test cases, publish `TEST_READY.md` | None | DONE |
| 2 | Implementation Setup | Install dependencies (`react-markdown`), configure routes, update Header navigation | None | DONE |
| 3 | Content Hub Implementation | Create the article list page (`/knowledge`) with local JSON index and mock articles | M2 | DONE (pending verification) |
| 4 | Article Rendering Page | Implement dynamic route `/knowledge/:id`, render Markdown using tailwind typography | M2, M3 | DONE (pending verification) |
| 5 | Phase 1 E2E Test Verification | Verify and debug the implementation until all E2E tests pass 100% | M1, M4 | IN_PROGRESS (dc2edfae-041b-4e64-a325-e05a3831223c) |
| 6 | Phase 2 Adversarial Hardening | Perform white-box analysis, generate adversarial test cases (Tier 5), fix any coverage gaps | M5 | PLANNED |

## Interface Contracts
### Routing Configuration
- `/knowledge`: Renders `<KnowledgeHub />`
- `/knowledge/:id`: Renders `<KnowledgeDetail />`

### Data Formats
- **Article Index (`index.json`)**:
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "summary": "string",
      "category": "string",
      "date": "string",
      "readTime": "string"
    }
  ]
  ```
- **Markdown Source (`:id.md`)**:
  Standard Markdown format containing headers, lists, bold text, etc.

## Code Layout
- `src/App.jsx` - Routing definition
- `src/components/Header.jsx` - Header navigation links
- `src/pages/KnowledgeHub.jsx` - Hub page showing available articles
- `src/pages/KnowledgeDetail.jsx` - Detail page rendering an article
- `public/knowledge/index.json` - Content index file
- `public/knowledge/*.md` - Content markdown files
- `tests/` - E2E tests using Puppeteer

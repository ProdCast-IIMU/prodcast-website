# Original User Request

## Initial Request — 2026-06-26T05:49:28Z

Build a "Knowledge Centre" static content library for an existing React/Tailwind site, which will contain articles, cheat sheets, and frameworks related to Product Management.

Working directory: c:\Users\saura\Downloads\MBA\Prodcast\Website
Integrity mode: demo

## Requirements

### R1. Markdown-Driven Library
Implement a new `/knowledge` route that acts as the hub for the Knowledge Centre. It should list available PM frameworks and articles by reading from local Markdown files or a local JSON index.

### R2. Article Rendering
Implement a dynamic route (e.g., `/knowledge/:id`) that parses and renders the Markdown content. The design must strictly adhere to the existing "Trust & Knowledge" minimal aesthetic (slate text, soft icy-blue backgrounds, high legibility) and avoid any dark mode or brutalist styles.

## Acceptance Criteria

### Integration & Build
- [ ] `react-markdown` (or an equivalent library) is successfully installed in the `package.json`.
- [ ] The site successfully builds via `npm run build` without any compilation errors.
- [ ] The Header component is updated to include a navigation link to the Knowledge Centre.

### Content Rendering
- [ ] The `/knowledge` hub displays a list of at least two placeholder articles/frameworks.
- [ ] Clicking an article navigates to the dynamic route and successfully renders the Markdown content as HTML.
- [ ] The rendered markdown text uses Tailwind typography classes that match the clean, Vercel-style minimal aesthetic of the surrounding site.

# Project Specification

## 1. Product Requirements
Prodcast requires a high-performance, ultra-clean landing page with perfect readability to attract students and partners.

### Key Features
- **Typographic Hero**: Stark white background, massive perfectly kerned black typography.
- **Bento Grid Gallery ("What We Ship")**: An elegant, responsive white bento grid that slides into view upon scrolling. 
- **Dive-In Animations**: Clicking an event triggers a seamless page transition using `framer-motion` layout IDs to expand the card into a full-screen detailed view.
- **Roadmap**: Clean interactive grid showing the upcoming year.
- **Footer**: A minimalist footer closing out the user journey.

## 2. Technical Design
### Routing & Navigation
- `/` - Main landing page (Home)
- `/event/:id` - Detailed view for specific events

### State & Animation Management
- **Scroll State**: Managed globally via `lenis` for smooth interpolation.
- **Transitions**: Managed via `framer-motion`.

### Styling Architecture
- Strictly Tailwind CSS v3 utility classes based on a stark white/black palette.

## 3. Milestones
- [x] Initial UI setup and dark theme mapping
- [x] Total visual pivot to Clean Modern Minimalist
- [ ] Typographic Hero implementation
- [ ] Bento Grid implementation

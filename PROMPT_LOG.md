# Prompt engineering and context engineering log
## 1. Initial user prompt
Build a professional responsive electronics e-commerce application with React, Vite, Tailwind CSS, Lucide React, Recharts and LocalStorage; include at least 16 products, cart, checkout, integrated CRM, charts, customer inquiries, and submission documentation.

## 2. Context engineering decisions
Treat the storefront and CRM as two views of one persisted state. Use one customer identifier across orders and deduplicate customers by normalized email. Use integer USD demo prices, delivered-only revenue, and explicit order statuses. Keep the prototype local and avoid paid services, external image dependencies, real card data and authentication. Use bundled SVG illustrations for reliable offline assets.

## 3. Implementation iterations actually performed
- Defined the catalogue, demo orders, customers and inquiries and isolated domain logic from the UI.
- Implemented reusable product cards, checkout fields, order summary, responsive navigation and CRM tabs with search, notes, status editing and charts.
- Reviewed form navigation and reset shared form state on page changes to avoid accidental carryover.
- Added nine automated Node tests covering filtering, sorting, cart arithmetic, validation, order/customer creation, deduplication, metrics and JSON serialization.

## 4. Actual verification
`npm install` failed with EAI_AGAIN (DNS resolution for registry.npmjs.org). `npm test` succeeded: 9 passed, 0 failed. The React production build and browser end-to-end tests were not run. No deployment was performed. See TESTING.md and test-results.txt. The manual checklist is not a claim of execution.

### Product imagery refinement
User requested realistic product visuals. Two studio-style AI-generated contact sheets were split into 16 local PNG assets, matched to catalogue IDs. Homepage imagery and saved cart/catalogue paths were updated; image fit was changed to contain to avoid cropping devices. Browser verification remains pending.

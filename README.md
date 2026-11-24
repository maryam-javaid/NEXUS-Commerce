# NEXUS-COMMERCE — Premium Tech Store
GDG Bootcamp capstone: a responsive electronics storefront with integrated CRM. Built with React, Vite, Tailwind CSS, Lucide React, Recharts and LocalStorage.

## Run locally
Install Node.js 22 (or a compatible Node 20 release), extract this folder, and run:
```bash
npm install
npm run dev
```
Open the URL Vite prints (normally http://localhost:5173). Run `npm test` for business-logic tests, `npm run build` for the production bundle, and `npm run preview` to preview it.

## Features
- 16 fictional catalogue listings based on real device names, illustrative local SVG artwork, category filters, search, sorting and details.
- Shopping cart, quantity controls, checkout validation, simulated order confirmation.
- CRM: orders, customer records and notes, inquiry management, delivered revenue and order volume charts.
- Checkout creates or updates a customer by email, creates a pending order and clears the cart in one state update.
- LocalStorage persists all application records in the same browser and origin.

## Architecture
`src/main.jsx` contains the UI and reusable components; `src/logic.js` contains pure domain operations; `src/store.js` manages persistence; `src/data.js` defines demo records; `src/style.css` contains responsive styles; `public/images` contains local illustrations; `tests` contains automated tests.

## Deploy to Vercel
1. Create a GitHub repository and upload the extracted project contents (not node_modules).
2. Import the repository in Vercel. Select Vite; build command `npm run build`; output directory `dist`.
3. Deploy and open the resulting URL. Test checkout, admin and refresh on the deployed site.

## Demo walkthrough
Shop → filter Phones → open a product → add to cart → change quantity → checkout using fictional details → confirm → View in admin → change order status to Delivered → Overview → verify revenue. Submit a contact inquiry and resolve it in Admin → Inquiries.

## Scope and limitations
No real payments, shipping, authentication, backend or cross-device synchronization. The admin is openly accessible. Use fictional personal data only. Prices are demonstration USD prices, not current quotes. Images are original schematic illustrations, not exact manufacturer photographs. Revenue counts delivered orders only. Clear the `nexus-commerce-v1` LocalStorage key to reset demo data. Browser navigation uses in-app state, so a refresh returns to Home while records persist. Browser and production-build verification remain pending because the build environment could not resolve the npm registry. Nine Node business-logic tests passed; see test-results.txt.

### Product imagery
All 16 catalogue images are locally bundled AI-generated product visualizations, not official manufacturer photographs. Existing browser-saved cart and catalogue image paths are migrated automatically.

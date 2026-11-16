# ShopEasy â€” Good finds. Everyday.

A responsive e-commerce portfolio frontend built with React, Vite, JavaScript, Tailwind CSS, React Router, and Fake Store API. No backend, accounts, real payments, or real orders.

## Run locally

Install Node.js 22.12+ (Node 24 recommended), then open this folder in VS Code or a terminal:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. On Windows PowerShell, use `npm.cmd` in place of `npm` if script execution policy blocks npm.ps1. No environment variables or API keys are required.

```sh
npm test          # storage, quantity and order-total checks
npm run build    # production assets in dist/
npm run preview  # serve the production build locally
```

## Four beginner-friendly phases

### 1. Setup & homepage

Vite runs the development server and creates the production build. `src/main.jsx` starts React and defines routes. `components/Layout.jsx` is the shared navbar and footer. The homepage is in `pages/Catalog.jsx`. `styles.css` imports Tailwind v4 and defines the visual design; Tailwind utilities are also available directly in JSX.

### 2. Products & search

`context/Store.jsx` fetches `https://fakestoreapi.com/products`. Components read the catalog from React Context instead of fetching it separately. There is an eight-second timeout, loading skeletons, response validation, and a retry action. When the API fails, a visible notice identifies the bundled sample collection in `data/fallback.js`.

`pages/Catalog.jsx` combines search, category and price filters, then sorts the result. Filter choices are stored as URL query parameters, so filtered views can be bookmarked. `pages/Product.jsx` reads a product ID from the route. `components/UI.jsx` contains reusable cards, images, quantity controls and empty states.

### 3. Cart & wishlist

React Context shares cart and wishlist state across pages. Functional state updates keep quick consecutive clicks safe. localStorage remembers product snapshots between visits, and stored data is validated before use. If storage is unavailable, shopping still works for the current visit and a message explains the limitation. Quantity is capped at 99; reducing a cart item to zero removes it.

### 4. Checkout & deployment

`pages/Cart.jsx` contains the bag, reusable order summary and mock checkout. Native form validation checks the fields. Placing a demo order creates a local confirmation and empties the bag. Contact/address values are not stored or transmitted. Reloading the confirmation returns to an empty bag; no durable order history exists.

## Project map

```text
src/
  components/Layout.jsx  Shared navigation, footer, toast
  components/UI.jsx      Reusable product and form UI
  context/Store.jsx      Catalog request and persistent shopping state
  data/fallback.js       Clearly labeled sample catalog
  pages/Catalog.jsx      Home, collection and wishlist
  pages/Product.jsx      Product details
  pages/Cart.jsx         Bag and mock checkout
  lib.js                 Storage validation and price calculations
  lib.test.js            Node test-runner checks
  main.jsx               Entry point, routes and error boundary
  styles.css             Tailwind import and responsive design
```

## GitHub and Vercel

Create an empty GitHub repository, then run inside this project folder (replace YOUR_USERNAME):

```sh
git init
git add .
git commit -m "Build ShopEasy storefront"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ShopEasy.git
git push -u origin main
```

In Vercel, choose **Add New â†’ Project**, import the repository, and use the **Vite** preset with build command `npm run build` and output directory `dist`. If the repository contains this project in a subfolder, set Vercel's Root Directory to that folder. `vercel.json` routes direct links such as `/product/1` back to the React app. No secrets are needed. GitHub upload and Vercel deployment require your accounts and have not been performed by the source setup.

## Manual verification checklist

- Desktop and 390px mobile: navigation, hero, cards, footer; no horizontal scrolling.
- Search plus category/price filters; sorting; no-match result; reset filters.
- Open product details and an invalid product URL; direct-route reload after deployment.
- Add the same item twice, change quantities, remove, and inspect totals.
- Save a wishlist item, reload, remove it; verify bag also persists.
- Empty bag, wishlist and checkout states.
- Required/invalid email form feedback; demo confirmation; bag cleared.
- Disable network and reload: sample catalog notice and retry action.
- Keyboard-only navigation, visible focus, menu toggle and screen-reader labels.

## Interview talking points

- **Why Context?** This small app shares a few values across routes; Context avoids prop drilling without adding a state library.
- **Why functional setters?** The next cart depends on the previous cart. Functional updates avoid stale state during fast interactions.
- **Why localStorage?** It fits a frontend-only demo. Production carts need server validation, stock checks, and user-specific persistence.
- **How are errors handled?** HTTP status/data validation, timeout/cleanup, a labeled fallback catalog, image placeholders, safe storage parsing, and an error boundary.
- **What would production need?** A backend with authoritative prices and inventory, authentication, tax/shipping rules, accessible payment-provider integration, order persistence and broader automated tests.

## Assets and limitations

Catalog data and live images: [Fake Store API](https://fakestoreapi.com/). Hero and sample product photos: [Unsplash](https://unsplash.com/); sample photos are illustrative. Icons: Lucide. External images require network access and use a local placeholder when unavailable. Prices use USD to match the API. The fallback catalog has different sample products, while saved bags retain their original snapshots. Sample products use separate IDs to avoid collisions with live products. A production app should use stable, namespaced inventory IDs and reconcile saved carts with its backend.

Reference setup documentation: [Vite](https://vite.dev/guide/) and [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite).

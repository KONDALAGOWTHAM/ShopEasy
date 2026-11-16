import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StoreProvider } from "./context/Store";
import Layout from "./components/Layout";
import { Catalog, Wishlist } from "./pages/Catalog";
import Product from "./pages/Product";
import { Cart, Checkout } from "./pages/Cart";
import { Empty } from "./components/UI";
import "./styles.css";
class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="empty">
        <h1>Something went wrong.</h1>
        <p>Please reload to try again.</p>
        <button className="btn" onClick={() => window.location.reload()}>
          Reload store
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
function About() {
  return (
    <section className="shell page about">
      <p className="eyebrow">BEHIND THE GOOD FINDS</p>
      <h1>A store built for learning.</h1>
      <p>
        ShopEasy is a frontend portfolio project built with React, Vite,
        Tailwind CSS, and React Router. Products come from Fake Store API, with
        a sample collection available during outages.
      </p>
      <h2>Small components. A complete experience.</h2>
      <p>
        Search and filter the catalog, explore product details, save favorites,
        and try a mock checkout. Your cart and wishlist stay in your browser
        using localStorage.
      </p>
      <h2>A demo from start to finish.</h2>
      <p>
        No account, backend, real payments, fulfillment, or actual purchases.
        Checkout information is never saved or transmitted.
      </p>
      <Link className="btn" to="/shop">
        Explore ShopEasy ↗
      </Link>
    </section>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <StoreProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Catalog home />} />
              <Route path="shop" element={<Catalog />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="about" element={<About />} />
              <Route
                path="*"
                element={
                  <Empty
                    title="A little off the beaten path."
                    text="We couldn’t find that page. Your next good find is just a click away."
                  />
                }
              />
            </Route>
          </Routes>
        </StoreProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);

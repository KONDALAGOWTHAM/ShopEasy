import { createContext, useContext, useEffect, useState } from "react";
import { fallback } from "../data/fallback";
import { restoreList, updateQuantity, validProduct } from "../lib";
const StoreContext = createContext(null);
function read(key, cart) {
  try {
    return restoreList(localStorage.getItem(key), cart);
  } catch {
    return [];
  }
}
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read("shopeasy-cart", true));
  const [wishlist, setWishlist] = useState(() => read("shopeasy-wishlist"));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 8000);
    setLoading(true);
    setError("");
    fetch("https://fakestoreapi.com/products", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("API unavailable");
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || !data.length || !data.every(validProduct))
          throw new Error("Invalid catalog");
        if (active) setProducts(data);
      })
      .catch(() => {
        if (active) {
          setProducts(fallback);
          setError(
            "Live catalog unavailable. You’re browsing our sample collection.",
          );
        }
      })
      .finally(() => {
        clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);
  useEffect(() => {
    try {
      localStorage.setItem("shopeasy-cart", JSON.stringify(cart));
      localStorage.setItem("shopeasy-wishlist", JSON.stringify(wishlist));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [cart, wishlist]);
  useEffect(() => {
    if (notice) {
      const id = setTimeout(() => setNotice(""), 3000);
      return () => clearTimeout(id);
    }
  }, [notice]);
  function add(product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((p) => p.id === product.id);
      return existing
        ? updateQuantity(current, product.id, existing.quantity + quantity)
        : [...current, { ...product, quantity }];
    });
    setNotice("Added to your bag");
  }
  function toggle(product) {
    setWishlist((current) =>
      current.some((p) => p.id === product.id)
        ? current.filter((p) => p.id !== product.id)
        : [...current, product],
    );
  }
  const value = {
    cart,
    wishlist,
    products,
    loading,
    error,
    storageError,
    retry: () => setAttempt((a) => a + 1),
    add,
    toggle,
    quantity: (id, n) => setCart((c) => updateQuantity(c, id, n)),
    clearCart: () => setCart([]),
    notice,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
export const useStore = () => useContext(StoreContext);

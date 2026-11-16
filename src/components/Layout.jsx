import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowUpRight,
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "../context/Store";
export default function Layout() {
  const { cart, wishlist, notice, storageError } = useStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        A little something for your everyday.{" "}
        <span>Free demo shipping on orders $100+</span>
        <ArrowUpRight size={13} />
      </div>
      <header>
        <div className="navbar shell">
          <Link className="logo" to="/">
            shop<span>easy</span>
            <i>✳</i>
          </Link>
          <nav
            className={open ? "nav-links open" : "nav-links"}
            aria-label="Main navigation"
          >
            <NavLink to="/shop">Shop all</NavLink>
            <Link to="/shop?category=women%27s+clothing">Women</Link>
            <Link to="/shop?category=men%27s+clothing">Men</Link>
            <Link to="/shop?category=jewelery">Jewelry</Link>
            <Link to="/shop?category=electronics">Electronics</Link>
          </nav>
          <div className="nav-actions">
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
            >
              <Heart size={21} />
              {wishlist.length > 0 && <b>{wishlist.length}</b>}
            </Link>
            <Link
              to="/cart"
              aria-label={`Shopping bag, ${cart.reduce((s, p) => s + p.quantity, 0)} items`}
            >
              <ShoppingBag size={21} />
              <b>{cart.reduce((s, p) => s + p.quantity, 0)}</b>
            </Link>
            <button
              className="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <section className="benefits shell">
        <div>
          <Truck />
          <p>
            <strong>A little extra, on us</strong>
            <span>Free demo shipping over $100</span>
          </p>
        </div>
        <div>
          <RotateCcw />
          <p>
            <strong>Try the full experience</strong>
            <span>Browse, save, and build your bag</span>
          </p>
        </div>
        <div>
          <ShieldCheck />
          <p>
            <strong>Made for exploring</strong>
            <span>Demo store. No real payments.</span>
          </p>
        </div>
      </section>
      <footer>
        <div className="shell footer-top">
          <div>
            <Link className="logo" to="/">
              shop<span>easy</span>
              <i>✳</i>
            </Link>
            <p>
              Good finds. Everyday.
              <br />A little less searching. A little more living.
            </p>
          </div>
          <div>
            <h3>Discover your next favorite</h3>
            <form
              className="footer-search"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/shop?q=${encodeURIComponent(search)}`);
              }}
            >
              <Search size={17} />
              <input
                aria-label="Search the collection"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button aria-label="Search products">
                <ArrowUpRight />
              </button>
            </form>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} ShopEasy · Portfolio demo</span>
          <span>
            Thoughtfully built with React.{" "}
            <Link to="/about">About this project ↗</Link>
          </span>
        </div>
      </footer>
      {storageError && (
        <div className="storage-warning" role="status">
          Browser storage is unavailable. Your bag and wishlist will last for
          this visit only.
        </div>
      )}
      <div className={`toast ${notice ? "visible" : ""}`} role="status">
        {notice && (
          <>
            <ShoppingBag size={17} />
            {notice}
            <Link to="/cart">View bag →</Link>
          </>
        )}
      </div>
    </>
  );
}

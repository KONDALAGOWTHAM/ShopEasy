import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useStore } from "../context/Store";
import { ProductCard, Loading, categories, Empty } from "../components/UI";
export function Catalog({ home = false }) {
  const { products, loading, error, retry } = useStore();
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const q = params.get("q") || "";
  const sort = params.get("sort") || "featured";
  const price = params.get("price") || "all";
  function change(key, value) {
    const next = new URLSearchParams(params);
    value && value !== "all" && value !== "featured"
      ? next.set(key, value)
      : next.delete(key);
    setParams(next, { replace: true });
  }
  const filtered = products
    .filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (p.title + " " + p.category).toLowerCase().includes(q.toLowerCase()) &&
        (price === "all" || p.price <= Number(price)),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "rating"
            ? (b.rating?.rate || 0) - (a.rating?.rate || 0)
            : a.id - b.id,
    );
  return (
    <>
      {home && (
        <>
          <section className="hero shell">
            <div className="hero-copy">
              <p className="eyebrow">
                <span /> THE EVERYDAY EDIT / 2026
              </p>
              <h1>
                Good finds.
                <br />
                Great <em>everydays.</em>
              </h1>
              <p className="hero-description">
                The pieces you reach for. The details you love.
                <br />
                Discover everyday essentials, a little less ordinary.
              </p>
              <Link className="btn" to="/shop">
                Find your next favorite <ArrowUpRight size={19} />
              </Link>
              <div className="hero-note">
                <span>✳</span> Thoughtfully picked. Simply yours.
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1100&q=85"
                alt="A curated collection of neutral clothing on a rack"
              />
              <div className="hero-stamp">
                LESS SCROLLING
                <br />
                <b>More living.</b>
                <span>THE SHOPEASY WAY</span>
              </div>
              <Link
                className="hero-caption"
                to="/shop?category=women%27s+clothing"
              >
                <span>
                  Make room for the everyday.
                  <small>Explore the wardrobe edit</small>
                </span>
                <ArrowUpRight />
              </Link>
            </div>
          </section>
          <div className="marquee">
            <span>EVERYDAY, ELEVATED</span>
            <i>✳</i>
            <span>YOUR NEXT GOOD FIND</span>
            <i>✳</i>
            <span>LESS ORDINARY. MORE YOU.</span>
            <i>✳</i>
            <span>EVERYDAY, ELEVATED</span>
          </div>
        </>
      )}
      <section className="catalog shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE GOOD STUFF, ALL IN ONE PLACE</p>
            <h2>{home ? "Meet your new favorites." : "Find your everyday."}</h2>
          </div>
          {home && (
            <Link className="text-link" to="/shop">
              Explore all finds <ArrowRight size={17} />
            </Link>
          )}
        </div>
        <div className="catalog-toolbar">
          <div className="category-tabs" aria-label="Product categories">
            {categories.map((c) => (
              <button
                key={c.id}
                className={category === c.id ? "selected" : ""}
                onClick={() => change("category", c.id)}
                aria-pressed={category === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={17} />
            <input
              aria-label="Search products"
              placeholder="Search your next find"
              value={q}
              onChange={(e) => change("q", e.target.value)}
            />
            {q && (
              <button aria-label="Clear search" onClick={() => change("q", "")}>
                <X size={16} />
              </button>
            )}
          </label>
        </div>
        <div className="filter-row">
          <span>
            {loading
              ? "Finding the good stuff…"
              : `${filtered.length} good finds`}
          </span>
          <div>
            <SlidersHorizontal size={16} />
            <label>
              <span className="sr-only">Maximum price</span>
              <select
                value={price}
                onChange={(e) => change("price", e.target.value)}
              >
                <option value="all">All prices</option>
                <option value="25">Under $25</option>
                <option value="50">Under $50</option>
                <option value="100">Under $100</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(e) => change("sort", e.target.value)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
        </div>
        {error && (
          <div className="api-notice" role="status">
            {error}
            <button onClick={retry}>Retry live catalog ↗</button>
          </div>
        )}
        {loading ? (
          <Loading />
        ) : filtered.length ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No finds just yet.</h2>
            <p>Try a different search or give your filters a fresh start.</p>
            <button className="btn" onClick={() => setParams({})}>
              Clear all filters
            </button>
          </div>
        )}
      </section>
      {home && (
        <section className="editorial shell">
          <div>
            <p className="eyebrow">SMALL DETAILS. BIG DIFFERENCE.</p>
            <h2>
              Everyday essentials.
              <br />
              Anything but ordinary.
            </h2>
            <Link to="/shop?category=jewelery" className="text-link">
              Discover the details <ArrowUpRight size={18} />
            </Link>
          </div>
          <span className="editorial-flower">✳</span>
        </section>
      )}
    </>
  );
}
export function Wishlist() {
  const { wishlist } = useStore();
  return (
    <section className="shell page">
      <p className="eyebrow">SAVE A LITTLE INSPIRATION</p>
      <h1>
        Your wishlist<span className="count">{wishlist.length}</span>
      </h1>
      {wishlist.length ? (
        <div className="product-grid">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <Empty
          title="Room for your favorites."
          text="Tap the heart on a product to keep it here for later."
        />
      )}
    </section>
  );
}

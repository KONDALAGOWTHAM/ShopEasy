import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ArrowUpRight, Truck, Star } from "lucide-react";
import { useStore } from "../context/Store";
import {
  ProductImage,
  Quantity,
  Loading,
  Empty,
  ProductCard,
  categoryLabel,
} from "../components/UI";
import { money } from "../lib";
export default function Product() {
  const { id } = useParams();
  const { products, loading, add, cart, wishlist, toggle, error } = useStore();
  const [amount, setAmount] = useState(1);
  const p = [...products, ...cart, ...wishlist].find(
    (p) => p.id === Number(id),
  );
  if (loading)
    return (
      <div className="shell page">
        <Loading />
      </div>
    );
  if (!p)
    return (
      <Empty
        title="This find isn't here."
        text="Browse the collection to discover something else you’ll love."
      />
    );
  const saved = wishlist.some((item) => item.id === p.id);
  return (
    <section className="shell page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        {categoryLabel(p.category)}
      </div>
      {error && <p className="api-notice">{error}</p>}
      <div className="detail-grid">
        <div className="detail-image">
          <ProductImage product={p} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">
            {categoryLabel(p.category)} / THE EVERYDAY EDIT
          </p>
          <h1>{p.title}</h1>
          <div className="rating">
            <Star size={16} fill="currentColor" /> {p.rating?.rate || "New"}{" "}
            <span>({p.rating?.count || 0} catalog reviews)</span>
          </div>
          <p className="detail-price">{money(p.price)}</p>
          <p className="description">{p.description}</p>
          <div className="detail-actions">
            <Quantity
              value={amount}
              onChange={(n) => setAmount(Math.max(1, n))}
            />
            <button className="btn" onClick={() => add(p, amount)}>
              Add to bag <ArrowUpRight size={18} />
            </button>
            <button
              className={`wish-detail ${saved ? "saved" : ""}`}
              onClick={() => toggle(p)}
              aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={saved}
            >
              <Heart fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
          <p className="shipping-note">
            <Truck size={18} /> Free demo shipping on orders $100+
          </p>
          <details>
            <summary>About this collection</summary>
            <p>
              Products are supplied by Fake Store API, or our labeled sample
              catalog during outages. This portfolio shop is a demo; items
              cannot be purchased.
            </p>
          </details>
        </div>
      </div>
      <div className="section-heading">
        <h2>A few more good finds.</h2>
        <Link to="/shop" className="text-link">
          Shop all <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="product-grid">
        {products
          .filter((item) => item.id !== p.id)
          .slice(0, 4)
          .map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
      </div>
    </section>
  );
}

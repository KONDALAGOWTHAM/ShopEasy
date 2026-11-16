import {
  Heart,
  Plus,
  Minus,
  ArrowUpRight,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/Store";
import { money } from "../lib";
export const categories = [
  { id: "all", label: "All finds" },
  { id: "women's clothing", label: "Women" },
  { id: "men's clothing", label: "Men" },
  { id: "jewelery", label: "Jewelry" },
  { id: "electronics", label: "Electronics" },
];
export const categoryLabel = (id) =>
  categories.find((c) => c.id === id)?.label || id;
export function ProductImage({ product, ...props }) {
  return (
    <img
      src={product.image}
      alt={product.title}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/placeholder.svg";
      }}
      {...props}
    />
  );
}
export function Quantity({ value, onChange }) {
  return (
    <div className="quantity">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        aria-label="Increase quantity"
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function ProductCard({ product }) {
  const { add, wishlist, toggle } = useStore();
  const saved = wishlist.some((p) => p.id === product.id);
  return (
    <article className="product-card">
      <div className="product-photo">
        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.title}`}
        >
          <ProductImage product={product} />
        </Link>
        <button
          className={`heart ${saved ? "saved" : ""}`}
          onClick={() => toggle(product)}
          aria-label={`${saved ? "Remove from" : "Add to"} wishlist: ${product.title}`}
          aria-pressed={saved}
        >
          <Heart size={19} fill={saved ? "currentColor" : "none"} />
        </button>
        <button className="quick-add" onClick={() => add(product)}>
          <Plus size={16} /> Add to bag
        </button>
      </div>
      <div className="product-meta">
        <span>{categoryLabel(product.category)}</span>
        <span className="rating">
          <Star size={12} fill="currentColor" /> {product.rating?.rate ?? "New"}
        </span>
      </div>
      <Link className="product-title" to={`/product/${product.id}`}>
        {product.title}
      </Link>
      <p className="price">{money(product.price)}</p>
    </article>
  );
}
export function Empty({ title, text }) {
  return (
    <div className="empty">
      <ShoppingBag size={40} strokeWidth={1} />
      <h2>{title}</h2>
      <p>{text}</p>
      <Link className="btn" to="/shop">
        Explore the collection <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
export function Loading() {
  return (
    <div aria-label="Loading products" role="status" className="product-grid">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="skeleton">
          <div />
          <p />
          <p />
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Trash2, Check, ArrowLeft } from "lucide-react";
import { useStore } from "../context/Store";
import { Empty, ProductImage, Quantity } from "../components/UI";
import { money, totals } from "../lib";
function Summary({ cart, children }) {
  const { subtotal, shipping, total } = totals(cart);
  return (
    <aside className="summary">
      <p className="eyebrow">THE GOOD FINDS ADD UP</p>
      <h2>Order summary</h2>
      <div>
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      <div>
        <span>Demo shipping</span>
        <span>{shipping ? money(shipping) : "On us"}</span>
      </div>
      <p className="muted">
        {subtotal < 100
          ? `${money(100 - subtotal)} away from free shipping.`
          : "Your order qualifies for free shipping."}
      </p>
      <div className="summary-total">
        <strong>Total</strong>
        <strong>{money(total)}</strong>
      </div>
      <p className="muted">USD · Demo prices. No tax or payment collected.</p>
      {children}
    </aside>
  );
}
export function Cart() {
  const { cart, quantity } = useStore();
  return (
    <section className="shell page">
      <p className="eyebrow">YOUR GOOD FINDS</p>
      <h1>
        In the bag.
        <span className="count">
          {cart.reduce((s, p) => s + p.quantity, 0)}
        </span>
      </h1>
      {!cart.length ? (
        <Empty
          title="Your next favorite is out there."
          text="Your bag is empty. Let’s find something good."
        />
      ) : (
        <div className="cart-layout">
          <div>
            <div className="cart-labels">
              <span>PRODUCT</span>
              <span>QUANTITY & TOTAL</span>
            </div>
            {cart.map((p) => (
              <article key={p.id} className="cart-item">
                <Link to={`/product/${p.id}`}>
                  <ProductImage product={p} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/product/${p.id}`}>{p.title}</Link>
                  <p>{money(p.price)}</p>
                  <button className="remove" onClick={() => quantity(p.id, 0)}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <div className="cart-item-end">
                  <Quantity
                    value={p.quantity}
                    onChange={(n) => quantity(p.id, n)}
                  />
                  <strong>{money(p.price * p.quantity)}</strong>
                </div>
              </article>
            ))}
            <Link className="text-link continue" to="/shop">
              <ArrowLeft size={16} /> Keep discovering
            </Link>
          </div>
          <Summary cart={cart}>
            <Link className="btn" to="/checkout">
              Continue to checkout <ArrowUpRight size={18} />
            </Link>
          </Summary>
        </div>
      )}
    </section>
  );
}
export function Checkout() {
  const { cart, clearCart } = useStore();
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  function submit(e) {
    e.preventDefault();
    if (submitting || !cart.length) return;
    setSubmitting(true);
    setOrder({
      id: crypto.randomUUID().slice(0, 8).toUpperCase(),
      total: totals(cart).total,
    });
    clearCart();
  }
  if (order)
    return (
      <section className="shell page success">
        <span className="success-icon">
          <Check size={32} />
        </span>
        <p className="eyebrow">THAT’S A GOOD FIND</p>
        <h1>All set. Just pretend.</h1>
        <p>
          Your demo order <strong>#{order.id}</strong> for {money(order.total)}{" "}
          is complete.
        </p>
        <p>
          No payment was taken, no order was sent, and nothing will be shipped.
          <br />
          Your contact details were not saved or submitted.
        </p>
        <Link className="btn" to="/shop">
          Keep exploring <ArrowUpRight size={18} />
        </Link>
      </section>
    );
  if (!cart.length)
    return (
      <Empty
        title="Add a good find first."
        text="Your bag needs an item before you can try checkout."
      />
    );
  return (
    <section className="shell page">
      <Link to="/cart" className="text-link">
        <ArrowLeft size={16} /> Back to your bag
      </Link>
      <p className="eyebrow mt-8">ONE LAST LITTLE STEP</p>
      <h1>Make it yours.</h1>
      <div className="api-notice">
        This is a mock checkout. Use fictional details. No payment or real order
        will be created.
      </div>
      <div className="cart-layout">
        <form id="checkout-form" className="checkout-form" onSubmit={submit}>
          <h2>Contact & delivery</h2>
          <label>
            Email address
            <input
              type="email"
              required
              name="email"
              autoComplete="off"
              placeholder="you@example.com"
              maxLength={150}
            />
          </label>
          <div className="form-row">
            <label>
              First name
              <input
                required
                name="firstName"
                autoComplete="off"
                maxLength={80}
                pattern=".*\S.*"
              />
            </label>
            <label>
              Last name
              <input
                required
                name="lastName"
                autoComplete="off"
                maxLength={80}
                pattern=".*\S.*"
              />
            </label>
          </div>
          <label>
            Street address
            <input
              required
              name="address"
              autoComplete="off"
              maxLength={200}
              pattern=".*\S.*"
            />
          </label>
          <div className="form-row">
            <label>
              City
              <input
                required
                name="city"
                autoComplete="off"
                maxLength={80}
                pattern=".*\S.*"
              />
            </label>
            <label>
              Postal code
              <input
                required
                name="postalCode"
                autoComplete="off"
                maxLength={20}
                pattern=".*\S.*"
              />
            </label>
          </div>
          <label>
            Country
            <select name="country" required defaultValue="">
              <option value="" disabled>
                Select country
              </option>
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Other</option>
            </select>
          </label>
          <div className="demo-payment">
            <Check size={20} />
            <div>
              <strong>Demo payment</strong>
              <p>
                No card information needed. This checkout is for demonstration
                only.
              </p>
            </div>
          </div>
        </form>
        <Summary cart={cart}>
          {cart.map((p) => (
            <div className="checkout-line" key={p.id}>
              <span>
                {p.title} × {p.quantity}
              </span>
              <b>{money(p.price * p.quantity)}</b>
            </div>
          ))}
          <button
            className="btn"
            type="submit"
            form="checkout-form"
            disabled={submitting}
          >
            Place demo order <ArrowUpRight size={18} />
          </button>
        </Summary>
      </div>
    </section>
  );
}

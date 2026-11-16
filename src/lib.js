export const money = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );
export function validProduct(p) {
  return (
    p &&
    Number.isInteger(p.id) &&
    typeof p.title === "string" &&
    typeof p.category === "string" &&
    Number.isFinite(p.price) &&
    p.price >= 0 &&
    typeof p.image === "string"
  );
}
export function restoreList(raw, cart = false) {
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list)
      ? [
          ...new Map(
            list
              .filter(
                (p) =>
                  validProduct(p) &&
                  (!cart ||
                    (Number.isInteger(p.quantity) &&
                      p.quantity > 0 &&
                      p.quantity <= 99)),
              )
              .map((p) => [p.id, p]),
          ).values(),
        ]
      : [];
  } catch {
    return [];
  }
}
export function updateQuantity(cart, id, quantity) {
  return quantity <= 0
    ? cart.filter((p) => p.id !== id)
    : cart.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.min(99, Math.max(1, Math.floor(quantity))) }
          : p,
      );
}
export function totals(cart) {
  const subtotal =
    Math.round(cart.reduce((sum, p) => sum + p.price * p.quantity, 0) * 100) /
    100;
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5.99;
  return {
    subtotal,
    shipping,
    total: Math.round((subtotal + shipping) * 100) / 100,
  };
}

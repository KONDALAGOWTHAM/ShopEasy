import test from "node:test";
import assert from "node:assert/strict";
import { restoreList, updateQuantity, totals } from "./lib.js";
const product = {
  id: 1,
  title: "Example",
  category: "electronics",
  price: 19.99,
  image: "example.jpg",
  quantity: 2,
};
test("storage recovery rejects malformed and invalid cart records", () => {
  assert.deepEqual(restoreList("{broken", true), []);
  assert.deepEqual(
    restoreList(
      JSON.stringify([
        null,
        { ...product, quantity: -1 },
        { ...product, price: "20" },
      ]),
      true,
    ),
    [],
  );
  assert.deepEqual(restoreList(JSON.stringify([product, product]), true), [
    product,
  ]);
});
test("quantity updates remove zero, cap at 99, and do not mutate the original", () => {
  const cart = [product];
  assert.deepEqual(updateQuantity(cart, 1, 0), []);
  assert.equal(updateQuantity(cart, 1, 120)[0].quantity, 99);
  assert.equal(cart[0].quantity, 2);
});
test("order math rounds cents and applies free shipping at the threshold", () => {
  assert.deepEqual(totals([]), { subtotal: 0, shipping: 0, total: 0 });
  assert.deepEqual(totals([product]), {
    subtotal: 39.98,
    shipping: 5.99,
    total: 45.97,
  });
  assert.deepEqual(totals([{ ...product, price: 50 }]), {
    subtotal: 100,
    shipping: 0,
    total: 100,
  });
  assert.equal(totals([{ ...product, price: 0.1, quantity: 3 }]).subtotal, 0.3);
});

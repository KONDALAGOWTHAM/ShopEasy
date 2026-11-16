// Locally bundled sample data keeps the portfolio demo usable when the API is down.
const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;
export const fallback = [
  {
    id: 1001,
    title: "Everyday Canvas Backpack",
    price: 49.95,
    category: "men's clothing",
    image: photo("photo-1553062407-98eeb64c6a62"),
    description:
      "A versatile canvas backpack for your everyday essentials. Roomy, practical and ready to go.",
    rating: { rate: 4.6, count: 120 },
  },
  {
    id: 1002,
    title: "Essential Cotton Tee",
    price: 22.3,
    category: "men's clothing",
    image: photo("photo-1521572163474-6864f9cf17ab"),
    description:
      "An easy everyday cotton tee with a relaxed silhouette and a timeless finish.",
    rating: { rate: 4.4, count: 259 },
  },
  {
    id: 1003,
    title: "The Everyday Jacket",
    price: 55.99,
    category: "men's clothing",
    image: photo("photo-1544022613-e87ca75a784a"),
    description:
      "A versatile outer layer to take you from weekday mornings to weekend adventures.",
    rating: { rate: 4.7, count: 180 },
  },
  {
    id: 1004,
    title: "Classic Knit Sweater",
    price: 39.99,
    category: "women's clothing",
    image: photo("photo-1434389677669-e08b4cac3105"),
    description:
      "A soft knit layer with an easy fit. Pair with your favorite everyday pieces.",
    rating: { rate: 4.5, count: 94 },
  },
  {
    id: 1005,
    title: "Golden Hour Necklace",
    price: 69.95,
    category: "jewelery",
    image: photo("photo-1611652022419-a9419f74343d"),
    description:
      "A delicate finishing touch that makes everyday outfits feel a little more special.",
    rating: { rate: 4.8, count: 87 },
  },
  {
    id: 1006,
    title: "Studio Wireless Headphones",
    price: 89.99,
    category: "electronics",
    image: photo("photo-1505740420928-5e560c06d30e"),
    description:
      "Your daily soundtrack, wherever you go. Comfortable over-ear headphones for work and downtime.",
    rating: { rate: 4.6, count: 302 },
  },
  {
    id: 1007,
    title: "Weekend Carryall",
    price: 45,
    category: "women's clothing",
    image: photo("photo-1548036328-c9fa89d128fa"),
    description:
      "A roomy carryall for spontaneous plans and everything your day holds.",
    rating: { rate: 4.3, count: 65 },
  },
  {
    id: 1008,
    title: "Everyday Wristwatch",
    price: 79,
    category: "jewelery",
    image: photo("photo-1524805444758-089113d48a6d"),
    description:
      "Clean lines and a timeless dial. A considered detail for every day.",
    rating: { rate: 4.7, count: 156 },
  },
];

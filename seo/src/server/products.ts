import { createServerFn } from "@tanstack/react-start";

export const getAllProductsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    // In a real application, this would be a database query
    // e.g., SELECT id, last_updated FROM products
    return [
      { id: "wireless-headphones", lastUpdated: "2023-10-15" },
      { id: "mechanical-keyboard", lastUpdated: "2023-10-18" },
      { id: "gaming-mouse", lastUpdated: "2023-10-20" },
    ];
  },
);

import api from "./api";

export const cartService = {
  getCart: () => api.get("/cart"),
  addItem: (product_id, quantity = 1) =>
    api.post("/cart/items", { product_id, quantity }),
  updateItem: (product_id, quantity) =>
    api.put(`/cart/items/${product_id}`, { quantity }),
  removeItem: (product_id) => api.delete(`/cart/items/${product_id}`),
  clearCart: () => api.delete("/cart"),
  mergeCart: (items) =>
    api.post(
      "/cart/merge",
      items.map(({ id, quantity }) => ({ product_id: id, quantity })),
    ),
};

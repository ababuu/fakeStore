import api from "./api";

export const orderService = {
  placeOrder: () => api.post("/orders"),
  listOrders: () => api.get("/orders"),
  getOrder: (id) => api.get(`/orders/${id}`),
};

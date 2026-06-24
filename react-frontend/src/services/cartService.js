import { apiRequest } from "./api";

export const getCart = () => apiRequest("/api/cart");

export const addToCart = (item) =>
  apiRequest("/api/cart/add", {
    method: "POST",
    body: JSON.stringify(item),
  });

export const updateCartItem = (item) =>
  apiRequest("/api/cart/update", {
    method: "PUT",
    body: JSON.stringify(item),
  });

export const removeCartItem = (item) =>
  apiRequest("/api/cart/remove", {
    method: "DELETE",
    body: JSON.stringify(item),
  });

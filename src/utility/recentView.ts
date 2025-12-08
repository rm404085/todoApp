import type { Product } from "@/types/types";

export const addRecentView = (product : Product) => {
  const stored = JSON.parse(localStorage.getItem("recentView") || "[]");

  const filtered = stored.filter((p : Product) => p.id !== product.id);

  filtered.unshift(product);

  const limited = filtered.slice(0, 10);

  localStorage.setItem("recentView", JSON.stringify(limited));
};

export const getRecentView = () => {
  return JSON.parse(localStorage.getItem("recentView") || "[]");
};

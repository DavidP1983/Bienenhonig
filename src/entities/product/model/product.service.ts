import { productApi } from "../api/products.api";

export const productService = {
  getProducts: (signal?: AbortSignal) => productApi.getProducts(signal),
  getProductById: (id: string, size?: string, signal?: AbortSignal) =>
    productApi.getProductById(id, size, signal),
  getRelatedProducts: (id: string, limit: number, signal?: AbortSignal) =>
    productApi.getRelatedProducts(id, limit, signal),
};

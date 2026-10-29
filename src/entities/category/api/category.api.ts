import { api } from "@/shared/api/client";
import { Category } from "../model/type";

export const categoryApi = {
  getCategories: (signal?: AbortSignal) =>
    api.get<Category[]>("/api/categories", { signal }),
};

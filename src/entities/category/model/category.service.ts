import { categoryApi } from '../api/category.api';

export const categoryService = {
  getCategories: (signal?: AbortSignal) => categoryApi.getCategories(signal),
};

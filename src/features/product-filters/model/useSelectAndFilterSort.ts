import { Product } from '@/entities/product/model/types';
import { useMemo } from 'react';
import { CombineFilter, SearchFilter } from './types';

/* By Alphabetic */
const sortByAlphabetic = (data: Product[]) => {
  return [...data].sort((a, b) => a.slug.localeCompare(b.slug));
};

/* By Price */
const getMinPrice = (product: Product): number => {
  return Math.min(...product.variants.map((variant) => variant.price));
};

const sortByPrice = (data: Product[], key: string) => {
  const sortedPrice = [...data].sort((a, b) => {
    if (key === 'L-H') {
      return getMinPrice(a) - getMinPrice(b);
    } else {
      return getMinPrice(b) - getMinPrice(a);
    }
  });

  return sortedPrice;
};

const Strategy = {
  alphabetic: (data: Product[]) => sortByAlphabetic(data),
  'L-H': (data: Product[]) => sortByPrice(data, 'L-H'),
  'H-L': (data: Product[]) => sortByPrice(data, 'H-L'),
};

/* Фильтр по категориям */
const categoriesFilter = (data: Product[], filter: CombineFilter) => {
  if (!filter.checkbox.length) return data;

  const selectedCategories = new Set(filter.checkbox);

  return data.filter((item) => selectedCategories.has(item.categoryId));
};

/* Фильтр по выбору цены */
const priceFilter = (data: Product[], filter: CombineFilter) => {
  const { minPrice, maxPrice } = filter;

  if (minPrice === null && maxPrice === null) return data;

  return data.filter((product) =>
    product.variants.some((variant) => {
      const price = variant.price;

      const matchesMin = minPrice === null || price >= minPrice;
      const matchesMax = maxPrice === null || price <= maxPrice;

      return matchesMin && matchesMax;
    })
  );
};

/* Сортировка */
const sortFilter = (data: Product[], filter: CombineFilter) => {
  if (!filter.select) return data;

  return Strategy[filter.select](data);
};

const filterStrategies = [categoriesFilter, priceFilter, sortFilter];

/* Search Filter */
export const useSelectAndFilterSort = (
  data: Product[] | undefined,
  filter: CombineFilter,
  search: SearchFilter
) => {
  const searchData = useMemo(() => {
    const products = data ?? [];
    const query = search.pageSearch.trim().toLocaleLowerCase();

    if (!query) return products;

    return products.filter((item) =>
      item.slug.toLocaleLowerCase().includes(query)
    );
  }, [data, search.pageSearch]);

  const filteredData = useMemo(() => {
    return filterStrategies.reduce(
      (result, applyFilter) => applyFilter(result, filter),
      searchData
    );
  }, [searchData, filter]);

  const hasActiveFilters =
    Boolean(filter.select) ||
    Boolean(filter.minPrice) ||
    Boolean(filter.maxPrice) ||
    filter.checkbox.length > 0;
  const resultCount = hasActiveFilters ? filteredData.length : 0;

  return { filteredData, resultCount };
};

import { Product } from "@/entities/product/model/types";
import { useMemo } from "react";
import { CombineFilter } from "./filter.store";

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
    if (key === "L-H") {
      return getMinPrice(a) - getMinPrice(b);
    } else {
      return getMinPrice(b) - getMinPrice(a);
    }
  });

  return sortedPrice;
};

const Strategy = {
  alphabetic: (data: Product[]) => sortByAlphabetic(data),
  "L-H": (data: Product[]) => sortByPrice(data, "L-H"),
  "H-L": (data: Product[]) => sortByPrice(data, "H-L"),
};

const useSelectSort = (
  data: Product[],
  select: "alphabetic" | "L-H" | "H-L" | "",
) => {
  const sortedSelect = useMemo(() => {
    if (select === "") return data;
    return Strategy[select](data);
  }, [data, select]);

  return sortedSelect;
};

/* By CheckBox Category */
const useCheckBoxFilter = (data: Product[], filter: CombineFilter) => {
  const sortedData = useSelectSort(data, filter.select);

  const sortCheckBox = useMemo(() => {
    if (filter.checkbox.length === 0) {
      return sortedData;
    }
    return sortedData.filter((item) =>
      filter.checkbox.includes(item.categoryId),
    );
  }, [sortedData, filter.checkbox]);

  return sortCheckBox;
};

/* Main Filter */
export const useSelectAndFilterSort = (
  data: Product[] | undefined,
  filter: CombineFilter,
) => {
  const sortedData = useCheckBoxFilter(data ?? [], filter);

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      item.slug.toLocaleLowerCase().includes(filter.search.toLocaleLowerCase()),
    );
  }, [filter.search, sortedData]);

  /* Подсчет для mobile фильтра*/
  const hasActiveFilters =
    Boolean(filter.select) ||
    Boolean(filter.search) ||
    filter.checkbox.length > 0;
  const resultCount = hasActiveFilters ? filteredData.length : 0;

  return { filteredData, resultCount };
};

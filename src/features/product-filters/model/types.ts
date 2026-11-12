export interface CombineFilter {
  select: 'alphabetic' | 'L-H' | 'H-L' | '';
  checkbox: string[];
  minPrice: number | null;
  maxPrice: number | null;
}

export interface SearchFilter {
  pageSearch: string;
}

export type DraftFilter = CombineFilter;

export interface IFilter {
  filter: CombineFilter;
  draft: DraftFilter;
  search: SearchFilter;

  handleSelect: <K extends keyof DraftFilter>(
    key: K,
    value: DraftFilter[K]
  ) => void;
  setSearch: (value: string) => void;
  applyFilter: () => void;
  cancelDraft: () => void;
  removeCategory: (categoryId: string) => void;
  removePriceRange: () => void;
  removeSort: () => void;
  clearAllFilters: () => void;
}

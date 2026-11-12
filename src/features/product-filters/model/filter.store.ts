import { create } from 'zustand';
import type {
  CombineFilter,
  DraftFilter,
  IFilter,
  SearchFilter,
} from './types';

const initialFilter: CombineFilter = {
  select: '',
  checkbox: [],
  minPrice: null,
  maxPrice: null,
};

const initialDraft: DraftFilter = {
  select: '',
  checkbox: [],
  minPrice: null,
  maxPrice: null,
};

const initialSearch: SearchFilter = {
  pageSearch: '',
};

export const useFilter = create<IFilter>()((set) => ({
  search: initialSearch,
  filter: initialFilter,
  draft: initialDraft,

  setSearch: (value: string) =>
    set({
      search: {
        pageSearch: value,
      },
    }),

  handleSelect: <K extends keyof DraftFilter>(key: K, value: DraftFilter[K]) =>
    set((state) => ({
      draft: {
        ...state.draft,
        [key]: value,
      },
    })),

  applyFilter: () =>
    set((state) => ({
      filter: { ...state.draft },
    })),

  cancelDraft: () =>
    set((state) => ({
      draft: { ...state.filter },
    })),

  removeCategory: (categoryId) =>
    set((state) => {
      const remove = (current: CombineFilter): CombineFilter => ({
        ...current,
        checkbox: current.checkbox.filter((id) => id !== categoryId),
      });

      return {
        filter: remove(state.filter),
        draft: remove(state.draft),
      };
    }),

  removePriceRange: () =>
    set((state) => {
      const remove = (current: CombineFilter): CombineFilter => ({
        ...current,
        minPrice: null,
        maxPrice: null,
      });

      return {
        filter: remove(state.filter),
        draft: remove(state.draft),
      };
    }),

  removeSort: () =>
    set((state) => {
      const remove = (current: CombineFilter): CombineFilter => ({
        ...current,
        select: '',
      });

      return {
        filter: remove(state.filter),
        draft: remove(state.draft),
      };
    }),

  clearAllFilters: () =>
    set({
      filter: { ...initialFilter },
      draft: { ...initialDraft },
    }),
}));

import { create } from "zustand";

export interface CombineFilter {
  select: "alphabetic" | "L-H" | "H-L" | "";
  search: string;
  checkbox: string[];
}

interface IFilter {
  filter: CombineFilter;
  handleSelect: (key: string, value: string | string[]) => void;
  resetFilter: () => void;
}

export const useFilter = create<IFilter>()((set) => ({
  filter: { select: "", search: "", checkbox: [] },

  handleSelect: (key, value) =>
    set((state) => ({
      filter: { ...state.filter, [key]: value },
    })),

  resetFilter: () =>
    set({
      filter: {
        select: "",
        search: "",
        checkbox: [],
      },
    }),
}));

import { useEffect, useMemo } from "react";
import { useFilter } from "./filter.store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };
  return debounced;
}

export const useDebounce = () => {
  const handleSelect = useFilter((state) => state.handleSelect);
  const TIMEOUT = 500;

  const debouncedInput = useMemo(() => {
    return debounce(handleSelect, TIMEOUT);
  }, [handleSelect]);

  /* Clearing during unMount */
  useEffect(() => {
    return () => debouncedInput.cancel();
  }, [debouncedInput]);

  return { debouncedInput };
};

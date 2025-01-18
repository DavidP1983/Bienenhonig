import { useFilter } from '@/store';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}



export const useDeboucne = () => {
    const handleSelect = useFilter(state => state.handleSelect)
    const TIMEOUT = 500;

    const debouncedInput = debounce(handleSelect, TIMEOUT);

    return { debouncedInput }
} 
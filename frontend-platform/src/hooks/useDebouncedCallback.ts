import { useCallback, useRef } from "react";

// A custom hook that returns a debounced version of the provided callback function.
export const useDebouncedCallback = (callback: (...args: any[]) => void, delay: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    return useCallback((...args: any[]) => {
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
};
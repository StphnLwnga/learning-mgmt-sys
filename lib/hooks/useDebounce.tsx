import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a value.
 *
 * @param {T} value - the value to be debounced
 * @param {number} delay - the delay in milliseconds
 * @return {T} the debounced value
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
import { useEffect, useState } from "react";

// Debounces a fast-changing value (e.g. search input) so dependent effects
// (like API calls) only fire after the value has settled.
export const useDebounce = (value, delayMs = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
};

export default useDebounce;

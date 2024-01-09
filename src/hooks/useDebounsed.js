import { useEffect, useState } from "react";

export const useDebounsed = (value, delay) => {
  const [useDebounsedValue, setUseDebounsedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setUseDebounsedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return useDebounsedValue;
};

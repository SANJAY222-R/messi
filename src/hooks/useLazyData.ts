"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface LazyDataResult<T> {
  data: T | null;
  loading: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

export function useLazyData<T>(filePath: string): LazyDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFetched.current) {
            hasFetched.current = true;
            fetch(filePath)
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`Failed to fetch: ${filePath}`);
                }
                return res.json();
              })
              .then((jsonData) => {
                setData(jsonData);
                setLoading(false);
              })
              .catch((err) => {
                console.error(`Error loading lazy data from ${filePath}:`, err);
                setLoading(false);
              });
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" } // Preload when the section is within 200px of the viewport
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [filePath]);

  return { data, loading, ref };
}

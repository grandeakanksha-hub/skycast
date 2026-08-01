import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'weather-search-history';
const MAX_HISTORY = 5;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const addCity = useCallback((city: string) => {
    setHistory((prev) => {
      const trimmed = city.trim();
      if (!trimmed) return prev;
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== trimmed.toLowerCase(),
      );
      const next = [trimmed, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addCity, clearHistory };
}

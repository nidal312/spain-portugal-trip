import { useCallback, useEffect, useState } from "react";

const PREFIX = "spain-portugal-trip:";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/** useState that persists to localStorage and stays in sync across tabs. */
export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => read(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable (private mode, quota); the in-memory state still works.
    }
  }, [key, value]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === PREFIX + key) setValue(read(key, fallback));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, fallback]);

  const reset = useCallback(() => setValue(fallback), [fallback]);

  return [value, setValue, reset] as const;
}

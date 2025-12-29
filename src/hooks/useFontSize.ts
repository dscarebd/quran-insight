import { useState, useEffect, useCallback } from "react";

const FONT_SIZE_KEY = "quran-insight-font-size";
const DEFAULT_FONT_SIZE = 17;

export const useFontSize = () => {
  const [fontSize, setFontSizeState] = useState<number>(() => {
    const stored = localStorage.getItem(FONT_SIZE_KEY);
    return stored ? parseInt(stored, 10) : DEFAULT_FONT_SIZE;
  });

  const setFontSize = useCallback((newSize: number) => {
    setFontSizeState(newSize);
    localStorage.setItem(FONT_SIZE_KEY, newSize.toString());
    document.documentElement.style.setProperty("--base-font-size", `${newSize}px`);
    // Dispatch custom event for cross-component sync
    window.dispatchEvent(new CustomEvent("font-size-changed", { detail: newSize }));
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--base-font-size", `${fontSize}px`);
  }, [fontSize]);

  // Listen for font size changes from other components
  useEffect(() => {
    const handleFontSizeChange = (e: CustomEvent<number>) => {
      setFontSizeState(e.detail);
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FONT_SIZE_KEY && e.newValue) {
        setFontSizeState(parseInt(e.newValue, 10));
      }
    };

    window.addEventListener("font-size-changed", handleFontSizeChange as EventListener);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("font-size-changed", handleFontSizeChange as EventListener);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { fontSize, setFontSize };
};

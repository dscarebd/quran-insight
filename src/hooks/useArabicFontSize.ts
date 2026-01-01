import { useState, useEffect } from "react";

const ARABIC_FONT_SIZE_KEY = "quran-arabic-font-size";
const DEFAULT_ARABIC_FONT_SIZE = 32;
const MIN_ARABIC_FONT_SIZE = 24;
const MAX_ARABIC_FONT_SIZE = 48;

export const useArabicFontSize = () => {
  const [arabicFontSize, setArabicFontSizeState] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_ARABIC_FONT_SIZE;
    const stored = localStorage.getItem(ARABIC_FONT_SIZE_KEY);
    return stored ? parseInt(stored, 10) : DEFAULT_ARABIC_FONT_SIZE;
  });

  const setArabicFontSize = (newSize: number) => {
    const clampedSize = Math.min(MAX_ARABIC_FONT_SIZE, Math.max(MIN_ARABIC_FONT_SIZE, newSize));
    setArabicFontSizeState(clampedSize);
    localStorage.setItem(ARABIC_FONT_SIZE_KEY, clampedSize.toString());
    document.documentElement.style.setProperty("--arabic-font-size", `${clampedSize}px`);
    // Dispatch custom event for cross-component sync
    window.dispatchEvent(new CustomEvent("arabic-font-size-changed", { detail: clampedSize }));
  };

  // Initialize CSS variable on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--arabic-font-size", `${arabicFontSize}px`);
  }, [arabicFontSize]);

  // Listen for font size changes from other components
  useEffect(() => {
    const handleFontSizeChange = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setArabicFontSizeState(customEvent.detail);
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ARABIC_FONT_SIZE_KEY && e.newValue) {
        setArabicFontSizeState(parseInt(e.newValue, 10));
      }
    };

    window.addEventListener("arabic-font-size-changed", handleFontSizeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("arabic-font-size-changed", handleFontSizeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { 
    arabicFontSize, 
    setArabicFontSize,
    minArabicFontSize: MIN_ARABIC_FONT_SIZE,
    maxArabicFontSize: MAX_ARABIC_FONT_SIZE,
  };
};

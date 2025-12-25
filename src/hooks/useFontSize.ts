import { useState, useEffect } from "react";

const FONT_SIZE_KEY = "quran-insight-font-size";
const DEFAULT_FONT_SIZE = 16;

export const useFontSize = () => {
  const [fontSize, setFontSize] = useState<number>(() => {
    const stored = localStorage.getItem(FONT_SIZE_KEY);
    return stored ? parseInt(stored, 10) : DEFAULT_FONT_SIZE;
  });

  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
    document.documentElement.style.setProperty("--base-font-size", `${fontSize}px`);
  }, [fontSize]);

  // Initialize on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--base-font-size", `${fontSize}px`);
  }, []);

  return { fontSize, setFontSize };
};

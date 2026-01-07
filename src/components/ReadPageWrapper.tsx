import { useState, useCallback, useEffect } from "react";
import { Layout } from "@/components/Layout";
import ReadPage from "@/pages/ReadPage";
import { Language } from "@/types/language";
import { ArabicFontType } from "@/types/quranV1";

// Font size presets (must match ReadPage)
const FONT_SIZES = [24, 28, 32, 36, 40, 44, 48, 52];
const DEFAULT_FONT_INDEX = 2;

interface ReadPageWrapperProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  readingMode: "normal" | "sepia";
  arabicFont: ArabicFontType;
  onArabicFontChange: (font: ArabicFontType) => void;
}

export const ReadPageWrapper = ({
  language,
  onLanguageChange,
  readingMode,
  arabicFont,
  onArabicFontChange,
}: ReadPageWrapperProps) => {
  // Lift zoom state here so we can pass to both Layout (header) and ReadPage
  const [fontSizeIndex, setFontSizeIndex] = useState(() => {
    const saved = localStorage.getItem("quran-font-size-index");
    return saved ? parseInt(saved) : DEFAULT_FONT_INDEX;
  });

  // Save font size preference
  useEffect(() => {
    localStorage.setItem("quran-font-size-index", fontSizeIndex.toString());
  }, [fontSizeIndex]);

  const zoomIn = useCallback(() => {
    if (fontSizeIndex < FONT_SIZES.length - 1) {
      setFontSizeIndex((prev) => prev + 1);
    }
  }, [fontSizeIndex]);

  const zoomOut = useCallback(() => {
    if (fontSizeIndex > 0) {
      setFontSizeIndex((prev) => prev - 1);
    }
  }, [fontSizeIndex]);

  const canZoomIn = fontSizeIndex < FONT_SIZES.length - 1;
  const canZoomOut = fontSizeIndex > 0;

  return (
    <Layout
      language={language}
      onLanguageChange={onLanguageChange}
      arabicFont={arabicFont}
      onArabicFontChange={onArabicFontChange}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
      canZoomIn={canZoomIn}
      canZoomOut={canZoomOut}
    >
      <ReadPage
        language={language}
        readingMode={readingMode}
        arabicFont={arabicFont}
        onArabicFontChange={onArabicFontChange}
        fontSizeIndex={fontSizeIndex}
        onFontSizeIndexChange={setFontSizeIndex}
      />
    </Layout>
  );
};

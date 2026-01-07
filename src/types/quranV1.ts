// Types for QPC V1 (King Fahad Complex Version 1) font system

export interface V1VerseData {
  surahNumber: number;
  verseNumber: number;
  pageNumber: number;
  textV1: string; // Glyph-based text for V1 font
}

export interface V1PageData {
  pageNumber: number;
  verses: V1VerseData[];
}

// Arabic font options including V1
export type ArabicFontType = "amiri" | "uthmani" | "v1";

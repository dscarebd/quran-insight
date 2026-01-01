import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language } from "@/types/language";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitize Arabic text by removing Quranic annotation marks that may render as black dots
 * on devices/fonts that don't support those glyphs.
 * 
 * Removes: end-of-ayah markers, Rub el Hizb, stop signs, extended Arabic annotations,
 * and other ornamental characters that cause rendering issues.
 */
export function sanitizeArabicText(text: string | null | undefined): string {
  if (!text) return "";
  return text
    // End-of-ayah marker (۝) with its number
    .replace(/\u06DD[\u0660-\u0669\u06F0-\u06F9]+/g, "")
    // Rub el Hizb (۞) and Quranic annotation marks (U+06D6-U+06ED)
    .replace(/[\u06D6-\u06ED]/g, "")
    // Arabic Extended-A Quranic marks (U+08D4-U+08FF)
    .replace(/[\u08D4-\u08FF]/g, "")
    // Common Arabic presentation forms that may break (honorifics, ligatures)
    .replace(/[\uFDFA-\uFDFF]/g, "") // ﷺ etc
    .replace(/[\uFE70-\uFEFF]/g, (match) => {
      // Keep standard Arabic presentation forms, remove decorative ones
      return match;
    })
    // Normalize multiple spaces
    .replace(/\s+/g, " ")
    .trim();
}

// Convert English numbers to Bengali numerals
const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toBengaliNumber(num: number | string): string {
  return num.toString().split('').map(digit => {
    const d = parseInt(digit);
    return isNaN(d) ? digit : bengaliDigits[d];
  }).join('');
}

export function toHindiNumber(num: number | string): string {
  return num.toString().split('').map(digit => {
    const d = parseInt(digit);
    return isNaN(d) ? digit : hindiDigits[d];
  }).join('');
}

// Helper to display number based on language
export function formatNumber(num: number | string, language: Language): string {
  if (language === "bn") return toBengaliNumber(num);
  if (language === "hi") return toHindiNumber(num);
  return num.toString();
}

// Get font class based on language
export function getFontClass(language: Language): string {
  if (language === "bn") return "font-bengali";
  if (language === "hi") return "font-hindi";
  return "";
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language } from "@/types/language";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitize Arabic text by removing Quranic annotation marks that may render as black dots
 * on devices/fonts that don't support those glyphs.
 */
const _arabicSanitizeLogged = new Set<string>();

export function sanitizeArabicText(text: string | null | undefined): string {
  if (!text) return "";

  // Normalize Arabic presentation forms into canonical characters when possible
  const normalized = typeof (text as any).normalize === "function" ? text.normalize("NFKC") : text;

  const sanitized = normalized
    // End-of-ayah marker (۝) with its number
    .replace(/\u06DD[\u0660-\u0669\u06F0-\u06F9]+/g, "")
    // Quranic annotation marks (stop signs, rub el hizb, etc.)
    .replace(/[\u06D6-\u06ED]/g, "")
    // Arabic Extended-A Quranic marks
    .replace(/[\u08D4-\u08FF]/g, "")
    // Directional marks that sometimes sneak into Arabic text
    .replace(/[\u200E\u200F\u061C\u202A-\u202E]/g, "")
    // Decorative Quran brackets/symbols (presentation forms)
    .replace(/[\uFD3E\uFD3F\uFDFD]/g, "")
    // If any presentation forms remain, drop them (better than missing-glyph dots)
    .replace(/[\uFB50-\uFDFF\uFE70-\uFEFF]/g, "")
    // Normalize spaces
    .replace(/\s+/g, " ")
    .trim();

  // Debug: log which codepoints were present (DEV only) so we can identify stubborn glyphs
  if (import.meta.env.DEV) {
    const key = sanitized.slice(0, 140);
    if (key && !_arabicSanitizeLogged.has(key)) {
      const suspects: string[] = [];
      for (const ch of normalized) {
        const cp = ch.codePointAt(0) ?? 0;
        const inProblemRange =
          (cp >= 0x06d6 && cp <= 0x06ed) ||
          (cp >= 0x08d4 && cp <= 0x08ff) ||
          (cp >= 0xfb50 && cp <= 0xfdff) ||
          (cp >= 0xfe70 && cp <= 0xfeff) ||
          cp === 0xfdfd ||
          cp === 0xfd3e ||
          cp === 0xfd3f;
        if (inProblemRange) suspects.push(`U+${cp.toString(16).toUpperCase()}(${ch})`);
      }
      if (suspects.length > 0) {
        _arabicSanitizeLogged.add(key);
        console.log("[sanitizeArabicText] found Quranic/presentation marks:", suspects);
      }
    }
  }

  return sanitized;
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

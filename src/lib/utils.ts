import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language } from "@/types/language";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

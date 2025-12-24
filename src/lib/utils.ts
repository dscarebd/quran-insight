import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert English numbers to Bengali numerals
const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  return num.toString().split('').map(digit => {
    const d = parseInt(digit);
    return isNaN(d) ? digit : bengaliDigits[d];
  }).join('');
}

// Helper to display number based on language
export function formatNumber(num: number | string, language: "bn" | "en"): string {
  return language === "bn" ? toBengaliNumber(num) : num.toString();
}

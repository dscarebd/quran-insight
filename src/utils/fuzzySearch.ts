import { Surah } from "@/data/surahs";

// Common transliteration mappings for Arabic/Bengali names
const transliterationMap: Record<string, string> = {
  "ph": "f",
  "aa": "a",
  "ee": "i",
  "ii": "i",
  "oo": "u",
  "uu": "u",
  "gh": "g",
  "kh": "k",
  "sh": "s",
  "th": "t",
  "dh": "d",
  "zh": "z",
  "'": "",
  "-": "",
  // Additional phonetic variations for better matching
  "oh": "a",    // rohman → rahman
  "o": "a",     // common Bengali/South Asian transliteration
  "aw": "a",    // awl → al
  "ay": "a",    // ayman → aman
  "ei": "i",    // yasein → yasin
  "ea": "i",    // readi → radi
  "ou": "u",    // sourah → surah
  "q": "k",     // qalam → kalam
  "x": "kh",    // for some transliterations
};

// Bengali phonetic variations mapping
const bengaliVariations: Record<string, string[]> = {
  'ি': ['ী', 'ে'],
  'ু': ['ূ', 'ো'],
  'া': ['অ', 'আ'],
  'ে': ['ি', 'ী'],
  'ো': ['ু', 'ূ'],
};

/**
 * Normalize text for fuzzy matching
 * Removes diacritics, converts to lowercase, and applies transliteration
 */
export function normalizeText(text: string): string {
  if (!text) return '';

  let normalized = text.toLowerCase().trim();

  // Remove common prefixes for Arabic names
  normalized = normalized.replace(/^(al-|as-|ar-|an-|at-|ad-)/i, '');

  // Apply transliteration mappings
  for (const [from, to] of Object.entries(transliterationMap)) {
    normalized = normalized.replace(new RegExp(from, 'gi'), to);
  }

  // Remove diacritics from Latin/Bengali text
  normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Remove Arabic diacritics (tashkeel)
  normalized = normalized.replace(/[\u064B-\u0652]/g, '');

  // Drop punctuation/symbol noise but keep letters/numbers/spaces (works for Latin/Arabic/Bengali)
  normalized = normalized.replace(/[^\p{L}\p{N}\s]/gu, ' ');

  // Normalize whitespace
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  // Create distance matrix
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  // Fill in the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,     // deletion
        dp[i][j - 1] + 1,     // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  return dp[m][n];
}

/**
 * Generate n-grams from a string
 */
export function generateNgrams(text: string, n: number = 2): Set<string> {
  const ngrams = new Set<string>();
  const normalized = normalizeText(text).replace(/\s+/g, "");

  for (let i = 0; i <= normalized.length - n; i++) {
    ngrams.add(normalized.substring(i, i + n));
  }

  return ngrams;
}

/**
 * Calculate n-gram similarity between two strings (Jaccard coefficient)
 */
export function ngramSimilarity(text1: string, text2: string, n: number = 2): number {
  const ngrams1 = generateNgrams(text1, n);
  const ngrams2 = generateNgrams(text2, n);
  
  if (ngrams1.size === 0 || ngrams2.size === 0) return 0;
  
  let intersection = 0;
  ngrams1.forEach(gram => {
    if (ngrams2.has(gram)) intersection++;
  });
  
  const union = ngrams1.size + ngrams2.size - intersection;
  return intersection / union;
}

/**
 * Calculate fuzzy match score for a field against a query
 * Returns a score between 0-100
 */
export function calculateFieldScore(field: string, query: string): number {
  if (!field || !query) return 0;

  const normalizedField = normalizeText(field);
  const normalizedQuery = normalizeText(query);

  const compactField = normalizedField.replace(/\s+/g, "");
  const compactQuery = normalizedQuery.replace(/\s+/g, "");

  if (!compactField || !compactQuery) return 0;

  // Exact match (ignoring whitespace/punctuation)
  if (compactField === compactQuery) return 100;

  // Starts with query
  if (compactField.startsWith(compactQuery)) return 85;

  // Contains query
  if (compactField.includes(compactQuery)) return 70;

  // Check if query starts with field (for shorter queries like "yas" for "yaseen")
  if (compactQuery.length >= 2 && compactField.startsWith(compactQuery.substring(0, 2))) {
    const distance = levenshteinDistance(compactField.substring(0, compactQuery.length), compactQuery);
    if (distance <= 2) return 60;
  }

  // Levenshtein distance check (for typos)
  const maxLen = Math.max(compactField.length, compactQuery.length);
  if (maxLen === 0) return 0;

  const distance = levenshteinDistance(compactField, compactQuery);
  const similarityRatio = 1 - (distance / maxLen);

  // Allow up to 2-3 character differences depending on length
  const allowedDistance = Math.min(3, Math.floor(compactQuery.length / 2) + 1);
  if (distance <= allowedDistance) {
    return Math.round(50 + (similarityRatio * 30));
  }

  // N-gram similarity (spaces ignored inside generateNgrams)
  const similarity = ngramSimilarity(field, query);
  if (similarity >= 0.4) {
    return Math.round(similarity * 50);
  }

  // Word tokenization - check if any word matches (works now that normalizeText preserves spaces)
  const fieldWords = normalizedField.split(/\s+/);
  const queryWords = normalizedQuery.split(/\s+/);

  for (const qWord of queryWords) {
    if (qWord.length < 2) continue;
    for (const fWord of fieldWords) {
      if (fWord.includes(qWord) || qWord.includes(fWord)) {
        return 30;
      }
      const wordDistance = levenshteinDistance(fWord, qWord);
      if (wordDistance <= 1) return 25;
    }
  }

  return 0;
}

/**
 * Calculate fuzzy match score for a Surah against a search query
 */
export function fuzzyMatchSurah(surah: Surah, query: string): number {
  if (!query || query.trim().length === 0) return 100;
  
  const normalizedQuery = query.trim();
  
  // Check if query is a number (surah number)
  const numberMatch = normalizedQuery.match(/^\d+$/);
  if (numberMatch && surah.number === parseInt(normalizedQuery)) {
    return 100;
  }
  
  // Calculate scores for each searchable field
  const scores = [
    calculateFieldScore(surah.nameEnglish, normalizedQuery),
    calculateFieldScore(surah.nameBengali, normalizedQuery),
    calculateFieldScore(surah.nameArabic, normalizedQuery),
    calculateFieldScore(surah.meaningEnglish, normalizedQuery),
    calculateFieldScore(surah.meaningBengali, normalizedQuery),
  ];
  
  // Return the highest score
  return Math.max(...scores);
}

/**
 * Get closest Surah matches even below threshold (for "Did you mean..." suggestions)
 */
export function getClosestSurahMatches(
  surahs: Surah[],
  query: string,
  maxResults: number = 3
): Array<{ surah: Surah; score: number }> {
  if (!query || query.trim().length < 2) return [];

  return surahs
    .map((surah) => ({ surah, score: fuzzyMatchSurah(surah, query) }))
    .filter(({ score }) => score > 0) // Any positive match
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Filter and sort surahs based on fuzzy search
 */
export function fuzzySearchSurahs(surahs: Surah[], query: string, minScore: number = 20): Surah[] {
  if (!query || query.trim().length === 0) {
    return surahs;
  }
  
  return surahs
    .map(surah => ({ surah, score: fuzzyMatchSurah(surah, query) }))
    .filter(({ score }) => score >= minScore)
    .sort((a, b) => b.score - a.score)
    .map(({ surah }) => surah);
}

// For Para search
export interface Para {
  number: number;
  nameEnglish: string;
  nameBengali: string;
  nameArabic: string;
  startSurah: number;
  endSurah: number;
  startVerse: number;
  endVerse: number;
}

/**
 * Calculate fuzzy match score for a Para against a search query
 */
export function fuzzyMatchPara(para: Para, query: string): number {
  if (!query || query.trim().length === 0) return 100;
  
  const normalizedQuery = query.trim();
  
  // Check if query is a number (para number)
  const numberMatch = normalizedQuery.match(/^\d+$/);
  if (numberMatch && para.number === parseInt(normalizedQuery)) {
    return 100;
  }
  
  // Calculate scores for each searchable field
  const scores = [
    calculateFieldScore(para.nameEnglish, normalizedQuery),
    calculateFieldScore(para.nameBengali, normalizedQuery),
    calculateFieldScore(para.nameArabic, normalizedQuery),
  ];
  
  return Math.max(...scores);
}

/**
 * Filter and sort paras based on fuzzy search
 */
export function fuzzySearchParas(paras: Para[], query: string, minScore: number = 20): Para[] {
  if (!query || query.trim().length === 0) {
    return paras;
  }
  
  return paras
    .map(para => ({ para, score: fuzzyMatchPara(para, query) }))
    .filter(({ score }) => score >= minScore)
    .sort((a, b) => b.score - a.score)
    .map(({ para }) => para);
}

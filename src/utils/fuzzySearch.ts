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
  "oh": "a",
  "o": "a",
  "aw": "a",
  "ay": "a",
  "ei": "i",
  "ea": "i",
  "ou": "u",
  "q": "k",
  "x": "kh",
  "iy": "i",
  "y": "i",
};

// Comprehensive aliases for all 114 Surahs (common spellings, short forms, meanings)
const surahAliases: Record<number, string[]> = {
  1: ["fatiha", "fatihah", "fateha", "opening", "opener", "hamd"],
  2: ["baqara", "baqarah", "bakara", "bakra", "cow", "baqra"],
  3: ["imran", "imraan", "emran", "family", "ale"],
  4: ["nisa", "nisaa", "nesa", "women"],
  5: ["maida", "maidah", "maeda", "table", "feast"],
  6: ["anam", "anaam", "cattle", "livestock"],
  7: ["araf", "aaraf", "heights", "elevated"],
  8: ["anfal", "anfaal", "spoils", "booty"],
  9: ["tawba", "tawbah", "tauba", "toba", "repentance", "bara", "baraat"],
  10: ["yunus", "yoonus", "younus", "jonas", "jonah"],
  11: ["hud", "hood", "houd"],
  12: ["yusuf", "yousuf", "yousaf", "yousof", "joseph", "yoosuf"],
  13: ["raad", "rad", "thunder"],
  14: ["ibrahim", "ibraheem", "abraham", "ebrahim"],
  15: ["hijr", "hejr", "rocky", "stoneland"],
  16: ["nahl", "nahal", "bee", "bees"],
  17: ["isra", "israa", "bani", "isreal", "journey", "night"],
  18: ["kahf", "kahaf", "kaf", "kahef", "cave"],
  19: ["maryam", "mariam", "mariyam", "mary", "marym"],
  20: ["taha", "ta-ha", "taaha"],
  21: ["anbiya", "anbiyaa", "prophets", "ambia"],
  22: ["hajj", "haj", "pilgrimage"],
  23: ["muminun", "muminoon", "momenun", "believers", "mumineen"],
  24: ["nur", "noor", "nour", "light"],
  25: ["furqan", "furkan", "forqan", "criterion"],
  26: ["shuara", "shuaraa", "shuaara", "poets"],
  27: ["naml", "namal", "ant", "ants"],
  28: ["qasas", "kasas", "story", "stories", "narration"],
  29: ["ankabut", "ankabout", "ankaboot", "spider"],
  30: ["rum", "room", "rome", "romans", "byzantines"],
  31: ["luqman", "lokman", "lukman"],
  32: ["sajda", "sajdah", "sajdeh", "prostration"],
  33: ["ahzab", "ahzaab", "confederates", "allies", "parties"],
  34: ["saba", "sabaa", "sheba"],
  35: ["fatir", "faatir", "originator", "creator", "angels"],
  36: ["yasin", "yaseen", "yasen", "yaasin", "ysin", "sin", "yas"],
  37: ["saffat", "saaffaat", "safat", "ranks"],
  38: ["sad", "saad", "suad"],
  39: ["zumar", "zumr", "groups", "troops", "crowds"],
  40: ["ghafir", "gaafir", "forgiver", "mumin", "momin", "believer"],
  41: ["fussilat", "fusilat", "fusselat", "detailed", "hamim"],
  42: ["shura", "shoora", "shuraa", "consultation", "counsel"],
  43: ["zukhruf", "zukruf", "gold", "ornaments", "luxury"],
  44: ["dukhan", "dokhan", "dukan", "smoke"],
  45: ["jathiya", "jathiyah", "jasiyah", "kneeling", "crouching"],
  46: ["ahqaf", "ahkaf", "sandhills", "dunes", "windings"],
  47: ["muhammad", "mohammad", "muhammed", "mohamed"],
  48: ["fath", "fatah", "victory", "conquest"],
  49: ["hujurat", "hujrat", "hujuraat", "rooms", "chambers", "apartments"],
  50: ["qaf", "kaaf", "kaf"],
  51: ["dhariyat", "zariyat", "zaariyaat", "scattering", "winds"],
  52: ["tur", "toor", "tour", "mount", "mountain"],
  53: ["najm", "najem", "star"],
  54: ["qamar", "kamar", "moon"],
  55: ["rahman", "rahmaan", "rohman", "gracious", "merciful", "rehman"],
  56: ["waqia", "waqiah", "wakia", "waqi'a", "event", "inevitable"],
  57: ["hadid", "hadeed", "hadith", "iron"],
  58: ["mujadila", "mujadilah", "mujadalah", "pleading", "woman", "dispute"],
  59: ["hashr", "hashar", "gathering", "exile", "banishment"],
  60: ["mumtahina", "mumtahana", "mumtahinah", "examined", "woman", "test"],
  61: ["saff", "saf", "ranks", "row", "battle"],
  62: ["jumua", "jumuah", "juma", "friday", "congregation"],
  63: ["munafiqun", "munafiqoon", "munafiqeen", "hypocrites"],
  64: ["taghabun", "tagabun", "loss", "gain", "deprivation"],
  65: ["talaq", "talaaq", "divorce"],
  66: ["tahrim", "tahreem", "prohibition", "forbidding"],
  67: ["mulk", "molk", "malik", "sovereignty", "kingdom", "dominion"],
  68: ["qalam", "kalam", "pen"],
  69: ["haqqa", "haqqah", "haka", "reality", "inevitable"],
  70: ["maarij", "ma'arij", "maaarij", "ascending", "stairways"],
  71: ["nuh", "nooh", "noah"],
  72: ["jinn", "jin", "djinn", "genie"],
  73: ["muzzammil", "muzammil", "muzamil", "wrapped", "enshrouded"],
  74: ["muddaththir", "muddassir", "mudassir", "cloaked", "covered"],
  75: ["qiyama", "qiyamah", "kiama", "resurrection", "rising"],
  76: ["insan", "insaan", "dahr", "man", "human", "time"],
  77: ["mursalat", "mursalaat", "messengers", "winds", "sent"],
  78: ["naba", "nabaa", "news", "announcement", "tidings", "amma"],
  79: ["naziat", "naaziat", "nazi'at", "extractors", "angels"],
  80: ["abasa", "abas", "frowned"],
  81: ["takwir", "takweer", "folding", "wrapping", "shrouding"],
  82: ["infitar", "infitaar", "cleaving", "splitting"],
  83: ["mutaffifin", "mutaffifeen", "tatfif", "defrauding", "cheaters"],
  84: ["inshiqaq", "inshikak", "sundering", "splitting"],
  85: ["buruj", "burooj", "constellations", "mansions", "zodiac"],
  86: ["tariq", "tarik", "tarek", "night", "star", "visitor"],
  87: ["ala", "a'la", "aala", "highest", "most"],
  88: ["ghashiya", "ghashiyah", "gashiya", "overwhelming"],
  89: ["fajr", "fajar", "dawn", "daybreak"],
  90: ["balad", "baled", "city", "town"],
  91: ["shams", "sams", "sun"],
  92: ["layl", "lail", "layl", "night"],
  93: ["duha", "doha", "zuha", "forenoon", "morning"],
  94: ["sharh", "insyrah", "inshirah", "relief", "expansion"],
  95: ["tin", "teen", "fig", "figs"],
  96: ["alaq", "alak", "clot", "clinging", "iqra", "read"],
  97: ["qadr", "kadr", "qadar", "power", "destiny", "decree", "laylat"],
  98: ["bayyina", "bayyinah", "bayina", "evidence", "clear", "proof"],
  99: ["zalzala", "zilzal", "zalzalah", "earthquake", "quake"],
  100: ["adiyat", "aadiyat", "adiat", "chargers", "coursers", "runners"],
  101: ["qaria", "qariah", "karia", "calamity", "striking"],
  102: ["takathur", "takaathur", "takasur", "rivalry", "competition", "piling"],
  103: ["asr", "asar", "time", "declining", "epoch", "afternoon"],
  104: ["humaza", "humazah", "homaza", "slanderer", "gossip"],
  105: ["fil", "feel", "elephant"],
  106: ["quraysh", "quraish", "koraish", "kuraish", "qureysh"],
  107: ["maun", "ma'un", "maaun", "assistance", "charity", "alms"],
  108: ["kawthar", "kausar", "kauthar", "kawser", "abundance"],
  109: ["kafirun", "kafiroon", "kafireen", "disbelievers", "rejecters"],
  110: ["nasr", "nashr", "victory", "help", "divine"],
  111: ["masad", "masadd", "lahab", "flame", "fiber", "palm"],
  112: ["ikhlas", "ikhlaas", "ekhlas", "sincerity", "purity", "unity"],
  113: ["falaq", "falak", "daybreak", "dawn", "splitting"],
  114: ["nas", "naas", "people", "mankind", "humanity"],
};

/**
 * Simple soundex function - removes vowels and keeps consonant skeleton
 */
function simpleSoundex(str: string): string {
  return normalizeText(str)
    .replace(/[aeiou]/g, '')
    .substring(0, 5);
}

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
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
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

  // Contains query (e.g., "kaf" in "kahf")
  if (compactField.includes(compactQuery)) return 70;
  
  // Query contains field (for very short fields)
  if (compactQuery.includes(compactField) && compactField.length >= 2) return 65;

  // Substring distance check - for approximate substring matches
  if (compactQuery.length >= 2 && compactQuery.length <= compactField.length + 1) {
    for (let i = 0; i <= compactField.length - compactQuery.length + 1; i++) {
      const substr = compactField.substring(i, i + compactQuery.length);
      const dist = levenshteinDistance(substr, compactQuery);
      if (dist <= 1) return 55;
    }
  }

  // Check if query starts with field (for shorter queries like "yas" for "yaseen")
  if (compactQuery.length >= 2 && compactField.startsWith(compactQuery.substring(0, 2))) {
    const distance = levenshteinDistance(compactField.substring(0, compactQuery.length), compactQuery);
    if (distance <= 2) return 50;
  }
  
  // Check if field starts with query prefix (for partial typing)
  if (compactField.length >= 2 && compactQuery.length >= 2) {
    const minLen = Math.min(compactField.length, compactQuery.length);
    const fieldPrefix = compactField.substring(0, minLen);
    const queryPrefix = compactQuery.substring(0, minLen);
    const prefixDistance = levenshteinDistance(fieldPrefix, queryPrefix);
    if (prefixDistance <= 1) return 45;
  }

  // Levenshtein distance check (for typos)
  const maxLen = Math.max(compactField.length, compactQuery.length);
  if (maxLen === 0) return 0;

  const distance = levenshteinDistance(compactField, compactQuery);
  const similarityRatio = 1 - (distance / maxLen);

  // Allow up to 2-3 character differences depending on length
  const allowedDistance = Math.min(3, Math.floor(compactQuery.length / 2) + 1);
  if (distance <= allowedDistance) {
    return Math.round(40 + (similarityRatio * 30));
  }

  // N-gram similarity (lowered threshold for short queries)
  const similarity = ngramSimilarity(field, query);
  const ngramThreshold = compactQuery.length <= 3 ? 0.2 : 0.35;
  if (similarity >= ngramThreshold) {
    return Math.round(similarity * 45);
  }

  // Word tokenization - check if any word matches
  const fieldWords = normalizedField.split(/\s+/);
  const queryWords = normalizedQuery.split(/\s+/);

  for (const qWord of queryWords) {
    if (qWord.length < 2) continue;
    for (const fWord of fieldWords) {
      if (fWord.includes(qWord) || qWord.includes(fWord)) {
        return 25;
      }
      const wordDistance = levenshteinDistance(fWord, qWord);
      if (wordDistance <= 1) return 20;
      if (qWord.length <= 4 && wordDistance <= 2) return 15;
    }
  }

  return 0;
}

/**
 * Check if query matches any alias for a surah
 */
function matchAlias(surahNumber: number, query: string): number {
  const aliases = surahAliases[surahNumber];
  if (!aliases) return 0;
  
  const q = normalizeText(query);
  
  for (const alias of aliases) {
    // Exact alias match
    if (alias === q) return 80;
    
    // Alias starts with query
    if (alias.startsWith(q)) return 70;
    
    // Query starts with alias
    if (q.startsWith(alias)) return 65;
    
    // Alias contains query
    if (alias.includes(q)) return 60;
    
    // Query contains alias
    if (q.includes(alias)) return 55;
    
    // Close Levenshtein match
    const dist = levenshteinDistance(alias, q);
    if (dist <= 1) return 50;
    if (dist <= 2 && q.length >= 3) return 40;
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
  const fieldScores = [
    calculateFieldScore(surah.nameEnglish, normalizedQuery),
    calculateFieldScore(surah.nameBengali, normalizedQuery),
    calculateFieldScore(surah.nameArabic, normalizedQuery),
    calculateFieldScore(surah.meaningEnglish, normalizedQuery),
    calculateFieldScore(surah.meaningBengali, normalizedQuery),
  ];
  
  // Check alias match
  const aliasScore = matchAlias(surah.number, normalizedQuery);
  
  // Return the highest score
  return Math.max(...fieldScores, aliasScore);
}

/**
 * Get closest Surah matches with 4-layer fallback system
 * Guarantees results for any reasonable query
 */
export function getClosestSurahMatches(
  surahs: Surah[],
  query: string,
  maxResults: number = 3
): Array<{ surah: Surah; score: number }> {
  if (!query || query.trim().length < 2) return [];

  const q = normalizeText(query);
  
  // Layer 1: Normal fuzzy scoring (includes alias matching)
  let results = surahs
    .map((surah) => ({ surah, score: fuzzyMatchSurah(surah, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
    
  if (results.length > 0) {
    return results.slice(0, maxResults);
  }
  
  // Layer 2: Soundex matching (phonetic similarity)
  const qSoundex = simpleSoundex(query);
  results = surahs
    .map((surah) => {
      const nameSoundex = simpleSoundex(surah.nameEnglish);
      const dist = levenshteinDistance(nameSoundex, qSoundex);
      // Check aliases too
      let aliasMatch = 0;
      const aliases = surahAliases[surah.number];
      if (aliases) {
        for (const alias of aliases) {
          const aliasSoundex = simpleSoundex(alias);
          const aliasDist = levenshteinDistance(aliasSoundex, qSoundex);
          if (aliasDist < dist) {
            aliasMatch = Math.max(aliasMatch, 25 - aliasDist * 5);
          }
        }
      }
      const score = dist <= 2 ? Math.max(25 - dist * 5, aliasMatch) : aliasMatch;
      return { surah, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
    
  if (results.length > 0) {
    return results.slice(0, maxResults);
  }
  
  // Layer 3: Character overlap (any common characters)
  results = surahs
    .map((surah) => {
      const name = normalizeText(surah.nameEnglish);
      const meaning = normalizeText(surah.meaningEnglish);
      const combined = name + meaning;
      
      let overlap = 0;
      let consecutiveMatch = 0;
      let maxConsecutive = 0;
      
      for (let i = 0; i < q.length; i++) {
        if (combined.includes(q[i])) {
          overlap++;
          consecutiveMatch++;
          maxConsecutive = Math.max(maxConsecutive, consecutiveMatch);
        } else {
          consecutiveMatch = 0;
        }
      }
      
      // Bonus for consecutive character matches
      const baseScore = (overlap / q.length) * 10;
      const consecutiveBonus = maxConsecutive >= 2 ? maxConsecutive * 2 : 0;
      
      return { surah, score: baseScore + consecutiveBonus };
    })
    .filter(({ score }) => score >= 5)
    .sort((a, b) => b.score - a.score);
    
  if (results.length > 0) {
    return results.slice(0, maxResults);
  }
  
  // Layer 4: Last resort - return closest by any metric
  // Find surahs where at least 50% of query characters exist in name
  return surahs
    .map((surah) => {
      const name = normalizeText(surah.nameEnglish + surah.meaningEnglish);
      let matches = 0;
      for (const char of q) {
        if (name.includes(char)) matches++;
      }
      return { surah, score: matches >= q.length * 0.5 ? matches : 0 };
    })
    .filter(({ score }) => score > 0)
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

// Para aliases for common searches
const paraAliases: Record<number, string[]> = {
  1: ["alif", "lam", "mim", "alm"],
  2: ["sayakul", "sayaqul"],
  3: ["tilka", "tilkar", "rusul"],
  4: ["lan", "tanaalu", "tanalu"],
  5: ["wal", "muhsanat", "muhsanatu"],
  6: ["la", "yuhibbu", "yuhibb"],
  7: ["wa", "iza", "samiu"],
  8: ["wa", "law", "annana"],
  9: ["qala", "mala", "malau"],
  10: ["wa", "alamu", "alam"],
  11: ["yatazirun", "yatadhirun"],
  12: ["wa", "ma", "min", "dabbah"],
  13: ["wa", "ma", "ubarriu"],
  14: ["rubama", "rubma"],
  15: ["subhana", "subhan"],
  16: ["qala", "alam", "akul"],
  17: ["iqtaraba", "iqtarab"],
  18: ["qadd", "qad", "aflaha"],
  19: ["wa", "qala", "ladhina"],
  20: ["amman", "a'man", "aman", "khalaqa"],
  21: ["utlu", "utluu"],
  22: ["wa", "man", "yaqnut"],
  23: ["wa", "mali", "maali"],
  24: ["fa", "man", "azlamu"],
  25: ["ilayhi", "ilaihi", "yuraddu"],
  26: ["ha", "mim", "hamim"],
  27: ["qala", "fama", "khatbukum"],
  28: ["qadd", "samia", "sami'a"],
  29: ["tabarakal", "tabarak"],
  30: ["amma", "amm"],
};

/**
 * Check if query matches any alias for a para
 */
function matchParaAlias(paraNumber: number, query: string): number {
  const aliases = paraAliases[paraNumber];
  if (!aliases) return 0;
  
  const q = normalizeText(query);
  
  for (const alias of aliases) {
    if (alias === q) return 80;
    if (alias.startsWith(q)) return 70;
    if (q.startsWith(alias)) return 65;
    if (alias.includes(q)) return 60;
    if (q.includes(alias)) return 55;
    
    const dist = levenshteinDistance(alias, q);
    if (dist <= 1) return 50;
    if (dist <= 2 && q.length >= 3) return 40;
  }
  
  return 0;
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
  const fieldScores = [
    calculateFieldScore(para.nameEnglish, normalizedQuery),
    calculateFieldScore(para.nameBengali, normalizedQuery),
    calculateFieldScore(para.nameArabic, normalizedQuery),
  ];
  
  // Check alias match
  const aliasScore = matchParaAlias(para.number, normalizedQuery);
  
  return Math.max(...fieldScores, aliasScore);
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

/**
 * Get closest Para matches with fallback system
 */
export function getClosestParaMatches(
  paras: Para[],
  query: string,
  maxResults: number = 3
): Array<{ para: Para; score: number }> {
  if (!query || query.trim().length < 2) return [];

  const q = normalizeText(query);
  
  // Layer 1: Normal fuzzy scoring (includes alias matching)
  let results = paras
    .map((para) => ({ para, score: fuzzyMatchPara(para, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
    
  if (results.length > 0) {
    return results.slice(0, maxResults);
  }
  
  // Layer 2: Soundex matching
  const qSoundex = simpleSoundex(query);
  results = paras
    .map((para) => {
      const nameSoundex = simpleSoundex(para.nameEnglish);
      const dist = levenshteinDistance(nameSoundex, qSoundex);
      const score = dist <= 2 ? 25 - dist * 5 : 0;
      return { para, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
    
  if (results.length > 0) {
    return results.slice(0, maxResults);
  }
  
  // Layer 3: Character overlap
  return paras
    .map((para) => {
      const name = normalizeText(para.nameEnglish);
      let overlap = 0;
      for (const char of q) {
        if (name.includes(char)) overlap++;
      }
      return { para, score: (overlap / q.length) * 15 };
    })
    .filter(({ score }) => score >= 5)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

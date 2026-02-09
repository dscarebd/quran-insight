
# Enhance Public API Fields & Documentation

## Current State Analysis

After reviewing the database schemas and edge function, I found that the **API is already returning comprehensive data** for all endpoints. The issue is:

1. **Sample responses in documentation are incomplete** - they show "..." for content fields
2. **Duas endpoint missing Hindi translations** - available in database but not returned
3. **Verses endpoint missing `tafsir_english`** - mentioned in select but not in sample
4. **Documentation doesn't clearly show all available fields**

## Database Column Comparison

| Endpoint | Fields in API Response | Missing Fields |
|----------|----------------------|----------------|
| Verses | arabic, english, bengali, tafsir_english, tafsir_bengali, page_number | text_v1 (special Uthmani) |
| Hadiths | All 12 fields included | None |
| Duas | 10 fields | title_hindi, hindi, transliteration_hindi |

## Changes Required

### 1. Edge Function: Add Hindi Fields to Duas

**File: `supabase/functions/public-api/index.ts`**

Update duas select to include Hindi translations:

```typescript
// Line 147 - Add hindi fields
.select('dua_id, category_id, title_english, title_bengali, title_hindi, arabic, transliteration, transliteration_bengali, transliteration_hindi, english, bengali, hindi, reference', { count: 'exact' });
```

### 2. API Documentation: Update Sample Responses

**File: `src/pages/ApiDocs.tsx`**

Update sample responses to show complete field structures:

**Verses (lines 56-70):**
```typescript
sampleResponse: {
  success: true,
  data: [
    {
      surah_number: 1,
      verse_number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      english: "In the name of Allah, the Most Gracious, the Most Merciful",
      bengali: "পরম করুণাময় অতি দয়ালু আল্লাহর নামে",
      tafsir_english: "This verse is known as Bismillah...",
      tafsir_bengali: "এই আয়াতটি বিসমিল্লাহ নামে পরিচিত...",
      page_number: 1
    }
  ],
  meta: { total: 6236, limit: 100, offset: 0 }
}
```

**Hadiths (lines 81-97):**
```typescript
sampleResponse: {
  success: true,
  data: [
    {
      hadith_number: 1,
      book_slug: "bukhari",
      chapter_number: 1,
      chapter_name_english: "Revelation",
      chapter_name_bengali: "ওহী",
      arabic: "حَدَّثَنَا الْحُمَيْدِيُّ...",
      english: "Narrated Umar bin Al-Khattab...",
      bengali: "উমর ইবনুল খাত্তাব (রাঃ) বর্ণনা করেছেন...",
      narrator_english: "Umar bin Al-Khattab",
      narrator_bengali: "উমর ইবনুল খাত্তাব (রাঃ)",
      grade: "Sahih",
      grade_bengali: "সহীহ"
    }
  ],
  meta: { total: 36435, limit: 100, offset: 0 }
}
```

**Duas (lines 129-145):**
```typescript
sampleResponse: {
  success: true,
  data: [
    {
      dua_id: "morning-1",
      category_id: "morning-evening",
      title_english: "Morning Supplication",
      title_bengali: "সকালের দোয়া",
      title_hindi: "सुबह की दुआ",
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا...",
      transliteration: "Allahumma bika asbahna...",
      transliteration_bengali: "আল্লাহুম্মা বিকা আসবাহনা...",
      transliteration_hindi: "अल्लाहुम्मा बिका असबहना...",
      english: "O Allah, by Your leave we have reached the morning...",
      bengali: "হে আল্লাহ, তোমার অনুগ্রহে আমরা সকালে উপনীত হয়েছি...",
      hindi: "ऐ अल्लाह, तेरी कृपा से हम सुबह तक पहुंचे...",
      reference: "Abu Dawud 5068"
    }
  ],
  meta: { total: 1000, limit: 100, offset: 0 }
}
```

### 3. Update Endpoint Descriptions

**Verses description:**
```typescript
description: "Get complete Quran verses with Arabic text, English & Bengali translations, and Tafsir (explanations) in both languages",
descriptionBn: "সম্পূর্ণ কুরআনের আয়াত - আরবি টেক্সট, ইংরেজি ও বাংলা অনুবাদ এবং উভয় ভাষায় তাফসির সহ"
```

**Hadiths description:**
```typescript
description: "Get complete Hadiths with Arabic, English & Bengali text, narrator info, chapter details, and authenticity grades",
descriptionBn: "সম্পূর্ণ হাদিস - আরবি, ইংরেজি ও বাংলা টেক্সট, বর্ণনাকারী, অধ্যায় ও সনদের তথ্য সহ"
```

**Duas description:**
```typescript
description: "Get complete Duas with Arabic, transliterations, and translations in English, Bengali & Hindi",
descriptionBn: "সম্পূর্ণ দোয়া - আরবি, উচ্চারণ এবং ইংরেজি, বাংলা ও হিন্দি অনুবাদ সহ"
```

## Summary of Changes

| File | Change |
|------|--------|
| `supabase/functions/public-api/index.ts` | Add Hindi fields to duas select query |
| `src/pages/ApiDocs.tsx` | Update sample responses with complete field structures |
| `src/pages/ApiDocs.tsx` | Update endpoint descriptions to clearly list all available data |

## Result

After these changes:
- Duas API will return Hindi translations (title, text, transliteration)
- Documentation will clearly show developers all available fields
- Sample responses will demonstrate the complete data structure

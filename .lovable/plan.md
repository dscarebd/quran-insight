

# Fix API Documentation Stats

## Problem
The API documentation page shows hardcoded statistics that don't match the actual database counts:

| Content | Shown | Actual |
|---------|-------|--------|
| Verses | 6,236+ | 6,236 |
| Hadiths | 10,000+ | 36,435 |
| Duas | 120+ | 1,000 |
| Masail | 500+ | 393 |

## Solution
Update the hardcoded stats in `src/pages/ApiDocs.tsx` to reflect accurate counts.

## Changes

### File: `src/pages/ApiDocs.tsx`

Update lines 190-195:

```javascript
// Before (incorrect)
const stats = [
  { value: "6,236+", label: "Verses", labelBn: "আয়াত" },
  { value: "10,000+", label: "Hadiths", labelBn: "হাদিস" },
  { value: "120+", label: "Duas", labelBn: "দোয়া" },
  { value: "500+", label: "Masail", labelBn: "মাসায়েল" }
];

// After (correct)
const stats = [
  { value: "6,236+", label: "Verses", labelBn: "আয়াত" },
  { value: "36,000+", label: "Hadiths", labelBn: "হাদিস" },
  { value: "1,000+", label: "Duas", labelBn: "দোয়া" },
  { value: "390+", label: "Masail", labelBn: "মাসায়েল" }
];
```

## Result
The API documentation page will display accurate content counts that match the database.


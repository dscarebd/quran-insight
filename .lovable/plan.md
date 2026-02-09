

# Fix Stats Number Formatting

## Problem
The `formatCount` function rounds numbers down to hundreds, showing "6,200+" instead of "6,236" for verses.

Current logic for 6236:
- `Math.floor(6236 / 1000)` = 6
- Remainder: `236` → truncated to `2` → shows `200+`
- Result: "6,200+" (incorrect)

## Solution
Update the `formatCount` function to show the exact count with a comma separator and "+" suffix.

## Changes

### File: `src/hooks/useApiStats.ts`

**Before (line 33-38):**
```typescript
export const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${Math.floor(count / 1000).toLocaleString()},${String(count % 1000).padStart(3, '0').slice(0, -2)}00+`;
  }
  return `${count}+`;
};
```

**After:**
```typescript
export const formatCount = (count: number): string => {
  return `${count.toLocaleString()}+`;
};
```

## Result

| Content | Before | After |
|---------|--------|-------|
| Verses | 6,200+ | 6,236+ |
| Hadiths | 36,400+ | 36,435+ |
| Duas | 1,000+ | 1,000+ |
| Masail | 300+ | 393+ |

The stats will now show exact counts with proper thousand separators.


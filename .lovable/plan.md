
## Remove Quran Reading Card — Always Show LMS Card

The goal is to strip out the "Continue Reading" (Quran history) card entirely and make the component always render either the LMS course progress card or the default "Start Learning" fallback.

### What changes

**`src/components/ContinueReading.tsx`**

1. Remove all localStorage reading logic (`readLastReadFromStorage`, the `lastRead` state, the `useEffect` that listens to storage events).
2. Remove the unused imports: `useCallback`, `useEffect`, `useState`, `BookOpen`, `surahs`, `getPageByNumber`, `formatNumber`.
3. Remove the "Continue Reading" card JSX block entirely (lines 161–208).
4. Remove the `if (!lastRead)` guard — the default fallback card now renders unconditionally when `lmsContinueCourse` is null/undefined.

### Result after change

Priority logic becomes simple and clean:

```text
lmsContinueCourse present?
  YES → Show "Continue Learning / View Certificate" LMS card
  NO  → Always show default "Start Learning" card → /courses
```

The Quran reading history card is fully removed (kept in git history so it can be restored later).

### Technical Details

- The `lastRead` state, `readLastReadFromStorage` callback, and the three `window.addEventListener` calls for `quran:lastReadChanged`, `storage`, and `focus` will all be deleted.
- Unused imports (`useCallback`, `useEffect`, `useState`, `BookOpen`, `surahs`, `getPageByNumber`, `formatNumber`) will be cleaned up to avoid lint warnings.
- No changes needed in `src/pages/Index.tsx` — the props interface and usage remain the same.

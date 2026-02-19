
## Bug Fix: Last Read Verse Mark Not Showing on "Continue Reading"

### Root Cause

When the user taps "Continue Reading" on the home page, it navigates to:
```
/read/35
```

But when `ReadPage` loads, it only shows the `bg-primary/20` highlight for a verse if `lastReadVerse === verseKey`. The `lastReadVerse` IS loaded from `localStorage` on mount, so the teal highlight exists in state — but the page never **scrolls to that verse**. The user arrives at the top of page 35 and has to manually scroll down to find the marked verse.

Additionally, when the user taps "Continue Reading" from `Index.tsx`, the verse info is not passed in the URL — so the existing `targetVerse` / `scrollIntoView` logic inside `ReadPage` never fires for the last-read verse.

### The Fix (2 files)

**1. `src/pages/Index.tsx`** — Pass verse coordinates in the URL:
```tsx
// Before
onClick={() => navigate(`/read/${lastReadSurah.pageNum}`)}

// After
onClick={() => navigate(`/read/${lastReadSurah.pageNum}?verse=${lastReadSurah.surahNumber}:${lastReadSurah.verseNumber}`)}
```

**2. `src/pages/ReadPage.tsx`** — When arriving via `?verse=` param, keep the `lastReadVerse` highlight permanently (don't clear it after 3s) and scroll to it:

Currently the `targetVerse` logic sets `highlightedVerse` (temporary pulse) and clears it after 3 seconds:
```tsx
setHighlightedVerse(verseKey);
setTimeout(() => setHighlightedVerse(null), 3000); // clears the pulse
```

The permanent green mark comes from `lastReadVerse` state. The problem is: when coming from "Continue Reading", the `lastReadVerse` from localStorage should match the verse in the URL — but the scroll logic needs to use `verseRefs` to find and scroll to it.

The fix ensures that when `targetVerse` is present and matches `lastReadVerse`, the scroll fires correctly AND the `lastReadVerse` state (permanent green mark) stays visible. We only need to ensure the `setHighlightedVerse` timeout clears just the pulse animation — the permanent `bg-primary/20` from `lastReadVerse` remains.

This is actually already correct — the `lastReadVerse` from localStorage already gives the permanent mark. The only missing piece is scrolling to it. So the main fix is just **passing the verse in the URL** from `Index.tsx`.

### Files Changed

1. **`src/pages/Index.tsx`** — Add `?verse=surah:verse` to the Continue Reading navigation URL
2. **`src/pages/ReadPage.tsx`** — Also handle the case where no `?verse=` param exists but `lastReadVerse` is in localStorage, by auto-scrolling to it after the initial page load (fallback scroll for direct `/read/:page` navigation)

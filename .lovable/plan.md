
## Fix: Eliminate White Screen Delay When Clicking "Last Read"

### Root Cause

The white screen occurs because `ReadPage` always sets `loading = true` at the start of `loadInitialPages()`, even when the verse data for that page is already in the `versesCache` Map. This causes React to render the skeleton loader (white boxes) for the duration of the async fetch — even if the cache lookup is instant.

```tsx
// In loadInitialPages():
setLoading(true);  // ← Always triggers white screen flash
// ...
const verses = await fetchVersesForPage(pageNum, needsV1Data);  // cache hit is instant but async
```

Even though `versesCache` is a module-level Map (survives navigation), the `setLoading(true)` → `setLoading(false)` cycle still causes a render flash because React batches these state updates through the async boundary.

### The Fix

**1. Check cache synchronously before setting `loading = true`**

Before starting the async load, check if ALL pages in the initial window are already cached. If they are, load them synchronously (no async needed) and skip the loading state entirely:

```tsx
const loadInitialPages = async () => {
  const needsV1Data = arabicFont === "v1";
  const startPage = Math.max(initialPage - 1, 1);
  const endPage = Math.min(initialPage + 1, 604);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
  
  const cacheOffset = needsV1Data ? 10000 : 0;
  
  // Check if ALL pages are already cached
  const allCached = pageNumbers.every(p => versesCache.has(p + cacheOffset));
  
  if (allCached) {
    // Load synchronously from cache — no loading state needed
    const pagesData = pageNumbers.map(pageNum => ({
      pageNumber: pageNum,
      verses: versesCache.get(pageNum + cacheOffset)!,
      juzNumber: getJuzForPage(pageNum),
    }));
    setLoadedPages(pagesData);
    setLoading(false);
    return;
  }
  
  // Only show loading state when actually fetching
  setLoading(true);
  // ... rest of async fetch logic
};
```

**2. Initialize `loading` state based on whether the page is already cached**

Instead of `useState(true)`, initialize `loading` based on whether the initial page data is already in cache. This prevents even the first render from showing a skeleton:

```tsx
const [loading, setLoading] = useState<boolean>(() => {
  // If initial page is cached, we can render immediately
  const cacheKey = initialPage; // simplified (V1 adds 10000)
  return !versesCache.has(cacheKey);
});
```

### Files to Change

- **`src/pages/ReadPage.tsx`** — Two changes:
  1. Initialize `loading` state from cache (instant render when cached)
  2. Skip `setLoading(true)` when all required pages are in cache

### What This Fixes

- **First visit** to `/read/34`: Shows skeleton loader (normal, data must be fetched)
- **Return visit** via "Continue Reading": Instantly renders the page with no white flash, then scrolls to the marked verse
- **Verse highlight**: The `lastReadVerse` from localStorage is already in state on mount, so the teal color appears immediately with the content

### Technical Note

The `versesCache` Map is declared at module level (`const versesCache = new Map<number, Verse[]>()`), so it persists across React Router navigations within the same browser session. The fix simply exploits this existing cache by checking it synchronously before triggering any loading state.

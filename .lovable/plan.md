
## Fix: Read Page Jumps to Page 1 After Scrolling

### Root Cause

When navigating to `/read/37` (from the Continue Reading card), the page loads correctly and scrolls to page 37. However, the `topSentinelRef` (invisible div above the first loaded page) immediately becomes visible in the viewport after scrolling to page 37 — because loaded pages start at page 36, so the top sentinel is right above page 36 which is above page 37. This triggers `loadMorePagesUp()`, which prepends pages 33–35 into `loadedPages`.

The DOM grows upward. The code tries to compensate by doing `c.scrollTop += diff` inside a `requestAnimationFrame`, but this is unreliable — the browser may not have painted the new content yet, or the container's scroll anchor behavior interferes, causing the scroll position to snap back to 0 (the very top), showing page 1.

Additionally, when `loadedPages` changes, the page-visibility `IntersectionObserver` is recreated and resets `visibilityByPageRef.current = {}`, momentarily losing track of which page is visible.

### The Fix — Two Changes in `src/pages/ReadPage.tsx`

**Fix 1: Use CSS `overflow-anchor: none` on the scroll container**

The scroll container needs `overflow-anchor: none` so the browser doesn't try to manage scroll anchoring itself (which conflicts with our manual `scrollTop` adjustment). This prevents the browser from pinning the viewport to an element and jumping around.

**Fix 2: Use double-nested `requestAnimationFrame` + `scrollTop` correction more robustly**

Replace the current single `requestAnimationFrame` in `loadMorePagesUp` with a more reliable approach:
- Save `scrollTop` before prepending
- After DOM update, compute `newScrollHeight - prevScrollHeight` and add it to `scrollTop`
- Use `double rAF` (already done) but also use a `MutationObserver` or `setTimeout` fallback

Actually, the simpler and more reliable fix is:

**Fix 2 (better): Guard the top sentinel more carefully**

The top sentinel fires too eagerly right after the initial scroll. The `didScrollToInitialRef.current` guard was meant to prevent this, but the issue is the **timing**: `didScrollToInitialRef.current` is set to `true` inside the scroll-to-initial `useEffect` (via `requestAnimationFrame`), but the `IntersectionObserver` for the top sentinel was already set up before that fires, and the sentinel is already intersecting.

**The reliable fix:**
1. Add a short **cooldown after initial scroll** before the top sentinel is allowed to trigger. Use a ref `topSentinelEnabledRef` that starts `false` and becomes `true` only after a 1-second delay once `didScrollToInitialRef.current` is set.
2. Also add `style={{ overflowAnchor: 'none' }}` to the scroll container `<main>` to prevent browser scroll-anchor interference.

### Files to change

**`src/pages/ReadPage.tsx`** — two targeted changes:

**Change 1** — Add a `topSentinelEnabledRef` with a 1-second delay after initial scroll:
```
// After setting didScrollToInitialRef.current = true in the scroll-to-initial useEffect:
setTimeout(() => { topSentinelEnabledRef.current = true; }, 1000);
```

**Change 2** — In the `topObserver` callback, check `topSentinelEnabledRef` instead of (or in addition to) `didScrollToInitialRef`:
```
if (!topSentinelEnabledRef.current) return;
```

**Change 3** — Add `overflowAnchor: 'none'` to the `<main>` scroll container so browser scroll anchoring doesn't fight with the manual `scrollTop` adjustment:
```tsx
<main ... style={{ overflowAnchor: 'none' }}>
```

### Why this works

- The 1-second cooldown ensures the user actually has time to see and interact with their target page before the top sentinel starts triggering upward page loads
- `overflow-anchor: none` tells the browser "don't try to maintain scroll position yourself" — our manual `scrollTop += diff` in `loadMorePagesUp` then works correctly without the browser fighting it
- Together these two changes eliminate the race condition that caused the snap-to-page-1 jump

### Summary of changes
- 1 file modified: `src/pages/ReadPage.tsx`
- Add `topSentinelEnabledRef` (new ref, initialized to `false`)
- Set it to `true` after 1 second in the scroll-to-initial effect
- Guard top sentinel observer with this new ref
- Add `overflowAnchor: 'none'` style to the `<main>` element

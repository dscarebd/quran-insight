
## Two Bug Fixes

### Issue 1: Last Read Verse Not Showing Color When Returning to Reader

**Root Cause:**

The `lastReadVerse` state is initialized from `localStorage` on mount:
```tsx
const [lastReadVerse, setLastReadVerse] = useState<string | null>(() => {
  const saved = localStorage.getItem("quran-last-read-verse");
  return saved || null;
});
```

So the correct value IS in state. However, there is also a **verse visibility auto-save observer** (`verseObserverRef`) that fires as soon as the page renders. When you arrive at `/read/34?verse=2:216`, the page scrolls to the target verse — but during that scroll, the IntersectionObserver sees OTHER verses passing through the viewport and **overwrites** `lastReadVerse` with a different verse key before the scroll even completes. This clears the teal highlight from the correct verse.

Additionally, the scroll itself has a timing issue: `verseRefs` may not be populated yet when the 300ms timeout fires (because the DOM hasn't rendered yet), so `verseEl` is `null` and scrolling never happens.

**Fix:**
1. Add a `scrollingToVerseRef` guard flag. When navigating to a target verse, set this flag to `true` for ~1.5 seconds. The auto-save observer will skip overwriting `lastReadVerse` while this flag is active.
2. Increase the scroll delay from 300ms to 600ms to give the DOM time to fully render verse elements before attempting `scrollIntoView`.
3. Use a retry mechanism — if `verseEl` is null after the initial delay, retry up to 3 times with 200ms intervals.

---

### Issue 2: Page Scrolls to Bottom When Navigating (Home and Other Pages)

**Root Cause:**

The Layout uses `overflow-y-auto` on the inner scroll container div. When React Router navigates between routes, the `AnimatePresence` + `PageTransition` (framer-motion) animation plays — but the **scroll position of the container is not reset**. So if you were scrolled down on one page (e.g. the reader), navigating to the home page keeps the same scroll offset, making it appear that you're at the bottom.

There is currently **no `ScrollToTop` component** in `App.tsx`. This is the standard React Router fix for this exact issue.

**Fix:**
1. Create `src/components/ScrollToTop.tsx` — a component that watches route changes and resets the scroll position of the Layout's inner container to 0.
2. Since the scroll container is not `window` but a `div` inside Layout, we need to reset the correct element. The cleanest approach: add `id="main-scroll-container"` to the scrollable div in `Layout.tsx` and have `ScrollToTop` target it via `document.getElementById`.
3. Place `<ScrollToTop />` inside `BrowserRouter` in `App.tsx`.

---

### Files to Change

1. **`src/components/ScrollToTop.tsx`** (new file) — resets scroll on route change
2. **`src/App.tsx`** — add `<ScrollToTop />` inside `BrowserRouter`  
3. **`src/components/Layout.tsx`** — add `id="main-scroll-container"` to the scrollable div
4. **`src/pages/ReadPage.tsx`** — fix the verse highlight being overwritten by the auto-save observer, and improve scroll timing with retry logic

### Technical Details

**ScrollToTop component:**
```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Reset both window and the layout scroll container
    window.scrollTo(0, 0);
    const container = document.getElementById("main-scroll-container");
    if (container) container.scrollTop = 0;
  }, [pathname]);
  return null;
};
```

**ReadPage guard (prevents auto-save from overwriting lastReadVerse during initial scroll):**
```tsx
const scrollingToVerseRef = useRef(false);

// In scroll effect:
scrollingToVerseRef.current = true;
setTimeout(() => { scrollingToVerseRef.current = false; }, 1500);

// In IntersectionObserver callback:
if (scrollingToVerseRef.current) return; // don't overwrite lastReadVerse
```

**Retry scroll logic:**
```tsx
const tryScrollToVerse = (verseKey: string, attempt = 0) => {
  const verseEl = verseRefs.current[verseKey];
  if (verseEl) {
    verseEl.scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (attempt < 5) {
    setTimeout(() => tryScrollToVerse(verseKey, attempt + 1), 200);
  }
};
setTimeout(() => tryScrollToVerse(verseKey), 600);
```


## Read Hub Page + Direct PDF Reading (No Download Required)

### What We're Building

Currently the "Read" button goes directly to the Hifz mushaf reader. The user wants it to first open a **hub/landing page** that shows:
1. A prominent "Read in the App" card (opens the existing mushaf reader)
2. A grid of Quran PDF books managed by admin (from the `pdf_books` table)
3. Clicking any PDF opens it **directly in the in-app PDF viewer** — no download step needed (streams from URL)
4. Inside the PDF viewer, users can search and jump by Surah / Page / Para (like the existing reader footer)

---

### Architecture Overview

```text
/read (new hub page)
 ├── "Read in the App" big card → /read/1 (last page)
 └── PDF book grid → /read/pdf/:bookId (new direct-stream route)

/read/pdf/:bookId (new route, no download required)
 └── Streams PDF from URL → PDFViewerWithNav (enhanced viewer)
```

---

### Files to Create / Modify

**1. `src/pages/QuranReadHub.tsx` (NEW)**
- Hub/landing page that replaces the current `/read` redirect
- Shows "Read in the App" card at top (navigates to last read page or page 1)
- Shows a grid of PDF books from `pdf_books` table (using existing `useBookLibrary` hook)
- No download step — each card has a "Read" button that navigates to `/read/pdf/:bookId`
- Language-aware (Bengali/English labels)

**2. `src/pages/DirectPDFReader.tsx` (NEW)**
- New page at `/read/pdf/:bookId`
- Fetches the book data from `pdf_books` table using `useBookById`
- Streams the PDF directly from `book.pdf_url` using `fetch()` to a Blob (in-memory, no IndexedDB caching required — just a simple state)
- Restores reading progress from `pdfStorageService.getReadingProgress()` (saves progress too)
- Renders the existing `PDFViewer` component
- Adds a **navigation sheet** in the header — tabs for Page / Surah / Para (similar to ReadPage footer), allowing user to jump to any page

**3. `src/App.tsx` (MODIFY)**
- Change `/read` route from `ReadPageRedirect` to `QuranReadHub` (wrapped in Layout)
- Add new route `/read/pdf/:bookId` → `DirectPDFReader`
- Keep `/read/:pageNumber` route intact for mushaf reader

**4. `src/components/MobileNavFooter.tsx` (MODIFY)**
- Change "Read" button action from `navigate("/read")` (which currently auto-redirects to last page) to `navigate("/read")` — same path, but now the hub page exists

**5. `src/pages/admin/BooksManagement.tsx` (MODIFY — optional, minor)**
- No changes needed; books are already managed there with `display_order` and `is_featured` flags that can be used to control what shows on the hub

---

### Key Technical Details

**Direct Streaming (No Download)**
The `DirectPDFReader` will fetch the PDF on mount:
```typescript
const response = await fetch(book.pdf_url);
const blob = await response.blob();
setPdfBlob(blob);
```
This loads it into memory. No IndexedDB. Reading progress (current page) is still saved to IndexedDB via `updateLastPage` from `pdfStorageService`, so users can resume where they left off.

**PDF Navigation (Page / Surah / Para tabs)**
A Sheet/drawer in the header toolbar will contain:
- **Page tab**: Number input + slider (1 to total pages)
- **Surah tab**: Search + list of 114 surahs — maps surah start page using `surahs` data (existing `src/data/surahs.ts` has `startPage` field)
- **Para tab**: Search + list of 30 paras — maps para start page using `paras` data (existing `src/data/paras.ts` has `startPage` field)

The navigation sheet fires `setCurrentPage(n)` in PDFViewer — we'll lift page state up into `DirectPDFReader` and pass it as a controlled prop to `PDFViewer` (minor enhancement to `PDFViewer` to accept `currentPage` as controlled prop).

**Hub Page Layout**
- Matches the reference image style: 2-column book grid with cover thumbnails and title below
- "Read in the App" is a full-width prominent card at the top
- Books show cover image (or placeholder), Bengali/English title
- No download button shown on hub — just "Read" (opens directly)

**Admin Control**
- Books are already managed via admin panel at `/abdullah/books`
- `display_order` controls the order shown
- `is_featured` can be used to highlight certain books
- No admin changes needed — existing `pdf_books` table is used

---

### Route Changes Summary

| Before | After |
|--------|--------|
| `/read` → redirect to `/read/lastPage` | `/read` → `QuranReadHub` (hub page) |
| `/read/:pageNumber` → mushaf reader | `/read/:pageNumber` → mushaf reader (unchanged) |
| `/books/:bookId` → requires download | `/read/pdf/:bookId` → direct stream reader |
| `/books` → book library with download | `/books` → unchanged (still available) |

### Files Changed
1. `src/pages/QuranReadHub.tsx` — NEW
2. `src/pages/DirectPDFReader.tsx` — NEW
3. `src/App.tsx` — modify routes
4. `src/components/MobileNavFooter.tsx` — read button now goes to hub (already does, but confirm behavior)
5. `src/components/PDFViewer.tsx` — minor: accept optional controlled `page` prop for external navigation

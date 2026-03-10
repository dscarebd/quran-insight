

## Plan: Add Book Detail Popup with Download on QuranReadHub

**Problem**: Currently, clicking a book thumbnail navigates directly to `/read/pdf/{id}` which loads the PDF reader (with a loading spinner). User wants a popup dialog first showing book details and a download button.

**Changes in `src/pages/QuranReadHub.tsx`**:

1. Add state for `selectedBook` (the book clicked)
2. Replace the `onClick={() => navigate(...)}` on each book thumbnail with `onClick={() => setSelectedBook(book)}`
3. Add a `Dialog` popup that shows when `selectedBook` is set, containing:
   - Book cover image
   - Title (bilingual)
   - Author (if available)
   - Description (if available)
   - File size in MB
   - Total pages
   - A "Download" button that triggers `window.open(book.pdf_url, '_blank')` for direct browser download (no spinner, no in-app caching — just a native file download)
4. Import `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` from ui/dialog
5. Import `Download` icon from lucide-react
6. Import `useBookDownload` hook for cached/offline download with progress shown inside the popup
7. After download completes, show a "Read" button to navigate to the reader

**Popup layout**:
- Cover image at top (compact)
- Title + author below
- File size and page count as metadata chips
- Download button (full width, primary) — uses `useBookDownload` for IndexedDB caching with progress bar
- If already downloaded, show "Read" button instead


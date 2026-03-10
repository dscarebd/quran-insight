

## Problem
The progress bar stays at 0% because the server likely doesn't return a `Content-Length` header (common with Supabase Storage or CORS). The code only updates progress when `total > 0` (line 78), so without that header, progress never updates — it stays at 0% until done, then jumps to the "Read" button.

## Plan

**File: `src/hooks/useBookDownload.ts`**

Fix the progress tracking to work even without `Content-Length`:

1. When `total === 0` (no Content-Length header), estimate progress using the book's `file_size_mb` from the database (pass it as a parameter)
2. If neither is available, show an indeterminate state by incrementing progress based on chunks received
3. Update the `downloadBook` function signature to accept optional `fileSizeMb` parameter

**File: `src/pages/QuranReadHub.tsx`**

1. Pass `selectedBook.file_size_mb` to `downloadBook()` so it can estimate progress
2. When progress is indeterminate (no size info at all), show a pulsing/indeterminate progress bar instead of stuck 0%

**Key change in `useBookDownload.ts`**:
```text
downloadBook(bookId, pdfUrl, fileSizeMb?)
  - total = contentLength || (fileSizeMb * 1024 * 1024) || 0
  - If total is still 0, use a simple chunk-counter approach
    that increments progress gradually (never reaching 100% until done)
```


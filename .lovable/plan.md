

## Problem

The `fetch` + `ReadableStream` approach for tracking download progress doesn't work reliably because:
1. React 18 batches state updates — rapid `setDownloads` calls inside the async loop get batched, so intermediate percentages never render
2. CORS responses from the storage bucket may deliver all data in one or very few chunks, skipping from 0% straight to done

## Solution

Replace the `fetch` streaming approach with `XMLHttpRequest` which has a native `onprogress` event that fires on the main thread and reliably reports download progress. This is the proven, cross-browser method for tracking file download progress.

**File: `src/hooks/useBookDownload.ts`**

Replace the `fetch` + `reader.read()` loop with:

```text
const xhr = new XMLHttpRequest();
xhr.responseType = "blob";

xhr.onprogress = (event) => {
  let progress: number;
  if (event.lengthComputable) {
    progress = Math.min(Math.round((event.loaded / event.total) * 100), 99);
  } else if (fileSizeMb) {
    const estimatedTotal = fileSizeMb * 1024 * 1024;
    progress = Math.min(Math.round((event.loaded / estimatedTotal) * 100), 99);
  } else {
    // fallback indeterminate
  }
  setDownloads(prev => new Map(prev).set(bookId, { bookId, progress, isDownloading: true }));
};

xhr.onload = () => {
  const blob = xhr.response;
  savePDFToCache(bookId, blob).then(() => { ... });
};

xhr.open("GET", pdfUrl);
xhr.send();
```

Key advantages:
- `onprogress` fires on the UI thread at browser-controlled intervals — no React batching issues
- `event.lengthComputable` / `event.loaded` / `event.total` work reliably even with CORS
- No streaming API compatibility concerns

No changes needed in `QuranReadHub.tsx` — the popup UI already reads from `getDownloadProgress()` and renders the `Progress` bar correctly.


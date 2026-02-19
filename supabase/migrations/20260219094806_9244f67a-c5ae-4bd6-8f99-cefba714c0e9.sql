-- Increase the file size limit for pdf-books bucket to support large Quran PDFs (up to 500MB)
UPDATE storage.buckets
SET file_size_limit = 524288000  -- 500MB in bytes
WHERE id = 'pdf-books';
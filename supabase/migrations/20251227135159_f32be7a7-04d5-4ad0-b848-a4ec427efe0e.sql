-- Delete all existing hadith records for clean slate import
DELETE FROM hadiths;

-- Reset total_hadiths count in hadith_books
UPDATE hadith_books SET total_hadiths = 0;
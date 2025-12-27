-- Insert new hadith books for 10 total books from fawazahmed0/hadith-api
INSERT INTO hadith_books (slug, name_english, name_arabic, name_bengali, display_order, icon, total_hadiths)
VALUES 
  ('malik', 'Muwatta Malik', 'موطأ مالك', 'মুওয়াত্তা মালিক', 7, 'BookOpen', 0),
  ('nawawi', 'Forty Hadith Nawawi', 'الأربعون النووية', 'চল্লিশ হাদিস নববী', 8, 'BookOpen', 0),
  ('qudsi', 'Forty Hadith Qudsi', 'الأحاديث القدسية', 'চল্লিশ হাদিস কুদসী', 9, 'BookOpen', 0),
  ('dehlawi', 'Forty Hadith Shah Waliullah Dehlawi', 'الأربعون حديث شاه ولي الله دهلوي', 'চল্লিশ হাদিস শাহ ওয়ালী উল্লাহ দেহলভী', 10, 'BookOpen', 0)
ON CONFLICT (slug) DO NOTHING;
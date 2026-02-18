
## Add "Learn Quran in 27 Days" Course with 27 Lessons

The database currently has no courses or lessons. This plan covers inserting the full course and all 27 lessons directly into the database, then updating the homepage card text to match the new course title.

---

### What will be done

**1. Insert the course into `lms_courses`**

A single course row:
- `title_english`: Learn Quran in 27 Days
- `title_bengali`: ২৭ দিনে কুরআন শিখুন
- `description_english`: A structured 27-lesson program to help you read and understand the Quran from scratch
- `description_bengali`: শূন্য থেকে কুরআন পড়া ও বোঝার জন্য সুশৃঙ্খল ২৭টি পাঠের একটি কোর্স
- `is_published`: true
- `display_order`: 1
- `total_lessons`: 27

**2. Insert 27 lessons into `lms_lessons`**

Each lesson has:
- `lesson_order`: 1–27
- `title_english` + `title_bengali`
- `description_english` + `description_bengali`
- `video_url`: placeholder (admin can replace via the Lesson Management panel)
- `duration_seconds`: estimated per lesson
- `is_published`: true

The 27 lessons follow a logical Quran learning progression:

| # | English Title | Bengali Title |
|---|---|---|
| 1 | Introduction to Arabic Letters | আরবি হরফ পরিচিতি |
| 2 | Vowels & Harakat (Short Vowels) | স্বরচিহ্ন ও হারাকাত |
| 3 | Joining Letters (Sukoon & Shaddah) | সুকুন ও শাদ্দাহ |
| 4 | Tanween & Noon Sakinah Rules | তানওইন ও নূন সাকিনার নিয়ম |
| 5 | Meem Sakinah & Qalqalah | মিম সাকিনা ও ক্বলক্বলাহ |
| 6 | Madd (Elongation) Rules | মাদ্দের নিয়মাবলী |
| 7 | Waqf (Stopping) Rules | ওয়াকফের নিয়ম |
| 8 | Reading Surah Al-Fatiha | সূরা আল-ফাতিহা পাঠ |
| 9 | Reading Short Surahs (Al-Ikhlas, Al-Falaq, An-Nas) | ছোট সূরা পাঠ |
| 10 | Reading Surah Al-Baqarah (Part 1) | সূরা আল-বাকারাহ (পর্ব ১) |
| 11 | Reading Surah Al-Baqarah (Part 2) | সূরা আল-বাকারাহ (পর্ব ২) |
| 12 | Reading Surah Al-Baqarah (Part 3) | সূরা আল-বাকারাহ (পর্ব ৩) |
| 13 | Juz Amma — Part 1 | জুজ আম্মা — পর্ব ১ |
| 14 | Juz Amma — Part 2 | জুজ আম্মা — পর্ব ২ |
| 15 | Juz Amma — Part 3 | জুজ আম্মা — পর্ব ৩ |
| 16 | Tajweed Practice: Common Mistakes | তাজওইদ অনুশীলন: সাধারণ ভুল |
| 17 | Fluency Practice — Surah Yaseen | সাবলীলতা অনুশীলন — সূরা ইয়াসিন |
| 18 | Fluency Practice — Surah Al-Mulk | সাবলীলতা অনুশীলন — সূরা আল-মুলক |
| 19 | Fluency Practice — Surah Al-Kahf (Part 1) | সূরা আল-কাহফ (পর্ব ১) |
| 20 | Fluency Practice — Surah Al-Kahf (Part 2) | সূরা আল-কাহফ (পর্ব ২) |
| 21 | Reading Ayatul Kursi with Tajweed | তাজওইদসহ আয়াতুল কুরসি পাঠ |
| 22 | Last 10 Surahs of Quran | কুরআনের শেষ ১০টি সূরা |
| 23 | Introduction to Quran Translation | কুরআন অনুবাদ পরিচিতি |
| 24 | Understanding Key Quranic Vocabulary | মূল কুরআনিক শব্দভাণ্ডার |
| 25 | Quran Recitation with Proper Rhythm | সঠিক ছন্দে কুরআন তিলাওয়াত |
| 26 | Review & Practice Session | পর্যালোচনা ও অনুশীলন সেশন |
| 27 | Final Assessment & Graduation | চূড়ান্ত মূল্যায়ন ও সমাপনী |

**3. Update `ContinueReading.tsx` — default card title**

Change the hardcoded "Learn Quran in 30 Days" text on the default Start Learning card to "Learn Quran in 27 Days" / "২৭ দিনে কুরআন শিখুন" to match the actual course.

---

### Technical Details

- All data is inserted via the Supabase `read-query` tool (INSERT statements) — no schema migrations needed.
- `video_url` for each lesson will be set to an empty string placeholder (`''`) since videos haven't been uploaded yet. Admins can update them via the Lesson Management admin panel.
- `duration_seconds` for each lesson is set to `1800` (30 minutes) as a reasonable default — adjustable per lesson in admin.
- The `total_lessons` column on `lms_courses` is set to `27` directly on insert.
- No new files need to be created — only data insertion + one small text change in `ContinueReading.tsx`.



# Full LMS (Learning Management System) Integration

## Overview

Build a complete Learning Management System inside the existing Quran app with multiple courses, sequential video lessons, user registration, progress tracking, and completion rewards (certificate + badge). The "Continue Reading" card on the homepage will be replaced with an LMS access card.

## Database Schema

### New Tables

1. **`lms_courses`** - Stores course information
   - `id` (uuid, PK)
   - `title_english` (text)
   - `title_bengali` (text)
   - `description_english` (text)
   - `description_bengali` (text)
   - `thumbnail_url` (text, nullable)
   - `is_published` (boolean, default false)
   - `display_order` (integer, default 0)
   - `total_lessons` (integer, default 0)
   - `created_at`, `updated_at` (timestamps)

2. **`lms_lessons`** - Stores video lessons per course
   - `id` (uuid, PK)
   - `course_id` (uuid, FK -> lms_courses)
   - `title_english` (text)
   - `title_bengali` (text)
   - `description_english` (text, nullable)
   - `description_bengali` (text, nullable)
   - `video_url` (text) - URL from storage bucket
   - `duration_seconds` (integer, nullable)
   - `lesson_order` (integer) - determines sequence
   - `is_published` (boolean, default true)
   - `created_at`, `updated_at` (timestamps)

3. **`lms_students`** - First-time user registration details
   - `id` (uuid, PK)
   - `full_name` (text)
   - `email` (text, unique)
   - `phone` (text)
   - `device_id` (text) - localStorage-based identifier for non-auth users
   - `created_at` (timestamp)

4. **`lms_progress`** - Tracks video watch progress per student per lesson
   - `id` (uuid, PK)
   - `student_id` (uuid, FK -> lms_students)
   - `lesson_id` (uuid, FK -> lms_lessons)
   - `course_id` (uuid, FK -> lms_courses)
   - `watched_seconds` (integer, default 0)
   - `is_completed` (boolean, default false)
   - `completed_at` (timestamp, nullable)
   - `created_at`, `updated_at` (timestamps)
   - Unique constraint on `(student_id, lesson_id)`

5. **`lms_certificates`** - Stores earned certificates/badges
   - `id` (uuid, PK)
   - `student_id` (uuid, FK -> lms_students)
   - `course_id` (uuid, FK -> lms_courses)
   - `certificate_number` (text, unique)
   - `completed_at` (timestamp)
   - `created_at` (timestamp)
   - Unique constraint on `(student_id, course_id)`

### Storage Bucket

- **`lms-videos`** - Public bucket for uploaded course videos

### RLS Policies

- **lms_courses, lms_lessons**: Public read, admin-only write
- **lms_students**: Service role insert (via edge function), admin read all, student read own (by device_id match not needed since no auth - handled via edge function)
- **lms_progress**: Service role manage (via edge function), admin read all
- **lms_certificates**: Service role manage (via edge function), admin read all

Since LMS users are NOT authenticated (they just provide name/email/phone), all student-facing write operations will go through edge functions that use the service role.

## New Pages

### User-Facing Pages

1. **`/courses`** - Course listing page
   - Grid of available courses with thumbnails, titles, progress bars
   - Shows completion badge if course is finished

2. **`/courses/:courseId`** - Course detail / lesson list
   - Shows course info, list of lessons with lock/unlock status
   - Progress indicator per lesson (completed checkmark, in-progress, locked)
   - First lesson always unlocked; subsequent ones locked until previous is completed

3. **`/courses/:courseId/lesson/:lessonId`** - Video player page
   - Full video player with progress tracking
   - Must watch to completion (track watched_seconds vs duration)
   - "Next Lesson" button appears only after video completes
   - Shows locked message if prerequisite not met

4. **`/courses/:courseId/certificate`** - Certificate/reward page
   - Shareable digital certificate with student name, course name, completion date, certificate number
   - Download as image option
   - Badge display

### Registration Flow

- **Student Registration Dialog** - Modal that appears on first LMS interaction
  - Collects: Full Name, Email, Phone
  - Stores in `lms_students` table
  - Saves `student_id` to localStorage for future visits

### Admin Pages (under `/abdullah`)

5. **`/abdullah/courses`** - Course management
   - CRUD for courses
   - Reorder courses
   - Publish/unpublish

6. **`/abdullah/courses/:courseId/lessons`** - Lesson management
   - CRUD for lessons within a course
   - Video file upload to `lms-videos` bucket
   - Reorder lessons

7. **`/abdullah/lms-students`** - View registered students
   - List all students with name, email, phone
   - View student progress across courses
   - Export student data

## New Components

- **`LmsCourseCard`** - Course card with thumbnail, title, progress bar
- **`LmsLessonItem`** - Lesson row with lock/unlock icon, completion status
- **`LmsVideoPlayer`** - Video player with progress tracking (uses HTML5 video with `timeupdate` event)
- **`LmsCertificate`** - Certificate display/download component (rendered as styled HTML, exportable via html2canvas or similar)
- **`LmsStudentRegistration`** - Registration form dialog
- **`LmsProgressBar`** - Course completion progress bar
- **`LmsBadge`** - Achievement badge component
- **`LmsContinueCard`** - Replaces "Continue Reading" card on homepage - shows current course progress and "Continue Learning" button

## New Edge Functions

1. **`lms-register`** - Handles student registration (validates input, creates student record, returns student_id)
2. **`lms-progress`** - Updates watch progress and marks lessons complete (validates that previous lesson is completed before allowing access)

## New Hooks

- **`useLmsStudent`** - Manages student identity (localStorage student_id, registration state)
- **`useLmsProgress`** - Fetches and updates lesson progress
- **`useLmsCourses`** - Fetches courses with progress data

## Homepage Card Replacement

The existing `ContinueReading` component on the homepage will be conditionally replaced:
- If user is an LMS student (has student_id in localStorage), show **LmsContinueCard** with their current course/lesson progress
- If not an LMS student but has reading progress, show the original Continue Reading card
- Both cards share the same visual style (green primary, rounded-xl, shadow-lg)

## Video Completion Logic

```text
User opens lesson
  -> Check: Is previous lesson completed? (first lesson always unlocked)
    -> No: Show "Complete previous lesson first" message
    -> Yes: Play video
      -> Track timeupdate events, save progress periodically (every 10 seconds)
      -> When watched_seconds >= duration_seconds * 0.95 (95% threshold)
        -> Mark lesson as completed
        -> Unlock next lesson
        -> If all lessons completed -> Generate certificate + badge
```

## Route Changes in App.tsx

Add the following routes:
```text
/courses                           -> CourseList page
/courses/:courseId                  -> CourseDetail page  
/courses/:courseId/lesson/:lessonId -> LessonPlayer page
/courses/:courseId/certificate      -> Certificate page
/abdullah/courses                   -> Admin CourseManagement
/abdullah/courses/:courseId/lessons  -> Admin LessonManagement
/abdullah/lms-students              -> Admin LMS Students
```

## Implementation Order

1. Database migrations (tables, storage bucket, RLS policies)
2. Edge functions (lms-register, lms-progress)
3. Student registration flow + useLmsStudent hook
4. Course listing page + admin course management
5. Lesson management + video upload (admin)
6. Video player page with progress tracking
7. Sequential unlock logic
8. Certificate/badge generation on completion
9. Homepage card replacement (LmsContinueCard)
10. Admin student management view

## Technical Notes

- Videos uploaded to `lms-videos` storage bucket (public, max ~50MB per video via Supabase Storage)
- Student identity stored in localStorage (`lms-student-id`) since LMS users don't use app auth
- Progress saved via edge function every 10 seconds during video playback to avoid data loss
- Certificate number format: `QI-CERT-{timestamp}-{random4digits}`
- All UI uses existing primary green color (`hsl(168, 76%, 36%)`), Josefin Sans / Anek Bangla fonts
- Bengali translations included for all LMS UI text


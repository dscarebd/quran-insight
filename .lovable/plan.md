

# Always-Visible LMS Floating Card

## Problem
The floating card at the bottom of the homepage only appears when a user has LMS progress or Quran reading history. For new users or users who haven't started a course, nothing shows — there's no entry point to the LMS.

## Solution
Make the `ContinueReading` component always show a floating card that links to `/courses`:

1. **If LMS course progress exists** -- Show the current "Continue Learning" card with progress bar (existing behavior)
2. **If no LMS progress but reading history exists** -- Show "Continue Reading" card (existing behavior)  
3. **If neither exists (NEW)** -- Show a default "Start Learning" / "শিখুন" card linking to `/courses`, styled the same way with a `GraduationCap` icon

This ensures the floating card is always visible as shown in the reference screenshot.

## Technical Details

### File: `src/components/ContinueReading.tsx`

- After the existing `if (!lastRead) return null` check (line 134), instead of returning null, render a default LMS access card
- The fallback card will:
  - Use the same fixed positioning (`fixed bottom-16 sm:bottom-4 ...`)
  - Show `GraduationCap` icon
  - Display "শিখুন" / "Start Learning" text and "কোর্স দেখুন" / "Browse Courses" subtitle
  - Navigate to `/courses` on click
- Priority order: LMS progress card > Reading card > Default courses card

No other files need changes since the `ContinueReading` component is already rendered on the homepage.

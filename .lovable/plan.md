

## Problem
The indicator dot on the countdown ring is tiny (`rx="6" ry="4"` ellipse) and barely visible, especially when it turns red. The user wants it to be more prominent and visually meaningful.

## Plan

**File: `src/pages/PrayerTimes.tsx` (lines 740-746)**

Replace the small ellipse with a larger, more prominent circle indicator:

1. Change `<ellipse rx="6" ry="4">` to `<circle r="7">` — a proper round dot, bigger and more visible
2. Add a white inner stroke to give it a "button" look that pops against the track
3. Increase the glow/shadow intensity so it stands out
4. Remove the rotation transform (not needed for a circle)

The dot will remain color-aware: green (primary) normally, red (destructive) under 15 minutes.


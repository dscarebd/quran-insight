
## Fix: Hijri Date Showing 30 Sha'ban Instead of 1 Ramadan

### Root Cause
The reference anchor date in `src/data/islamicCalendar.ts` is off by exactly 1 day.

The current reference says:
```
1 Rajab 1447 = December 22, 2025
```

Working the math forward to today (Feb 19, 2026):
- Dec 22 → Feb 19 = **59 days elapsed**
- Starting from day 1 of Rajab (month 7): 1 + 59 = day 60
- Rajab has 30 days → day 60 lands on **30 Sha'ban** (month 8, day 30)

But today is confirmed to be **1 Ramadan 1447**, which means the reference is 1 day behind. The correct astronomical date is:
```
1 Rajab 1447 = December 21, 2025  (not December 22)
```

OR more simply and accurately: use today's known verified date as the new anchor:
```
1 Ramadan 1447 = February 19, 2026
```

Using a closer and user-verified reference eliminates accumulated drift and is more reliable.

### Fix Plan — `src/data/islamicCalendar.ts`

**Change the reference anchor** from:
```ts
const REFERENCE_HIJRI = { year: 1447, month: 7, day: 1 };
const REFERENCE_GREGORIAN = new Date(2025, 11, 22); // December 22, 2025
```
To:
```ts
// Verified: 1 Ramadan 1447 = February 19, 2026
const REFERENCE_HIJRI = { year: 1447, month: 9, day: 1 };
const REFERENCE_GREGORIAN = new Date(2026, 1, 19); // February 19, 2026
```

This single change fixes:
1. The current Hijri date display (shows correct "1 Ramadan" today)
2. All upcoming Islamic event dates calculated from `getUpcomingEvents()`
3. The `hijriToGregorian()` function used for event date cards

### Files to Change
- **`src/data/islamicCalendar.ts`** — update the two reference constant lines only (lines 321–322)

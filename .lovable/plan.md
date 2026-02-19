
## Remove All Content from the Calendar Page

### What the User Wants
Clear the Islamic Calendar page of all existing content — events list, sticky header details, section titles, icons, badges, dates, and countdown. Leave it as a blank/empty page shell.

### What Currently Exists
The page renders:
1. A sticky header with a CalendarDays icon, page title, and current Hijri date
2. An "Upcoming Events" section title with a star icon
3. A list of up to 20 event cards, each with: category icon, event name, Arabic name, category badge, Hijri date, Gregorian date, and days-until countdown

### Plan
Replace the entire page content with a simple empty shell — just the outer `div` with the background class, no header, no events, no imports for unused data/icons. Keep the component signature intact so routing still works.

### Technical Changes — `src/pages/IslamicCalendar.tsx`

- Remove all imports except `Language` type (needed for props)
- Remove all helper functions (`getCategoryColor`, `getCategoryIconBg`, `getCategoryIcon`)
- Remove all data hooks and formatting functions from the component body
- Replace the JSX with a single empty `div`
- Keep the component export so the route `/islamic-calendar` doesn't break

**Result:**
```tsx
import { Language } from "@/types/language";

interface IslamicCalendarProps {
  language: Language;
}

const IslamicCalendar = ({ language }: IslamicCalendarProps) => {
  return (
    <div className="min-h-screen bg-background pb-24" />
  );
};

export default IslamicCalendar;
```

### Files to Change
- **`src/pages/IslamicCalendar.tsx`** — strip all content, keep empty shell

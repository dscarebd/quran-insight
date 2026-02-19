
## Split "Prayer & Calendar" into Two Cards + Add a Books Card

### Current State

The Quick Access cards currently has 5 items:
1. 99 Names of Allah
2. Prayer & Calendar (combined — links to `/prayer-times`)
3. Daily Duas
4. Masail
5. Bookmarks (desktop-only)

The grid is `grid-cols-2` on mobile (so only 4 visible cards in 2 rows).

### What the User Wants

- Split card #2 into two separate cards:
  - **Prayer Times** → `/prayer-times`
  - **Islamic Calendar** → `/islamic-calendar`
- Add a new **Books** card → `/read` (the QuranReadHub page showing Mushaf + PDF books)
- This gives **6 cards total** displayed in a **3-column grid** on mobile (2 rows × 3 cols)

### New Card List (in order)

| # | Label (EN) | Label (BN) | Path | Icon | Gradient |
|---|---|---|---|---|---|
| 1 | 99 Names of Allah | আল্লাহর ৯৯ নাম | `/names-of-allah` | Sparkles | sky→blue |
| 2 | Prayer Times | নামাজের সময় | `/prayer-times` | Clock | violet→purple |
| 3 | Daily Duas | দৈনিক দোয়া | `/daily-dua` | HandHeart | amber→orange |
| 4 | Masail | মাসআলা | `/masail` | HelpCircle | emerald→teal |
| 5 | Islamic Calendar | ইসলামিক ক্যালেন্ডার | `/islamic-calendar` | CalendarDays | cyan→sky |
| 6 | Books | বই সমূহ | `/read` | BookOpen | rose→pink |

### Technical Changes — `src/components/desktop/QuickAccessCards.tsx`

1. **Import** `CalendarDays` and `BookOpen` from `lucide-react` (alongside existing imports)
2. **Remove** the combined `prayer-calendar` entry
3. **Add** separate `prayer` entry (same gradient, just Prayer Times label)
4. **Add** `calendar` entry using `CalendarDays` icon with cyan gradient
5. **Add** `books` entry using `BookOpen` icon with rose→pink gradient (previously used for Bookmarks)
6. **Remove** `desktopOnly` from Bookmarks OR replace it with Books card — since we now have exactly 6 cards, no need for any `desktopOnly` hiding
7. **Change grid**: `grid-cols-3 lg:grid-cols-6` — 3 per row on mobile, 6 per row on desktop
8. **Fix label text**: change `truncate` to `line-clamp-2` with `text-[10px] sm:text-xs` to prevent cropping on small cards
9. **Shrink mobile icon**: `h-8 w-8` on mobile (`sm:h-10 sm:w-10` on larger), reduce padding to `p-2.5 sm:p-4`

### Files to Change

- **`src/components/desktop/QuickAccessCards.tsx`** — only file that needs changing

### Layout Diagram

```text
Mobile (3-col grid):
┌──────────┬──────────┬──────────┐
│ 99 Names │  Prayer  │  Daily   │
│ of Allah │  Times   │  Duas    │
├──────────┼──────────┼──────────┤
│  Masail  │ Islamic  │  Books   │
│          │ Calendar │          │
└──────────┴──────────┴──────────┘

Desktop (6-col grid):
┌───────┬───────┬───────┬───────┬───────┬───────┐
│Names  │Prayer │Duas   │Masail │Calendar│Books │
└───────┴───────┴───────┴───────┴───────┴───────┘
```

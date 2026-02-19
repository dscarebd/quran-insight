
## Remove Continue Cards & Show Course Cards on Homepage

### What the user sees now (to be removed)
- **"পড়া চালিয়ে যান" card** (`ContinuePlayingCard`) — the audio resume card shown in the screenshot
- **"ContinueReading" card** — the single LMS/Start Learning banner button

### What will replace them
A compact **course grid** embedded directly on the homepage, showing the same course cards as the `/courses` page — with thumbnail, title, description, and progress bar. Clicking a card navigates to that course.

---

### Files to change

**1. `src/pages/Index.tsx`**
- Remove the `ContinuePlayingCard` block (lines 106–115) entirely
- Remove the `ContinueReading` component (line 118) entirely
- Remove unused imports: `ContinueReading`, `ContinuePlayingCard`, `useLastPlayedPosition`
- Remove the `lmsContinueCourse` logic and related hooks (`useLmsProgress`, `useLmsCertificates`)
- Add a new **"Courses" section** between the Hero Search and Quick Access sections, rendering course cards inline using the same grid layout from `CourseList.tsx` — pulling data via `useLmsCourses`, `useLmsProgress`, `useLmsCertificates`

**2. `src/components/ContinueReading.tsx`** — no longer needed (can be left in place; it simply won't be imported/used)

---

### New homepage layout order
```text
1. Hero Search
2. [NEW] Courses Section (grid of course cards with progress)
3. Quick Access Cards
4. Daily Content (Verse, Dua, Hadith)
```

---

### Course section on homepage
- Section heading: "Courses" / "কোর্সসমূহ" with a "View all →" link
- Course cards rendered in a responsive grid (1 col mobile, 2 col sm, 3 col lg) — same card design as `CourseList`
- Shows thumbnail (or placeholder icon), title, description (2-line clamp), progress bar + count
- Completed courses show a gold "Completed" badge
- Skeleton loaders while fetching
- If no courses, section is hidden entirely (no empty state on homepage)

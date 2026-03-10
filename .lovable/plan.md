

## Plan: Reduce Prayer Times Page Content Sizes

The Prayer Times page uses larger paddings, font sizes, and spacing compared to other pages. Here are the specific reductions:

**File: `src/pages/PrayerTimes.tsx`**

1. **Hijri Date Header** (line 658): Reduce padding `p-5` → `p-3.5`, title `text-2xl` → `text-lg`, sunrise/sunset time `text-lg` → `text-sm`, icon `w-5 h-5` → `w-4 h-4`

2. **Countdown Circle** (line 689-742): Reduce circle container `w-52 h-52` → `w-40 h-40`, padding `p-6 md:p-8` → `p-4 md:p-6`, countdown text `text-2xl` → `text-xl`, prayer name heading `text-xl` → `text-base`, margin `mb-6` → `mb-4`

3. **SVG circle radius**: Reduce from `70` → `55` (line 517), update viewBox dimensions accordingly

4. **Sehri/Iftar cards** (line 782-805): Reduce `p-4` → `p-3`, time `text-lg` → `text-sm`

5. **Prohibited Times card** (line 811): Already uses `text-sm`, keep as-is

6. **Prayer list rows** (line 751): Reduce `px-5 py-3.5` → `px-4 py-2.5`

7. **Main container** (line 655): Reduce `py-4 space-y-4` → `py-3 space-y-3`

These changes will make the page feel more compact and consistent with the rest of the app.


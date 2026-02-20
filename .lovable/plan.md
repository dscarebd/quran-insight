

## Add Manual Location Selector to Prayer Times Page

### Current State
The Prayer Times page already has the Bangladesh hierarchical location data (8 divisions, 64 districts, 495+ upazilas) imported and state management wired up, but there is no visible UI for users to select their location manually. The location bar only shows the current city name and a GPS button.

### What Will Change

**Location Bar Enhancement** (in `src/pages/PrayerTimes.tsx`):
- Make the location bar clickable to expand a location selector panel
- Add a collapsible/expandable section below the location bar with:
  - A toggle between "Bangladesh" and "World" location modes
  - **Bangladesh mode**: Three cascading dropdowns -- Division, District, Upazila
  - **World mode**: The existing city select dropdown for international locations
- When a user selects a Bangladesh upazila, prayer times update immediately using that upazila's GPS coordinates
- Selected location is saved to localStorage (already wired up) so it persists across sessions

### UI Layout (Mobile-First)

```text
+--------------------------------------+
| [pin] Savar, Dhaka        [GPS btn]  |  <-- clickable to expand
+--------------------------------------+
| [Bangladesh] [World]                  |  <-- tab toggle
|                                       |
| Division:  [Dhaka        v]          |
| District:  [Dhaka        v]          |
| Upazila:   [Savar        v]          |
+--------------------------------------+
```

### Technical Details

1. **New state**: `showLocationPicker` (boolean) to toggle the selector panel visibility

2. **Location bar**: The existing `ChevronDown` icon area becomes a clickable trigger that toggles the selector panel

3. **Bangladesh tab**: Uses the existing `bangladeshDivisions` data, `handleDivisionChange`, `handleDistrictChange`, `handleUpazilaChange` functions, and `enableBangladeshLocation()` -- all already implemented but not exposed in the UI

4. **World tab**: Renders a `Select` dropdown with the existing `cityNames` entries, using the existing `handleCityChange` function

5. **Auto-close**: Panel closes after upazila selection (already handled via `setTimeout` in `handleUpazilaChange`) or when clicking outside

6. **Styling**: Uses existing `Card`, `Select`, `Button` components with Tailwind classes matching the page's teal/primary theme

### Files to Modify
- `src/pages/PrayerTimes.tsx` -- Add the location picker UI section between the location bar and the main content


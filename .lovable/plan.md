

## Plan: Add Daily Offline Sync for Tafsir (Stories) Page

**Current state:** Masail already has full offline sync via `useMasailOffline`. Stories/Tafsir fetches directly from the database — no offline support at all.

**Goal:** Stories sync once daily when user goes online. After sync, content is served from local IndexedDB (same as masail pattern).

### Changes

**1. Add Stories store to IndexedDB** (`src/services/offlineDataService.ts`)
- Bump `DB_VERSION` from 3 to 4
- Add `STORIES_STORE = "stories"` with keyPath `id`, indexes on `category`, `updated_at`
- Add `LocalStory` interface matching stories table columns
- Add CRUD functions: `saveStories()`, `getAllStories()`, `getStoryById()`, `getStoryCount()`
- Also add `STORY_CATEGORIES_STORE` for offline category access

**2. Create `useStoriesOffline` hook** (`src/hooks/useStoriesOffline.ts`)
- Follow exact pattern from `useMasailOffline`
- On mount: load from IndexedDB, then check for new content
- Sync only once per day (check `localStorage` timestamp, skip if already synced today)
- On `online` event: trigger daily sync check
- Incremental sync using `updated_at > lastSync`
- Also sync `story_categories` table
- Expose: `storiesList`, `categories`, `loading`, `isOffline`, `isSyncing`, `lastSyncTime`, `refresh`, `getStoryById`

**3. Update StoriesList** (`src/pages/StoriesList.tsx`)
- Replace both `useQuery` calls (stories + categories) with `useStoriesOffline` hook
- Add `OfflineIndicator` component
- Filter `is_published` client-side

**4. Update StoryDetail** (`src/pages/StoryDetail.tsx`)
- Replace `useQuery` for single story with `getStoryById` from offline hook
- Replace `useQuery` for all stories (prev/next nav) with offline list
- Fallback to database if not found locally and online

**5. Ensure Masail also syncs once daily** (`src/hooks/useMasailOffline.ts`)
- Add daily sync check: if last sync was today, skip the sync on mount
- Currently it syncs every time the page loads — change to once per day

### Daily Sync Logic (both hooks)
```typescript
const SYNC_KEY = "last-stories-sync";
const shouldSync = () => {
  const last = localStorage.getItem(SYNC_KEY);
  if (!last) return true;
  const lastDate = new Date(last).toDateString();
  return lastDate !== new Date().toDateString(); // once per day
};
```

### Files to modify/create
- `src/services/offlineDataService.ts` — add stories store + helpers
- `src/hooks/useStoriesOffline.ts` — new hook
- `src/pages/StoriesList.tsx` — use offline hook
- `src/pages/StoryDetail.tsx` — use offline hook
- `src/hooks/useMasailOffline.ts` — add daily sync throttle




## Rename "Books" Quick Access Card to "Stories"

A single-file change to update the "Books" card in the Quick Access grid to reflect story-type content.

### Changes in `src/components/desktop/QuickAccessCards.tsx`

- **Icon**: Change from `BookOpen` to `ScrollText` (better represents stories/narratives)
- **English label**: "Books" → "Stories"
- **Bengali label**: "বই সমূহ" → "গল্প সমূহ"
- **English description**: "Quran & Islamic books" → "Islamic Stories & Tafsir"
- **Bengali description**: "কুরআন ও ইসলামিক বই" → "ইসলামিক গল্প ও তাফসীর"
- **Gradient**: Keep the existing rose-to-pink gradient

### Technical Details

- Import `ScrollText` from `lucide-react` instead of `BookOpen`
- Only the last entry in the `quickLinks` array is modified
- No routing or backend changes needed -- the path remains `/read`


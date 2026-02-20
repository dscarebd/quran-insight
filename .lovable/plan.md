
## Fix Content Width to Match Header

Both the Stories List and Story Detail pages use narrower max-width containers than the desktop header, causing the content to appear narrower than the navigation bar.

### The Problem

| Component | Current Width | Required Width |
|---|---|---|
| Desktop Header | `max-w-6xl` (72rem) | `max-w-6xl` (no change) |
| Stories List | `max-w-5xl` (64rem) | `max-w-6xl` |
| Story Detail | `max-w-4xl` (56rem) | `max-w-6xl` |

### Changes

**1. `src/pages/StoriesList.tsx`**
- Change `max-w-5xl` to `max-w-6xl` on the main content wrapper

**2. `src/pages/StoryDetail.tsx`**
- Change `max-w-4xl` to `max-w-6xl` on the `<article>` wrapper

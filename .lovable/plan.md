
## Move "Back" Button to Top of Page (Desktop)

Currently the "Back" button is nested inside the side-by-side (image + details) layout on desktop. The user wants it placed at the very top of the article area, above the cover image layout, so it's always visible at the top.

### Changes

**`src/pages/StoryDetail.tsx`**

1. Add a standalone "Back" button at the top of the `<article>` element, visible only on desktop (`hidden md:inline-flex`)
2. Remove the existing "Back" button from inside the side-by-side layout (lines 132-140) to avoid duplication
3. Also keep the existing standalone back button for the no-cover-image desktop case but remove duplication

### Technical Detail

Inside the `<article>` tag (line 126), insert a new back button before the side-by-side layout:

```tsx
<article className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-6 sm:py-8">
  {/* Desktop: Back button at top */}
  <Button
    variant="ghost"
    size="sm"
    onClick={() => navigate("/stories")}
    className={cn("mb-4 -ml-2 w-fit hidden md:inline-flex", language === "bn" && "font-bengali")}
  >
    <ArrowLeft className="h-4 w-4 mr-1.5" />
    {language === "bn" ? "ফিরে যান" : "Back"}
  </Button>

  {/* Desktop: side-by-side layout ... */}
```

Then remove the back button from inside the side-by-side meta section (lines 132-140) and from the no-cover desktop section to avoid duplicates.

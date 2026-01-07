// QPC V1 Font Loader - Dynamically loads King Fahad Complex V1 page-based fonts
// Each Quran page (1-604) has its own font file with unique glyph codes
// Using nuqayah/qpc-fonts repo on GitHub (raw.githubusercontent.com)

const FONT_CDN_BASE = 'https://raw.githubusercontent.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff2';

// Track which fonts are already loaded
const loadedFonts = new Set<number>();
const loadingFonts = new Map<number, Promise<void>>();

// Format page number to 3-digit string (001, 002, ... 604)
const formatPageNumber = (pageNumber: number): string => {
  return pageNumber.toString().padStart(3, '0');
};

// Create and inject @font-face rule for a specific page
const injectFontFace = (pageNumber: number): void => {
  const fontFamily = `p${pageNumber}-v1`;
  const paddedPage = formatPageNumber(pageNumber);
  const fontUrl = `${FONT_CDN_BASE}/QCF_P${paddedPage}.woff2`;
  
  // Check if already exists
  if (document.querySelector(`style[data-font="${fontFamily}"]`)) {
    return;
  }
  
  const style = document.createElement('style');
  style.setAttribute('data-font', fontFamily);
  style.textContent = `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontUrl}') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};

// Load a single font for a page
export const loadPageFont = async (pageNumber: number): Promise<void> => {
  // Validate page number
  if (pageNumber < 1 || pageNumber > 604) {
    console.warn(`Invalid Quran page number: ${pageNumber}`);
    return;
  }
  
  // Already loaded
  if (loadedFonts.has(pageNumber)) {
    return;
  }
  
  // Already loading
  if (loadingFonts.has(pageNumber)) {
    return loadingFonts.get(pageNumber);
  }
  
  // Start loading
  const loadPromise = (async () => {
    try {
      // Inject @font-face rule
      injectFontFace(pageNumber);
      
      const fontFamily = `p${pageNumber}-v1`;
      const paddedPage = formatPageNumber(pageNumber);
      const fontUrl = `${FONT_CDN_BASE}/QCF_P${paddedPage}.woff2`;
      
      // Preload the font file
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = fontUrl;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      // Wait for font to be ready using FontFace API
      if ('fonts' in document) {
        await document.fonts.load(`400 48px "${fontFamily}"`);
      } else {
        // Fallback: just wait a bit for the font to load
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      loadedFonts.add(pageNumber);
    } catch (error) {
      console.error(`Failed to load font for page ${pageNumber}:`, error);
    } finally {
      loadingFonts.delete(pageNumber);
    }
  })();
  
  loadingFonts.set(pageNumber, loadPromise);
  return loadPromise;
};

// Preload fonts for adjacent pages (for smooth scrolling)
export const preloadAdjacentFonts = async (currentPage: number): Promise<void> => {
  const pagesToPreload = [
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ].filter(p => p >= 1 && p <= 604);
  
  await Promise.all(pagesToPreload.map(loadPageFont));
};

// Load fonts for a range of pages
export const loadFontsForPageRange = async (startPage: number, endPage: number): Promise<void> => {
  const pages: number[] = [];
  for (let p = Math.max(1, startPage); p <= Math.min(604, endPage); p++) {
    pages.push(p);
  }
  await Promise.all(pages.map(loadPageFont));
};

// Get font family name for a page
export const getPageFontFamily = (pageNumber: number): string => {
  return `p${pageNumber}-v1`;
};

// Check if a font is loaded
export const isFontLoaded = (pageNumber: number): boolean => {
  return loadedFonts.has(pageNumber);
};

// Check if a font is currently loading
export const isFontLoading = (pageNumber: number): boolean => {
  return loadingFonts.has(pageNumber);
};

// Get count of loaded fonts
export const getLoadedFontsCount = (): number => {
  return loadedFonts.size;
};

// Clear all loaded fonts (useful for memory management)
export const clearLoadedFonts = (): void => {
  // Remove all injected style elements
  document.querySelectorAll('style[data-font^="p"][data-font$="-v1"]').forEach(el => el.remove());
  loadedFonts.clear();
};

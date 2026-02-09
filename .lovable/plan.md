
# API Documentation Page

## Overview
Create a dedicated API documentation page that allows developers to access all Islamic data (Surahs, Verses, Hadiths, Duas, Masail/Rulings) through simple API endpoints. This will enable other developers to build their own Islamic apps using your comprehensive database.

## What You'll Get

### Public API Endpoints
Developers will be able to access:

| Data Type | Description | Approx Records |
|-----------|-------------|----------------|
| Surahs | All 114 Surah metadata | 114 |
| Verses | Complete Quran with Arabic, Bengali, English + Tafsir | 6,236 |
| Hadiths | Multiple collections (Bukhari, Muslim, etc.) | 10,000+ |
| Duas | Categorized supplications with translations | 100+ |
| Dua Categories | 20 categories for organization | 20 |
| Masail | Islamic rulings/fatwas | 500+ |
| Hadith Books | Available hadith collections | 10+ |

### Example API Calls
Developers can simply call:
- `GET /api/surahs` - All 114 Surahs
- `GET /api/verses?surah=1` - Verses of Surah Al-Fatiha
- `GET /api/hadiths?book=bukhari` - Bukhari hadiths
- `GET /api/duas` - All duas with translations
- `GET /api/masail` - Islamic rulings

## Page Features

1. **Hero Section**
   - Eye-catching header with "Islamic Data API"
   - Brief description of what the API offers
   - Quick stats (6,236+ verses, 10,000+ hadiths, etc.)

2. **Quick Start Guide**
   - Base URL display with copy button
   - Simple code example showing how to fetch data
   - Supported response formats (JSON)

3. **Endpoints Documentation**
   - Each endpoint in a collapsible card
   - Method (GET), path, description
   - Query parameters with explanations
   - Sample response preview
   - "Try It" button that shows live response

4. **Data Structure Examples**
   - Sample JSON for each data type
   - Field descriptions

5. **Rate Limiting Info**
   - Fair usage policy
   - Request limits (if any)

6. **Contact Section**
   - Link to contact for custom needs
   - Attribution requirements

## Technical Implementation

### Files to Create

| File | Purpose |
|------|---------|
| `src/pages/ApiDocs.tsx` | Main API documentation page |
| `supabase/functions/public-api/index.ts` | Unified API endpoint |

### Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add `/api` route |
| `src/pages/Settings.tsx` | Add link to API docs in "App Info" section |
| `supabase/config.toml` | Configure new edge function |

### New Edge Function: `public-api`

A single, well-designed edge function that handles all public API requests:

```text
Base URL: https://iacjtvvlyxkmrzaxkedk.supabase.co/functions/v1/public-api

Endpoints:
GET /public-api/surahs           - List all 114 surahs
GET /public-api/verses           - Get verses (with filters)
GET /public-api/hadiths          - Get hadiths (with filters)
GET /public-api/hadith-books     - List hadith collections
GET /public-api/duas             - Get all duas
GET /public-api/dua-categories   - List dua categories
GET /public-api/masail           - Get Islamic rulings

Query Parameters:
- surah: Filter verses by surah number (1-114)
- para: Filter verses by para/juz number (1-30)
- book: Filter hadiths by book slug
- category: Filter duas by category_id
- limit: Number of results (default: 100, max: 1000)
- offset: Pagination offset
```

### API Response Format

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 6236,
    "limit": 100,
    "offset": 0
  }
}
```

### Page Design (matching app style)

- Sticky header with back button and title
- Bengali/English language support
- Dark/Light theme compatible
- Card-based sections with rounded corners
- Interactive code blocks with syntax highlighting
- Copy buttons for code snippets
- Collapsible endpoint documentation

## User Flow

1. User visits `/api` page
2. Sees overview of available data
3. Views base URL and quick start code
4. Browses endpoint documentation
5. Clicks "Try It" to see live responses
6. Copies code snippets for their projects
7. Uses API in their own apps!

## Implementation Order

1. Create the edge function `public-api` with all endpoints
2. Create `ApiDocs.tsx` page with full documentation
3. Add route to `App.tsx`
4. Add link in Settings page under "App Info" section
5. Test all endpoints work correctly

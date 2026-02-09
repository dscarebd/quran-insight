
# Add Multi-Language Code Examples to API Docs

## Overview
Enhance the API documentation page with code examples in multiple programming languages (JavaScript, Python, cURL, PHP, and Go) to help developers integrate the API in their preferred language.

## What Will Be Added

### New "Code Examples" Section
A dedicated tabbed section between "Quick Start" and "Endpoints" showing the same API call in different languages:

| Language | Use Case |
|----------|----------|
| JavaScript | Web apps, Node.js backends |
| Python | Data science, scripts, Django/Flask apps |
| cURL | Terminal testing, shell scripts |
| PHP | WordPress plugins, Laravel apps |
| Go | High-performance backends |

### Code Examples Content

Each language will show how to:
1. Fetch all Surahs (basic GET request)
2. Fetch verses with filters (query parameters)
3. Handle the JSON response

### Example Previews

**JavaScript (Fetch)**
```javascript
const response = await fetch(
  "https://iacjtvvlyxkmrzaxkedk.supabase.co/functions/v1/public-api/surahs"
);
const data = await response.json();
console.log(data);
```

**Python (requests)**
```python
import requests

response = requests.get(
    "https://iacjtvvlyxkmrzaxkedk.supabase.co/functions/v1/public-api/surahs"
)
data = response.json()
print(data)
```

**cURL**
```bash
curl -X GET "https://iacjtvvlyxkmrzaxkedk.supabase.co/functions/v1/public-api/surahs"
```

**PHP**
```php
$response = file_get_contents(
    "https://iacjtvvlyxkmrzaxkedk.supabase.co/functions/v1/public-api/surahs"
);
$data = json_decode($response, true);
print_r($data);
```

**Go**
```go
resp, err := http.Get(
    "https://iacjtvvlyxkmrzaxkedk.supabase.co/functions/v1/public-api/surahs"
)
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)
fmt.Println(string(body))
```

## UI Design

### Tabbed Interface
- Horizontal tabs for each language with language icons/names
- Active tab highlighted with primary color
- Copy button for each code block
- Smooth transitions between tabs

### Visual Style
- Code blocks with syntax-appropriate styling
- Language name badge on each tab
- Bengali/English language support for labels
- Matches existing card-based design

## Page Structure (After Changes)

1. Header (existing)
2. Hero Section with stats (existing)
3. Quick Start - Base URL only (simplified)
4. **Code Examples** (new tabbed section)
5. Endpoints (existing)
6. Common Parameters (existing)
7. Attribution (existing)

## Technical Implementation

### File to Modify
`src/pages/ApiDocs.tsx`

### Changes
1. Add new state for selected language tab
2. Create code examples data structure for each language
3. Add new Card component with Tabs for language selection
4. Each tab contains the code example with copy functionality
5. Support both simple (Surahs) and filtered (Verses) examples

### Components Used
- Existing `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from Radix UI
- Existing `Card`, `Button`, `Badge` components
- Existing copy-to-clipboard functionality

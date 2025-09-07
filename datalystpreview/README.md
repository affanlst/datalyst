# Job Salary Dashboard - Datalyst Preview

Comprehensive analysis dashboard untuk data professional salaries dengan visualisasi interaktif dan AI insights.

## 🚀 Fitur

- **Overview Dashboard**: KPI cards, trend lines, dan charts overview
- **Countries Analysis**: Bar chart negara dengan tabel detail
- **Roles Analysis**: Pencarian dan sorting roles dengan filter dinamis
- **Levels Analysis**: Analisis progression salary berdasarkan experience level
- **AI Insights**: IBM Granite-generated insights dan recommendations
- **Responsive Design**: Mobile-friendly dengan navigation yang adaptif

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Validation**: Zod (optional)
- **TypeScript**: Full type safety

## 📁 Struktur Proyek

```
app/
  page.tsx                -> Overview (KPI + charts + insights)
  countries/page.tsx      -> Countries analysis
  roles/page.tsx          -> Roles dengan search/filter
  levels/page.tsx         -> Experience levels analysis
  insights/page.tsx       -> AI insights page
  layout.tsx              -> Root layout dengan navigation

components/
  KpiCard.tsx            -> KPI display cards
  TrendLine.tsx          -> Line chart untuk trends
  BarValue.tsx           -> Reusable bar charts
  Insights.tsx           -> AI insights renderer
  CountryTable.tsx       -> Countries detail table
  RoleSearch.tsx         -> Search/filter controls
  Navigation.tsx         -> Mobile-responsive navigation
  ui/                    -> shadcn/ui components

lib/
  load.ts                -> JSON loading utilities
  types.ts               -> Data type definitions
  guards.ts              -> Zod validation schemas
  utils.ts               -> Utility functions

public/
  data/
    countries.json       -> Countries salary data
    roles.json          -> Roles salary data
    levels.json         -> Experience levels data
    trends.json         -> Historical trends
    insights.json       -> AI-generated insights
```

## 📊 Data Contract

Semua data menggunakan format standar dengan kontrak yang konsisten:

```typescript
// Countries & Roles & Levels
{
  meta: { currency: "USD", min_sample_size: number, ... },
  items: [{ 
    [key]: string, 
    p25: number, 
    p50: number, 
    p75: number, 
    n: number 
  }]
}

// Trends
{
  meta: { currency: "USD", latest_year: number },
  series: [{ year: number, p50: number, n: number }]
}

// Insights
{
  meta: { format: "json"|"text", currency: "USD" },
  bullets?: string[],
  recommendation?: string,
  insight?: any
}
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

## 📱 Mobile Support

Dashboard fully responsive dengan:
- Collapsible navigation untuk mobile
- Grid layouts yang adaptif (1 kolom di mobile, 2-3 kolom di desktop)
- Chart labels yang terpotong otomatis
- Touch-friendly controls

## 🎯 Acceptance Criteria

✅ **Overview Page**:
- 3 KPI cards (Top Country, Top Role, Latest Year)
- Line chart trend salary per tahun
- 2 Bar charts (Countries & Roles top 12)
- Bar chart levels (EX→SE→MI→EN order)
- AI insights (bullets + recommendation)

✅ **Countries Page**:
- Bar chart sorted by p50 descending
- Detail table dengan semua columns
- Sample size warnings

✅ **Roles Page**:
- Search input (case-insensitive)
- Sort by p50 atau sample size
- Max 20 results display
- Real-time filtering

✅ **Levels Page**:
- Fixed order: EX→SE→MI→EN
- SE/EN ratio calculation
- Level progression table

✅ **Insights Page**:
- JSON format rendering (bullets + recommendation)
- Fallback untuk text format
- IBM Granite branding

✅ **General**:
- No errors pada data kosong (menampilkan "-" atau "No data")
- Mobile responsive (grid collapse ke 1 kolom)
- Consistent fmtUSD formatting
- Navigation antar halaman

## 🔧 Utilities

### loadJSON Helper
```typescript
import { loadJSON, fmtUSD } from "@/lib/load";

const data = await loadJSON<Countries>("/data/countries.json");
const formatted = fmtUSD(135000); // "$135,000"
```

### Type Safety
```typescript
import { Countries, Roles, Levels, Trends, Insights } from "@/lib/types";
```

### Validation (Optional)
```typescript
import { CountriesZ } from "@/lib/guards";
const validated = CountriesZ.parse(data);
```

## 🎨 Styling Guidelines

- Gunakan shadcn Card untuk semua blok konten
- `text-muted-foreground` untuk teks sekunder
- Consistent spacing dengan Tailwind utilities
- Tooltip untuk hints dan explanations
- Loading states dan error boundaries

## 🚀 Deployment

Project siap deploy ke Vercel atau platform lain:

```bash
npm run build
npm start
```

## 📝 Notes

- Data currency dinormalisasi ke USD
- Sample sizes minimum: Countries ≥5, Roles ≥3
- AI insights generated dengan IBM Granite model
- Mobile viewport tested di 375px
- Lighthouse accessibility compliance

---

**Dibuat dengan ❤️ menggunakan Next.js, shadcn/ui, dan Recharts**

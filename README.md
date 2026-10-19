# CHARCHIT STUDIOS — THE DIGITAL CRAFT HOUSE
> **“Make your business worth talking about.”**

An independent Indian digital craft house uniting classical craftsmanship (kalamkari, wasli paper textures, jharokha architectural framing, and calligraphic strokes) with modern high-performance digital engineering (Next.js 16 App Router, TypeScript, Tailwind CSS, Zod, and Supabase PostgreSQL).

---

## Brand & Visual Philosophy

- **Primary Palette**: Deep Indigo Navy (`#080E21`, `#14224A`), Warm Ivory & Muted Wasli Parchment (`#FAF7F2`, `#F4EFE6`), Antique Brass & Gold Foil (`#C5A059`, `#DEB868`), Restrained Terracotta (`#A6472D`).
- **Typography Hierarchy**: Distinctive high-contrast editorial serif (*Cormorant Garamond*) paired with crisp, highly readable sans-serif (*Plus Jakarta Sans*).
- **Architectural Framing**: Traditional Indian *jharokha* arches, stone jaali grid patterns, and authentic floral toran borders extracted directly from the uploaded brand identity.
- **Strict Authenticity Rule**: Zero dummy data, zero fake testimonials, zero fabricated client logos. Real database persistence with intentional, art-directed empty states.

---

## 4 Signature Working Features

1. **The Studio Canvas (`/` & `/studio`)**:
   An interactive artisan worktable featuring layered wasli paper plates, typography specimens, authentic kalamkari textile swatches, and the official *Charchit Estd. 2026* wax seal. Responsive and interactive with pointer movement and dragging.
2. **The Project Brief Builder (`/contact`)**:
   A 4-step interactive project planner allowing prospective partners to define their enterprise, select craft disciplines, configure timeline/budget expectations, and submit a detailed brief directly to the studio database ledger. Complete with celebratory confetti and an Archival Ledger Reference ID.
3. **The Fourfold Craft Process (`/studio#process`)**:
   An architectural 4-stage progression:
   - *Stage I: Samvad (संवाद)* — Discovery & Philosophical Dialogue
   - *Stage II: Kala (कला)* — Art Direction & Aesthetic Architecture
   - *Stage III: Nirman (निर्माण)* — Digital Construction & High-Performance Engineering
   - *Stage IV: Vistar (विस्तार)* — Amplification, Launch & Operations
4. **Art-Directed Case Study Storytelling (`/work` & `/work/[slug]`)**:
   Editorial portfolio gallery supporting category filtering, variable image aspect ratios, deliverable specifications, and approved outcomes. Displays an intentional archival preparation empty state when no projects are published.
5. **Digital Calling Card & vCard (`/contact`)**:
   Shareable digital calling card with one-click email copying and dynamic `.vcf` vCard contact download generated directly from configured studio coordinates.

---

## Project Structure & Architecture

```
├── .data/                               # Auto-created local JSON database store
├── public/
│   └── brand/                          # Studio brand identity assets
│       ├── charchit-logo.jpg            # Original brand reference
│       ├── charchit-wordmark.png        # Transparent indigo script wordmark
│       ├── charchit-wordmark-light.png  # Warm ivory/gold script wordmark
│       ├── charchit-top-border.png      # Authentic kalamkari border pattern
│       └── reference-ui.jpg             # Architectural heritage UI reference
├── src/
│   ├── actions/
│   │   ├── admin.ts                    # Administrative auth & CRUD server actions
│   │   └── enquiry.ts                  # Zod validation & inquiry persistence
│   ├── app/
│   │   ├── admin/                      # Curator Portal & Admin CMS
│   │   │   ├── login/page.tsx          # Passkey authentication
│   │   │   └── page.tsx                # Inquiry ledger, Project, Article, Discipline & Settings CMS
│   │   ├── contact/page.tsx            # Contact inquiry & Brief Builder
│   │   ├── journal/                    # The Studio Journal listing
│   │   │   └── [slug]/page.tsx         # Journal essay detail route
│   │   ├── services/                   # Disciplines overview
│   │   │   └── [slug]/page.tsx         # Dynamic discipline detail route
│   │   ├── studio/page.tsx             # Studio philosophy, canons, and origin
│   │   ├── work/                       # Selected Work archive
│   │   │   └── [slug]/page.tsx         # Case study detail route
│   │   ├── privacy/page.tsx            # Privacy policy with review notice
│   │   ├── terms/page.tsx              # Terms of engagement with review notice
│   │   ├── not-found.tsx               # Custom Indian craft 404 page
│   │   ├── sitemap.ts                  # Dynamic XML sitemap
│   │   ├── robots.ts                   # Robots.txt configuration
│   │   ├── globals.css                 # Craft design system, jharokha arches, wasli textures
│   │   ├── layout.tsx                  # Root layout with Cormorant Garamond & Plus Jakarta Sans
│   │   └── page.tsx                    # Art-directed studio homepage
│   ├── components/
│   │   ├── admin/                      # Admin CMS client dashboard
│   │   ├── features/                   # StudioCanvas, BriefBuilder, CallingCard, ContactForm
│   │   ├── layout/                     # Navbar, Footer
│   │   ├── ui/                         # CustomCursor, LotusOrnament, StudioSeal, ToranDivider
│   │   └── work/                       # WorkGallery
│   └── lib/
│       ├── store.ts                    # Unified data store with local & Supabase fallback
│       ├── supabase.ts                 # Supabase client wrapper
│       └── types.ts                    # TypeScript types
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql      # Production PostgreSQL migration with RLS policies
```

---

## Local Development & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template to your local environment file:
```bash
cp .env.example .env.local
```

Default credentials out of the box:
- **Curator Portal**: `http://localhost:3000/admin`
- **Administrative Passkey**: `charchit2026!` (configured via `ADMIN_PASSWORD`)

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase PostgreSQL Integration (Production Ready)

The application features a **Dual-Mode Data Architecture**:
1. **Local Mode (Active by default)**: Uses zero-setup persistent storage in `.data/charchit_store.json`. All inquiry submissions, project additions, journal essays, and settings edits work immediately with zero external dependencies.
2. **Supabase Mode**: When you create a Supabase project:
   - Run the provided SQL migration in `supabase/migrations/001_initial_schema.sql` via the Supabase SQL Editor.
   - Set the following in `.env.local`:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
     ```
   - Row-Level Security (RLS) is pre-configured: public visitors can read published content and submit inquiries, but cannot view anyone else's inquiries. Authenticated administrators have full CRUD access.

---

## Production Verification & Build

```bash
# Type check and build all 22 static and dynamic routes
npm run build

# Start production server
npm start
```

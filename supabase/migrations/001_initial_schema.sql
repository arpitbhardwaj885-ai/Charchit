-- ====================================================================
-- CHARCHIT STUDIOS — PRODUCTION DATABASE MIGRATION (SUPABASE POSTGRESQL)
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  short_description TEXT NOT NULL,
  business_problem TEXT,
  approach_and_deliverables TEXT,
  client_inputs_needed TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECT CATEGORIES
CREATE TABLE IF NOT EXISTS public.project_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  display_order INT DEFAULT 0
);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT,
  category_id UUID REFERENCES public.project_categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  year TEXT DEFAULT '2026',
  excerpt TEXT NOT NULL,
  brief TEXT,
  challenge TEXT,
  approach TEXT,
  deliverables TEXT[] DEFAULT '{}',
  outcomes TEXT,
  cover_image TEXT,
  aspect_ratio TEXT DEFAULT 'landscape', -- 'landscape', 'portrait', 'square'
  live_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECT IMAGES GALLERY
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ARTICLE CATEGORIES
CREATE TABLE IF NOT EXISTS public.article_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- 7. JOURNAL ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  reading_time_minutes INT DEFAULT 5,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT,
  service_interest TEXT NOT NULL,
  budget_range TEXT,
  project_brief TEXT NOT NULL,
  source TEXT DEFAULT 'contact_form', -- 'contact_form' or 'brief_builder'
  brief_details JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'closed'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'general',
  studio_name TEXT DEFAULT 'Charchit Studios',
  tagline TEXT DEFAULT 'Make your business worth talking about.',
  studio_email TEXT DEFAULT 'namaste@charchitstudios.com',
  studio_phone TEXT DEFAULT '+91 98100 00000',
  studio_location TEXT DEFAULT 'New Delhi & Mumbai, Bharat',
  instagram_url TEXT DEFAULT 'https://instagram.com/charchitstudios',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/company/charchitstudios',
  twitter_url TEXT DEFAULT 'https://x.com/charchitstudios',
  behance_url TEXT,
  meta_description TEXT DEFAULT 'The Digital Craft House uniting classical Indian craftsmanship and high-performance digital engineering.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_slug TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Only published content)
CREATE POLICY "Public read published services" ON public.services
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read project categories" ON public.project_categories
  FOR SELECT USING (true);

CREATE POLICY "Public read published projects" ON public.projects
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read project images" ON public.project_images
  FOR SELECT USING (true);

CREATE POLICY "Public read article categories" ON public.article_categories
  FOR SELECT USING (true);

CREATE POLICY "Public read published articles" ON public.articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read site settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public read published faqs" ON public.faqs
  FOR SELECT USING (is_published = true);

-- CONTACT ENQUIRIES POLICIES
-- Public can INSERT enquiries, but CANNOT SELECT/READ anyone else's enquiries
CREATE POLICY "Public can submit enquiries" ON public.contact_enquiries
  FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (Authenticated admin users)
CREATE POLICY "Admin full access services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access projects" ON public.projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access project_categories" ON public.project_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access project_images" ON public.project_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access articles" ON public.articles
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access article_categories" ON public.article_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access enquiries" ON public.contact_enquiries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access site_settings" ON public.site_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access faqs" ON public.faqs
  FOR ALL USING (auth.role() = 'authenticated');

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  short_description: string;
  business_problem?: string;
  approach_and_deliverables?: string;
  client_inputs_needed?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption?: string;
  display_order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client_name?: string;
  category_id?: string;
  category_name: string;
  year: string;
  excerpt: string;
  brief?: string;
  challenge?: string;
  approach?: string;
  deliverables: string[];
  outcomes?: string;
  cover_image?: string;
  aspect_ratio: "landscape" | "portrait" | "square";
  live_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category_id?: string;
  category_name: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  reading_time_minutes: number;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export type EnquiryStatus = "new" | "contacted" | "in_progress" | "closed";

export interface ContactEnquiry {
  id: string;
  full_name: string;
  email: string;
  business_name?: string;
  service_interest: string;
  budget_range?: string;
  project_brief: string;
  source: "contact_form" | "brief_builder";
  brief_details?: Record<string, unknown>;
  status: EnquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  studio_name: string;
  tagline: string;
  studio_email: string;
  studio_phone: string;
  studio_location: string;
  instagram_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  behance_url?: string;
  meta_description: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  service_slug?: string;
  question: string;
  answer: string;
  display_order: number;
  is_published: boolean;
}

export interface ProjectBriefInput {
  business_name?: string;
  industry?: string;
  website_url?: string;
  primary_goal?: string;
  services: string[];
  scope_notes?: string;
  timeline_expectation?: string;
  budget_bracket?: string;
  client_name: string;
  client_email: string;
  additional_notes?: string;
}

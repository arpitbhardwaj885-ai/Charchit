import fs from "fs/promises";
import path from "path";
import {
  Service,
  Project,
  Article,
  ContactEnquiry,
  SiteSettings,
  FAQ,
  ProjectCategory,
} from "./types";

interface DBStore {
  services: Service[];
  project_categories: ProjectCategory[];
  projects: Project[];
  articles: Article[];
  contact_enquiries: ContactEnquiry[];
  site_settings: SiteSettings;
  faqs: FAQ[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "charchit_store.json");

// Genuine initial state: Core studio services, studio essays, site settings, and zero fake client projects
const DEFAULT_STORE: DBStore = {
  services: [
    {
      id: "srv-web-craft",
      slug: "website-design-development",
      title: "Website Design & Development",
      subtitle: "Bespoke Digital Flagships & Editorial Experiences",
      short_description:
        "Art-directed web experiences engineered with classical craft aesthetics, bespoke typography, and modern high-performance code.",
      business_problem:
        "Most corporate websites look indistinguishable from SaaS templates. They suffer from generic aesthetics, lack of cultural identity, slow load times, and poor conversion.",
      approach_and_deliverables:
        "We treat your digital presence as a flagship architectural space. From bespoke design tokens to custom motion and production deployment, every interaction is intentionally crafted.",
      client_inputs_needed:
        "Brand identity assets, business objectives, primary conversion actions, and architectural preferences.",
      display_order: 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "srv-content",
      slug: "content-creation",
      title: "Content Creation & Editorial Direction",
      subtitle: "Compelling Narrative, Art Direction & Copywriting",
      short_description:
        "Editorial storytelling, brand narratives, and visual asset direction that give your business a distinctive, authoritative voice.",
      business_problem:
        "Generic marketing copy and bland stock visuals dilute brand authority and fail to engage discerning modern clients.",
      approach_and_deliverables:
        "We author authoritative brand voices, editorial manifestos, bespoke iconography, and art-directed visual narratives tailored to your industry.",
      client_inputs_needed:
        "Company philosophy, founder vision, target audience profiles, and foundational brand guidelines.",
      display_order: 2,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "srv-digital-marketing",
      slug: "digital-marketing",
      title: "Digital Marketing & Brand Positioning",
      subtitle: "Culturally Resonant Campaigns & Strategic Reach",
      short_description:
        "Organic positioning, targeted digital campaigns, and distribution strategies that build authentic brand prestige.",
      business_problem:
        "High ad spend on fragmented campaigns often attracts low-intent traffic without building genuine brand affinity or loyalty.",
      approach_and_deliverables:
        "We align distribution channels with your core brand ethos, designing campaigns that foster organic word-of-mouth and measurable demand.",
      client_inputs_needed:
        "Historical campaign performance data, target customer demographics, and quarterly commercial objectives.",
      display_order: 3,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "srv-lead-gen",
      slug: "lead-generation",
      title: "Lead Generation & High-Touch Inquiries",
      subtitle: "Frictionless High-Value Client Acquisition",
      short_description:
        "Tailored inquiry funnels, brief builders, and qualification journeys designed to attract and convert serious high-value clients.",
      business_problem:
        "High-value service businesses often rely on clumsy contact forms that overwhelm with spam or fail to qualify client expectations.",
      approach_and_deliverables:
        "We build interactive brief builders, transparent qualification pathways, and instant notification pipelines tailored to boutique consultancies.",
      client_inputs_needed:
        "Ideal client profile (ICP), qualifying questions, service tiers, and sales cycle specifics.",
      display_order: 4,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "srv-automation",
      slug: "business-automation",
      title: "Business Automation & Operations",
      subtitle: "Seamless Internal Systems & Workflow Engineering",
      short_description:
        "Connecting your digital front-end with CRM, client onboarding, notification engines, and automated business workflows.",
      business_problem:
        "Manual client onboarding and disconnected communication tools waste valuable creative hours and create friction in delivery.",
      approach_and_deliverables:
        "We integrate database hooks, CRM sync, auto-scheduled discovery calendars, and client portals for effortless operation.",
      client_inputs_needed:
        "Existing software stack, team operational bottlenecks, and client onboarding milestones.",
      display_order: 5,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  project_categories: [
    { id: "cat-1", name: "Digital Flagships", slug: "digital-flagships", display_order: 1 },
    { id: "cat-2", name: "Brand Systems", slug: "brand-systems", display_order: 2 },
    { id: "cat-3", name: "Editorial Platforms", slug: "editorial-platforms", display_order: 3 },
  ],
  projects: [], // Strict rule: No fake projects. Real projects are added via admin or empty state shown.
  articles: [
    {
      id: "art-1",
      slug: "philosophy-of-digital-wasli",
      title: "The Philosophy of Digital Wasli: Why Handcrafted Detail Outlasts Generic Templates",
      category_name: "Design Philosophy",
      excerpt:
        "In classical Indian miniature painting, wasli paper is prepared by layering sheets by hand until it achieves an archival permanence. What happens when digital interfaces adopt the same devotion to craft?",
      content: `The word 'Charchit' denotes something talked about, celebrated in discourse, remembered through word of mouth. In an era dominated by instantaneous digital templates, most web properties dissolve into visual anonymity within seconds.

When we look back at the master craftsmen of Jaipur, the woodblock printers of Sanganer, and the manuscript calligraphers of Kashmir, their work was distinguished not by speed, but by intention. The paper itself—wasli—was layered meticulously with rice paste, burnished with agate stone, and treated to withstand centuries.

In digital engineering, our wasli is the underlying architecture: clean semantic HTML, bespoke CSS tokens, purposeful micro-animations, and unhurried editorial layouts. When an interface feels like it was shaped by human hands rather than an assembly line, users instinctively linger. They read. They remember. They talk about it.`,
      cover_image: "/brand/reference-ui.jpg",
      reading_time_minutes: 4,
      is_published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "art-2",
      slug: "architecture-of-attention",
      title: "The Architecture of Attention: Reimagining the Indian Jharokha in Web Design",
      category_name: "UX Architecture",
      excerpt:
        "How traditional Indian architectural elements—the jharokha, the courtyard, and the carved jaali—teach us to guide user attention through negative space and framing.",
      content: `In traditional Rajput and Mughal architecture, the jharokha served a dual purpose: it framed the world for the observer while establishing an ornamental focus for those looking from below.

Digital interfaces in recent years have succumbed to visual chaos: floating widgets, flashing banners, and aggressive popups. By contrast, an architectural approach to web layout uses framing, generous negative space, and rhythmic intervals to create serenity.

When we frame a case study or an editorial thesis inside an intentional arch or dual hairline rule, we invite the eye to pause. It signals that what lies inside is worthy of contemplation.`,
      cover_image: "/brand/charchit-logo.jpg",
      reading_time_minutes: 5,
      is_published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  contact_enquiries: [],
  site_settings: {
    id: "general",
    studio_name: "Charchit Studios",
    tagline: "Make your business worth talking about.",
    studio_email: "namaste@charchitstudios.com",
    studio_phone: "+91 98100 00000",
    studio_location: "New Delhi & Mumbai, Bharat",
    instagram_url: "https://instagram.com/charchitstudios",
    linkedin_url: "https://linkedin.com/company/charchitstudios",
    twitter_url: "https://x.com/charchitstudios",
    meta_description:
      "Charchit Studios is an independent digital craft house uniting classical Indian craftsmanship, editorial typography, and high-performance digital engineering.",
    updated_at: new Date().toISOString(),
  },
  faqs: [
    {
      id: "faq-1",
      question: "What does the studio's philosophy 'Make your business worth talking about' mean in practice?",
      answer:
        "It means we refuse to produce generic, templated work. We examine what makes your enterprise genuinely unique, then craft a bespoke digital presence whose design, speed, and story command attention and generate organic word of mouth.",
      display_order: 1,
      is_published: true,
    },
    {
      id: "faq-2",
      question: "How does Charchit Studios combine Indian craftsmanship with modern digital engineering?",
      answer:
        "We draw inspiration from traditional Indian art forms—hand block printing, architectural jharokhas, wasli paper, and calligraphic strokes—and translate their proportions, tactile textures, and balance into cutting-edge Next.js web applications.",
      display_order: 2,
      is_published: true,
    },
    {
      id: "faq-3",
      question: "How do we commission a project with Charchit Studios?",
      answer:
        "You can either use our interactive Project Brief Builder on the Contact page to outline your scope and timeline, or email our studio desk directly at namaste@charchitstudios.com.",
      display_order: 3,
      is_published: true,
    },
  ],
};

async function ensureDataFile(): Promise<DBStore> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const fileContent = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    // If file doesn't exist, initialize with DEFAULT_STORE
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), "utf-8");
    return DEFAULT_STORE;
  }
}

async function writeDataFile(data: DBStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// ==========================================
// STORE QUERY & MUTATION API
// ==========================================

export const db = {
  // Services
  async getServices(): Promise<Service[]> {
    const store = await ensureDataFile();
    return store.services
      .filter((s) => s.is_published)
      .sort((a, b) => a.display_order - b.display_order);
  },

  async getAllServicesAdmin(): Promise<Service[]> {
    const store = await ensureDataFile();
    return store.services.sort((a, b) => a.display_order - b.display_order);
  },

  async getServiceBySlug(slug: string): Promise<Service | null> {
    const store = await ensureDataFile();
    return store.services.find((s) => s.slug === slug && s.is_published) || null;
  },

  async saveService(service: Service): Promise<void> {
    const store = await ensureDataFile();
    const idx = store.services.findIndex((s) => s.id === service.id);
    if (idx >= 0) {
      store.services[idx] = { ...service, updated_at: new Date().toISOString() };
    } else {
      store.services.push({
        ...service,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    await writeDataFile(store);
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    const store = await ensureDataFile();
    return store.projects
      .filter((p) => p.is_published)
      .sort((a, b) => a.display_order - b.display_order);
  },

  async getAllProjectsAdmin(): Promise<Project[]> {
    const store = await ensureDataFile();
    return store.projects.sort((a, b) => a.display_order - b.display_order);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const store = await ensureDataFile();
    return store.projects.find((p) => p.slug === slug && p.is_published) || null;
  },

  async saveProject(project: Project): Promise<void> {
    const store = await ensureDataFile();
    const idx = store.projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      store.projects[idx] = { ...project, updated_at: new Date().toISOString() };
    } else {
      store.projects.push({
        ...project,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    await writeDataFile(store);
  },

  async deleteProject(id: string): Promise<void> {
    const store = await ensureDataFile();
    store.projects = store.projects.filter((p) => p.id !== id);
    await writeDataFile(store);
  },

  // Articles
  async getArticles(): Promise<Article[]> {
    const store = await ensureDataFile();
    return store.articles
      .filter((a) => a.is_published)
      .sort(
        (a, b) =>
          new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
  },

  async getAllArticlesAdmin(): Promise<Article[]> {
    const store = await ensureDataFile();
    return store.articles.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const store = await ensureDataFile();
    return store.articles.find((a) => a.slug === slug && a.is_published) || null;
  },

  async saveArticle(article: Article): Promise<void> {
    const store = await ensureDataFile();
    const idx = store.articles.findIndex((a) => a.id === article.id);
    if (idx >= 0) {
      store.articles[idx] = { ...article, updated_at: new Date().toISOString() };
    } else {
      store.articles.push({
        ...article,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    await writeDataFile(store);
  },

  async deleteArticle(id: string): Promise<void> {
    const store = await ensureDataFile();
    store.articles = store.articles.filter((a) => a.id !== id);
    await writeDataFile(store);
  },

  // Enquiries
  async getEnquiries(): Promise<ContactEnquiry[]> {
    const store = await ensureDataFile();
    return store.contact_enquiries.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async addEnquiry(enquiry: Omit<ContactEnquiry, "id" | "status" | "created_at" | "updated_at">): Promise<ContactEnquiry> {
    const store = await ensureDataFile();
    const newEnquiry: ContactEnquiry = {
      ...enquiry,
      id: "enq-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      status: "new",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.contact_enquiries.unshift(newEnquiry);
    await writeDataFile(store);
    return newEnquiry;
  },

  async updateEnquiryStatus(
    id: string,
    status: ContactEnquiry["status"],
    adminNotes?: string
  ): Promise<void> {
    const store = await ensureDataFile();
    const enquiry = store.contact_enquiries.find((e) => e.id === id);
    if (enquiry) {
      enquiry.status = status;
      if (adminNotes !== undefined) enquiry.admin_notes = adminNotes;
      enquiry.updated_at = new Date().toISOString();
      await writeDataFile(store);
    }
  },

  // Site Settings
  async getSettings(): Promise<SiteSettings> {
    const store = await ensureDataFile();
    return store.site_settings;
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
    const store = await ensureDataFile();
    store.site_settings = {
      ...settings,
      updated_at: new Date().toISOString(),
    };
    await writeDataFile(store);
  },

  // FAQs
  async getFAQs(serviceSlug?: string): Promise<FAQ[]> {
    const store = await ensureDataFile();
    return store.faqs
      .filter((f) => f.is_published && (!serviceSlug || f.service_slug === serviceSlug))
      .sort((a, b) => a.display_order - b.display_order);
  },
};

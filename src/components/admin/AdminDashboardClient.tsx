"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Inbox,
  FolderKanban,
  BookOpen,
  Settings,
  Layers,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import {
  adminLogout,
  updateEnquiryStatusAction,
  saveProjectAction,
  deleteProjectAction,
  saveArticleAction,
  deleteArticleAction,
  saveServiceAction,
  saveSettingsAction,
} from "@/actions/admin";
import {
  ContactEnquiry,
  Project,
  Article,
  Service,
  SiteSettings,
  EnquiryStatus,
} from "@/lib/types";
import { LotusOrnament, StudioSeal } from "@/components/ui/Ornaments";

interface AdminDashboardClientProps {
  initialEnquiries: ContactEnquiry[];
  initialProjects: Project[];
  initialArticles: Article[];
  initialServices: Service[];
  initialSettings: SiteSettings;
}

export function AdminDashboardClient({
  initialEnquiries,
  initialProjects,
  initialArticles,
  initialServices,
  initialSettings,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "enquiries" | "projects" | "articles" | "services" | "settings"
  >("enquiries");

  // Local state for instant optimistic updates
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [services, setServices] = useState(initialServices);
  const [settings, setSettings] = useState(initialSettings);

  const [notification, setNotification] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  };

  // Status Update Handler
  const handleUpdateStatus = async (id: string, status: EnquiryStatus) => {
    await updateEnquiryStatusAction(id, status);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    showNotice(`Inquiry status updated to ${status}.`);
  };

  // Project Management State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const deliverablesRaw = form.get("deliverables")?.toString() || "";

    const projectData: Project = {
      id: editingProject?.id || "proj-" + Date.now(),
      slug:
        form.get("slug")?.toString() ||
        form.get("title")?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
        "",
      title: form.get("title")?.toString() || "",
      client_name: form.get("client_name")?.toString() || "",
      category_name: form.get("category_name")?.toString() || "Digital Flagships",
      year: form.get("year")?.toString() || "2026",
      excerpt: form.get("excerpt")?.toString() || "",
      brief: form.get("brief")?.toString() || "",
      challenge: form.get("challenge")?.toString() || "",
      approach: form.get("approach")?.toString() || "",
      deliverables: deliverablesRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      outcomes: form.get("outcomes")?.toString() || "",
      cover_image: form.get("cover_image")?.toString() || "",
      aspect_ratio: "landscape",
      live_url: form.get("live_url")?.toString() || "",
      is_featured: form.get("is_featured") === "on",
      is_published: form.get("is_published") === "on",
      display_order: Number(form.get("display_order") || 0),
      created_at: editingProject?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await saveProjectAction(projectData);
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === projectData.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = projectData;
        return copy;
      }
      return [projectData, ...prev];
    });

    setIsProjectModalOpen(false);
    setEditingProject(null);
    showNotice("Project preserved successfully.");
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you certain you wish to purge this project from the repertory?")) {
      await deleteProjectAction(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showNotice("Project removed.");
    }
  };

  // Article Management State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const handleSaveArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const articleData: Article = {
      id: editingArticle?.id || "art-" + Date.now(),
      slug:
        form.get("slug")?.toString() ||
        form.get("title")?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
        "",
      title: form.get("title")?.toString() || "",
      category_name: form.get("category_name")?.toString() || "Design Philosophy",
      excerpt: form.get("excerpt")?.toString() || "",
      content: form.get("content")?.toString() || "",
      cover_image: form.get("cover_image")?.toString() || "",
      reading_time_minutes: Number(form.get("reading_time_minutes") || 5),
      is_published: form.get("is_published") === "on",
      published_at: editingArticle?.published_at || new Date().toISOString(),
      created_at: editingArticle?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await saveArticleAction(articleData);
    setArticles((prev) => {
      const idx = prev.findIndex((a) => a.id === articleData.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = articleData;
        return copy;
      }
      return [articleData, ...prev];
    });

    setIsArticleModalOpen(false);
    setEditingArticle(null);
    showNotice("Journal essay preserved.");
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm("Delete this essay from the studio journal?")) {
      await deleteArticleAction(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      showNotice("Essay removed.");
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const updatedSettings: SiteSettings = {
      ...settings,
      studio_name: form.get("studio_name")?.toString() || settings.studio_name,
      tagline: form.get("tagline")?.toString() || settings.tagline,
      studio_email: form.get("studio_email")?.toString() || settings.studio_email,
      studio_phone: form.get("studio_phone")?.toString() || settings.studio_phone,
      studio_location: form.get("studio_location")?.toString() || settings.studio_location,
      instagram_url: form.get("instagram_url")?.toString() || "",
      linkedin_url: form.get("linkedin_url")?.toString() || "",
      twitter_url: form.get("twitter_url")?.toString() || "",
      meta_description: form.get("meta_description")?.toString() || settings.meta_description,
    };

    await saveSettingsAction(updatedSettings);
    setSettings(updatedSettings);
    showNotice("Studio settings updated.");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#14224A] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#080E21] text-[#FAF7F2] border-b border-[#C5A059]/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <StudioSeal year="2026" city="BHARAT" className="w-10 h-10" />
          <div>
            <h1 className="font-serif text-lg tracking-wide text-[#FAF7F2]">
              Charchit Studios — Curator Portal
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] block">
              Official Administrative Ledger
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#FAF7F2]/75 hover:text-[#C5A059] transition-colors"
          >
            <span>Preview Flagship</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] text-xs uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14224A] text-[#FAF7F2] border border-[#C5A059] px-4 py-2.5 shadow-xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-[#C5A059]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#DCCEBA] pb-3">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "enquiries"
                ? "bg-[#14224A] text-[#FAF7F2] border-b-2 border-[#C5A059]"
                : "text-[#14224A]/70 hover:text-[#14224A] hover:bg-[#E9E0CE]/40"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Inquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "projects"
                ? "bg-[#14224A] text-[#FAF7F2] border-b-2 border-[#C5A059]"
                : "text-[#14224A]/70 hover:text-[#14224A] hover:bg-[#E9E0CE]/40"
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("articles")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "articles"
                ? "bg-[#14224A] text-[#FAF7F2] border-b-2 border-[#C5A059]"
                : "text-[#14224A]/70 hover:text-[#14224A] hover:bg-[#E9E0CE]/40"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>The Journal ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "services"
                ? "bg-[#14224A] text-[#FAF7F2] border-b-2 border-[#C5A059]"
                : "text-[#14224A]/70 hover:text-[#14224A] hover:bg-[#E9E0CE]/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Disciplines ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "settings"
                ? "bg-[#14224A] text-[#FAF7F2] border-b-2 border-[#C5A059]"
                : "text-[#14224A]/70 hover:text-[#14224A] hover:bg-[#E9E0CE]/40"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Studio Settings</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: INQUIRIES LEDGER */}
        {/* ======================================================== */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#14224A]">
                  Client Commission Inquiries
                </h2>
                <p className="text-xs text-[#585C6D]">
                  Real inquiries submitted through the Contact Form and Project Brief Builder.
                </p>
              </div>
            </div>

            {enquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#FAF7F2] border border-[#DCCEBA] space-y-3">
                <Inbox className="w-10 h-10 text-[#C5A059] mx-auto opacity-70" />
                <h3 className="font-serif text-xl text-[#14224A]">
                  No Inquiries Received Yet
                </h3>
                <p className="text-xs text-[#585C6D] max-w-sm mx-auto">
                  When a prospective partner submits a brief via the website, it will be codified here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="p-6 bg-[#FAF7F2] border border-[#DCCEBA] hover:border-[#C5A059] space-y-4 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E0D4C0] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-xl text-[#14224A] font-semibold">
                            {enquiry.full_name}
                          </h3>
                          {enquiry.business_name && (
                            <span className="text-xs px-2 py-0.5 bg-[#F4EFE6] text-[#8E7036] border border-[#DCCEBA]">
                              {enquiry.business_name}
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="text-xs text-[#14224A]/70 hover:text-[#C5A059] underline decoration-dotted"
                        >
                          {enquiry.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#585C6D]">
                          {new Date(enquiry.created_at).toLocaleString()}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2.5 py-1 font-semibold ${
                            enquiry.status === "new"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : enquiry.status === "contacted"
                              ? "bg-blue-100 text-blue-900 border border-blue-300"
                              : enquiry.status === "in_progress"
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : "bg-gray-100 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {enquiry.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#F4EFE6] p-3 border border-[#DCCEBA]">
                      <div>
                        <span className="text-[10px] uppercase text-[#8E7036] block">
                          Discipline Interest
                        </span>
                        <span className="font-medium">{enquiry.service_interest}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#8E7036] block">
                          Investment Bracket
                        </span>
                        <span className="font-medium font-mono">
                          {enquiry.budget_range || "Unspecified"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#8E7036] block">
                          Source
                        </span>
                        <span className="font-medium capitalize">
                          {enquiry.source.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8E7036] font-semibold block">
                        Project Brief Narrative
                      </span>
                      <p className="text-xs text-[#14224A]/90 whitespace-pre-line bg-[#FAF7F2] p-3 border border-[#E0D4C0]">
                        {enquiry.project_brief}
                      </p>
                    </div>

                    {/* Status Update Buttons */}
                    <div className="pt-2 flex items-center gap-2 text-xs">
                      <span className="text-[10px] uppercase text-[#8E7036] font-semibold">
                        Set Status:
                      </span>
                      {(["new", "contacted", "in_progress", "closed"] as EnquiryStatus[]).map(
                        (st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateStatus(enquiry.id, st)}
                            disabled={enquiry.status === st}
                            className={`px-2.5 py-1 text-[11px] capitalize border transition-colors ${
                              enquiry.status === st
                                ? "bg-[#14224A] text-[#FAF7F2] font-semibold"
                                : "bg-[#FAF7F2] text-[#14224A] border-[#DCCEBA] hover:border-[#C5A059]"
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PROJECTS & REPERTORY */}
        {/* ======================================================== */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#14224A]">
                  Archival Repertory (Projects)
                </h2>
                <p className="text-xs text-[#585C6D]">
                  Manage showcase case studies. In accordance with studio rules, only real projects are listed.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Case Study</span>
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 text-center bg-[#FAF7F2] border border-[#DCCEBA] space-y-3">
                <FolderKanban className="w-10 h-10 text-[#C5A059] mx-auto opacity-70" />
                <h3 className="font-serif text-xl text-[#14224A]">
                  No Projects In Archival Repertory
                </h3>
                <p className="text-xs text-[#585C6D] max-w-md mx-auto">
                  The portfolio currently displays an honest, polished empty state to public visitors. Click "Add Case Study" above to publish your first verified client engagement.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 bg-[#FAF7F2] border border-[#DCCEBA] space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#8E7036] mb-1">
                        <span>{p.category_name}</span>
                        <span
                          className={`px-2 py-0.5 text-[9px] uppercase font-semibold ${
                            p.is_published
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {p.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-[#14224A]">{p.title}</h3>
                      <p className="text-xs text-[#585C6D] line-clamp-2 mt-1">
                        {p.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E0D4C0] flex items-center justify-between">
                      <Link
                        href={`/work/${p.slug}`}
                        target="_blank"
                        className="text-xs text-[#8E7036] hover:text-[#14224A] flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(p);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1.5 text-[#14224A] hover:text-[#C5A059] border border-[#DCCEBA]"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 text-red-700 hover:text-red-900 border border-red-200"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal for Creating / Editing Project */}
            {isProjectModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-[#FAF7F2] border border-[#C5A059] p-6 sm:p-8 max-w-2xl w-full my-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[#DCCEBA] pb-3">
                    <h3 className="font-serif text-2xl text-[#14224A]">
                      {editingProject ? "Edit Case Study" : "Add Archival Project"}
                    </h3>
                    <button
                      onClick={() => setIsProjectModalOpen(false)}
                      className="text-xs uppercase text-[#8E7036] hover:text-[#14224A]"
                    >
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Title *</label>
                        <input
                          type="text"
                          name="title"
                          required
                          defaultValue={editingProject?.title}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Slug *</label>
                        <input
                          type="text"
                          name="slug"
                          defaultValue={editingProject?.slug}
                          placeholder="leave empty to auto-generate"
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Client Name</label>
                        <input
                          type="text"
                          name="client_name"
                          defaultValue={editingProject?.client_name}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Category</label>
                        <select
                          name="category_name"
                          defaultValue={editingProject?.category_name || "Digital Flagships"}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        >
                          <option value="Digital Flagships">Digital Flagships</option>
                          <option value="Brand Systems">Brand Systems</option>
                          <option value="Editorial Platforms">Editorial Platforms</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Year</label>
                        <input
                          type="text"
                          name="year"
                          defaultValue={editingProject?.year || "2026"}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Excerpt *</label>
                      <textarea
                        name="excerpt"
                        required
                        rows={2}
                        defaultValue={editingProject?.excerpt}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Brief</label>
                      <textarea
                        name="brief"
                        rows={2}
                        defaultValue={editingProject?.brief}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Challenge</label>
                      <textarea
                        name="challenge"
                        rows={2}
                        defaultValue={editingProject?.challenge}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Approach & Narrative</label>
                      <textarea
                        name="approach"
                        rows={3}
                        defaultValue={editingProject?.approach}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">
                          Deliverables (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="deliverables"
                          defaultValue={editingProject?.deliverables?.join(", ")}
                          placeholder="e.g. Next.js App, Identity System, Motion"
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Cover Image URL</label>
                        <input
                          type="text"
                          name="cover_image"
                          defaultValue={editingProject?.cover_image}
                          placeholder="/brand/charchit-logo.jpg"
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Approved Outcomes</label>
                      <textarea
                        name="outcomes"
                        rows={2}
                        defaultValue={editingProject?.outcomes}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="is_published"
                          defaultChecked={editingProject ? editingProject.is_published : true}
                        />
                        <span>Published on Website</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="is_featured"
                          defaultChecked={editingProject?.is_featured}
                        />
                        <span>Feature on Homepage</span>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-[#DCCEBA]">
                      <button
                        type="button"
                        onClick={() => setIsProjectModalOpen(false)}
                        className="px-4 py-2 border border-[#DCCEBA] uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#14224A] text-[#FAF7F2] uppercase font-semibold hover:bg-[#C5A059] hover:text-[#060B18]"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: THE JOURNAL & ESSAYS */}
        {/* ======================================================== */}
        {activeTab === "articles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-[#14224A]">
                  The Studio Journal
                </h2>
                <p className="text-xs text-[#585C6D]">
                  Essays on craft, Indian design canons, and web architecture.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingArticle(null);
                  setIsArticleModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#14224A] text-[#FAF7F2] text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Pen New Essay</span>
              </button>
            </div>

            <div className="space-y-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-5 bg-[#FAF7F2] border border-[#DCCEBA] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-[#8E7036]">
                      {art.category_name} • {art.reading_time_minutes} min read
                    </span>
                    <h3 className="font-serif text-xl text-[#14224A]">{art.title}</h3>
                    <p className="text-xs text-[#585C6D] line-clamp-1">{art.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/journal/${art.slug}`}
                      target="_blank"
                      className="text-xs text-[#8E7036] hover:text-[#14224A] flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setIsArticleModalOpen(true);
                      }}
                      className="p-1.5 text-[#14224A] hover:text-[#C5A059] border border-[#DCCEBA]"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="p-1.5 text-red-700 hover:text-red-900 border border-red-200"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Article Edit */}
            {isArticleModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-[#FAF7F2] border border-[#C5A059] p-6 sm:p-8 max-w-2xl w-full my-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[#DCCEBA] pb-3">
                    <h3 className="font-serif text-2xl text-[#14224A]">
                      {editingArticle ? "Edit Journal Essay" : "Pen New Journal Essay"}
                    </h3>
                    <button
                      onClick={() => setIsArticleModalOpen(false)}
                      className="text-xs uppercase text-[#8E7036] hover:text-[#14224A]"
                    >
                      Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Title *</label>
                        <input
                          type="text"
                          name="title"
                          required
                          defaultValue={editingArticle?.title}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Slug *</label>
                        <input
                          type="text"
                          name="slug"
                          defaultValue={editingArticle?.slug}
                          placeholder="leave empty to auto-generate"
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Category</label>
                        <input
                          type="text"
                          name="category_name"
                          defaultValue={editingArticle?.category_name || "Design Philosophy"}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block uppercase font-medium">Reading Time (mins)</label>
                        <input
                          type="number"
                          name="reading_time_minutes"
                          defaultValue={editingArticle?.reading_time_minutes || 5}
                          className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Excerpt *</label>
                      <textarea
                        name="excerpt"
                        required
                        rows={2}
                        defaultValue={editingArticle?.excerpt}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Essay Content *</label>
                      <textarea
                        name="content"
                        required
                        rows={8}
                        defaultValue={editingArticle?.content}
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA] font-serif"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block uppercase font-medium">Cover Image URL</label>
                      <input
                        type="text"
                        name="cover_image"
                        defaultValue={editingArticle?.cover_image}
                        placeholder="/brand/reference-ui.jpg"
                        className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="is_published"
                          defaultChecked={editingArticle ? editingArticle.is_published : true}
                        />
                        <span>Published on Journal</span>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-[#DCCEBA]">
                      <button
                        type="button"
                        onClick={() => setIsArticleModalOpen(false)}
                        className="px-4 py-2 border border-[#DCCEBA] uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#14224A] text-[#FAF7F2] uppercase font-semibold hover:bg-[#C5A059] hover:text-[#060B18]"
                      >
                        Save Essay
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CRAFT DISCIPLINES */}
        {/* ======================================================== */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-[#14224A]">
                Studio Craft Disciplines
              </h2>
              <p className="text-xs text-[#585C6D]">
                The five core pillars of Charchit Studios. Edit approach and deliverables.
              </p>
            </div>

            <div className="space-y-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-6 bg-[#FAF7F2] border border-[#DCCEBA] space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#E0D4C0] pb-2">
                    <h3 className="font-serif text-xl text-[#14224A]">{srv.title}</h3>
                    <Link
                      href={`/services/${srv.slug}`}
                      target="_blank"
                      className="text-xs text-[#8E7036] hover:text-[#14224A] flex items-center gap-1"
                    >
                      <span>Public Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                  <p className="text-xs text-[#585C6D]">{srv.short_description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F4EFE6] p-3 border border-[#DCCEBA]">
                    <div>
                      <strong className="block text-[10px] uppercase text-[#8E7036]">
                        Problem Addressed
                      </strong>
                      <p className="text-[#14224A]">{srv.business_problem}</p>
                    </div>
                    <div>
                      <strong className="block text-[10px] uppercase text-[#8E7036]">
                        Deliverables & Approach
                      </strong>
                      <p className="text-[#14224A]">{srv.approach_and_deliverables}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: STUDIO SETTINGS */}
        {/* ======================================================== */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif text-2xl text-[#14224A]">
                Studio Coordinates & Settings
              </h2>
              <p className="text-xs text-[#585C6D]">
                Configure studio coordinates, email desk, and metadata.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 bg-[#FAF7F2] p-6 border border-[#DCCEBA] text-xs">
              <div className="space-y-1">
                <label className="block uppercase font-medium">Studio Name</label>
                <input
                  type="text"
                  name="studio_name"
                  defaultValue={settings.studio_name}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                />
              </div>

              <div className="space-y-1">
                <label className="block uppercase font-medium">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={settings.tagline}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block uppercase font-medium">Official Desk Email</label>
                  <input
                    type="email"
                    name="studio_email"
                    defaultValue={settings.studio_email}
                    className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block uppercase font-medium">Desk Phone / WhatsApp</label>
                  <input
                    type="text"
                    name="studio_phone"
                    defaultValue={settings.studio_phone}
                    className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block uppercase font-medium">Studio Locations</label>
                <input
                  type="text"
                  name="studio_location"
                  defaultValue={settings.studio_location}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="block uppercase font-medium">Instagram URL</label>
                  <input
                    type="url"
                    name="instagram_url"
                    defaultValue={settings.instagram_url}
                    className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block uppercase font-medium">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedin_url"
                    defaultValue={settings.linkedin_url}
                    className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block uppercase font-medium">Twitter / X URL</label>
                  <input
                    type="url"
                    name="twitter_url"
                    defaultValue={settings.twitter_url}
                    className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="block uppercase font-medium">Global Meta Description</label>
                <textarea
                  name="meta_description"
                  rows={3}
                  defaultValue={settings.meta_description}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#DCCEBA]"
                />
              </div>

              <div className="pt-4 border-t border-[#DCCEBA] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#14224A] text-[#FAF7F2] uppercase font-semibold hover:bg-[#C5A059] hover:text-[#060B18] transition-colors"
                >
                  Save Studio Coordinates
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

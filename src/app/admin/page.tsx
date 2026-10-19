import React from "react";
import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/actions/admin";
import { db } from "@/lib/store";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export const metadata = {
  title: "Curator Ledger & CMS — Charchit Studios",
  description: "Administrative dashboard for inquiries, case studies, journal articles, and studio settings.",
};

export default async function AdminPage() {
  const isAuth = await isAuthenticatedAdmin();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const [enquiries, projects, articles, services, settings] = await Promise.all([
    db.getEnquiries(),
    db.getAllProjectsAdmin(),
    db.getAllArticlesAdmin(),
    db.getAllServicesAdmin(),
    db.getSettings(),
  ]);

  return (
    <AdminDashboardClient
      initialEnquiries={enquiries}
      initialProjects={projects}
      initialArticles={articles}
      initialServices={services}
      initialSettings={settings}
    />
  );
}

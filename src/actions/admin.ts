"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/store";
import { Project, Article, Service, SiteSettings, EnquiryStatus } from "@/lib/types";

const ADMIN_COOKIE_NAME = "charchit_admin_session";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "charchit2026!";

export async function adminLogin(formData: FormData) {
  const password = formData.get("password")?.toString();

  if (!password || password !== DEFAULT_ADMIN_PASSWORD) {
    return { success: false, error: "Incorrect administrative passkey." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "authorized_session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return { success: true };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return { success: true };
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === "authorized_session";
}

export async function updateEnquiryStatusAction(
  id: string,
  status: EnquiryStatus,
  adminNotes?: string
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) throw new Error("Unauthorized");

  await db.updateEnquiryStatus(id, status, adminNotes);
  revalidatePath("/admin");
  return { success: true };
}

export async function saveProjectAction(project: Project) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) throw new Error("Unauthorized");

  await db.saveProject(project);
  revalidatePath("/work");
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProjectAction(id: string) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) throw new Error("Unauthorized");

  await db.deleteProject(id);
  revalidatePath("/work");
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveArticleAction(article: Article) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) throw new Error("Unauthorized");

  await db.saveArticle(article);
  revalidatePath("/journal");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteArticleAction(id: string) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) throw new Error("Unauthorized");

  await db.deleteArticle(id);
  revalidatePath("/journal");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveServiceAction(service: Service) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) throw new Error("Unauthorized");

  await db.saveService(service);
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveSettingsAction(settings: SiteSettings) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) throw new Error("Unauthorized");

  await db.saveSettings(settings);
  revalidatePath("/");
  revalidatePath("/studio");
  revalidatePath("/contact");
  revalidatePath("/admin");
  return { success: true };
}

"use server";

import { z } from "zod";
import { db } from "@/lib/store";
import { sendInquiryEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please provide a valid email address"),
  businessName: z.string().max(120).optional(),
  serviceInterest: z.string().min(1, "Please choose a service of interest"),
  budgetRange: z.string().optional(),
  projectBrief: z.string().min(10, "Please describe your vision or requirements (at least 10 characters)"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export async function submitContactEnquiry(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      businessName: formData.get("businessName")?.toString() || undefined,
      serviceInterest: formData.get("serviceInterest")?.toString() || "",
      budgetRange: formData.get("budgetRange")?.toString() || undefined,
      projectBrief: formData.get("projectBrief")?.toString() || "",
      honeypot: formData.get("website_url_hp")?.toString() || "", // Spam honeypot
    };

    const validated = contactSchema.parse(rawData);

    // 1. Persist to server database ledger
    const saved = await db.addEnquiry({
      full_name: validated.fullName,
      email: validated.email,
      business_name: validated.businessName,
      service_interest: validated.serviceInterest,
      budget_range: validated.budgetRange,
      project_brief: validated.projectBrief,
      source: "contact_form",
    });

    revalidatePath("/admin");

    // 2. Dispatch notification via Resend SDK
    const emailResult = await sendInquiryEmail({
      full_name: validated.fullName,
      email: validated.email,
      business_name: validated.businessName,
      service_interest: validated.serviceInterest,
      budget_range: validated.budgetRange,
      project_brief: validated.projectBrief,
      source: "contact_form",
      submitted_at: saved.created_at,
    });

    return {
      success: true,
      id: saved.id,
      emailDispatched: emailResult.success,
      message: "Namaste. Your inquiry has been received into our studio ledger. We will review your vision with intention and reply within 24 to 48 hours.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed. Please verify your inputs.",
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred while preserving your inquiry. Please email us directly at arpitbhardwaj885@gmail.com.",
    };
  }
}

const briefSchema = z.object({
  clientName: z.string().min(2, "Please enter your name"),
  clientEmail: z.string().email("Please provide a valid email"),
  businessName: z.string().optional(),
  industry: z.string().optional(),
  selectedServices: z.array(z.string()).min(1, "Please select at least one craft discipline"),
  budgetBracket: z.string().optional(),
  timelineExpectation: z.string().optional(),
  projectBrief: z.string().min(10, "Please share some details regarding your goals"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export async function submitProjectBriefAction(payload: {
  clientName: string;
  clientEmail: string;
  businessName?: string;
  industry?: string;
  selectedServices: string[];
  budgetBracket?: string;
  timelineExpectation?: string;
  projectBrief: string;
  honeypot?: string;
}) {
  try {
    const validated = briefSchema.parse(payload);

    // 1. Persist to server database ledger
    const saved = await db.addEnquiry({
      full_name: validated.clientName,
      email: validated.clientEmail,
      business_name: validated.businessName,
      service_interest: validated.selectedServices.join(", "),
      budget_range: validated.budgetBracket,
      project_brief: validated.projectBrief,
      source: "brief_builder",
      brief_details: {
        industry: validated.industry,
        services: validated.selectedServices,
        timeline: validated.timelineExpectation,
      },
    });

    revalidatePath("/admin");

    // 2. Dispatch notification via Resend SDK
    const emailResult = await sendInquiryEmail({
      full_name: validated.clientName,
      email: validated.clientEmail,
      business_name: validated.businessName,
      service_interest: validated.selectedServices.join(", "),
      budget_range: validated.budgetBracket,
      project_brief: validated.projectBrief,
      source: "brief_builder",
      industry: validated.industry,
      timeline: validated.timelineExpectation,
      submitted_at: saved.created_at,
    });

    return {
      success: true,
      id: saved.id,
      emailDispatched: emailResult.success,
      message: "Your project brief has been codified and preserved in the studio archives. We look forward to our creative dialogue.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Validation failed.",
      };
    }
    return {
      success: false,
      error: "Failed to submit project brief. Please contact the studio directly.",
    };
  }
}

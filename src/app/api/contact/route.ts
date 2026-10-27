import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/store";
import { sendInquiryEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

const contactApiSchema = z.object({
  fullName: z.string().min(2, "Please provide your name (at least 2 characters)"),
  email: z.string().email("Please provide a valid email address"),
  businessName: z.string().optional(),
  serviceInterest: z.string().min(1, "Please choose a service discipline"),
  budgetRange: z.string().optional(),
  projectBrief: z.string().min(10, "Please provide some project details (at least 10 characters)"),
  industry: z.string().optional(),
  timeline: z.string().optional(),
  source: z.enum(["contact_form", "brief_builder"]).default("contact_form"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

/**
 * Server-Side API Route: /api/contact
 * Handles incoming client contact submissions and project briefs.
 * Validates inputs server-side, saves to studio ledger, and dispatches via Resend.
 */
export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown> = {};

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      body = {
        fullName: formData.get("fullName") || formData.get("clientName") || "",
        email: formData.get("email") || formData.get("clientEmail") || "",
        businessName: formData.get("businessName") || undefined,
        serviceInterest: formData.get("serviceInterest") || formData.get("selectedServices") || "",
        budgetRange: formData.get("budgetRange") || formData.get("budgetBracket") || undefined,
        projectBrief: formData.get("projectBrief") || "",
        industry: formData.get("industry") || undefined,
        timeline: formData.get("timeline") || formData.get("timelineExpectation") || undefined,
        source: formData.get("source") || "contact_form",
        honeypot: formData.get("website_url_hp") || formData.get("honeypot") || "",
      };
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported Content-Type header." },
        { status: 400 }
      );
    }

    // Server-side Zod validation
    const parsed = contactApiSchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // 1. Persist to Studio Database Ledger
    const savedEnquiry = await db.addEnquiry({
      full_name: data.fullName,
      email: data.email,
      business_name: data.businessName,
      service_interest: data.serviceInterest,
      budget_range: data.budgetRange,
      project_brief: data.projectBrief,
      source: data.source,
      brief_details: {
        industry: data.industry,
        timeline: data.timeline,
      },
    });

    revalidatePath("/admin");

    // 2. Dispatch via Resend SDK
    const emailResult = await sendInquiryEmail({
      full_name: data.fullName,
      email: data.email,
      business_name: data.businessName,
      service_interest: data.serviceInterest,
      budget_range: data.budgetRange,
      project_brief: data.projectBrief,
      source: data.source,
      industry: data.industry,
      timeline: data.timeline,
      submitted_at: savedEnquiry.created_at,
    });

    return NextResponse.json(
      {
        success: true,
        id: savedEnquiry.id,
        emailDispatched: emailResult.success,
        emailId: emailResult.id || null,
        emailNotice: emailResult.skipped
          ? "Inquiry preserved in database ledger. Resend email dispatch skipped (RESEND_API_KEY pending configuration)."
          : emailResult.success
          ? "Inquiry preserved in ledger and dispatched to studio inbox."
          : `Inquiry preserved in ledger. Email notice: ${emailResult.error}`,
        message:
          "Namaste. Your inquiry has been received into our studio ledger. We will review your vision with intention and reply within 24 to 48 hours.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMsg =
      error instanceof Error ? error.message : "Internal server error occurred.";
    console.error("[/api/contact] Submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}

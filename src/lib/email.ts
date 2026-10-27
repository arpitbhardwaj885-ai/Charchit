import { Resend } from "resend";

/**
 * Escapes unsafe characters to prevent HTML injection in emails.
 */
export function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface InquiryEmailPayload {
  full_name: string;
  email: string;
  business_name?: string;
  service_interest: string;
  budget_range?: string;
  project_brief: string;
  source: "contact_form" | "brief_builder";
  industry?: string;
  timeline?: string;
  submitted_at?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  id?: string;
  error?: string;
  skipped?: boolean;
}

/**
 * Dispatches an email notification via official Resend SDK.
 * - Sender: Uses onboarding@resend.dev (Resend's default testing domain for accounts without custom domains)
 * - Recipient: Reads CONTACT_EMAIL or STUDIO_NOTIFICATION_EMAIL (defaults to arpitbhardwaj885@gmail.com)
 * - Reply-To: Configured to the client's email so replying opens dialogue immediately
 */
export async function sendInquiryEmail(
  payload: InquiryEmailPayload
): Promise<EmailDispatchResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient =
    process.env.CONTACT_EMAIL?.trim() ||
    process.env.STUDIO_NOTIFICATION_EMAIL?.trim() ||
    "arpitbhardwaj885@gmail.com";

  // Use Resend's free tier testing sender if no custom domain is verified
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";
  const fromAddress = `Charchit Studios <${fromEmail}>`;

  if (!apiKey) {
    console.warn(
      "[Resend] Notice: RESEND_API_KEY is not configured in environment variables. Email dispatch skipped. Inquiry saved to database ledger."
    );
    return {
      success: false,
      skipped: true,
      error: "RESEND_API_KEY environment variable is not configured.",
    };
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(payload.full_name);
  const safeEmail = escapeHtml(payload.email);
  const safeBusiness = escapeHtml(payload.business_name || "Not provided");
  const safeService = escapeHtml(payload.service_interest || "General Inquiry");
  const safeBudget = escapeHtml(payload.budget_range || "Flexible / Not specified");
  const safeIndustry = escapeHtml(payload.industry || "Not specified");
  const safeTimeline = escapeHtml(payload.timeline || "Not specified");
  const safeBrief = escapeHtml(payload.project_brief).replace(/\n/g, "<br/>");
  const safeSource =
    payload.source === "brief_builder"
      ? "Interactive Project Brief Builder"
      : "Direct Contact Form";
  const timestamp = payload.submitted_at || new Date().toUTCString();

  const subject = `[Charchit Studios] New Inquiry from ${payload.full_name} (${payload.service_interest || "Commission"})`;

  // Plain-text fallback
  const textContent = `
NEW COMMISSION INQUIRY — CHARCHIT STUDIOS
==================================================

Client: ${payload.full_name}
Email: ${payload.email}
Business: ${payload.business_name || "Not provided"}
Source: ${safeSource}
Services / Discipline: ${payload.service_interest}
Industry: ${payload.industry || "Not specified"}
Budget: ${payload.budget_range || "Not specified"}
Timeline: ${payload.timeline || "Not specified"}
Submitted At: ${timestamp}

PROJECT BRIEF & OBJECTIVES:
--------------------------------------------------
${payload.project_brief}

--------------------------------------------------
Reply directly to this email to contact ${payload.full_name} (${payload.email}).
Codified in Charchit Studios Server Ledger.
`.trim();

  // HTML luxury craft layout
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Commission Inquiry</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 24px; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #14224A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #DCCEBA; box-shadow: 0 4px 16px rgba(20, 34, 74, 0.06);">
    <!-- Gold Top Hairline -->
    <tr>
      <td style="height: 4px; background: linear-gradient(90deg, #14224A 0%, #C5A059 50%, #14224A 100%);"></td>
    </tr>

    <!-- Header Pavilion -->
    <tr>
      <td style="padding: 28px 32px; background-color: #080E21; color: #FAF7F2; text-align: center;">
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.25em; color: #C5A059; margin-bottom: 6px; font-weight: 600;">
          Charchit Studios // Ledger Dispatch
        </div>
        <h1 style="margin: 0; font-size: 22px; font-weight: 500; letter-spacing: 0.05em; color: #FAF7F2; font-family: Georgia, serif;">
          New Commission Inquiry
        </h1>
        <div style="font-size: 11px; color: #E9E0CE; opacity: 0.75; margin-top: 4px;">
          Received via ${safeSource}
        </div>
      </td>
    </tr>

    <!-- Inquiry Metadata Table -->
    <tr>
      <td style="padding: 28px 32px 16px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; line-height: 1.6;">
          <tr>
            <td style="padding: 8px 0; color: #8E7036; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; width: 38%; font-weight: 600;">Client Name</td>
            <td style="padding: 8px 0; color: #14224A; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8E7036; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">Email Address</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${safeEmail}" style="color: #14224A; text-decoration: underline;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8E7036; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">Business / Entity</td>
            <td style="padding: 8px 0; color: #14224A;">${safeBusiness}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8E7036; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">Service Disciplines</td>
            <td style="padding: 8px 0; color: #14224A; font-weight: 600;">${safeService}</td>
          </tr>
          ${
            payload.industry
              ? `<tr>
                  <td style="padding: 8px 0; color: #8E7036; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">Industry</td>
                  <td style="padding: 8px 0; color: #14224A;">${safeIndustry}</td>
                </tr>`
              : ""
          }
          <tr>
            <td style="padding: 8px 0; color: #8E7036; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">Budget Bracket</td>
            <td style="padding: 8px 0; color: #14224A;">${safeBudget}</td>
          </tr>
          ${
            payload.timeline
              ? `<tr>
                  <td style="padding: 8px 0; color: #8E7036; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">Target Timeline</td>
                  <td style="padding: 8px 0; color: #14224A;">${safeTimeline}</td>
                </tr>`
              : ""
          }
        </table>
      </td>
    </tr>

    <!-- Divider Line -->
    <tr>
      <td style="padding: 0 32px;">
        <hr style="border: none; border-top: 1px solid #E0D4C0; margin: 8px 0 20px 0;">
      </td>
    </tr>

    <!-- Project Brief Content -->
    <tr>
      <td style="padding: 0 32px 28px 32px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8E7036; font-weight: 600; margin-bottom: 8px;">
          Project Brief & Notes
        </div>
        <div style="background-color: #FAF7F2; border-left: 3px solid #C5A059; padding: 16px 20px; font-size: 13px; line-height: 1.7; color: #14224A; white-space: pre-wrap; font-family: inherit;">${safeBrief}</div>
      </td>
    </tr>

    <!-- Action Button -->
    <tr>
      <td style="padding: 0 32px 32px 32px; text-align: center;">
        <a href="mailto:${safeEmail}?subject=Re:%20Your%20Inquiry%20with%20Charchit%20Studios" style="display: inline-block; background-color: #14224A; color: #FAF7F2; text-decoration: none; padding: 12px 28px; font-size: 12px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; box-shadow: 0 2px 6px rgba(20, 34, 74, 0.15);">
          Reply to ${safeName} &rarr;
        </a>
      </td>
    </tr>

    <!-- Footer Colophon -->
    <tr>
      <td style="padding: 16px 32px; background-color: #F4EFE6; border-top: 1px solid #DCCEBA; text-align: center; font-size: 11px; color: #8E7036;">
        <div>Charchit Studios // Online Web Craft House</div>
        <div style="margin-top: 4px; font-size: 10px; color: #585C6D;">
          Timestamp: ${timestamp} &bull; Stored in Server Ledger
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipient],
      replyTo: payload.email,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend] Error response from Resend API:", error);
      return {
        success: false,
        error: error.message || "Failed to dispatch email via Resend.",
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Unexpected exception during Resend dispatch.";
    console.error("[Resend] Exception while dispatching email:", err);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

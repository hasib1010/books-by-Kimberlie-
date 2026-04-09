import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ── Rate limiting ── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const WINDOW = 60_000;
  const MAX = 3;
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW });
    return { allowed: true };
  }
  if (entry.count >= MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { allowed: true };
}

/* ── POST /api/newsletter ── */
export async function POST(req: NextRequest) {
  try {
    /* Rate limit */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";
    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: `Too many requests. Try again in ${retryAfter}s.` },
        { status: 429 }
      );
    }

    /* Parse */
    let body: { email?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
    }

    /* Validate */
    const email = body.email?.trim().toLowerCase() ?? "";
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRx.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 422 }
      );
    }

    /* Check env vars */
    const scriptUrl = process.env.APPS_SCRIPT_NEWSLETTER_URL;
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASS;
    const ownerEmail = process.env.OWNER_EMAIL ?? "kimberlie@booksbykimberlie.com";

    if (!scriptUrl) {
      console.error("[newsletter] Missing APPS_SCRIPT_NEWSLETTER_URL");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 }
      );
    }

    /* Save to Google Sheet via Apps Script */
    const sheetRes = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const sheetData = await sheetRes.json();

    // If duplicate or invalid, return the Apps Script message
    if (!sheetData.success) {
      return NextResponse.json(
        { success: false, message: sheetData.message },
        { status: 422 }
      );
    }

    /* Notify Kimberlie via email (only if Gmail is configured) */
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailPass },
        });

        await transporter.sendMail({
          from: `"Books by Kimberlie" <${gmailUser}>`,
          to: ownerEmail,
          subject: `New newsletter subscriber — ${email}`,
          html: `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F2EFE8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2EFE8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:#0D0D0D;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-style:italic;color:#fff;">
            Books by <strong style="font-style:normal;">Kimberlie</strong>
          </p>
          <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);">
            New Newsletter Subscriber
          </p>
        </td></tr>

        <tr><td style="height:4px;background:linear-gradient(90deg,#D4614A,#C9964A);"></td></tr>

        <tr><td style="background:#fff;padding:36px 40px;border-radius:0 0 16px 16px;">
          <p style="margin:0 0 20px;font-size:15px;color:rgba(13,13,13,0.6);line-height:1.7;">
            Someone just subscribed to your newsletter:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;">
            <tr><td style="padding:16px;background:#FAF7F0;">
              <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;color:rgba(13,13,13,0.4);">Email Address</p>
              <p style="margin:0;font-size:17px;font-weight:600;">
                <a href="mailto:${email}" style="color:#D4614A;text-decoration:none;">${email}</a>
              </p>
            </td></tr>
            <tr><td style="padding:16px;background:#F5F2EB;border-top:1px solid #EDE8E0;">
              <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;color:rgba(13,13,13,0.4);">Subscribed At</p>
              <p style="margin:0;font-size:15px;color:#0D0D0D;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</p>
            </td></tr>
            <tr><td style="padding:16px;background:#FAF7F0;border-top:1px solid #EDE8E0;">
              <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;color:rgba(13,13,13,0.4);">Source</p>
              <p style="margin:0;font-size:15px;color:#0D0D0D;">booksbykimberlie.com</p>
            </td></tr>
          </table>
          
          <!-- ✅ NEW BUTTON SECTION -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
            <tr>
              <td align="center">
                <a href="https://docs.google.com/spreadsheets/d/1vmC0ZmxQCmsSwhvT_ezN70kYu69j9DoPS3qWWaIcbDE/edit?usp=sharing" 
                   style="display: inline-block; background: #D4614A; color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; padding: 12px 28px; border-radius: 100px; font-family: Arial, sans-serif; transition: background 0.2s;">
                  📊 View Subscribers Sheet
                </a>
              </td>
            </tr>
          </table>
          
          <p style="margin:24px 0 0;font-size:13px;color:rgba(13,13,13,0.4);">
            This subscriber has been saved to your Google Sheet automatically.
          </p>
        </td></tr>

        <tr><td style="padding:20px 0 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:rgba(13,13,13,0.35);">
            <a href="https://booksbykimberlie.com" style="color:#D4614A;text-decoration:none;">booksbykimberlie.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`,
          text: `New newsletter subscriber: ${email}\n\nSubscribed at: ${new Date().toISOString()}\nSource: booksbykimberlie.com`,
        });
      } catch (mailErr) {
        // Don't fail the whole request if email fails — sheet was already saved
        console.error("[newsletter] Email notify failed:", mailErr);
      }
    }

    console.log(`[newsletter] ✓ New subscriber: ${email}`);
    return NextResponse.json(
      { success: true, message: "You're subscribed! Thanks for joining." },
      { status: 200 }
    );

  } catch (err) {
    console.error("[newsletter] Unhandled error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET()    { return NextResponse.json({ message: "Method not allowed." }, { status: 405 }); }
export async function PUT()    { return NextResponse.json({ message: "Method not allowed." }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ message: "Method not allowed." }, { status: 405 }); }
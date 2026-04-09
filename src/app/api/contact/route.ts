// src\api\contact\route.js
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─────────────────────────────────────────
   Rate limiting — in-memory per IP
   Swap for Redis/Upstash in multi-instance
───────────────────────────────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now    = Date.now();
  const WINDOW = 60_000; // 1 minute
  const MAX    = 3;      // 3 submissions per IP per minute

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

/* ─────────────────────────────────────────
   Types & validation
───────────────────────────────────────── */
interface ContactPayload {
  name:    string;
  email:   string;
  message: string;
}

function validate(data: Partial<ContactPayload>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name?.trim())                      errors.name = "Name is required.";
  else if (data.name.trim().length < 2)        errors.name = "Name must be at least 2 characters.";
  else if (data.name.trim().length > 100)      errors.name = "Name must be under 100 characters.";

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email?.trim())                     errors.email = "Email is required.";
  else if (!emailRx.test(data.email.trim()))   errors.email = "Please enter a valid email address.";
  else if (data.email.trim().length > 254)     errors.email = "Email address is too long.";

  if (!data.message?.trim())                   errors.message = "Message is required.";
  else if (data.message.trim().length < 10)    errors.message = "Message must be at least 10 characters.";
  else if (data.message.trim().length > 2000)  errors.message = "Message must be under 2000 characters.";

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Strip HTML to prevent injection in the email body */
function sanitize(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

/* ─────────────────────────────────────────
   Nodemailer transporter — Gmail App Password

   Uses Nodemailer's built-in "gmail" service
   preset so host/port/TLS are handled automatically.

   Setup steps:
   1. Enable 2-Step Verification on your Google account
   2. Visit: myaccount.google.com/apppasswords
   3. App: Mail  |  Device: Other  |  Name: "Kimberlie Website"
   4. Copy the 16-char password → paste as GMAIL_APP_PASS in .env.local
───────────────────────────────────────── */
function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASS environment variables.");
  }

  return nodemailer.createTransport({
    service: "gmail",           // smtp.gmail.com:465 + TLS handled automatically
    auth: {
      user: process.env.GMAIL_USER,      // full Gmail: e.g. kimberlie@gmail.com
      pass: process.env.GMAIL_APP_PASS,  // 16-char App Password (spaces optional)
    },
  });
}

/* ─────────────────────────────────────────
   Owner notification email
───────────────────────────────────────── */
function buildOwnerEmail(
  name: string,
  email: string,
  message: string
): nodemailer.SendMailOptions {
  const safeMsg = message.replace(/\n/g, "<br />");

  return {
    from:    `"Books by Kimberlie" <${process.env.GMAIL_USER}>`,
    to:      process.env.OWNER_EMAIL ?? "kimberlie@booksbykimberlie.com",
    replyTo: email,
    subject: `New enquiry from ${name} — Books by Kimberlie`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#F2EFE8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2EFE8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0D0D0D;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-style:italic;color:#fff;">
              Books by <strong style="font-style:normal;">Kimberlie</strong>
            </p>
            <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);">
              New Contact Enquiry
            </p>
          </td>
        </tr>

        <!-- Accent bar -->
        <tr><td style="height:4px;background:linear-gradient(90deg,#D4614A,#C9964A);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="background:#fff;padding:40px;border-radius:0 0 16px 16px;">
            <p style="margin:0 0 24px;font-size:15px;color:rgba(13,13,13,0.6);line-height:1.7;">
              You have a new message from your website contact form:
            </p>

            <!-- Detail rows -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="margin-bottom:28px;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:14px 16px;background:#FAF7F0;border-bottom:1px solid #EDE8E0;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
                             color:rgba(13,13,13,0.4);">Name</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#0D0D0D;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 16px;background:#FAF7F0;border-bottom:1px solid #EDE8E0;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
                             color:rgba(13,13,13,0.4);">Email</p>
                  <p style="margin:0;font-size:16px;">
                    <a href="mailto:${email}" style="color:#D4614A;text-decoration:none;">${email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 16px;background:#FAF7F0;">
                  <p style="margin:0 0 8px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
                             color:rgba(13,13,13,0.4);">Message</p>
                  <p style="margin:0;font-size:15px;color:rgba(13,13,13,0.75);line-height:1.75;">
                    ${safeMsg}
                  </p>
                </td>
              </tr>
            </table>

            <!-- Reply CTA -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="border-radius:100px;background:#D4614A;">
                  <a href="mailto:${email}?subject=Re: Your enquiry — Books by Kimberlie"
                     style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:500;
                            color:#fff;text-decoration:none;border-radius:100px;">
                    Reply to ${name} →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 0 0;text-align:center;">
            <p style="margin:0;font-size:12px;color:rgba(13,13,13,0.35);">
              Sent from the contact form at
              <a href="https://booksbykimberlie.com" style="color:#D4614A;text-decoration:none;">
                booksbykimberlie.com
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    text: `New enquiry — Books by Kimberlie\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nReply to this email to respond.`,
  };
}

/* ─────────────────────────────────────────
   Auto-reply email to the visitor
───────────────────────────────────────── */
function buildAutoReplyEmail(
  name: string,
  email: string
): nodemailer.SendMailOptions {
  const year = new Date().getFullYear();

  return {
    from:    `"Kimberlie — Books by Kimberlie" <${process.env.GMAIL_USER}>`,
    to:      email,
    subject: `Thanks for reaching out, ${name}! I'll be in touch soon.`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#F2EFE8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2EFE8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0D0D0D;border-radius:16px 16px 0 0;padding:40px;text-align:center;">
            <p style="margin:0;font-family:Georgia,serif;font-size:28px;font-style:italic;color:#fff;">
              Books by <strong style="font-style:normal;">Kimberlie</strong>
            </p>
            <p style="margin:10px 0 0;font-size:12px;color:rgba(255,255,255,0.4);letter-spacing:.06em;">
              Remote Bookkeeping · Vermont
            </p>
          </td>
        </tr>
        <tr><td style="height:4px;background:linear-gradient(90deg,#D4614A,#C9964A);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="background:#fff;padding:48px 40px;border-radius:0 0 16px 16px;">
            <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:26px;
                       font-weight:400;color:#0D0D0D;">
              Hi ${name}, thanks for reaching out! 👋
            </h2>
            <p style="margin:0 0 20px;font-size:16px;color:rgba(13,13,13,0.65);line-height:1.75;">
              I've received your message and will get back to you within
              <strong style="color:#0D0D0D;">24 hours</strong>.
              In the meantime, feel free to reach me directly:
            </p>

            <!-- Contact options -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="margin:28px 0;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:14px 16px;background:#F5E6E2;border-bottom:1px solid #EDD5CF;">
                  <p style="margin:0;font-size:13px;color:#A8402C;">📞 Mobile</p>
                  <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0D0D0D;">830-515-9818</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 16px;background:#F5E6E2;border-bottom:1px solid #EDD5CF;">
                  <p style="margin:0;font-size:13px;color:#A8402C;">📞 Office</p>
                  <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0D0D0D;">830-730-4160</p>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 16px;background:#F5E6E2;">
                  <p style="margin:0;font-size:13px;color:#A8402C;">✉️ Email</p>
                  <p style="margin:4px 0 0;font-size:15px;font-weight:600;">
                    <a href="mailto:kimberlie@booksbykimberlie.com"
                       style="color:#D4614A;text-decoration:none;">
                      kimberlie@booksbykimberlie.com
                    </a>
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 32px;font-size:15px;color:rgba(13,13,13,0.6);line-height:1.75;">
              Looking forward to helping you take your finances from chaos to calm.
            </p>
            <p style="margin:0;font-size:15px;color:#0D0D0D;">
              Warm regards,<br>
              <strong>Kimberlie Gerstner</strong><br>
              <span style="color:rgba(13,13,13,0.45);font-size:13px;">Books by Kimberlie</span>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 0 0;text-align:center;">
            <p style="margin:0;font-size:12px;color:rgba(13,13,13,0.35);">
              © ${year} Books by Kimberlie ·
              <a href="https://booksbykimberlie.com" style="color:#D4614A;text-decoration:none;">
                booksbykimberlie.com
              </a>
            </p>
            <p style="margin:6px 0 0;font-size:11px;color:rgba(13,13,13,0.25);">
              You received this because you submitted the contact form on our website.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    text: `Hi ${name},\n\nThanks for reaching out! I'll get back to you within 24 hours.\n\n📞 Mobile: 830-515-9818\n📞 Office: 830-730-4160\n✉️ kimberlie@booksbykimberlie.com\n\nWarm regards,\nKimberlie Gerstner\nBooks by Kimberlie`,
  };
}

/* ─────────────────────────────────────────
   POST /api/contact
───────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    /* 1 ── Rate limit */
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: `Too many requests. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    /* 2 ── Parse body */
    let body: Partial<ContactPayload>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    /* 3 ── Validate */
    const { valid, errors } = validate(body);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Please fix the errors below.", errors },
        { status: 422 }
      );
    }

    /* 4 ── Sanitize */
    const name    = sanitize(body.name!);
    const email   = body.email!.trim().toLowerCase();
    const message = sanitize(body.message!);

    /* 5 ── Check env vars */
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
      console.error("[contact] Missing GMAIL_USER or GMAIL_APP_PASS.");
      return NextResponse.json(
        { success: false, message: "Server configuration error. Please email us directly." },
        { status: 500 }
      );
    }

    /* 6 ── Send emails */
    const transporter = createTransporter();
    await transporter.verify(); // test SMTP connection first

    await Promise.all([
      transporter.sendMail(buildOwnerEmail(name, email, message)),
      transporter.sendMail(buildAutoReplyEmail(name, email)),
    ]);

    console.log(`[contact] ✓ Message from ${email} at ${new Date().toISOString()}`);

    return NextResponse.json(
      { success: true, message: "Your message has been sent! I'll be in touch within 24 hours." },
      { status: 200 }
    );

  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to send your message. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

/* Block other HTTP methods */
export async function GET()    { return NextResponse.json({ message: "Method not allowed." }, { status: 405 }); }
export async function PUT()    { return NextResponse.json({ message: "Method not allowed." }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ message: "Method not allowed." }, { status: 405 }); }
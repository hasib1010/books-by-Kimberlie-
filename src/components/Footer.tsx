// src/app/components/Footer.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Facebook, Instagram, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─────────────────────────────────────
   Newsletter + Footer wrapper
───────────────────────────────────── */
export default function Footer() {
  return (
    <>
      <Newsletter />
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────────────────
   Newsletter signup strip
───────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.message || "Something went wrong.");
      } else {
        setOk(true);
        setEmail("");
      }
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(135deg, #2A1A1E 0%, #1A2420 100%)",
        padding: "60px 8%",
        zIndex: 9,
      }}
    >
      <div
        data-aos="fade-up"
        className="max-w-[1160px] mx-auto flex items-center justify-between gap-8 flex-wrap"
      >
        <div>
          <h3
            className="font-display font-light text-white mb-1.5 tracking-[-.01em]"
            style={{ fontSize: 28 }}
          >
            Stay in the loop
          </h3>
          <p className="text-sm text-white/50">
            Helpful bookkeeping tips, money wins &amp; cheerful updates.
          </p>
        </div>

        {ok ? (
          <div className="flex items-center gap-2.5 text-white/85 font-medium text-sm">
            <CheckCircle2 size={18} color="#3A9E8F" /> You&apos;re subscribed — thank you!
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-2">
            <div
              className="flex rounded-full p-[5px]"
              style={{
                background: "rgba(255,255,255,.07)",
                border: "1px solid rgba(255,255,255,.14)",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErr("");
                }}
                disabled={busy}
                className="bg-transparent border-0 text-white outline-none"
                style={{
                  padding: "10px 18px",
                  fontSize: 14,
                  minWidth: 220,
                  fontFamily: "'Jost', sans-serif",
                }}
              />
              <button
                type="submit"
                disabled={busy}
                className="text-white border-0 rounded-full cursor-pointer whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #C0556A, #D4756A)",
                  padding: "10px 26px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {busy ? "Subscribing…" : "Subscribe"}
              </button>
            </div>
            {err && <p className="text-xs text-white/60 pl-2">{err}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Main site footer
───────────────────────────────────── */
function SiteFooter() {
  return (
    <footer
      className="relative"
      style={{
        background: "#120D0F",
        padding: "68px 8% 28px",
        zIndex: 10,
      }}
    >
      <div className="max-w-[1160px] mx-auto">
        <div
          className="col-2-sm grid gap-12 mb-14"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr" }}
        >
          <div data-aos="fade-up">
            <FooterBrand />
          </div>
          {FOOTER_COLUMNS.map((col, i) => (
            <div
              key={col.h}
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 100}
            >
              <FooterColumn column={col} />
            </div>
          ))}
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────
   Footer data
───────────────────────────────────── */
type FooterLink = { l: string; href: string };
type FooterColumnData = { h: string; links: FooterLink[] };

const FOOTER_COLUMNS: FooterColumnData[] = [
  {
    h: "Services",
    links: [
      { l: "QuickBooks", href: "#services" },
      { l: "Payroll", href: "#services" },
      { l: "Financial Reports", href: "#services" },
      { l: "Accounts Payable", href: "#services" },
      { l: "Accounts Receivable", href: "#services" },
      { l: "Outsourced Accounting", href: "#outsourced-accounting" },
    ],
  },
  {
    h: "Company",
    links: [
      { l: "About", href: "#about" },
      { l: "How It Works", href: "#process" },
      { l: "Industries", href: "#industries" },
      { l: "Reviews", href: "#testimonials" },
      { l: "Contact", href: "#contact" },
    ],
  },
  {
    h: "Contact",
    links: [
      { l: "kimberlie@booksbykimberlie.com", href: "mailto:kimberlie@booksbykimberlie.com" },
      { l: "830-730-4160", href: "tel:8307304160" },
      { l: "830-515-9818", href: "tel:8305159818" },
      { l: "WhatsApp", href: "#contact" },
    ],
  },
];

type SocialLink = { I: LucideIcon; c: string; href: string };

const SOCIAL_LINKS: SocialLink[] = [
  { I: Facebook, c: "#C0556A", href: "https://www.facebook.com/profile.php?id=61572139542343" },
  { I: Instagram, c: "#B07D3A", href: "https://www.instagram.com/kimberliegerstner/" },
  { I: Linkedin, c: "#3A9E8F", href: "https://www.linkedin.com/company/112942216/admin/dashboard/" },
];

/* ─────────────────────────────────────
   Footer brand column (logo + socials)
───────────────────────────────────── */
function FooterBrand() {
  return (
    <div>
      <Image
        src="/logo.png"
        alt="Books by Kimberlie"
        width={200}
        height={100}
        className="block mb-4"
        style={{
          objectFit: "contain",
          objectPosition: "left center",
          height: 70,
          width: "auto",
        }}
      />
      <p className="text-[13px] text-white/35 leading-[1.88] max-w-[240px] mb-[22px]">
        Professional bookkeeping &amp; outsourced accounting services for businesses of every kind.
        <br />
        From chaos to calm, one ledger at a time.
      </p>

      <div className="flex gap-2.5">
        {SOCIAL_LINKS.map(({ I: Icon, c, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-[9px] no-underline"
            style={{
              width: 34,
              height: 34,
              background: `${c}14`,
              border: `1px solid ${c}30`,
            }}
          >
            <Icon size={14} color={c} />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Single footer link column
───────────────────────────────────── */
function FooterColumn({ column }: { column: FooterColumnData }) {
  return (
    <div>
      <div
        className="text-[10px] font-semibold tracking-[.14em] uppercase mb-[18px]"
        style={{ color: "#C0556A" }}
      >
        {column.h}
      </div>
      <ul className="list-none flex flex-col gap-2.5">
        {column.links.map((link) => (
          <li key={link.l}>
            <a href={link.href} className="text-[13px] text-white/40 no-underline">
              {link.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────
   Footer copyright + legal strip
───────────────────────────────────── */
function FooterBottom() {
  return (
    <div
      className="flex justify-between items-center flex-wrap gap-3 pt-6"
      style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}
    >
      <span className="text-xs text-white/20">
        © {new Date().getFullYear()} Books by Kimberlie. All rights reserved.
      </span>
      <div className="flex gap-6">
        {["Privacy Policy", "Terms of Service"].map((l) => (
          <a key={l} href="#" className="text-xs text-white/20 no-underline">
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}
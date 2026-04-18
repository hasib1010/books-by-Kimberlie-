"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, TrendingUp, Shield, Clock,
  BarChart3, Star, Mail, Phone, MessageCircle,
  Instagram, Facebook, Linkedin, Sparkles, ChevronDown, Menu, X,
  FileText, CreditCard, Receipt,  
} from "lucide-react";

/* ────────────────────────────────────────
   DATA
──────────────────────────────────────── */
const SERVICES = [
  { title: "QuickBooks", img: "/quickbooks.png", accent: "#C0556A", bg: "#FDF4F6", icon: BarChart3, desc: "Expert setup and ongoing management so your books stay accurate, clean, and always tax-ready." },
  { title: "Payroll", img: "/payroll.png", accent: "#3A9E8F", bg: "#F0F9F7", icon: Clock, desc: "On-time, every time. Smooth payroll runs so your team gets paid correctly and you stay compliant." },
  { title: "Financial Reports", img: "/reports.png", accent: "#B07D3A", bg: "#FBF6EE", icon: TrendingUp, desc: "Clear, actionable reports showing exactly where your cash is going — and where it should be." },
  { title: "Accounts Payable", img: "/payable.png", accent: "#7E6BA8", bg: "#F5F2FA", icon: CreditCard, desc: "Stay on top of every bill and vendor payment. We track, schedule, and manage what you owe so nothing slips through." },
  { title: "Accounts Receivable", img: "/recivable.png", accent: "#C0556A", bg: "#FDF4F6", icon: Receipt, desc: "Get paid faster. We manage your invoices, follow up on outstanding balances, and keep your cash flowing in." },
  { title: "Payment Processing", img: "/processing.png", accent: "#3A9E8F", bg: "#F0F9F7", icon: FileText, desc: "Accurate recording and reconciliation of every transaction — bank feeds, credit cards, and payments all in sync." },
];

const TICKER_ITEMS = [
  "QuickBooks Setup & Cleanup",
  "Payroll Processing",
  "Financial Reports",
  "Accounts Payable",
  "Accounts Receivable",
  "Bank Reconciliation",
  "Payment Processing",
  "Outsourced Accounting Services",
  "Cash Flow Tracking",
  "GAAP-Compliant Reporting",
  "Tax-Ready Books",
  "Controller & CFO Services",
];

const BOOKKEEPING_SERVICES = [
  "Record and organize financial transactions",
  "Categorize income and expenses accurately",
  "Reconcile bank and credit card accounts",
  "Manage accounts payable and accounts receivable",
  "Track invoices, bills, and payments",
  "Prepare basic financial reports",
  "Keep books clean, current, and easy to understand",
  "Organize receipts and supporting documents",
  "Help prepare records for tax time",
  "Identify errors, duplicates, and discrepancies",
  "Support cash flow tracking and financial visibility",
  "Maintain accurate records in accounting software",
];

const INDUSTRIES = [
  { name: "Construction", emoji: "🏗️", note: "Job costing, WIP tracking, subcontractor payments", c: "#B07D3A", bg: "#FBF6EE" },
  { name: "Hospitality", emoji: "🏨", note: "Revenue management, tips, seasonal cash flow", c: "#C0556A", bg: "#FDF4F6" },
  { name: "Tech & SaaS", emoji: "💻", note: "ARR tracking, payroll scaling, investor-ready books", c: "#7E6BA8", bg: "#F5F2FA" },
  { name: "Real Estate", emoji: "🏡", note: "Property management, escrow, rental income tracking", c: "#3A9E8F", bg: "#F0F9F7" },
  { name: "Retail & E-commerce", emoji: "🛍️", note: "Inventory, COGS, multi-channel payment reconciliation", c: "#B07D3A", bg: "#FBF6EE" },
  { name: "Professional Services", emoji: "💼", note: "Billable hours, retainer tracking, expense management", c: "#C0556A", bg: "#FDF4F6" },
  { name: "Healthcare", emoji: "🩺", note: "Insurance receivables, compliance, payroll management", c: "#3A9E8F", bg: "#F0F9F7" },
  { name: "Non-profit", emoji: "🤝", note: "Grant tracking, fund accounting, donor reporting", c: "#7E6BA8", bg: "#F5F2FA" },
];

const OUTSOURCED_FEATURES = [
  { icon: TrendingUp, c: "#C0556A", bg: "#FDF4F6", title: "Controller Services", desc: "Month-end close, GAAP reporting, financial oversight" },
  { icon: BarChart3, c: "#3A9E8F", bg: "#F0F9F7", title: "CFO Advisory", desc: "Cash flow forecasting, budgeting, strategic planning" },
  { icon: Shield, c: "#B07D3A", bg: "#FBF6EE", title: "Compliance & Tax Prep", desc: "Tax-ready books, audit support, regulatory compliance" },
  { icon: Clock, c: "#7E6BA8", bg: "#F5F2FA", title: "Scalable Support", desc: "Grows with your business — from startup to $10M+" },
];

const WHY = [
  { icon: Shield, c: "#C0556A", bg: "#FDF4F6", title: "Controller/CFO Experience", desc: "Provided senior accounting leadership for decades, guiding businesses from $100,000 startups to multi-million-dollar companies with confidence, precision, and strategic financial oversight." },
  { icon: Clock, c: "#3A9E8F", bg: "#F0F9F7", title: "Proven Across Industries", desc: "Construction job costing, hospitality revenue management, banking compliance, and tech payroll scaling." },
  { icon: TrendingUp, c: "#B07D3A", bg: "#FBF6EE", title: "QuickBooks Specialist", desc: "Setup, cleanup, automation, and monthly maintenance that actually saves you time and headaches." },
  { icon: Sparkles, c: "#7E6BA8", bg: "#F5F2FA", title: "GAAP-Compliant Reporting", desc: "P&L, Balance Sheet, cash flow your CPA will love and you will actually understand." },
];

const STEPS = [
  { n: "01", c: "#C0556A", title: "Free Consultation", desc: "We talk through your business, pain points, and what calm finances looks like for you." },
  { n: "02", c: "#3A9E8F", title: "Custom Setup", desc: "I tailor QuickBooks, workflows, and reporting to match exactly how you operate." },
  { n: "03", c: "#B07D3A", title: "Ongoing Support", desc: "Monthly bookkeeping, payroll, and reconciliations — delivered on time, every time." },
  { n: "04", c: "#7E6BA8", title: "Clear Insights", desc: "Regular reports and proactive advice so you always know exactly where you stand." },
];

const TESTI = [
  {
    q: "Books by Kimberlie has been a game changer for our construction business. Kimberlie understands construction accounting, keeps our books accurate and current, and gives us clear financial insight to make better decisions. She is timely, dependable, and quick to solve problems, bringing professionalism and peace of mind every step of the way. Five stars.",
    name: "VR Construction",
    role: "Construction",
    img: "/construction.png",
    c: "#B07D3A",
    logo: true,
  },
  {
    q: "Kimberlie makes our accounting easy and simple. She tracks money in and out perfect, keeps books clean, and helps us run better. Always positive and pro—best partner for our business!",
    name: "Innovative Plastering",
    role: "Plastering",
    img: "/innovative%20plusturing.png",
    c: "#3A9E8F",
    logo: true,
  },
  {
    variant: "expand" as const,
    preview:
      "Books by Kimberlie provides exceptional accounting for our complex, high-volume operations at 1to1 Plans, where credit card transactions, multi-channel payments, and tech-construction revenue streams demand precision and adaptability.",
    strengths: [
      "Expertly manages high-volume credit card/digital transactions with flawless categorization and reconciliation.",
      "Organizes layered revenue models for clear structure across client payments.",
      "Delivers seamless systems integration across platforms, ensuring efficient alignment.",
      "Produces timely, insightful financial reports that drive confident decisions.",
    ],
    closing:
      "Kimberlie's proactive communication, calm professionalism, and forward-thinking support resolve issues before they escalate, building total trust. She transforms fragmented financials into a streamlined, reliable system—ideal for tech-construction hybrids.",
    name: "1to1 Plans",
    role: "New Braunfels, TX",
    img: "/1tolplans.png",
    c: "#7E6BA8",
    logo: true,
  },
  {
    variant: "expand" as const,
    preview:
      "Bespoke Fine Homes partnered with Books by Kimberlie six months ago for our custom home building and small commercial construction accounting needs. From day one, Kimberlie brought exceptional clarity, structure, and confidence to this intricate and demanding area of our business.",
    strengths: [
      "Unmatched accuracy: meticulous financial preparation and organization ensure total confidence in our numbers.",
      "Job costing expertise: masterful tracking of budgets, allocations, and real-time project costs across every job.",
      "Actionable reporting: timely, insightful reports that guide decisions and keep projects financially on track.",
    ],
    closing:
      "Kimberlie's proactive communication, unwavering responsiveness, and solution-focused approach keep us informed and supported. Her calm professionalism and positive attitude transform overwhelming accounting challenges into a streamlined, enjoyable process—making her a trusted team extension.",
    name: "Bespoke Fine Homes",
    role: "Custom home building",
    img: "/bespokefinehomes.png",
    c: "#C0556A",
    logo: true,
  },
] as const;

type TestimonialRow = (typeof TESTI)[number];

const CLIENT_LOGOS = [
  { src: "/construction.png", alt: "VR Construction" },
  { src: "/innovative%20plusturing.png", alt: "Innovative Plastering" },
  { src: "/1tolplans.png", alt: "1to1 Plans" },
  { src: "/bespokefinehomes.png", alt: "Bespoke Fine Homes" },
] as const;

function ClientLogoMarks({ size = 56 }: { size?: number }) {
  const pad = Math.max(5, Math.round(size * 0.14));
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={logo.src}
          style={{
            position: "relative",
            width: size,
            height: size,
            borderRadius: 14,
            overflow: "hidden",
            background: "#fff",
            border: "1px solid rgba(30,26,24,.1)",
            boxShadow: "0 2px 12px rgba(30,26,24,.07)",
            flexShrink: 0,
          }}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            sizes={`${size}px`}
            style={{ objectFit: "contain", objectPosition: "center", padding: pad }}
          />
        </div>
      ))}
    </div>
  );
}

const NAV = ["About", "Services", "Process", "Contact"];

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Lottie Background — lazy loads @lottiefiles/dotlottie-web ── */
function LottieBackground({ src,   }: { src: string;   }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { DotLottie } = await import("@lottiefiles/dotlottie-web" as string) as { DotLottie: new (opts: object) => { destroy?: () => void } };
        if (cancelled || !canvasRef.current) return;
        playerRef.current = new DotLottie({
          canvas: canvasRef.current,
          src,
          loop: true,
          autoplay: true,
          renderConfig: { devicePixelRatio: 1 },
        });
      } catch (e) {
        // Lottie not installed yet — silently skip
        console.warn("Lottie not loaded:", e);
      }
    })();
    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
       
        zIndex: 0,
      }}
    />
  );
}

function TestimonialCard({
  t,
  starRow,
  cardBase,
  INK,
}: {
  t: TestimonialRow;
  starRow: (n?: number, sz?: number) => React.ReactNode;
  cardBase: (extra?: React.CSSProperties) => React.CSSProperties;
  INK: string;
}) {
  const [open, setOpen] = useState(false);
  const isExpand = "variant" in t && t.variant === "expand";
  const logo = "logo" in t && t.logo === true;
  const c = t.c;

  return (
    <div
      className="card-hover"
      style={{ ...cardBase({ padding: "28px 26px 26px", overflow: "hidden", position: "relative" }), cursor: "default" }}
    >
      <div
        style={{
          position: "absolute",
          top: 16, right: 20,
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 72, color: c,
          opacity: 0.07, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}
      >
        &ldquo;
      </div>
      {logo && (
        <div
          style={{
            position: "relative", zIndex: 1,
            width: "100%", minHeight: 100,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 18,
            background: "linear-gradient(180deg, #FAFAF9 0%, #FFFFFF 55%)",
            borderRadius: 18,
            border: `1px solid ${c}35`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,.9)`,
            padding: "18px 22px",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: 84, maxWidth: 280 }}>
            <Image
              src={t.img}
              alt={`${t.name} logo`}
              fill
              sizes="(max-width:768px) 90vw, 280px"
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        </div>
      )}
      {starRow(5, 13)}
      {isExpand ? (
        <div style={{ position: "relative", zIndex: 1, margin: "16px 0 24px" }}>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.88, fontStyle: "italic", marginBottom: open ? 14 : 10 }}>
            &ldquo;{t.preview}&rdquo;
          </p>
          {open && (
            <>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AAA", marginBottom: 10 }}>
                Key strengths
              </div>
              <ul style={{ margin: "0 0 16px 18px", padding: 0, fontSize: 13, color: "#555", lineHeight: 1.75 }}>
                {t.strengths.map((s, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>{s}</li>
                ))}
              </ul>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#AAA", marginBottom: 10 }}>
                Client experience
              </div>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.82, marginBottom: 14 }}>{t.closing}</p>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            style={{
              background: "none", border: "none", padding: 0,
              fontSize: 13, fontWeight: 600, color: c,
              cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3,
            }}
          >
            {open ? "Show less" : "Read more"}
          </button>
        </div>
      ) : "q" in t ? (
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.88, fontStyle: "italic", margin: "16px 0 24px", position: "relative", zIndex: 1 }}>
          &ldquo;{t.q}&rdquo;
        </p>
      ) : null}
      <div style={{ borderTop: "1px solid rgba(30,26,24,.07)", paddingTop: 18, marginTop: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: INK, letterSpacing: ".01em" }}>{t.name}</div>
        <div style={{ fontSize: 12, color: "#999", marginTop: 4, letterSpacing: ".02em", lineHeight: 1.45 }}>{t.role}</div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   PAGE
──────────────────────────────────────── */
export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [fldErr, setFldErr] = useState<Record<string, string>>({});
  const [nlEmail, setNlEmail] = useState("");
  const [nlBusy, setNlBusy] = useState(false);
  const [nlOk, setNlOk] = useState(false);
  const [nlErr, setNlErr] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const sendNl = async (e: React.FormEvent) => {
    e.preventDefault(); setNlBusy(true); setNlErr("");
    try {
      const r = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: nlEmail }) });
      const d = await r.json();
      if (!r.ok) setNlErr(d.message || "Something went wrong.");
      else { setNlOk(true); setNlEmail(""); }
    } catch { setNlErr("Network error."); }
    finally { setNlBusy(false); }
  };

  const sendContact = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true); setFormErr(null); setFldErr({});
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message: msg }) });
      const d = await r.json();
      if (!r.ok) {
        if (r.status === 422 && d.errors) setFldErr(d.errors);
        else setFormErr(d.message || "Something went wrong.");
        return;
      }
      setSent(true); setName(""); setEmail(""); setMsg("");
    } catch { setFormErr("Network error."); }
    finally { setSending(false); }
  };

  /* ── shared micro-styles ── */
  const ROSE = "#C0556A";
  const TEAL = "#3A9E8F";
  const GOLD = "#B07D3A";
  const PLUM = "#7E6BA8";
  const IVORY = "#FFFCF7";
  const INK = "#1E1A18";
  const MIST = "#F7F3EE";

  const eyebrow = (c = ROSE): React.CSSProperties => ({
    fontSize: 11, fontWeight: 600, letterSpacing: ".2em",
    textTransform: "uppercase", color: c, marginBottom: 14,
  });

  const displayTitle = (extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(32px,3.5vw,52px)",
    fontWeight: 400, lineHeight: 1.12,
    letterSpacing: "-.02em", color: INK,
    marginBottom: 20, ...extra,
  });

  const body = (extra?: React.CSSProperties): React.CSSProperties => ({
    fontSize: 15, color: "#6B6461", lineHeight: 1.9, ...extra,
  });

  const pill = (c = ROSE): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    background: `${c}12`, border: `1px solid ${c}35`,
    borderRadius: 50, padding: "7px 16px",
    fontSize: 11, fontWeight: 600, letterSpacing: ".08em",
    color: c, width: "fit-content",
  });

  const primaryBtn = (extra?: React.CSSProperties): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 9,
    background: `linear-gradient(135deg, ${ROSE} 0%, #D4756A 100%)`,
    color: "white", border: "none", borderRadius: 50,
    padding: "14px 32px", fontSize: 14, fontWeight: 600,
    cursor: "pointer", textDecoration: "none",
    boxShadow: `0 8px 32px ${ROSE}35`,
    transition: "transform .22s, box-shadow .22s", ...extra,
  });

  const outlineBtn = (extra?: React.CSSProperties): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "transparent", color: INK,
    border: `1.5px solid rgba(30,26,24,.22)`,
    borderRadius: 50, padding: "13px 30px",
    fontSize: 14, fontWeight: 500, cursor: "pointer",
    textDecoration: "none", transition: "all .22s", ...extra,
  });

  const cardBase = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "white",
    borderRadius: 24,
    border: "1px solid rgba(192,85,106,.1)",
    boxShadow: "0 4px 32px rgba(30,26,24,.05)", ...extra,
  });

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%", background: "#FDFAF7",
    border: `1.5px solid ${err ? "#e74c3c" : "rgba(192,85,106,.2)"}`,
    borderRadius: 12, padding: "13px 16px",
    fontSize: 14, color: INK, outline: "none",
    fontFamily: "'Jost', sans-serif",
    transition: "border-color .2s",
  });

  const hoverLift = (e: React.MouseEvent<HTMLElement>, in_: boolean) => {
    e.currentTarget.style.transform = in_ ? "translateY(-4px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = in_ ? "0 20px 48px rgba(30,26,24,.1)" : "0 4px 32px rgba(30,26,24,.05)";
  };

  const starRow = (n = 5, sz = 13) => (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(n)].map((_, i) => <Star key={i} size={sz} fill="#D4A843" color="#D4A843" />)}
    </div>
  );

  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden", background: IVORY, color: INK, fontFamily: "'Jost', sans-serif" }}>

      {/* ── GLOBAL CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; scroll-padding-top:80px; }
        body { -webkit-font-smoothing:antialiased; }

        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(192,85,106,.25); border-radius:3px; }
        ::selection { background:rgba(192,85,106,.15); }

        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.78)} }
        @keyframes cue { 0%,100%{opacity:.5;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(8px)} }
        @keyframes spin { to{transform:rotate(360deg)} }

        /* ── Ticker scroll ── */
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 32s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }

        /* ── Coin-rain ── */
        @keyframes coinFall {
          0%   { transform: translateY(-80px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .coin {
          position: fixed;
          top: 0;
          pointer-events: none;
          z-index: 9999;
          font-size: 22px;
          animation: coinFall linear forwards;
        }

        .card-hover { transition: transform .26s, box-shadow .26s !important; }
        .card-hover:hover { transform:translateY(-6px) !important; box-shadow:0 24px 56px rgba(30,26,24,.09) !important; }
        .btn-hover { transition: transform .22s, box-shadow .22s !important; }
        .btn-hover:hover { transform:translateY(-2px) !important; box-shadow:0 16px 40px rgba(192,85,106,.42) !important; }
        .link-hover:hover { opacity:.7; }

        /*
         * ── HILINE STACKING SECTIONS ──
         * Each section sits sticky at top:0 and layers over the previous.
         * The top border-radius + shadow gives the "peeling page" effect.
         */
        .stack-section {
          position: sticky;
          top: 0;
          border-radius: 28px 28px 0 0;
          box-shadow: 0 -12px 48px rgba(30,26,24,.08);
          will-change: transform;
        }
        /* Hero is the base — no rounding needed */
        .stack-hero {
          position: relative;
          border-radius: 0;
          box-shadow: none;
        }

        /*
         * ── SYSTEMSIX FLOAT EFFECT ──
         * Sections slide up with a smooth parallax feel.
         * We rely on the reveal animation + sticky stacking for the "float."
         */
        @keyframes sectionFloat {
          from { opacity: 0; transform: translateY(40px) scale(.995); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .stack-section {
          animation: sectionFloat .6s ease both;
        }

        .testimonial-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .testimonial-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        .service-card-media {
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }
        .service-card-media img {
          width: 100% !important;
          height: auto !important;
          max-height: none !important;
          display: block;
          object-fit: contain;
        }

        /* ── Industry cards grid ── */
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 900px) {
          .industry-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .industry-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ── Outsourced features grid ── */
        .outsourced-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .outsourced-grid { grid-template-columns: 1fr; }
        }

        @media(max-width:768px) {
          .hide-sm   { display:none !important; }
          .show-sm   { display:flex !important; }
          .col-1-sm  { grid-template-columns:1fr !important; }
          .col-2-sm  { grid-template-columns:1fr 1fr !important; }
          .col-3-sm  { grid-template-columns:1fr 1fr !important; }
          .sec-pad   { padding:72px 6% !important; }
          .services-sec.sec-pad {
            padding-left: max(12px, 4vw) !important;
            padding-right: max(12px, 4vw) !important;
          }
          .hero-sect {
            grid-template-columns: 1fr !important;
            min-height: 100dvh !important;
            padding-top: 0 !important;
          }
          .hero-left {
            min-height: 100dvh !important;
            padding: 96px 6% 52px !important;
            justify-content: flex-end !important;
            background-size: cover !important;
            background-position: center 25% !important;
            position: relative !important;
          }
          .hero-left::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
          }
          .hero-left > * { position: relative; z-index: 1; }
          .hero-h1 { font-size: clamp(38px,9vw,56px) !important; }
          .hero-badge { margin-bottom: 14px !important; }
          .hero-sub { font-size: 14px !important; margin-bottom: 18px !important; }
          .hero-proof { margin-bottom: 18px !important; }
          .hero-btns { margin-bottom: 18px !important; }
          .hero-btns a:last-child { display: none !important; }
          .nav-logo-img { height: 80px !important; }
          .stack-section { border-radius: 18px 18px 0 0; }
        }
        @media(max-width:480px) {
          .col-2-sm  { grid-template-columns:1fr !important; }
          .col-3-sm  { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ══════════ COIN RAIN ══════════ */}
      <CoinRain />

      {/* ══════════ MOBILE DRAWER ══════════ */}
      {drawer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", flexDirection: "column", padding: "32px 7%", background: "linear-gradient(160deg, #2A1A1E 0%, #1E2820 100%)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 32 }}>
            <Image src="/logo.png" alt="Books by Kimberlie" width={220} height={88} style={{ objectFit: "contain", height: 88, width: "auto" }} />
            <button onClick={() => setDrawer(false)} style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
              <X size={20} />
            </button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setDrawer(false)}
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 40, fontWeight: 300, color: "rgba(255,255,255,.88)", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.07)", letterSpacing: "-.01em" }}>
                {l}
              </a>
            ))}
          </nav>
          <a href="#contact" onClick={() => setDrawer(false)} style={{ ...primaryBtn({ marginTop: 36, alignSelf: "flex-start" }) }}>
            Get Started <ArrowRight size={15} />
          </a>
        </div>
      )}

      {/* ══════════ NAV ══════════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: "auto",
        background: scrolled ? "rgba(255,252,247,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(192,85,106,.1), 0 4px 32px rgba(30,26,24,.05)" : "none",
        transition: "background .3s, box-shadow .3s, height .3s",
      }}>
        <Image
          src="/logo.png"
          alt="Books by Kimberlie"
          width={520}
          height={100}
          priority
          className="nav-logo-img"
          style={{ objectFit: "contain", objectPosition: "left center", height: 250, width: "auto" }}
        />
        <nav className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, letterSpacing: ".03em", color: "#6B6461", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = ROSE}
              onMouseLeave={e => e.currentTarget.style.color = "#6B6461"}>
              {l}
            </a>
          ))}
          <a href="#contact" className="btn-hover" style={primaryBtn({ padding: "10px 22px", fontSize: 13 }) as React.CSSProperties}>
            Get Started <ArrowRight size={13} />
          </a>
        </nav>
        <button className="show-sm" onClick={() => setDrawer(true)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, color: ROSE }}>
          <Menu size={26} />
        </button>
      </header>

      {/* ══════════ HERO (base layer — no sticky needed) ══════════ */}
      <section id="home" className="mt-20 hero-sect stack-hero" style={{
        minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
        position: "relative", overflow: "hidden", paddingTop: 100,
        background: `linear-gradient(140deg, #FDF6F8 0%, ${IVORY} 45%, #F4F9F7 100%)`,
        zIndex: 1,
      }}>
        <div style={{ position: "absolute", top: -140, right: -120, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(212,168,67,.12) 0%, transparent 68%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle, rgba(192,85,106,.1) 0%, transparent 68%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "35%", left: "48%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(58,158,143,.07) 0%, transparent 68%)`, pointerEvents: "none" }} />

        {/* LEFT */}
        <div className="hero-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 5% 72px 8%", position: "relative", zIndex: 2 }}>
          <div className="hero-badge" style={pill()}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: ROSE, flexShrink: 0, animation: "blink 2.2s infinite" }} />
            Remote Bookkeeping · Vermont
          </div>
          <h1 className="hero-h1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(46px,4.6vw,74px)", fontWeight: 300, lineHeight: 1.06, color: INK, margin: "22px 0 18px", letterSpacing: "-.025em" }}>
            From <em style={{ fontStyle: "italic", color: ROSE }}>chaos</em><br />
            to calm, <em style={{ fontStyle: "italic" }}>one</em><br />
            <em style={{ fontStyle: "italic", color: ROSE }}>ledger</em> at a time.
          </h1>
          <p className="hero-sub" style={{ ...body(), maxWidth: 440, marginBottom: 26 }}>
            Professional bookkeeping &amp; outsourced accounting services for businesses of every kind — so you can focus on growing what you love.{" "}
            <span style={{ color: ROSE, fontWeight: 500 }}>No spreadsheet nightmares, just crystal-clear numbers.</span>
          </p>
          <div className="hero-proof" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <ClientLogoMarks size={56} />
            <div>
              {starRow(5, 12)}
              <span style={{ fontSize: 13, color: "#888", marginTop: 3, display: "block" }}>
                <strong style={{ color: INK }}>200+ clients</strong> trust Kimberlie
              </span>
            </div>
          </div>
          <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
            <a href="#contact" className="btn-hover" style={primaryBtn() as React.CSSProperties}>
              Get a Free Consultation <ArrowRight size={16} />
            </a>
            <a href="#services" className="link-hover" style={outlineBtn() as React.CSSProperties}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ROSE; e.currentTarget.style.color = ROSE; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(30,26,24,.22)"; e.currentTarget.style.color = INK; }}>
              See My Services
            </a>
          </div>
          <div className="col-2-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[
              { v: "30+", l: "Years Exp.", c: ROSE },
              { v: "200+", l: "Happy Clients", c: TEAL },
              { v: "100%", l: "Remote", c: GOLD },
              { v: "$0", l: "Hidden Fees", c: PLUM },
            ].map(s => (
              <div key={s.l} style={{ background: "white", borderRadius: 16, padding: "16px 10px", textAlign: "center", border: `1px solid ${s.c}22`, boxShadow: `0 2px 12px ${s.c}12` }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, color: s.c, lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
                <div style={{ fontSize: 10, fontWeight: 500, color: "#AAA", letterSpacing: ".04em", lineHeight: 1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — hero photo */}
        <div className="hide-sm" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 6% 60px 2%", position: "relative", zIndex: 2 }}>
          <div>
            <Image src="/hero.jpeg" alt="Bookkeeping" fill style={{ objectFit: "contain", objectPosition: "center" }} />
          </div>
          <div style={{ position: "absolute", top: "14%", left: "0%", background: "white", borderRadius: 20, padding: "14px 18px", display: "flex", alignItems: "center", gap: 11, boxShadow: "0 12px 48px rgba(30,26,24,.1)", animation: "floatA 4.5s ease-in-out infinite" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${TEAL}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle2 size={18} color={TEAL} />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#BBB", marginBottom: 2 }}>Books Status</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEAL }}>All Up to Date ✓</div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "12%", right: "3%", background: "white", borderRadius: 20, padding: "16px 20px", boxShadow: "0 12px 48px rgba(30,26,24,.1)", minWidth: 190, animation: "floatB 5.5s ease-in-out infinite" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#BBB", marginBottom: 6 }}>Cash Flow · This Month</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 600, color: ROSE, lineHeight: 1 }}>$12,480</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: TEAL, marginTop: 5 }}>↑ 18% vs last month</div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 20, left: "50%", color: ROSE, animation: "cue 2.4s ease-in-out infinite", opacity: .6 }}>
          <ChevronDown size={22} />
        </div>
      </section>

      {/* ══════════ SCROLLING TICKER ══════════ */}
      <div style={{ background: `linear-gradient(90deg, #2A1A1E 0%, #1E2820 100%)`, padding: "18px 0", overflow: "hidden", position: "relative", zIndex: 10 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(90deg, #2A1A1E, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(270deg, #1E2820, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 0, whiteSpace: "nowrap", paddingRight: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", padding: "0 28px" }}>{item}</span>
              <span style={{ color: ROSE, fontSize: 14, opacity: .6 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ ABOUT (stack layer 2) ══════════ */}
      <section id="about" className="sec-pad stack-section" style={{ padding: "108px 8%", background: IVORY, zIndex: 2 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <RevealSection>
            <div className="col-1-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", marginBottom: 96 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: 36, overflow: "hidden", boxShadow: `0 32px 80px rgba(30,26,24,.12), 0 0 0 1px rgba(212,168,67,.2)` }}>
                  <Image src="/about_me.png" alt="Kimberlie Gerstner" fill style={{ objectFit: "cover", objectPosition: "top center" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(30,26,24,.55) 0%, transparent 50%)` }} />
                  <div style={{ position: "absolute", bottom: 24, left: 24, background: `linear-gradient(135deg, ${ROSE}, #D4756A)`, borderRadius: 18, padding: "12px 20px", color: "white" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 600, lineHeight: 1 }}>30+</div>
                    <div style={{ fontSize: 11, opacity: .9, marginTop: 3, letterSpacing: ".04em" }}>Years of Experience</div>
                  </div>
                </div>
                <div style={{ ...cardBase({ padding: "16px 20px" }), display: "flex", alignItems: "center", gap: 14 }}>
                  <ClientLogoMarks size={50} />
                  <div>
                    {starRow(5, 12)}
                    <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>Trusted by 200+ business owners</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Controller/CFO", "Construction", "Hospitality", "Banking", "Tech", "GAAP Reporting", "Outsourced Accounting"].map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 50, background: `${ROSE}10`, color: ROSE, border: `1px solid ${ROSE}25`, letterSpacing: ".04em" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={eyebrow()}>Meet Your Bookkeeper</div>
                <h2 style={displayTitle()}>
                  Hi, I&apos;m Kimberlie —<br />
                  <em style={{ color: ROSE, fontStyle: "italic" }}>your financial calm</em><br />
                  in the storm.
                </h2>
                <p style={{ ...body(), marginBottom: 14 }}>
                  With 30+ years of hands-on experience across construction, hospitality, banking, tech, and service industries,
                  I bring battle-tested expertise to every client&apos;s books. From Controller and CFO roles to Regional Finance
                  Manager for multi-million portfolios, I&apos;ve managed everything from multi-entity GAAP reporting to daily
                  wire transfers and international reconciliations.
                </p>
                <p style={{ ...body(), marginBottom: 22 }}>
                  I started Books by Kimberlie because I saw business owners drowning in receipts, bank feeds, and QuickBooks
                  headaches while trying to run their real work. My mission is simple: deliver clear financial control so you
                  can focus on your projects, customers, and growth instead of spreadsheets.
                </p>
                <div style={{ background: MIST, borderRadius: 18, padding: "20px 22px", marginBottom: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: ROSE, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 12 }}>What sets me apart</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {[
                      "Extensive Controller/CFO experience across multiple industries",
                      "QuickBooks specialist — setup, cleanup & automation",
                      "GAAP-compliant P&L, Balance Sheet & cash flow reporting",
                      "Clean books = more money in your pocket + zero tax-season panic",
                    ].map((pt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <CheckCircle2 size={14} color={TEAL} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a href="#contact" className="btn-hover" style={primaryBtn({ alignSelf: "flex-start" }) as React.CSSProperties}>
                  Book a Free Call <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div style={{ background: MIST, borderRadius: 32, padding: "52px 30px" }}>
              <div style={{ marginBottom: 20 }}>
                <div style={eyebrow()}>Why Work With Me?</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,2.8vw,38px)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-.02em", color: INK }}>
                  Four reasons clients <em style={{ color: ROSE, fontStyle: "italic" }}>keep coming back</em>
                </h3>
              </div>
              <div className="col-2-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
                {WHY.map(w => (
                  <div key={w.title} style={{ background: "white", border: `1px solid ${w.c}18`, borderRadius: 22, padding: "26px 20px", transition: "transform .25s, box-shadow .25s", cursor: "default" }}
                    onMouseEnter={e => hoverLift(e as unknown as React.MouseEvent<HTMLElement>, true)}
                    onMouseLeave={e => hoverLift(e as unknown as React.MouseEvent<HTMLElement>, false)}>
                    <div style={{ width: 44, height: 44, borderRadius: 13, background: w.bg, border: `1px solid ${w.c}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <w.icon size={20} color={w.c} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8, letterSpacing: ".01em" }}>{w.title}</div>
                    <div style={{ fontSize: 13, color: "#888", lineHeight: 1.72 }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════ SERVICES (stack layer 3) ══════════ */}
      <section id="services" className="sec-pad services-sec stack-section" style={{ padding: "108px 8%", background: "white", zIndex: 3 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
              <div>
                <div style={eyebrow(TEAL)}>What I Offer</div>
                <h2 style={displayTitle()}>
                  Services for<br />
                  <em style={{ color: ROSE, fontStyle: "italic" }}>every business</em>
                </h2>
              </div>
              <p style={{ ...body(), maxWidth: 300 }}>Every service is customized to your business — not a one-size-fits-all template.</p>
            </div>
          </RevealSection>

          <div className="col-3-sm" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginBottom: 64 }}>
            {SERVICES.map((s, i) => (
              <RevealSection key={s.title} delay={i * 60}>
                <div className="card-hover" style={{ ...cardBase({ overflow: "hidden" }), cursor: "default", height: "100%" }}>
                  <div className="service-card-media" style={{ background: s.bg }}>
                    <Image src={s.img} alt={s.title} width={800} height={480} sizes="(max-width:768px) 50vw, 360px" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
                  </div>
                  <div style={{ padding: "18px 22px 22px" }}>
                    <div style={{ height: 2, width: 40, borderRadius: 1, background: s.accent, marginBottom: 10, opacity: .7 }} />
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 25, fontWeight: 400, color: INK, marginBottom: 8, letterSpacing: "-.01em" }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.82 }}>{s.desc}</p>
                    <Link href="#contact" className="link-hover" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: s.accent, textDecoration: "none", marginTop: 12, letterSpacing: ".03em", transition: "opacity .2s" }}>
                      Learn more <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={100}>
            <div style={{ background: MIST, borderRadius: 32, padding: "52px 48px" }}>
              <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 auto", maxWidth: 280 }}>
                  <div style={eyebrow(GOLD)}>Full Service List</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(24px,2.4vw,34px)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-.02em", color: INK, marginBottom: 14 }}>
                    Everything your <em style={{ color: ROSE, fontStyle: "italic" }}>books need</em>
                  </h3>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>
                    Whether you need a full-service bookkeeper or just help getting caught up, I&apos;ve got you covered.
                  </p>
                </div>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "10px 24px" }}>
                    {BOOKKEEPING_SERVICES.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(30,26,24,.06)" }}>
                        <CheckCircle2 size={14} color={TEAL} style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════ INDUSTRIES WE SERVE (stack layer 4) ══════════ */}
      <section
        id="industries"
        className="sec-pad stack-section"
        style={{ padding: "108px 8%", background: `linear-gradient(140deg, #F9F5FF 0%, ${IVORY} 60%, #F4F9F7 100%)`, position: "relative", overflow: "hidden", zIndex: 4 }}
      >
        {/* Decorative blob */}
        <div style={{ position: "absolute", top: -200, right: -150, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(126,107,168,.06) 0%, transparent 68%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(58,158,143,.05) 0%, transparent 68%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <RevealSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
              <div>
                <div style={eyebrow(PLUM)}>Industries</div>
                <h2 style={displayTitle()}>
                  Expertise across<br />
                  <em style={{ color: ROSE, fontStyle: "italic" }}>every industry</em>
                </h2>
              </div>
              <p style={{ ...body(), maxWidth: 320 }}>
                30+ years of hands-on bookkeeping means I speak your industry&apos;s language — and know exactly where the money hides.
              </p>
            </div>
          </RevealSection>

          <div className="industry-grid" style={{ marginBottom: 48 }}>
            {INDUSTRIES.map((ind, i) => (
              <RevealSection key={ind.name} delay={i * 45}>
                <div
                  className="card-hover"
                  style={{
                    background: ind.bg,
                    borderRadius: 22,
                    padding: "26px 22px",
                    border: `1px solid ${ind.c}22`,
                    cursor: "default",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: "white",
                    border: `1px solid ${ind.c}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24,
                    boxShadow: `0 4px 16px ${ind.c}15`,
                  }}>
                    {ind.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 5, letterSpacing: ".01em" }}>{ind.name}</div>
                    <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}>{ind.note}</div>
                  </div>
                  <div style={{ height: 2, width: 28, borderRadius: 1, background: ind.c, opacity: .45, marginTop: "auto" }} />
                </div>
              </RevealSection>
            ))}
          </div>

          {/* CTA strip */}
          <RevealSection delay={80}>
            <div style={{
              background: `linear-gradient(135deg, #2A1A1E 0%, #1E2820 100%)`,
              borderRadius: 28, padding: "40px 48px",
              display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: 24,
            }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "white", marginBottom: 6 }}>
                  Don&apos;t see your industry?
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>
                  I work with businesses of all kinds. Let&apos;s talk about your specific needs.
                </p>
              </div>
              <a href="#contact" className="btn-hover" style={primaryBtn() as React.CSSProperties}>
                Book a Free Call <ArrowRight size={15} />
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════ PROCESS (stack layer 5) — with Lottie background ══════════ */}
      <section
        id="process"
        className="sec-pad stack-section"
        style={{ padding: "108px 8%", position: "relative", overflow: "hidden", background: `linear-gradient(140deg, #FBF7F0 0%, #F7F0F3 100%)`, zIndex: 5 }}
      >
        {/*
          Lottie money-falling animation as background.
          Requires: npm install @lottiefiles/dotlottie-web
          File:     /public/money falling.lottie
        */}
        <LottieBackground src="/money falling.lottie"   />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ ...eyebrow(GOLD), textAlign: "center" }}>The Process</div>
              <h2 style={{ ...displayTitle({ textAlign: "center", marginBottom: 14 }) }}>
                Simple from <em style={{ color: ROSE, fontStyle: "italic" }}>start to finish</em>
              </h2>
              <p style={{ ...body({ textAlign: "center" }), maxWidth: 520, margin: "0 auto" }}>
                Straightforward support tailored to your business. No confusion—just clear guidance and dependable results.
              </p>
            </div>
          </RevealSection>

          <div className="col-2-sm" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {STEPS.map((s, i) => (
              <RevealSection key={s.n} delay={i * 80}>
                <div className="card-hover" style={{ background: "rgba(255,255,255,.88)", backdropFilter: "blur(12px)", border: `1px solid ${s.c}22`, borderRadius: 24, padding: "32px 24px", textAlign: "center", cursor: "default", position: "relative", height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${s.c}, ${s.c}BB)`, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, margin: "0 auto 20px", boxShadow: `0 8px 24px ${s.c}35` }}>
                    {s.n}
                  </div>
                  {i < 3 && (
                    <div className="hide-sm" style={{ position: "absolute", top: "calc(32px + 26px)", left: "calc(50% + 26px + 10px)", width: "calc(100% - 52px - 20px)", height: 1, background: `linear-gradient(90deg, ${s.c}60, ${STEPS[i + 1].c}60)`, pointerEvents: "none" }} />
                  )}
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: INK, marginBottom: 10, letterSpacing: ".01em" }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.78 }}>{s.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS (stack layer 6) ══════════ */}
      <section id="testimonials" className="sec-pad stack-section" style={{ padding: "108px 8%", background: IVORY, zIndex: 6 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
              <div>
                <div style={eyebrow()}>Client Stories</div>
                <h2 style={displayTitle()}>
                  What clients
                  <em style={{ color: TEAL, fontStyle: "italic" }}> are saying</em>
                </h2>
              </div>
            </div>
          </RevealSection>

          {/* ── Hiline-style animated logo strip ── */}
          <RevealSection delay={80}>
            <div style={{ ...cardBase({ padding: "28px 32px", marginBottom: 48 }), display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#BBB", marginBottom: 6 }}>Trusted by</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: INK, fontWeight: 300 }}>Growing businesses across the U.S.</div>
              </div>
              {/* ── Hiline-style logo row with hover lift ── */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                {CLIENT_LOGOS.map((logo, i) => (
                  <div
                    key={logo.src}
                    className="card-hover"
                    style={{
                      position: "relative", width: 100, height: 64,
                      borderRadius: 14, overflow: "hidden",
                      background: "#FAFAF9",
                      border: "1px solid rgba(30,26,24,.08)",
                      boxShadow: "0 2px 10px rgba(30,26,24,.05)",
                      flexShrink: 0,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <Image src={logo.src} alt={logo.alt} fill sizes="100px" style={{ objectFit: "contain", padding: 10 }} />
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 8 }}>
                  {starRow(5, 14)}
                  <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>5.0</span>
                </div>
              </div>
            </div>
          </RevealSection>

          <div className="testimonial-grid">
            {TESTI.map((t, i) => (
              <RevealSection key={`${t.name}-${i}`} delay={i * 60}>
                <TestimonialCard t={t} starRow={starRow} cardBase={cardBase} INK={INK} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ OUTSOURCED ACCOUNTING SERVICES — SEO Section (stack layer 7) ══════════ */}
      <section
        id="outsourced-accounting"
        className="sec-pad stack-section"
        style={{ padding: "108px 8%", background: `linear-gradient(140deg, #F4F9F7 0%, ${IVORY} 60%, #FDF6F8 100%)`, position: "relative", overflow: "hidden", zIndex: 7 }}
      >
        <div style={{ position: "absolute", top: -180, left: -180, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(58,158,143,.06) 0%, transparent 68%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <RevealSection>
            <div style={{ marginBottom: 56 }}>
              <div style={eyebrow(TEAL)}>Outsourced Accounting Services</div>
              <h2 style={displayTitle({ maxWidth: 620 })}>
                Your part-time CFO,{" "}
                <em style={{ color: ROSE, fontStyle: "italic" }}>full-time results</em>
              </h2>
              <p style={{ ...body(), maxWidth: 560 }}>
                Outsourced accounting services give growing businesses access to senior financial expertise — without the cost of a full-time hire.
                Books by Kimberlie delivers Controller and CFO-level support remotely, so your finances are always in expert hands.
              </p>
            </div>
          </RevealSection>

          <div className="col-1-sm" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center" }}>
            <RevealSection>
              <div className="outsourced-grid">
                {OUTSOURCED_FEATURES.map((f) => (
                  <div
                    key={f.title}
                    style={{
                      background: "white",
                      borderRadius: 20,
                      padding: "24px 20px",
                      border: `1px solid ${f.c}18`,
                      boxShadow: `0 4px 20px ${f.c}08`,
                    }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: f.bg,
                      border: `1px solid ${f.c}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 14,
                    }}>
                      <f.icon size={18} color={f.c} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 6 }}>{f.title}</div>
                    <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </RevealSection>

            <RevealSection delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "white", borderRadius: 24, padding: "28px 28px", border: `1px solid rgba(192,85,106,.1)`, boxShadow: "0 4px 32px rgba(30,26,24,.05)" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: ROSE, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 16 }}>
                    Why outsource?
                  </div>
                  {[
                    { v: "60%", l: "Average savings vs. hiring in-house" },
                    { v: "30+", l: "Years of senior accounting experience" },
                    { v: "100%", l: "Remote — serving all 50 states" },
                    { v: "5★", l: "Average client satisfaction rating" },
                  ].map(s => (
                    <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid rgba(30,26,24,.06)" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 600, color: ROSE, minWidth: 56 }}>{s.v}</div>
                      <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="btn-hover" style={primaryBtn() as React.CSSProperties}>
                  Get Outsourced Accounting <ArrowRight size={15} />
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT (stack layer 8) ══════════ */}
      <section id="contact" className="sec-pad stack-section" style={{ padding: "108px 8%", background: `linear-gradient(140deg, #FDF6F8 0%, ${IVORY} 50%, #F4F9F7 100%)`, zIndex: 8 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ ...eyebrow(), textAlign: "center" }}>Get In Touch</div>
              <h2 style={{ ...displayTitle({ textAlign: "center", marginBottom: 14 }) }}>
                Ready to Make Sense of{" "}
                <em style={{ color: ROSE, fontStyle: "italic" }}>YOUR Cents</em>?
              </h2>
              <p style={{ ...body({ textAlign: "center" }), maxWidth: 460, margin: "0 auto" }}>
                Let me help you grow that money tree.
              </p>
            </div>
          </RevealSection>

          <div className="col-1-sm" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1.1fr", gap: 0, alignItems: "stretch" }}>
            <RevealSection style={{ paddingRight: 56, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", boxShadow: `0 32px 80px rgba(30,26,24,.12), 0 0 0 1px rgba(192,85,106,.12)`, aspectRatio: "4/5" }}>
                <Image src="/contact-photo.png" alt="Books by Kimberlie workspace" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(30,26,24,.55) 0%, transparent 52%)` }} />
                <div style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)", borderRadius: 50, padding: "7px 14px", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 4px 16px rgba(30,26,24,.1)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: TEAL, flexShrink: 0, animation: "blink 2s infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: INK, letterSpacing: ".04em" }}>Available Now</span>
                </div>
                <div style={{ position: "absolute", bottom: 22, left: 22, color: "white" }}>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: ".02em", marginBottom: 3 }}>Kimberlie Gerstner</div>
                  <div style={{ fontSize: 12, opacity: .8, letterSpacing: ".03em" }}>Certified Bookkeeper · 30+ Years Experience</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: Mail, label: "Email", val: "kimberlie@booksbykimberlie.com", c: ROSE, href: "mailto:kimberlie@booksbykimberlie.com" },
                  { icon: Phone, label: "Office", val: "830-730-4160", c: GOLD, href: "tel:8307304160" },
                  { icon: Phone, label: "Mobile", val: "830-515-9818", c: TEAL, href: "tel:8305159818" },
                  { icon: MessageCircle, label: "WhatsApp", val: "Available", c: PLUM, href: "#contact" },
                ].map(d => (
                  <a key={d.label} href={d.href} style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", padding: "13px 18px", borderRadius: 16, background: "white", border: `1px solid ${d.c}20`, boxShadow: `0 2px 12px ${d.c}08`, transition: "transform .2s, box-shadow .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateX(5px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${d.c}22`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = `0 2px 12px ${d.c}08`; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `${d.c}12`, border: `1px solid ${d.c}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <d.icon size={16} color={d.c} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: "#BBB", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 2 }}>{d.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: INK }}>{d.val}</div>
                    </div>
                    <ArrowRight size={13} color={d.c} style={{ opacity: .4 }} />
                  </a>
                ))}
              </div>
            </RevealSection>

            <div style={{ background: `linear-gradient(to bottom, transparent, rgba(192,85,106,.18), transparent)` }} />

            <RevealSection delay={120} style={{ paddingLeft: 56 }}>
              {sent ? (
                <div style={{ background: "white", borderRadius: 28, border: "1px solid rgba(192,85,106,.1)", boxShadow: "0 4px 32px rgba(30,26,24,.05)", padding: "60px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 480 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: `${ROSE}10`, border: `2px solid ${ROSE}28`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <CheckCircle2 size={38} color={ROSE} />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 400, color: INK, marginBottom: 12 }}>Message sent!</h3>
                  <p style={{ ...body({ fontSize: 14 }), maxWidth: 300, margin: "0 auto 28px" }}>
                    Thanks for reaching out. I&apos;ll be in touch within one business day.
                  </p>
                  <div style={{ background: MIST, borderRadius: 16, padding: "18px 24px", fontSize: 13, color: "#666", display: "flex", flexDirection: "column", gap: 10, marginBottom: 8, width: "100%" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}><Phone size={13} color={ROSE} /> 830-730-4160 <span style={{ opacity: 0.75, fontSize: 11 }}>(office)</span></span>
                    <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}><Phone size={13} color={TEAL} /> 830-515-9818 <span style={{ opacity: 0.75, fontSize: 11 }}>(mobile)</span></span>
                    <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}><Mail size={13} color={ROSE} /> kimberlie@booksbykimberlie.com</span>
                  </div>
                  <button onClick={() => { setSent(false); setFormErr(null); }} className="btn-hover" style={primaryBtn({ width: "100%", justifyContent: "center", marginTop: 16, borderRadius: 16 }) as React.CSSProperties}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div style={{ background: "white", borderRadius: 28, border: "1px solid rgba(192,85,106,.1)", boxShadow: "0 8px 48px rgba(30,26,24,.06)", padding: "44px 40px 38px" }}>
                  <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: "1px solid rgba(192,85,106,.1)" }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 400, color: INK, marginBottom: 6 }}>Send a message</h3>
                    <p style={{ fontSize: 13, color: "#AAA" }}>I respond within one business day — usually sooner.</p>
                  </div>
                  {formErr && (
                    <div style={{ background: "#FFF0F0", border: "1px solid #FFB3B3", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#A8302C", display: "flex", gap: 8, marginBottom: 22 }}>
                      ⚠ {formErr}
                    </div>
                  )}
                  <form onSubmit={sendContact} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      {[
                        { label: "Your Name", type: "text", ph: "Jane Smith", val: name, set: setName, k: "name" },
                        { label: "Email", type: "email", ph: "jane@biz.com", val: email, set: setEmail, k: "email" },
                      ].map(f => (
                        <div key={f.k} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                          <label style={{ fontSize: 11, fontWeight: 600, color: "#AAA", letterSpacing: ".08em", textTransform: "uppercase" }}>{f.label}</label>
                          <input
                            type={f.type} placeholder={f.ph} value={f.val}
                            onChange={e => { f.set(e.target.value); setFldErr(p => ({ ...p, [f.k]: "" })); }}
                            disabled={sending}
                            style={inputStyle(fldErr[f.k])}
                            onFocus={e => e.target.style.borderColor = ROSE}
                            onBlur={e => e.target.style.borderColor = fldErr[f.k] ? "#e74c3c" : "rgba(192,85,106,.2)"}
                          />
                          {fldErr[f.k] && <span style={{ fontSize: 11, color: "#e74c3c" }}>{fldErr[f.k]}</span>}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: "#AAA", letterSpacing: ".08em", textTransform: "uppercase" }}>Tell me about your business</label>
                      <textarea
                        placeholder="What do you need help with? Tell me a bit about your business..."
                        value={msg}
                        onChange={e => { setMsg(e.target.value); setFldErr(p => ({ ...p, message: "" })); }}
                        disabled={sending}
                        style={{ ...inputStyle(fldErr.message), minHeight: 152, resize: "vertical" } as React.CSSProperties}
                        onFocus={e => e.target.style.borderColor = ROSE}
                        onBlur={e => e.target.style.borderColor = fldErr.message ? "#e74c3c" : "rgba(192,85,106,.2)"}
                      />
                      {fldErr.message && <span style={{ fontSize: 11, color: "#e74c3c" }}>{fldErr.message}</span>}
                    </div>
                    <button type="submit" disabled={sending} className="btn-hover"
                      style={{ ...primaryBtn({ width: "100%", justifyContent: "center", borderRadius: 16, fontSize: 15, padding: "16px 32px", opacity: sending ? .72 : 1, cursor: sending ? "not-allowed" : "pointer" }) as React.CSSProperties }}>
                      {sending
                        ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.35)", borderTopColor: "white", borderRadius: "50%", animation: "spin .7s linear infinite", display: "inline-block", flexShrink: 0 }} /> Sending…</>
                        : <>Send Message <ArrowRight size={16} /></>
                      }
                    </button>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, paddingTop: 2, flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#CCC" }}><CheckCircle2 size={12} color={TEAL} /> Quick responses</span>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#E0E0E0", flexShrink: 0 }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#CCC" }}><Shield size={12} color={ROSE} /> No spam, ever</span>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#E0E0E0", flexShrink: 0 }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#CCC" }}><Clock size={12} color={GOLD} /> 1 business day</span>
                    </div>
                  </form>
                </div>
              )}
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <div style={{ background: `linear-gradient(135deg, #2A1A1E 0%, #1A2420 100%)`, padding: "60px 8%", position: "relative", zIndex: 9 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: "white", marginBottom: 6, letterSpacing: "-.01em" }}>
              Stay in the loop
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>Helpful bookkeeping tips, money wins &amp; cheerful updates.</p>
          </div>
          {nlOk ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,.85)", fontWeight: 500, fontSize: 14 }}>
              <CheckCircle2 size={18} color={TEAL} /> You&apos;re subscribed — thank you!
            </div>
          ) : (
            <form onSubmit={sendNl} noValidate style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 50, padding: 5 }}>
                <input type="email" placeholder="your@email.com" value={nlEmail}
                  onChange={e => { setNlEmail(e.target.value); setNlErr(""); }}
                  disabled={nlBusy}
                  style={{ background: "transparent", border: "none", color: "white", padding: "10px 18px", fontSize: 14, outline: "none", minWidth: 220, fontFamily: "'Jost',sans-serif" }} />
                <button type="submit" disabled={nlBusy}
                  style={{ background: `linear-gradient(135deg, #C0556A, #D4756A)`, color: "white", border: "none", borderRadius: 50, padding: "10px 26px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {nlBusy ? "Subscribing…" : "Subscribe"}
                </button>
              </div>
              {nlErr && <p style={{ fontSize: 12, color: "rgba(255,255,255,.6)", paddingLeft: 8 }}>{nlErr}</p>}
            </form>
          )}
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background: "#120D0F", padding: "68px 8% 28px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="col-2-sm" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 56 }}>
            <div>
              <Image src="/logo.png" alt="Books by Kimberlie" width={200} height={80}
                style={{ objectFit: "contain", objectPosition: "left center", filter: "brightness(0) invert(1)", marginBottom: 16, display: "block", height: 70, width: "auto" }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", lineHeight: 1.88, maxWidth: 240, marginBottom: 22 }}>
                Professional bookkeeping &amp; outsourced accounting services for businesses of every kind.<br />
                From chaos to calm, one ledger at a time.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { I: Facebook, c: "#C0556A", href: "https://www.facebook.com/profile.php?id=61572139542343" },
                  { I: Instagram, c: "#B07D3A", href: "https://www.instagram.com/kimberliegerstner/" },
                  { I: Linkedin, c: "#3A9E8F", href: "https://www.linkedin.com/company/112942216/admin/dashboard/" },
                ].map(({ I: Icon, c, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ width: 34, height: 34, borderRadius: 9, background: `${c}14`, border: `1px solid ${c}30`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "transform .2s, background .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = `${c}25`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = `${c}14`; }}>
                    <Icon size={14} color={c} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { h: "Services", links: [{ l: "QuickBooks", href: "#services" }, { l: "Payroll", href: "#services" }, { l: "Financial Reports", href: "#services" }, { l: "Accounts Payable", href: "#services" }, { l: "Accounts Receivable", href: "#services" }, { l: "Outsourced Accounting", href: "#outsourced-accounting" }] },
              { h: "Company", links: [{ l: "About", href: "#about" }, { l: "How It Works", href: "#process" }, { l: "Industries", href: "#industries" }, { l: "Reviews", href: "#testimonials" }, { l: "Contact", href: "#contact" }] },
              { h: "Contact", links: [{ l: "kimberlie@booksbykimberlie.com", href: "mailto:kimberlie@booksbykimberlie.com" }, { l: "830-730-4160", href: "tel:8307304160" }, { l: "830-515-9818", href: "tel:8305159818" }, { l: "WhatsApp", href: "#contact" }] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#C0556A", marginBottom: 18 }}>{col.h}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <li key={l.l}>
                      <a href={l.href} style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textDecoration: "none", transition: "color .2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.8)"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.38)"}>
                        {l.l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>© {new Date().getFullYear()} Books by Kimberlie. All rights reserved.</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service"].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: "rgba(255,255,255,.2)", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.55)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.2)"}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════
   COIN RAIN
══════════════════════════════════════ */
function CoinRain() {
  const EMOJIS = ["💰", "🪙", "💵", "✨", "💎"];
  const [coins, setCoins] = useState<{ id: number; x: number; emoji: string; duration: number; size: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const trigger = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest(".btn-hover")) return;
      const batch = Array.from({ length: 8 }, () => ({
        id: nextId.current++,
        x: Math.random() * 100,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        duration: 1800 + Math.random() * 1200,
        size: 16 + Math.random() * 14,
      }));
      setCoins(c => [...c, ...batch]);
      batch.forEach(coin => {
        setTimeout(() => setCoins(c => c.filter(cc => cc.id !== coin.id)), coin.duration + 100);
      });
    };
    window.addEventListener("mouseenter", trigger, true);
    return () => window.removeEventListener("mouseenter", trigger, true);
  }, []);

  return (
    <>
      {coins.map(coin => (
        <span key={coin.id} className="coin" style={{ left: `${coin.x}vw`, fontSize: coin.size, animationDuration: `${coin.duration}ms` }}>
          {coin.emoji}
        </span>
      ))}
    </>
  );
}
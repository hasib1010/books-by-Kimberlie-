"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight, CheckCircle2, TrendingUp, Shield, Clock,
  BarChart3, Star, ChevronDown, Mail, Phone, MessageCircle,
  Instagram, Facebook, Twitter, Sparkles,
} from "lucide-react";
import Link from "next/link";

/* ─── Animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
};

/* ─── Static data ─── */
const services = [
  { num: "01", title: "QuickBooks",        desc: "Expert setup and ongoing management so your books stay accurate, clean, and always tax-ready.",                        image: "/quickbooks.png", icon: BarChart3,  accent: "#1E6B5E" },
  { num: "02", title: "Payroll",           desc: "On-time, every time. Smooth payroll runs so your team is always paid correctly and you stay compliant.",              image: "/payroll.png",    icon: Clock,      accent: "#D4614A" },
  { num: "03", title: "Financial Reports", desc: "Clear, actionable reports that show exactly where your cash is going — and where it should be.",                     image: "/reports.png",    icon: TrendingUp, accent: "#C9964A" },
];

const reasons = [
  { icon: Shield,    title: "Stress-Free Compliance",   desc: "GAAP-compliant records and audit-ready books — no more scrambling at tax time." },
  { icon: Clock,     title: "Time-Saving Automation",   desc: "Streamlined AP/AR workflows that cut your admin time in half." },
  { icon: TrendingUp,title: "Growth-Focused Insights",  desc: "Cash flow forecasts and job costing to help you bid smarter and scale." },
  { icon: Sparkles,  title: "Tailored Just For You",    desc: "Custom QuickBooks setups and reporting to match exactly how you operate." },
];

const testimonials = [
  { text: "Kimberlie brought clarity to my chaotic finances — now I actually enjoy reviewing my numbers each month.", name: "Alex M.",   role: "Contractor, Vermont",  stars: 5 },
  { text: "He made my accounting stress completely disappear. Highly professional and genuinely easy to work with.",  name: "Sarah T.", role: "Freelance Designer",   stars: 5 },
  { text: "Finally a bookkeeper who explains things in plain English. I feel confident about my finances for the first time.", name: "David R.", role: "Restaurant Owner", stars: 5 },
];

const steps = [
  { n: "01", title: "Free Consultation", desc: "We talk through your business, pain points, and what calm finances looks like for you." },
  { n: "02", title: "Custom Setup",      desc: "I tailor QuickBooks, workflows, and reporting to match exactly how you operate." },
  { n: "03", title: "Ongoing Support",   desc: "Monthly bookkeeping, payroll, and reconciliations — delivered on time, every time." },
  { n: "04", title: "Clear Insights",    desc: "Regular reports and proactive advice so you always know exactly where you stand." },
];

const navLinks = ["About", "Services", "Process", "Contact"];

/* ─── Shared class strings ─── */
const eyebrow = "text-[11px] font-medium tracking-[.15em] uppercase mb-3.5";
const sectionTitle = "font-display text-[clamp(34px,4vw,52px)] font-normal leading-[1.13]";
const inputBase = "w-full bg-cream/80 border-[1.5px] rounded-[11px] py-[13px] px-4 font-sans text-[15px] text-ink outline-none transition-colors focus:border-rose";

/* ─── Component ─── */
export default function Page() {
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [message, setMessage]     = useState("");
  const [scrolled, setScrolled]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [formError, setFormError]   = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [nlEmail, setNlEmail]         = useState("");
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlStatus, setNlStatus]         = useState<"idle" | "success" | "error">("idle");
  const [nlMessage, setNlMessage]       = useState("");

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bannerY      = useTransform(scrollYProgress, [0, 1],    ["0%", "28%"]);
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNlSubmitting(true); setNlStatus("idle"); setNlMessage("");
    try {
      const res  = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: nlEmail }) });
      const data = await res.json();
      if (!res.ok) { setNlStatus("error");   setNlMessage(data.message || "Something went wrong."); }
      else          { setNlStatus("success"); setNlMessage(data.message || "You're subscribed!"); setNlEmail(""); }
    } catch { setNlStatus("error"); setNlMessage("Network error. Please try again."); }
    finally  { setNlSubmitting(false); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setFormError(null); setFieldErrors({});
    try {
      const res  = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 422 && data.errors) setFieldErrors(data.errors);
        else setFormError(data.message || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true); setName(""); setEmail(""); setMessage("");
    } catch { setFormError("Network error. Please check your connection and try again."); }
    finally  { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-cream text-ink overflow-x-hidden font-sans antialiased">

      {/* ── MOBILE DRAWER ── */}
      <div className={`${drawerOpen ? "flex" : "hidden"} fixed inset-0 z-[200] flex-col bg-ink px-[8%] py-7`}>
        <div className="flex items-center justify-between pb-8 border-b border-white/[.08] mb-8">
          <Image src="/logo.png" alt="Books by Kimberlie" width={130} height={46}
            style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }} />
          <button className="bg-transparent border-none text-white/60 text-3xl cursor-pointer leading-none"
            onClick={() => setDrawerOpen(false)}>×</button>
        </div>
        <div className="flex flex-col">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="font-display text-4xl font-normal text-white/75 py-3.5 border-b border-white/[.06] hover:text-rose transition-colors"
              onClick={() => setDrawerOpen(false)}>{l}</a>
          ))}
        </div>
        <a href="#contact" className="btn-rose self-start mt-10" onClick={() => setDrawerOpen(false)}>
          Get Started <ArrowRight size={15} />
        </a>
      </div>

      {/* ── NAV ── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[6%] border-b transition-all duration-300 ${
          scrolled ? "bg-cream/95 backdrop-blur-xl border-ink/10 shadow-sm" : "bg-transparent border-transparent"
        }`}
        initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      >
        <Image src="/logo.png" alt="Books by Kimberlie" width={248} height={120}
          className="h-[100px] w-auto object-contain transition-all duration-300"
          style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }} />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className={`text-sm transition-colors ${scrolled ? "text-ink/55 hover:text-ink" : "text-white/75 hover:text-white"}`}>
              {l}
            </a>
          ))}
          <a href="#contact" className="btn-rose !py-[9px] !px-[22px] !text-sm">
            Get Started <ArrowRight size={14} />
          </a>
        </div>

        <button className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 z-[110]"
          onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          {[0, 1, 2].map(i => (
            <span key={i} className={`block w-6 h-0.5 rounded-sm transition-colors ${scrolled ? "bg-ink" : "bg-white"}`} />
          ))}
        </button>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} id="home" className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT — dark panel with content */}
        <motion.div
          className="hero-left relative flex flex-col justify-center px-[8%] pt-[130px] pb-20 bg-ink z-[2] overflow-hidden max-md:bg-transparent"
          style={{ opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-rose/15 border border-rose/35 rounded-full px-4 py-1.5 text-xs text-white/80 tracking-[.05em] mb-7 w-fit"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose flex-shrink-0" />
            Remote Bookkeeping · Vermont
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="font-display text-[clamp(44px,4.5vw,76px)] font-normal leading-[1.06] text-white mb-6 relative z-[1]"
            initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            From chaos to calm,<br />
            <em className="text-rose italic">one ledger</em><br />
            at a time.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-[17px] text-white/50 leading-[1.8] mb-10 max-w-[440px] relative z-[1]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
            Remote bookkeeping for builders, creatives &amp; businesses — so you can focus on growing what you love.
          </motion.p>

          {/* Social proof */}
          <motion.div
            className="flex items-center gap-3.5 relative z-[1] mb-12"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <div className="flex">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-ink"
                  style={{ zIndex: 3 - i, marginLeft: i > 0 ? -14 : 0 }}>
                  <Image src={`/client${i + 1}.jpg`} alt="client" fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                </div>
              ))}
            </div>
            <div className="text-[13px] text-white/45">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C9964A" color="#C9964A" />)}
              </div>
              <span><strong className="text-white/80 font-medium">200+ clients</strong> trust Kimberlie with their books</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex gap-3 flex-wrap mb-[52px] relative z-[1]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.65 }}>
            <a href="#contact" className="btn-rose btn-xl">Get a Free Consultation <ArrowRight size={18} /></a>
            <a href="#services" className="btn-ghost-white btn-xl">See My Services</a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="grid grid-cols-4 relative z-[1] border-t border-white/[.08] pt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.7 }}>
            {[["15+", "Years Experience"], ["200+", "Happy Clients"], ["100%", "Remote & Flexible"], ["$0", "Hidden Fees"]].map(([v, l], i) => (
              <div key={l} className={`flex flex-col gap-1 ${i < 3 ? "pr-5 border-r border-white/[.06]" : "pl-5"} ${i > 0 && i < 3 ? "pl-5" : ""}`}>
                <span className="font-display text-[30px] text-white font-semibold leading-none">{v}</span>
                <span className="text-[11px] text-white/35">{l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — image with parallax */}
        <div className="relative overflow-hidden max-md:absolute max-md:inset-0 max-md:z-0">
          <motion.div className="absolute inset-[-12%] will-change-transform" style={{ y: bannerY }}>
            <Image src="/hero.jpg" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center 40%" }} />
            <div className="absolute inset-0 bg-gradient-to-br from-ink/65 via-ink/30 to-ink/10 max-md:from-ink/80 max-md:via-ink/70 max-md:to-ink/85" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(201,150,74,0.08)] via-transparent to-[rgba(30,107,94,0.12)]" />
          </motion.div>

          {/* "Books up to date" badge — desktop only */}
          <motion.div
            className="absolute top-[10%] left-[8%] z-10 bg-rose/85 backdrop-blur-xl rounded-xl px-[18px] py-3 items-center gap-2.5 hidden md:flex"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }}>
            <span className="w-2 h-2 rounded-full bg-white/90" style={{ animation: "pulse 2s ease-in-out infinite" }} />
            <span className="text-[13px] text-white font-medium tracking-[.02em]">Books up to date</span>
          </motion.div>

          {/* Floating stat cards — desktop only */}
          <div className="absolute z-10 bottom-[10%] right-[6%] flex-col gap-3.5 hidden md:flex">
            <motion.div
              className="bg-teal/35 border border-[rgba(125,211,200,0.2)] rounded-2xl px-6 py-[18px] backdrop-blur-xl min-w-[180px]"
              animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="text-[10px] tracking-[.14em] uppercase text-white/45 mb-2">Cash Flow · This Month</div>
              <div className="text-[28px] font-medium text-[#7DD3C8] leading-none">$12,480</div>
              <div className="text-xs text-[#8FD4A0] mt-[5px]">↑ 18% vs last month</div>
            </motion.div>
            <motion.div
              className="bg-ink/55 border border-white/[.12] rounded-2xl px-6 py-[18px] backdrop-blur-xl min-w-[180px]"
              animate={{ y: [6, -6, 6] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
              <div className="text-[10px] tracking-[.14em] uppercase text-white/45 mb-2">Books Status</div>
              <div className="text-[15px] font-medium text-[#8FD4A0]">✓ Up to Date</div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-7 left-1/4 -translate-x-1/2 text-white/25 z-[5]"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={22} />
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-ink py-[17px] overflow-hidden">
        <div className="ticker-track">
          {[...Array(2)].map((_, r) =>
            ["QuickBooks Setup", "Payroll Processing", "Financial Reports", "Cash Flow Forecasting",
              "AP/AR Management", "Tax Prep Support", "Remote Bookkeeping", "15+ Years Experience"].map((t, i) => (
                <span key={`${r}-${i}`} className="inline-flex items-center gap-2.5 pr-10 text-xs font-medium tracking-[.12em] uppercase text-white/45 whitespace-nowrap">
                  <span className="w-1 h-1 rounded-full bg-rose flex-shrink-0" />{t}
                </span>
              ))
          )}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-[110px] px-[8%] bg-cream">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center mb-[72px]"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>

          {/* Text */}
          <motion.div variants={fadeLeft} className="flex flex-col">
            <div className={`${eyebrow} text-rose`}>Meet Your Bookkeeper</div>
            <h2 className={`${sectionTitle} mb-6`}>
              Hi, I am Kimberlie —<br />
              <em className="text-rose italic">your financial calm</em><br />
              in the storm.
            </h2>
            <p className="text-base text-ink/[.58] leading-[1.85]">
              With 15 years of hands-on experience across construction, hospitality, banking, and service industries,
              I help business owners gain clear control over their finances so they can focus on what they do best — growing their business.
            </p>
            <p className="text-base text-ink/[.58] leading-[1.85] mt-3.5">
              My expertise spans bookkeeping, AP/AR, billing, financial reporting, budgeting, forecasting,
              cash flow management, reconciliations, payroll, and process improvement.
            </p>
            <a href="#contact" className="btn-rose mt-9 w-fit">Book a Free Call <ArrowRight size={16} /></a>
          </motion.div>

          {/* Photo */}
          <motion.div variants={fadeRight} className="relative flex flex-col gap-5">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden">
              <Image src="/hero2.jpg" alt="Kimberlie Gerstner" fill style={{ objectFit: "contain", objectPosition: "center" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-rose rounded-2xl p-[14px_20px] text-white flex flex-col gap-0.5">
                <span className="font-display text-[30px] font-semibold leading-none">15+</span>
                <span className="text-[11px] opacity-85 tracking-[.04em]">Years of Experience</span>
              </div>
            </div>
            {/* Client strip */}
            <div className="flex items-center gap-4 bg-white rounded-2xl p-[14px_20px] border border-ink/[.07] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white"
                    style={{ zIndex: 3 - i, marginLeft: i > 0 ? -14 : 0 }}>
                    <Image src={`/client${i + 1}.jpg`} alt="client" fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#C9964A" color="#C9964A" />)}</div>
                <div className="text-[13px] text-ink/55">Trusted by 200+ business owners</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Why card */}
        <motion.div className="bg-ink rounded-[28px] p-[52px]"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-10">
            <div className={`${eyebrow} text-rose`}>Why Choose Kimberlie?</div>
            <p className="text-white/45 text-[15px] max-w-[380px]">
              Four reasons clients keep coming back — and referring their friends.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {reasons.map((r, i) => (
              <motion.div key={r.title} variants={fadeUp} custom={i} className="flex gap-4 items-start">
                <div className="w-[38px] h-[38px] flex-shrink-0 rounded-[10px] bg-white/[.05] border border-white/[.09] flex items-center justify-center">
                  <r.icon size={18} color="#D4614A" />
                </div>
                <div>
                  <div className="text-[15px] font-medium text-white mb-[5px]">{r.title}</div>
                  <div className="text-[13px] text-white/[.42] leading-[1.65]">{r.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-[110px] px-[8%] bg-mist">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex justify-between items-end gap-8 flex-wrap mb-14">
            <div>
              <div className={`${eyebrow} text-teal`}>What I Offer</div>
              <h2 className={sectionTitle}>
                Services built for<br /><em className="text-rose italic">builders &amp; creatives</em>
              </h2>
            </div>
            <p className="text-base text-ink/50 max-w-[320px]">
              Every service is customized to your business — not a one-size-fits-all template.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i}
                className="bg-white rounded-3xl overflow-hidden border border-ink/[.06] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-card-hover">
                <div className="relative h-[220px] overflow-hidden">
                  <Image src={s.image} alt={s.title} fill style={{ objectFit: "contain" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
                  <div className="absolute top-4 left-4 z-[2] w-[42px] h-[42px] rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                    style={{ background: s.accent }}>
                    <s.icon size={18} color="#fff" />
                  </div>
                  <span className="absolute bottom-2 right-4 z-[2] font-display text-[56px] font-semibold text-white/[.12] leading-none">{s.num}</span>
                </div>
                <div className="p-7 pb-8">
                  <div className="h-[3px] rounded-sm w-10 mb-4" style={{ background: s.accent }} />
                  <h3 className="font-display text-[26px] font-normal mb-2.5">{s.title}</h3>
                  <p className="text-sm text-ink/55 leading-[1.75]">{s.desc}</p>
                  <Link href="#contact" className="inline-flex items-center gap-[5px] text-sm font-medium mt-5 hover:opacity-80 transition-opacity"
                    style={{ color: s.accent }}>
                    Learn more <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-[110px] px-[8%] bg-cream">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-[72px]">
            <div className={`${eyebrow} text-rose`}>The Process</div>
            <h2 className={sectionTitle}>Simple from <em className="text-rose italic">start to finish</em></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-[27px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-rose/25 to-transparent" />

            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} custom={i} className="relative">
                <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center mb-[22px] ${
                  i === 0
                    ? "bg-rose border border-rose shadow-[0_8px_24px_-8px_rgba(212,97,74,0.55)]"
                    : "bg-white border-[1.5px] border-ink/[.12]"
                }`}>
                  <span className={`font-display text-[20px] font-semibold ${i === 0 ? "text-white" : "text-rose"}`}>{s.n}</span>
                </div>
                <h4 className="text-[17px] font-medium mb-2.5 text-ink">{s.title}</h4>
                <p className="text-sm text-ink/[.52] leading-[1.75]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-[110px] px-[8%] bg-ink">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex justify-between items-end flex-wrap gap-6 mb-14">
            <div>
              <div className={`${eyebrow} text-rose`}>Client Stories</div>
              <h2 className={`${sectionTitle} text-white`}>
                What clients<br /><em className="text-rose italic">are saying</em>
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#C9964A" color="#C9964A" />)}
              <span className="text-sm text-white/35 ml-2.5">5.0 average</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                className="bg-white/[.04] border border-white/[.08] rounded-3xl p-9 px-[30px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]">
                <div className="absolute top-4 right-5 font-display text-[80px] text-rose/[.08] leading-none pointer-events-none">&quot;</div>
                <div className="flex gap-0.5 mb-[18px] relative z-[1]">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="#C9964A" color="#C9964A" />)}
                </div>
                <p className="text-[15px] text-white/[.72] leading-[1.8] italic mb-[26px] relative z-[1]">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3.5 border-t border-white/[.06] pt-[22px]">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-rose/30">
                    <Image src={`/client${i + 1}.jpg`} alt={t.name} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-white/35">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-[110px] px-[8%] bg-cream">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-start"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>

          {/* Left */}
          <motion.div variants={fadeLeft} className="flex flex-col">
            <div className={`${eyebrow} text-rose`}>Get In Touch</div>
            <h2 className={`${sectionTitle} mb-6`}>
              Let&apos;s simplify your<br /><em className="text-rose italic">books together</em>
            </h2>
            <p className="text-base text-ink/[.58] leading-[1.85]">
              Ready to go from chaos to calm? I&apos;ll get back to you within 24 hours — no jargon, no pressure, just a friendly conversation about your finances.
            </p>

            {/* Photo card */}
            <div className="relative h-[240px] rounded-[20px] overflow-hidden my-7">
              <Image src="/contact-photo.png" alt="Kimberlie" fill style={{ objectFit: "contain", objectPosition: "top" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-5 left-[22px] flex flex-col gap-0.5 text-white">
                <span className="text-[15px] font-medium">Kimberlie Gerstner</span>
                <span className="text-[13px] opacity-65">Certified Bookkeeper</span>
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-3.5">
              {[
                { icon: Mail,           label: "Email",    value: "kimberlie@booksbykimberlie.com" },
                { icon: Phone,          label: "Mobile",   value: "830-515-9818" },
                { icon: Phone,          label: "Office",   value: "830-730-4160" },
                { icon: MessageCircle,  label: "WhatsApp", value: "Available" },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-[42px] h-[42px] flex-shrink-0 rounded-[11px] bg-rose-light flex items-center justify-center">
                    <c.icon size={17} color="#D4614A" />
                  </div>
                  <div>
                    <div className="text-[11px] text-ink/40 mb-px">{c.label}</div>
                    <div className="text-sm text-ink">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div variants={fadeRight}>
            {submitted ? (
              <div className="bg-white rounded-[28px] border border-ink/[.06] shadow-soft-xl flex flex-col items-center text-center p-14">
                <div className="w-[72px] h-[72px] rounded-full bg-teal-light flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} color="#1E6B5E" />
                </div>
                <h3 className="font-display text-[32px] font-normal text-ink mb-3">Message sent!</h3>
                <p className="text-[15px] text-ink/[.58] leading-[1.8] max-w-[360px] mb-7">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  Check your inbox — I&apos;ve sent you a confirmation email.
                </p>
                <div className="flex flex-col gap-2.5 bg-mist rounded-xl p-4 px-6 w-full mb-1">
                  <div className="flex items-center gap-2.5 text-sm text-ink/65"><Phone size={15} color="#D4614A" /><span>830-515-9818</span></div>
                  <div className="flex items-center gap-2.5 text-sm text-ink/65"><Mail size={15} color="#D4614A" /><span>kimberlie@booksbykimberlie.com</span></div>
                </div>
                <button className="btn-rose w-full justify-center py-4 text-base rounded-xl mt-7"
                  onClick={() => { setSubmitted(false); setFormError(null); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white rounded-[28px] p-11 border border-ink/[.06] shadow-soft-xl" noValidate>
                {formError && (
                  <div className="flex items-start gap-2.5 bg-[#FEF0EF] border border-[#F5C4C4] rounded-[10px] p-[13px_16px] text-sm text-[#A8302C] leading-[1.55] mb-5">
                    <span className="flex-shrink-0">⚠</span>{formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-[7px]">
                    <label className="text-[13px] font-medium text-ink/50">Your Name</label>
                    <input placeholder="Jane Smith" value={name}
                      onChange={e => { setName(e.target.value); setFieldErrors(p => ({ ...p, name: "" })); }}
                      className={`${inputBase} ${fieldErrors.name ? "border-[#E24B4A] !bg-[#FFF5F5]" : "border-ink/[.09]"}`}
                      disabled={submitting} />
                    {fieldErrors.name && <span className="text-xs text-[#E24B4A]">{fieldErrors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    <label className="text-[13px] font-medium text-ink/50">Email</label>
                    <input type="email" placeholder="jane@business.com" value={email}
                      onChange={e => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: "" })); }}
                      className={`${inputBase} ${fieldErrors.email ? "border-[#E24B4A] !bg-[#FFF5F5]" : "border-ink/[.09]"}`}
                      disabled={submitting} />
                    {fieldErrors.email && <span className="text-xs text-[#E24B4A]">{fieldErrors.email}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-[7px] mb-4">
                  <label className="text-[13px] font-medium text-ink/50">Tell me about your business</label>
                  <textarea placeholder="I'm a contractor and I need help with..." value={message}
                    onChange={e => { setMessage(e.target.value); setFieldErrors(p => ({ ...p, message: "" })); }}
                    className={`${inputBase} min-h-[140px] resize-y ${fieldErrors.message ? "border-[#E24B4A] !bg-[#FFF5F5]" : "border-ink/[.09]"}`}
                    disabled={submitting} />
                  {fieldErrors.message && <span className="text-xs text-[#E24B4A]">{fieldErrors.message}</span>}
                </div>

                <button type="submit"
                  className={`btn-rose w-full justify-center py-4 text-base rounded-xl ${submitting ? "opacity-75 cursor-not-allowed" : ""}`}
                  disabled={submitting}>
                  {submitting ? <><span className="c-spinner" /> Sending...</> : <>Send Message <ArrowRight size={17} /></>}
                </button>

                <p className="text-center text-[13px] text-ink/35 mt-3.5">
                  <CheckCircle2 size={13} className="inline mr-[5px] align-middle" />
                  I respond within 24 hours · No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ── NEWSLETTER ── */}
      <div className="bg-teal py-14 px-[8%] flex items-center justify-between gap-8 flex-wrap">
        <div>
          <h3 className="font-display text-[28px] text-white font-normal mb-1.5">Stay in the loop</h3>
          <p className="text-[15px] text-white/60">Get helpful bookkeeping tips and updates.</p>
        </div>

        {nlStatus === "success" ? (
          <div className="flex items-center gap-2.5 text-teal-light font-semibold text-[15px]">
            <CheckCircle2 size={20} color="#E0F0EC" />{nlMessage}
          </div>
        ) : (
          <form onSubmit={submitNewsletter} className="flex gap-0 bg-white/10 border border-white/15 rounded-full p-1.5" noValidate>
            <div className="flex flex-col gap-1.5 flex-1">
              <input type="email" placeholder="your@email.com"
                className="nl-input bg-transparent border-none text-white py-2 px-[18px] font-sans text-[15px] outline-none min-w-[220px]"
                value={nlEmail}
                onChange={e => { setNlEmail(e.target.value); setNlStatus("idle"); setNlMessage(""); }}
                disabled={nlSubmitting}
                style={{ borderColor: nlStatus === "error" ? "#D4614A" : undefined }} />
              {nlStatus === "error" && <span className="text-xs text-rose pl-0.5">{nlMessage}</span>}
            </div>
            <button type="submit"
              className={`bg-white text-teal border-none rounded-full py-2.5 px-[26px] font-sans text-sm font-semibold cursor-pointer hover:bg-white/90 transition-colors whitespace-nowrap ${nlSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
              disabled={nlSubmitting}>
              {nlSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-ink pt-16 pb-8 px-[8%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-[52px]">
          <div className="sm:col-span-2 md:col-span-1">
            <Image src="/logo.png" alt="Books by Kimberlie" width={140} height={50}
              style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            <p className="text-sm text-white/35 leading-[1.8] max-w-[260px] my-4">
              Remote bookkeeping for builders, creatives &amp; businesses. From chaos to calm, one ledger at a time.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-[9px] bg-white/[.07] border border-white/10 flex items-center justify-center text-white/45 hover:bg-rose hover:text-white hover:border-rose transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {[
            { h: "Services", links: ["QuickBooks", "Payroll", "Financial Reports", "Cash Flow"] },
            { h: "Company",  links: ["About", "How It Works", "Reviews", "Contact"] },
            { h: "Contact",  links: ["kimberlie@booksbykimberlie.com", "830-515-9818", "830-730-4160", "WhatsApp"] },
          ].map(col => (
            <div key={col.h}>
              <div className="text-[11px] font-medium tracking-[.1em] uppercase text-white/[.28] mb-[18px]">{col.h}</div>
              <ul className="flex flex-col gap-[11px]">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm text-white/[.48] hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[.06] pt-7 flex flex-wrap justify-between items-center gap-3.5">
          <p className="text-[13px] text-white/20">© {new Date().getFullYear()} Books by Kimberlie. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map(l => (
              <a key={l} href="#" className="text-[13px] text-white/[.22] hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight, CheckCircle2, TrendingUp, Shield, Clock,
  BarChart3, Star, ChevronDown, Mail, Phone, MessageCircle,
  Instagram, Facebook, Twitter, Sparkles,
} from "lucide-react";

/* ─── Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

/* ─── Data ─── */
const services = [
  {
    num: "01", title: "QuickBooks",
    desc: "Expert setup and ongoing management so your books stay accurate, clean, and always tax-ready.",
    image: "/quickbooks.png", icon: BarChart3, accent: "#1E6B5E", bg: "#E0F0EC",
  },
  {
    num: "02", title: "Payroll",
    desc: "On-time, every time. Smooth payroll runs so your team is always paid correctly and you stay compliant.",
    image: "/payroll.png", icon: Clock, accent: "#D4614A", bg: "#F5E6E2",
  },
  {
    num: "03", title: "Financial Reports",
    desc: "Clear, actionable reports that show exactly where your cash is going — and where it should be.",
    image: "/reports.png", icon: TrendingUp, accent: "#C9964A", bg: "#F5ECD8",
  },
];

const reasons = [
  { icon: Shield, title: "Stress-Free Compliance", desc: "GAAP-compliant records and audit-ready books — no more scrambling at tax time." },
  { icon: Clock, title: "Time-Saving Automation", desc: "Streamlined AP/AR workflows that cut your admin time in half." },
  { icon: TrendingUp, title: "Growth-Focused Insights", desc: "Cash flow forecasts and job costing to help you bid smarter and scale." },
  { icon: Sparkles, title: "Tailored Just For You", desc: "Custom QuickBooks setups and reporting to match exactly how you operate." },
];

const testimonials = [
  { text: "Kimberlie brought clarity to my chaotic finances — now I actually enjoy reviewing my numbers each month.", name: "Alex M.", role: "Contractor, Vermont", stars: 5 },
  { text: "She made my accounting stress completely disappear. Highly professional and genuinely easy to work with.", name: "Sarah T.", role: "Freelance Designer", stars: 5 },
  { text: "Finally a bookkeeper who explains things in plain English. I feel confident about my finances for the first time.", name: "David R.", role: "Restaurant Owner", stars: 5 },
];

const steps = [
  { n: "01", title: "Free Consultation", desc: "We talk through your business, pain points, and what calm finances looks like for you." },
  { n: "02", title: "Custom Setup", desc: "I tailor QuickBooks, workflows, and reporting to match exactly how you operate." },
  { n: "03", title: "Ongoing Support", desc: "Monthly bookkeeping, payroll, and reconciliations — delivered on time, every time." },
  { n: "04", title: "Clear Insights", desc: "Regular reports and proactive advice so you always know exactly where you stand." },
];

/* ─── Component ─── */
export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [nlEmail, setNlEmail] = useState("");
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlStatus, setNlStatus] = useState<"idle" | "success" | "error">("idle");
  const [nlMessage, setNlMessage] = useState("");

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

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
    setNlSubmitting(true);
    setNlStatus("idle");
    setNlMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNlStatus("error");
        setNlMessage(data.message || "Something went wrong. Please try again.");
      } else {
        setNlStatus("success");
        setNlMessage(data.message || "You're subscribed!");
        setNlEmail("");
      }
    } catch {
      setNlStatus("error");
      setNlMessage("Network error. Please try again.");
    } finally {
      setNlSubmitting(false);
    }
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 422 && data.errors) { setFieldErrors(data.errors); }
        else { setFormError(data.message || "Something went wrong. Please try again."); }
        return;
      }
      setSubmitted(true);
      setName(""); setEmail(""); setMessage("");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-root">

      {/* ── MOBILE DRAWER ── */}
      <div className={`nav-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-top">
          <Image src="/logo.png" alt="Books by Kimberlie" width={130} height={46} style={{ filter: "brightness(0) invert(1)", objectFit: "contain" }} />
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>×</button>
        </div>
        <div className="drawer-links">
          {["About", "Services", "Process", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="drawer-link" onClick={() => setDrawerOpen(false)}>{l}</a>
          ))}
        </div>
        <a href="#contact" className="btn-rose drawer-cta" style={{ marginTop: 40 }} onClick={() => setDrawerOpen(false)}>
          Get Started <ArrowRight size={15} />
        </a>
      </div>

      {/* ── NAV ── */}
      <motion.nav
        className={`site-nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image src="/logo.png" alt="Books by Kimberlie" width={248} height={120} className="nav-logo" />
        <div className="nav-links">
          {["About", "Services", "Process", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
          <a href="#contact" className="btn-rose nav-cta">Get Started <ArrowRight size={14} /></a>
        </div>
        <button className="nav-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} id="home" className="hero">

        {/* LEFT — dark panel with content */}
        <motion.div className="hero-left" style={{ opacity: heroOpacity }}>
          <motion.div className="hero-badge"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <span className="badge-dot" /> Remote Bookkeeping · Vermont
          </motion.div>

          <motion.h1 className="hero-h1 cormorant"
            initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            From chaos to calm,<br />
            <em className="rose-italic">one ledger</em><br />
            at a time.
          </motion.h1>

          <motion.p className="hero-sub"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
            Remote bookkeeping for builders, creatives &amp; businesses — so you can focus on growing what you love.
          </motion.p>

          {/* Social proof */}
          <motion.div className="hero-social-proof"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <div className="hsp-avatars">
              {["A", "S", "D"].map((l, i) => (
                <div key={i} className="hsp-av" style={{ marginLeft: i > 0 ? -10 : 0 }}>
                  <Image src="/clients-photo.png" alt="client" fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                </div>
              ))}
            </div>
            <div className="hsp-text">
              <div style={{ display: "flex", gap: 2, marginBottom: 3 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#C9964A" color="#C9964A" />)}
              </div>
              <span><strong>200+ clients</strong> trust Kimberlie with their books</span>
            </div>
          </motion.div>

          <motion.div className="hero-btns"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.65 }}>
            <a href="#contact" className="btn-rose btn-xl">Get a Free Consultation <ArrowRight size={18} /></a>
            <a href="#services" className="btn-ghost-white btn-xl">See My Services</a>
          </motion.div>

          {/* Stats strip */}
          <motion.div className="hero-stats-strip"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.7 }}>
            {[["15+", "Years Experience"], ["200+", "Happy Clients"], ["100%", "Remote & Flexible"], ["$0", "Hidden Fees"]].map(([v, l]) => (
              <div key={l} className="hss-item">
                <span className="hss-val cormorant">{v}</span>
                <span className="hss-label">{l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — coins image with parallax */}
        <div className="hero-right">
          <motion.div className="hero-bg" style={{ y: bannerY }}>
            <Image src="/hero.jpg" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center 40%" }} />
            <div className="hero-overlay" />
            <div className="hero-overlay-warm" />
          </motion.div>

          {/* Decorative "Live" badge top */}
          <motion.div className="hero-img-badge"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }}>
            <span className="hib-dot" style={{ animation: "pulse 2s ease-in-out infinite" }} />
            <span className="hib-text">Books up to date</span>
          </motion.div>

          {/* Stats cards bottom-right */}
          <div className="hero-stats-panel">
            <motion.div className="hsp-card accent-teal"
              animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="hsp-label">Cash Flow · This Month</div>
              <div className="hsp-value">$12,480</div>
              <div className="hsp-sub">↑ 18% vs last month</div>
            </motion.div>
            <motion.div className="hsp-card"
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="hsp-label">Books Status</div>
              <div className="hsp-status">✓ Up to Date</div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div className="scroll-cue" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={22} />
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...Array(2)].map((_, r) =>
            ["QuickBooks Setup", "Payroll Processing", "Financial Reports", "Cash Flow Forecasting",
              "AP/AR Management", "Tax Prep Support", "Remote Bookkeeping", "15+ Years Experience"].map((t, i) => (
                <span key={`${r}-${i}`} className="ticker-item"><span className="ticker-dot" />{t}</span>
              ))
          )}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="s-about">
        <motion.div className="about-grid"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>

          {/* Left text */}
          <motion.div variants={fadeLeft} className="about-text">
            <div className="eyebrow">Meet Your Bookkeeper</div>
            <h2 className="s-title cormorant">
              Hi, I'm Kimberlie —<br />
              <em className="rose-italic">your financial calm</em><br />
              in the storm.
            </h2>
            <p className="body-text">
              With 15 years of hands-on experience across construction, hospitality, banking, and service industries,
              I help business owners gain clear control over their finances so they can focus on what they do best — growing their business.
            </p>
            <p className="body-text" style={{ marginTop: 14 }}>
              My expertise spans bookkeeping, AP/AR, billing, financial reporting, budgeting, forecasting,
              cash flow management, reconciliations, payroll, and process improvement.
            </p>
            <a href="#contact" className="btn-rose" style={{ marginTop: 36, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Book a Free Call <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right: photo */}
          <motion.div variants={fadeRight} className="about-photo-col">
            <div className="about-photo-frame">
              <Image src="/contact-photo.png" alt="Kimberlie Gerstner" fill style={{ objectFit: "cover", objectPosition: "top" }} />
              <div className="about-photo-grad" />
              <div className="exp-badge">
                <span className="exp-num cormorant">15+</span>
                <span className="exp-text">Years of Experience</span>
              </div>
            </div>
            {/* clients strip */}
            <div className="client-strip">
              <div className="client-avatars">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="c-avatar" style={{ zIndex: 3 - i, marginLeft: i > 0 ? -14 : 0 }}>
                    <Image src="/clients-photo.png" alt="client" fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                  </div>
                ))}
              </div>
              <div>
                <div className="c-stars">{[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#C9964A" color="#C9964A" />)}</div>
                <div className="c-label">Trusted by 200+ business owners</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Why choose — dark card */}
        <motion.div className="why-card"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="why-header">
            <div className="eyebrow" style={{ color: "#D4614A" }}>Why Choose Kimberlie?</div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 380 }}>
              Four reasons clients keep coming back — and referring their friends.
            </p>
          </motion.div>
          <div className="why-grid">
            {reasons.map((r, i) => (
              <motion.div key={r.title} variants={fadeUp} custom={i} className="why-item">
                <div className="why-icon"><r.icon size={18} color="#D4614A" /></div>
                <div>
                  <div className="why-title">{r.title}</div>
                  <div className="why-desc">{r.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="s-services">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="services-hdr">
            <div>
              <div className="eyebrow" style={{ color: "#1E6B5E" }}>What I Offer</div>
              <h2 className="s-title cormorant">Services built for<br /><em className="rose-italic">builders &amp; creatives</em></h2>
            </div>
            <p className="body-text" style={{ maxWidth: 320, color: "rgba(13,13,13,0.5)" }}>
              Every service is customized to your business — not a one-size-fits-all template.
            </p>
          </motion.div>

          <div className="svc-grid">
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i} className="svc-card">
                {/* Full bleed image top */}
                <div className="svc-img-wrap">
                  <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover" }} />
                  <div className="svc-img-scrim" />
                  <div className="svc-icon-pill" style={{ background: s.accent }}>
                    <s.icon size={18} color="#fff" />
                  </div>
                  <span className="svc-ghost-num cormorant">{s.num}</span>
                </div>
                {/* Body */}
                <div className="svc-body">
                  <div className="svc-accent-bar" style={{ background: s.accent }} />
                  <h3 className="svc-title cormorant">{s.title}</h3>
                  <p className="svc-desc">{s.desc}</p>
                  <div className="svc-more" style={{ color: s.accent }}>Learn more <ArrowRight size={13} /></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROCESS */}
      <section id="process" className="s-process">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="eyebrow" style={{ color: "#D4614A", textAlign: "center" }}>The Process</div>
            <h2 className="s-title cormorant" style={{ textAlign: "center" }}>Simple from <em className="rose-italic">start to finish</em></h2>
          </motion.div>
          <div className="steps-grid">
            <div className="steps-connector" />
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={fadeUp} custom={i} className="step">
                <div className={`step-circle ${i === 0 ? "active" : ""}`}>
                  <span className="cormorant step-n">{s.n}</span>
                </div>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="s-testi">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="testi-hdr">
            <div>
              <div className="eyebrow" style={{ color: "#D4614A" }}>Client Stories</div>
              <h2 className="s-title cormorant" style={{ color: "#fff" }}>What clients<br /><em style={{ color: "#D4614A" }}>are saying</em></h2>
            </div>
            <div className="testi-rating">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#C9964A" color="#C9964A" />)}
              <span className="testi-avg">5.0 average</span>
            </div>
          </motion.div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="testi-card">
                <div className="testi-qmark cormorant">"</div>
                <div className="testi-stars">{[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="#C9964A" color="#C9964A" />)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">
                    <Image src="/clients-photo.png" alt={t.name} fill style={{ objectFit: "cover", borderRadius: "50%" }} />
                  </div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="s-contact">
        <motion.div className="contact-grid"
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>

          <motion.div variants={fadeLeft} className="contact-left">
            <div className="eyebrow" style={{ color: "#D4614A" }}>Get In Touch</div>
            <h2 className="s-title cormorant">Let's simplify your<br /><em className="rose-italic">books together</em></h2>
            <p className="body-text">
              Ready to go from chaos to calm? I'll get back to you within 24 hours — no jargon, no pressure, just a friendly conversation about your finances.
            </p>
            {/* contact-photo.png as a card */}
            <div className="contact-img-card">
              <Image src="/contact-photo.png" alt="Kimberlie" fill style={{ objectFit: "cover", objectPosition: "top" }} />
              <div className="cic-overlay" />
              <div className="cic-caption">
                <span className="cic-name">Kimberlie Gerstner</span>
                <span className="cic-role">Certified Bookkeeper</span>
              </div>
            </div>
            <div className="contact-details">
              {[
                { icon: Mail, label: "Email", value: "kimberlie@booksbykimberlie.com" },
                { icon: Phone, label: "Mobile", value: "830-515-9818" },
                { icon: Phone, label: "Office", value: "830-730-4160" },
                { icon: MessageCircle, label: "WhatsApp", value: "Available" },
              ].map(c => (
                <div key={c.label} className="cd-row">
                  <div className="cd-icon"><c.icon size={17} color="#D4614A" /></div>
                  <div>
                    <div className="cd-label">{c.label}</div>
                    <div className="cd-value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeRight}>
            {submitted ? (
              /* ── Success state ── */
              <div className="c-form c-success">
                <div className="c-success-icon">
                  <CheckCircle2 size={40} color="#1E6B5E" />
                </div>
                <h3 className="cormorant c-success-title">Message sent!</h3>
                <p className="c-success-body">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                  Check your inbox — I've sent you a confirmation email.
                </p>
                <div className="c-success-details">
                  <div className="csd-row"><Phone size={15} color="#D4614A" /><span>830-515-9818</span></div>
                  <div className="csd-row"><Mail size={15} color="#D4614A" /><span>kimberlie@booksbykimberlie.com</span></div>
                </div>
                <button className="btn-rose c-submit" style={{ marginTop: 28 }}
                  onClick={() => { setSubmitted(false); setFormError(null); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={submit} className="c-form" noValidate>
                {/* Global error banner */}
                {formError && (
                  <div className="c-error-banner">
                    <span style={{ flexShrink: 0 }}>⚠</span>
                    {formError}
                  </div>
                )}

                <div className="c-form-row">
                  <div className="c-fg">
                    <label className="c-label">Your Name</label>
                    <input
                      placeholder="Jane Smith"
                      value={name}
                      onChange={e => { setName(e.target.value); setFieldErrors(p => ({ ...p, name: "" })); }}
                      className={`c-input ${fieldErrors.name ? "c-input-error" : ""}`}
                      disabled={submitting}
                    />
                    {fieldErrors.name && <span className="c-field-err">{fieldErrors.name}</span>}
                  </div>
                  <div className="c-fg">
                    <label className="c-label">Email</label>
                    <input
                      type="email"
                      placeholder="jane@business.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: "" })); }}
                      className={`c-input ${fieldErrors.email ? "c-input-error" : ""}`}
                      disabled={submitting}
                    />
                    {fieldErrors.email && <span className="c-field-err">{fieldErrors.email}</span>}
                  </div>
                </div>

                <div className="c-fg">
                  <label className="c-label">Tell me about your business</label>
                  <textarea
                    placeholder="I'm a contractor and I need help with..."
                    value={message}
                    onChange={e => { setMessage(e.target.value); setFieldErrors(p => ({ ...p, message: "" })); }}
                    className={`c-textarea ${fieldErrors.message ? "c-input-error" : ""}`}
                    disabled={submitting}
                  />
                  {fieldErrors.message && <span className="c-field-err">{fieldErrors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn-rose c-submit"
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.75 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                >
                  {submitting ? (
                    <><span className="c-spinner" /> Sending...</>
                  ) : (
                    <>Send Message <ArrowRight size={17} /></>
                  )}
                </button>

                <p className="c-note">
                  <CheckCircle2 size={13} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
                  I respond within 24 hours · No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* NEWSLETTER */}
      <div className="nl-strip">
        <div>
          <h3 className="cormorant nl-title">Stay in the loop</h3>
          <p className="nl-sub">Get helpful bookkeeping tips and updates.</p>
        </div>

        {nlStatus === "success" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#1E6B5E", fontWeight: 600, fontSize: 15 }}>
            <CheckCircle2 size={20} color="#1E6B5E" />
            {nlMessage}
          </div>
        ) : (
          <form onSubmit={submitNewsletter} className="nl-form" noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="nl-input"
                value={nlEmail}
                onChange={e => { setNlEmail(e.target.value); setNlStatus("idle"); setNlMessage(""); }}
                disabled={nlSubmitting}
                style={{ borderColor: nlStatus === "error" ? "#D4614A" : undefined }}
              />
              {nlStatus === "error" && (
                <span style={{ fontSize: 12, color: "#D4614A", paddingLeft: 2 }}>{nlMessage}</span>
              )}
            </div>
            <button
              type="submit"
              className="nl-btn"
              disabled={nlSubmitting}
              style={{ opacity: nlSubmitting ? 0.75 : 1, cursor: nlSubmitting ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}
            >
              {nlSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/logo.png" alt="Books by Kimberlie" width={140} height={50} style={{ objectFit: "contain" }} />
            <p className="footer-tagline">Remote bookkeeping for builders, creatives &amp; businesses. From chaos to calm, one ledger at a time.</p>
            <div className="footer-socials">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="social-icon"><Icon size={15} /></a>
              ))}
            </div>
          </div>
          {[
            { h: "Services", links: ["QuickBooks", "Payroll", "Financial Reports", "Cash Flow"] },
            { h: "Company", links: ["About", "How It Works", "Reviews", "Contact"] },
            { h: "Contact", links: ["kimberlie@booksbykimberlie.com", "830-515-9818", "830-730-4160", "WhatsApp"] },
          ].map(col => (
            <div key={col.h}>
              <div className="footer-col-h">{col.h}</div>
              <ul className="footer-col-ul">
                {col.links.map(l => <li key={l}><a href="#" className="footer-col-a">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Books by Kimberlie. All rights reserved.</p>
          <div className="footer-legal">
            {["Privacy Policy", "Terms of Service"].map(l => <a key={l} href="#" className="footer-legal-a">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
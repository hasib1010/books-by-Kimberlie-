// src/app/components/About.tsx
"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ClientLogoMarks, StarRow } from "./ui";
import { WHY, WHAT_SETS_APART, ABOUT_TAGS } from "@/app/data";

export default function About() {
  return (
    <section
      id="about"
      className="section-pad"
      style={{ background: "var(--ivory)", zIndex: 2 }}
    >
      <div className="max-w-[1160px] mx-auto">
        {/* Main about grid: photo + bio */}
        <div className="col-1-sm grid grid-cols-2 gap-20 items-start mb-24">
          <div data-aos="fade-right">
            <AboutPhoto />
          </div>
          <div data-aos="fade-left" data-aos-delay="100">
            <AboutBio />
          </div>
        </div>

        {/* "Why work with me" grid */}
        <WhyCards />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   Left column: photo + tags
───────────────────────────────────── */
function AboutPhoto() {
  return (
    <div className="flex flex-col gap-[18px]">
      <div
        className="relative w-full overflow-hidden rounded-[36px]"
        style={{
          aspectRatio: "3/4",
          boxShadow: "0 32px 80px rgba(30,26,24,.12), 0 0 0 1px rgba(212,168,67,.2)",
        }}
      >
        <Image
          src="/about_me.png"
          alt="Kimberlie Gerstner"
          fill
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(30,26,24,.55) 0%, transparent 50%)" }}
        />
      </div>

      {/* Logos + review line */}
      <div className="card-base flex items-center gap-[14px]" style={{ padding: "16px 20px" }}>
        <ClientLogoMarks size={50} />
        <div>
          <StarRow count={5} size={12} />
          <div className="text-xs text-[#888] mt-[3px]">Trusted by 200+ business owners</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {ABOUT_TAGS.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-semibold rounded-full tracking-[.04em]"
            style={{
              padding: "5px 12px",
              background: "rgba(192,85,106,.06)",
              color: "var(--rose)",
              border: "1px solid rgba(192,85,106,.15)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Right column: bio, USPs, CTA
───────────────────────────────────── */
function AboutBio() {
  return (
    <div className="flex flex-col">
      <div className="eyebrow">Meet Your Bookkeeper</div>
      <h2 className="display-title">
        Hi, I&apos;m Kimberlie —<br />
        <em className="italic text-[var(--rose)]">your financial calm</em>
        <br />
        in the storm.
      </h2>

      <p className="body-text mb-3.5">
        With 30+ years of hands-on experience across construction, hospitality, banking, tech, and service industries,
        I bring battle-tested expertise to every client&apos;s books. From Controller and CFO roles to Regional Finance
        Manager for multi-million portfolios, I&apos;ve managed everything from multi-entity GAAP reporting to daily
        wire transfers and international reconciliations.
      </p>
      <p className="body-text mb-[22px]">
        I started Books by Kimberlie because I saw business owners drowning in receipts, bank feeds, and QuickBooks
        headaches while trying to run their real work. My mission is simple: deliver clear financial control so you
        can focus on your projects, customers, and growth instead of spreadsheets.
      </p>

      {/* "What sets me apart" callout */}
      <div
        className="rounded-[18px] mb-7"
        style={{ background: "var(--mist)", padding: "20px 22px" }}
      >
        <div className="text-xs font-semibold text-[var(--rose)] tracking-[.1em] uppercase mb-3">
          What sets me apart
        </div>
        <div className="flex flex-col gap-[9px]">
          {WHAT_SETS_APART.map((point) => (
            <div key={point} className="flex items-start gap-[9px]">
              <CheckCircle2 size={14} color="#3A9E8F" className="shrink-0 mt-0.5" />
              <span className="text-[13px] text-[#555] leading-[1.65]">{point}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="#contact" className="btn-primary self-start">
        Book a Free Call <ArrowRight size={15} />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────
   "Why work with me" cards grid
───────────────────────────────────── */
function WhyCards() {
  return (
    <div
      className="rounded-[32px]"
      style={{ background: "var(--mist)", padding: "52px 30px" }}
    >
      <div data-aos="fade-up" className="mb-5">
        <div className="eyebrow">Why Work With Me?</div>
        <h3
          className="font-display font-light tracking-[-.02em] text-[var(--ink)]"
          style={{ fontSize: "clamp(26px,2.8vw,38px)", lineHeight: 1.15 }}
        >
          Four reasons clients <em className="italic text-[var(--rose)]">keep coming back</em>
        </h3>
      </div>

      <div className="col-2-sm grid grid-cols-4 gap-5">
        {WHY.map((item, i) => (
          <div
            key={item.title}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className="bg-white rounded-[22px] h-full"
            style={{
              border: `1px solid ${item.c}18`,
              padding: "26px 20px",
            }}
          >
            <div
              className="flex items-center justify-center rounded-[13px] mb-4"
              style={{
                width: 44,
                height: 44,
                background: item.bg,
                border: `1px solid ${item.c}30`,
              }}
            >
              <item.icon size={20} color={item.c} />
            </div>
            <div className="text-sm font-semibold text-[var(--ink)] mb-2 tracking-[.01em]">
              {item.title}
            </div>
            <div className="text-[13px] text-[#888] leading-[1.72]">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
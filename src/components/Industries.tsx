// src/app/components/Industries.tsx
"use client";

import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/app/data";

export default function Industries() {
  return (
    <section
      id="industries"
      className="section-pad relative overflow-hidden"
      style={{
        background: "linear-gradient(140deg, #F9F5FF 0%, #FFFCF7 60%, #F4F9F7 100%)",
        zIndex: 4,
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: -200,
          right: -150,
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(126,107,168,.06) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: -100,
          left: -100,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(58,158,143,.05) 0%, transparent 68%)",
        }}
      />

      <div className="max-w-[1160px] mx-auto relative z-10">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex justify-between items-end flex-wrap gap-6 mb-14"
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--plum)" }}>Industries</div>
            <h2 className="display-title">
              Expertise across
              <br />
              <em className="italic text-[var(--rose)]">every industry</em>
            </h2>
          </div>
          <p className="body-text max-w-[320px]">
            30+ years of hands-on bookkeeping means I speak your industry&apos;s language — and know exactly where the money hides.
          </p>
        </div>

        {/* Industry cards */}
        <div className="industry-grid mb-12">
          {INDUSTRIES.map((industry, i) => (
            <div
              key={industry.name}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 80}
            >
              <IndustryCard industry={industry} />
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <CtaStrip />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   Single industry card
───────────────────────────────────── */
function IndustryCard({ industry }: { industry: typeof INDUSTRIES[number] }) {
  return (
    <div
      className="rounded-[22px] flex flex-col gap-3 h-full"
      style={{
        background: industry.bg,
        padding: "26px 22px",
        border: `1px solid ${industry.c}22`,
      }}
    >
      <div
        className="flex items-center justify-center rounded-[14px] bg-white text-2xl"
        style={{
          width: 50,
          height: 50,
          border: `1px solid ${industry.c}28`,
          boxShadow: `0 4px 16px ${industry.c}15`,
        }}
      >
        {industry.emoji}
      </div>

      <div>
        <div className="text-[15px] font-semibold text-[var(--ink)] mb-[5px] tracking-[.01em]">
          {industry.name}
        </div>
        <div className="text-xs text-[#999] leading-[1.7]">{industry.note}</div>
      </div>

      <div
        className="h-0.5 w-7 rounded-[1px] mt-auto"
        style={{ background: industry.c, opacity: 0.45 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────
   "Don't see your industry" CTA strip
───────────────────────────────────── */
function CtaStrip() {
  return (
    <div
      data-aos="fade-up"
      className="rounded-[28px] flex items-center justify-between flex-wrap gap-6"
      style={{
        background: "linear-gradient(135deg, #2A1A1E 0%, #1E2820 100%)",
        padding: "40px 48px",
      }}
    >
      <div>
        <div className="font-display font-light text-white mb-1.5" style={{ fontSize: 28 }}>
          Don&apos;t see your industry?
        </div>
        <p className="text-sm text-white/50">
          I work with businesses of all kinds. Let&apos;s talk about your specific needs.
        </p>
      </div>
      <a href="#contact" className="btn-primary">
        Book a Free Call <ArrowRight size={15} />
      </a>
    </div>
  );
}
// src/app/components/Testimonials.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { StarRow } from "./ui";
import { TESTIMONIALS, CLIENT_LOGOS, type Testimonial } from "@/app/data";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-pad"
      style={{ background: "var(--ivory)", zIndex: 6 }}
    >
      <div className="max-w-[1160px] mx-auto">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex justify-between items-end flex-wrap gap-5 mb-14"
        >
          <div>
            <div className="eyebrow">Client Stories</div>
            <h2 className="display-title">
              What clients
              <em className="italic text-[var(--teal)]"> are saying</em>
            </h2>
          </div>
        </div>

        {/* Logo strip */}
        <LogoStrip />

        {/* Testimonial cards grid */}
        <div className="testimonial-grid">
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={`${testimonial.name}-${i}`}
              data-aos="fade-up"
              data-aos-delay={(i % 2) * 120}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   "Trusted by" logo strip
───────────────────────────────────── */
function LogoStrip() {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card-base flex flex-wrap items-center gap-6 justify-between mb-12"
      style={{ padding: "28px 32px" }}
    >
      <div>
        <div className="text-[11px] font-semibold tracking-[.14em] uppercase text-[#BBB] mb-1.5">
          Trusted by
        </div>
        <div
          className="font-display font-light text-[var(--ink)]"
          style={{ fontSize: 22 }}
        >
          Growing businesses across the U.S.
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {CLIENT_LOGOS.map((logo) => (
          <div
            key={logo.src}
            className="relative rounded-[14px] overflow-hidden shrink-0"
            style={{
              width: 100,
              height: 64,
              background: "#FAFAF9",
              border: "1px solid rgba(30,26,24,.08)",
              boxShadow: "0 2px 10px rgba(30,26,24,.05)",
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="100px"
              style={{ objectFit: "contain", padding: 10 }}
            />
          </div>
        ))}
        <div className="flex items-center gap-1.5 pl-2">
          <StarRow count={5} size={14} />
          <span className="text-[13px] font-semibold text-[var(--ink)]">5.0</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Single testimonial card (both variants)
───────────────────────────────────── */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [open, setOpen] = useState(false);
  const isExpand = testimonial.variant === "expand";
  const color = testimonial.c;

  return (
    <div
      className="card-base relative overflow-hidden"
      style={{ padding: "28px 26px 26px" }}
    >
      {/* Decorative big quote mark */}
      <div
        className="font-display pointer-events-none select-none absolute"
        style={{
          top: 16,
          right: 20,
          fontSize: 72,
          color,
          opacity: 0.07,
          lineHeight: 1,
        }}
      >
        &ldquo;
      </div>

      {/* Logo banner */}
      <LogoBanner testimonial={testimonial} />

      <StarRow count={5} size={13} />

      {/* Quote content */}
      {isExpand ? (
        <ExpandableQuote testimonial={testimonial} open={open} setOpen={setOpen} color={color} />
      ) : (
        <p
          className="relative z-[1] italic my-4 mb-6"
          style={{ fontSize: 14, color: "#666", lineHeight: 1.88 }}
        >
          &ldquo;{testimonial.q}&rdquo;
        </p>
      )}

      {/* Footer (name + role) */}
      <div
        className="pt-[18px] mt-1"
        style={{ borderTop: "1px solid rgba(30,26,24,.07)" }}
      >
        <div className="text-sm font-semibold text-[var(--ink)] tracking-[.01em]">
          {testimonial.name}
        </div>
        <div className="text-xs text-[#999] mt-1 tracking-[.02em] leading-[1.45]">
          {testimonial.role}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Logo banner at top of testimonial card
───────────────────────────────────── */
function LogoBanner({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="relative z-[1] w-full flex items-center justify-center mb-[18px] rounded-[18px]"
      style={{
        minHeight: 100,
        background: "linear-gradient(180deg, #FAFAF9 0%, #FFFFFF 55%)",
        border: `1px solid ${testimonial.c}35`,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)",
        padding: "18px 22px",
      }}
    >
      <div className="relative w-full" style={{ height: 84, maxWidth: 280 }}>
        <Image
          src={testimonial.img}
          alt={`${testimonial.name} logo`}
          fill
          sizes="(max-width:768px) 90vw, 280px"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Expandable "Read more" quote
───────────────────────────────────── */
function ExpandableQuote({
  testimonial,
  open,
  setOpen,
  color,
}: {
  testimonial: Extract<Testimonial, { variant: "expand" }>;
  open: boolean;
  setOpen: (v: boolean) => void;
  color: string;
}) {
  return (
    <div className="relative z-[1] mt-4 mb-6">
      <p
        className="italic"
        style={{
          fontSize: 14,
          color: "#666",
          lineHeight: 1.88,
          marginBottom: open ? 14 : 10,
        }}
      >
        &ldquo;{testimonial.preview}&rdquo;
      </p>

      {open && (
        <>
          <SectionLabel>Key strengths</SectionLabel>
          <ul
            className="mb-4"
            style={{
              margin: "0 0 16px 18px",
              fontSize: 13,
              color: "#555",
              lineHeight: 1.75,
            }}
          >
            {testimonial.strengths.map((s, i) => (
              <li key={i} className="mb-2">
                {s}
              </li>
            ))}
          </ul>

          <SectionLabel>Client experience</SectionLabel>
          <p
            style={{
              fontSize: 13,
              color: "#666",
              lineHeight: 1.82,
              marginBottom: 14,
            }}
          >
            {testimonial.closing}
          </p>
        </>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-transparent border-0 p-0 text-[13px] font-semibold underline cursor-pointer"
        style={{ color, textUnderlineOffset: 3 }}
      >
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold tracking-[.12em] uppercase text-[#AAA] mb-2.5">
      {children}
    </div>
  );
}
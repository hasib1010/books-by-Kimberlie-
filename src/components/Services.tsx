// src/app/components/Services.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES, BOOKKEEPING_SERVICES } from "@/app/data";

export default function Services() {
  return (
    <section
      id="services"
      className="section-pad"
      style={{ background: "white", zIndex: 3 }}
    >
      <div className="max-w-[1160px] mx-auto">
        {/* Section header */}
        <div
          data-aos="fade-up"
          className="flex justify-between items-end flex-wrap gap-6 mb-14"
        >
          <div>
            <div className="eyebrow" style={{ color: "var(--teal)" }}>What I Offer</div>
            <h2 className="display-title">
              Services for
              <br />
              <em className="italic text-[var(--rose)]">every business</em>
            </h2>
          </div>
          <p className="body-text max-w-[300px]">
            Every service is customized to your business — not a one-size-fits-all template.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="col-3-sm grid grid-cols-3 gap-[22px] mb-16">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 100}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Full service list callout */}
        <FullServiceList />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   Single service card
───────────────────────────────────── */
function ServiceCard({ service }: { service: typeof SERVICES[number] }) {
  return (
    <div className="card-base overflow-hidden h-full">
      <div className="service-card-media" style={{ background: service.bg }}>
        <Image
          src={service.img}
          alt={service.title}
          width={800}
          height={480}
          sizes="(max-width:768px) 50vw, 360px"
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        />
      </div>
      <div className="px-[22px] pt-[18px] pb-[22px]">
        <div
          className="h-0.5 w-10 rounded-[1px] mb-2.5 opacity-70"
          style={{ background: service.accent }}
        />
        <h3
          className="font-display font-normal text-[var(--ink)] mb-2 tracking-[-.01em]"
          style={{ fontSize: 25 }}
        >
          {service.title}
        </h3>
        <p className="text-[13px] text-[#888] leading-[1.82]">{service.desc}</p>
        <Link
          href="#contact"
          className="inline-flex items-center gap-[5px] text-xs font-semibold no-underline mt-3 tracking-[.03em]"
          style={{ color: service.accent }}
        >
          Learn more <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Full service checklist section
───────────────────────────────────── */
function FullServiceList() {
  return (
    <div
      data-aos="fade-up"
      className="rounded-[32px]"
      style={{ background: "var(--mist)", padding: "52px 48px" }}
    >
      <div className="flex gap-12 flex-wrap items-start">
        <div className="shrink-0" style={{ maxWidth: 280 }}>
          <div className="eyebrow" style={{ color: "var(--gold)" }}>Full Service List</div>
          <h3
            className="font-display font-light tracking-[-.02em] text-[var(--ink)] mb-3.5"
            style={{ fontSize: "clamp(24px,2.4vw,34px)", lineHeight: 1.2 }}
          >
            Everything your <em className="italic text-[var(--rose)]">books need</em>
          </h3>
          <p className="text-[13px] text-[#888] leading-[1.8]">
            Whether you need a full-service bookkeeper or just help getting caught up, I&apos;ve got you covered.
          </p>
        </div>

        <div className="flex-1 min-w-[280px]">
          <div
            className="grid gap-x-6 gap-y-2.5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
          >
            {BOOKKEEPING_SERVICES.map((item, i) => (
              <div
                key={item}
                data-aos="fade-up"
                data-aos-delay={i * 40}
                className="flex items-start gap-2.5 py-2.5"
                style={{ borderBottom: "1px solid rgba(30,26,24,.06)" }}
              >
                <CheckCircle2 size={14} color="#3A9E8F" className="shrink-0 mt-[3px]" />
                <span className="text-[13px] text-[#555] leading-[1.6]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// src/app/components/Hero.tsx
"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ClientLogoMarks, StarRow } from "./ui";
import { HERO_STATS } from "@/app/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-grid mt-20 relative overflow-hidden grid grid-cols-2 min-h-screen pt-[100px] max-w-[1160px] mx-auto"
      style={{
        background: "linear-gradient(140deg, #FDF6F8 0%, #FFFCF7 45%, #F4F9F7 100%)",
        zIndex: 1,
      }}
    >
      {/* Decorative radial glows */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: -140,
          right: -120,
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(212,168,67,.12) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: -100,
          left: -100,
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(192,85,106,.1) 0%, transparent 68%)",
        }}
      />

      {/* LEFT — headline, copy, proof, CTAs, stats */}
      <div className="hero-left relative z-10 flex flex-col justify-center px-[5%] pl-[8%] py-[72px]">
        <h1
          data-aos="fade-up"
          className="hero-h1 font-display font-light tracking-[-.025em] my-5"
          style={{
            fontSize: "clamp(46px,4.6vw,74px)",
            lineHeight: 1.06,
            color: "var(--ink)",
          }}
        >
          From <em className="italic text-[var(--rose)]">chaos</em>
          <br />
          to calm, <em className="italic">one</em>
          <br />
          <em className="italic text-[var(--rose)]">ledger</em> at a time.
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="body-text max-w-[440px] mb-7"
        >
          Professional bookkeeping &amp; outsourced accounting services for businesses of every kind — so you can focus on growing what you love.{" "}
          <span className="text-[var(--rose)] font-medium">
            No spreadsheet nightmares, just crystal-clear numbers.
          </span>
        </p>

        {/* Social proof row */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex flex-wrap items-center gap-3.5 mb-7"
        >
          <ClientLogoMarks size={56} />
          <div>
            <StarRow count={5} size={12} />
            <span className="text-[13px] text-[#888] mt-[3px] block">
              <strong className="text-[var(--ink)]">200+ clients</strong> trust Kimberlie
            </span>
          </div>
        </div>

        {/* CTA buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex gap-3 flex-wrap mb-11"
        >
          <a href="#contact" className="btn-primary">
            Get a Free Consultation <ArrowRight size={16} />
          </a>
          <a href="#services" className="btn-outline">
            See My Services
          </a>
        </div>

        {/* Stat cards */}
        <div className="col-2-sm grid grid-cols-4 gap-2.5">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.l}
              data-aos="fade-up"
              data-aos-delay={400 + i * 80}
              className="rounded-2xl text-center bg-white"
              style={{
                padding: "16px 10px",
                border: `1px solid ${stat.c}22`,
                boxShadow: `0 2px 12px ${stat.c}12`,
              }}
            >
              <div
                className="font-display font-semibold mb-1"
                style={{ fontSize: 28, color: stat.c, lineHeight: 1 }}
              >
                {stat.v}
              </div>
              <div className="text-[10px] font-medium text-[#AAA] tracking-[.04em] leading-[1.4]">
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — hero photo + floating info cards */}
      <div className="hide-sm relative z-10 flex items-center justify-center py-[60px] pl-[2%] pr-[6%]">
        {/* Image wrapper — MUST have position:relative + explicit size for `fill` to work */}
        <div
          data-aos="fade-left"
          data-aos-delay="150"
          className="relative w-full h-full max-w-[560px] aspect-square"
        >
          <Image
            src="/hero.jpg"
            alt="Bookkeeping"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 560px"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Floating "Books Status" card */}
        <div
          data-aos="fade-right"
          data-aos-delay="400"
          className="absolute bg-white rounded-[20px] flex items-center gap-[11px] z-20"
          style={{
            top: "14%",
            left: "0%",
            padding: "14px 18px",
            boxShadow: "0 12px 48px rgba(30,26,24,.1)",
          }}
        >
          <div
            className="flex items-center justify-center shrink-0 rounded-[10px]"
            style={{ width: 36, height: 36, background: "rgba(58,158,143,.09)" }}
          >
            <CheckCircle2 size={18} color="#3A9E8F" />
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[.1em] uppercase text-[#BBB] mb-[2px]">
              Books Status
            </div>
            <div className="text-[13px] font-semibold text-[var(--teal)]">All Up to Date ✓</div>
          </div>
        </div>

        {/* Floating "Cash Flow" card */}
        <div
          data-aos="fade-left"
          data-aos-delay="500"
          className="absolute bg-white rounded-[20px] z-20"
          style={{
            bottom: "12%",
            right: "3%",
            padding: "16px 20px",
            minWidth: 190,
            boxShadow: "0 12px 48px rgba(30,26,24,.1)",
          }}
        >
          <div className="text-[10px] font-semibold tracking-[.1em] uppercase text-[#BBB] mb-1.5">
            Cash Flow · This Month
          </div>
          <div
            className="font-display font-semibold"
            style={{ fontSize: 30, color: "var(--rose)", lineHeight: 1 }}
          >
            $12,480
          </div>
          <div className="text-[11px] font-semibold text-[var(--teal)] mt-[5px]">
            ↑ 18% vs last month
          </div>
        </div>
      </div>
    </section>
  );
}
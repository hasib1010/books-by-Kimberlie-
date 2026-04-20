// src/app/components/ui.tsx
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { CLIENT_LOGOS } from "@/app/data";

/* ─────────────────────────────────────
   Star rating row
───────────────────────────────────── */
export function StarRow({ count = 5, size = 13 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-[2px]">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={size} fill="#D4A843" color="#D4A843" />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   Row of client logo marks
───────────────────────────────────── */
export function ClientLogoMarks({ size = 56 }: { size?: number }) {
  const pad = Math.max(5, Math.round(size * 0.14));

  return (
    <div className="flex flex-wrap items-center gap-3">
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={logo.src}
          className="relative overflow-hidden rounded-[14px] bg-white shrink-0"
          style={{
            width: size,
            height: size,
            border: "1px solid rgba(30,26,24,.1)",
            boxShadow: "0 2px 12px rgba(30,26,24,.07)",
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

/* ─────────────────────────────────────
   Colored pill / tag
───────────────────────────────────── */
export function Pill({ color = "#C0556A", children }: { color?: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full text-[11px] font-semibold tracking-[.08em] w-fit"
      style={{
        background: `${color}12`,
        border: `1px solid ${color}35`,
        padding: "7px 16px",
        color,
      }}
    >
      {children}
    </span>
  );
}
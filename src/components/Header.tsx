// src/app/components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/app/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Track scroll for nav background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  return (
    <>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <header
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-center px-[5%]"
        style={{
          background: scrolled ? "rgba(255,252,247,.97)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled
            ? "0 1px 0 rgba(192,85,106,.1), 0 4px 32px rgba(30,26,24,.05)"
            : "none",
        }}
      >
        <Image
          src="/logo.png"
          alt="Books by Kimberlie"
          width={520}
          height={120}
          priority
          className="nav-logo-img"
          style={{
            objectFit: "contain",
            objectPosition: "left center",
            height: 250,
            width: "auto",
          }}
        />

        {/* Desktop nav */}
        <nav className="hide-sm flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[13px] font-medium tracking-[.03em] text-[#6B6461] hover:text-[var(--rose)] no-underline"
            >
              {link}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>
            Get Started <ArrowRight size={13} />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="show-sm hidden bg-transparent border-0 cursor-pointer p-1 text-[var(--rose)]"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu size={26} />
        </button>
      </header>
    </>
  );
}

/* ─────────────────────────────────────
   Mobile drawer menu
───────────────────────────────────── */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col px-[7%] py-8"
      style={{ background: "linear-gradient(160deg, #2A1A1E 0%, #1E2820 100%)" }}
    >
      <div className="flex justify-between items-center pb-7 mb-8 border-b border-white/10">
        <Image
          src="/logo.png"
          alt="Books by Kimberlie"
          width={220}
          height={88}
          className="drawer-logo-img"
          style={{ objectFit: "contain", height: 120, width: "auto" }}
        />
        <button
          onClick={onClose}
          className="bg-white/10 border-0 rounded-full w-[42px] h-[42px] flex items-center justify-center cursor-pointer text-white"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex flex-col">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={onClose}
            className="font-display text-[40px] font-light text-white/90 no-underline py-2.5 border-b border-white/5 tracking-[-.01em]"
          >
            {link}
          </a>
        ))}
      </nav>

      <a href="#contact" onClick={onClose} className="btn-primary mt-9 self-start">
        Get Started <ArrowRight size={15} />
      </a>
    </div>
  );
}
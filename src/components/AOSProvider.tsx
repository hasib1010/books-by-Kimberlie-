// src/app/components/AOSProvider.tsx
"use client";

import { useEffect } from "react";
import AOS from "aos";

/**
 * Initializes AOS (Animate On Scroll) once on the client.
 * Drop this once near the root of your page so every section
 * with data-aos="..." attributes animates on scroll.
 */
export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 700,       // animation duration in ms
      easing: "ease-out",  // smooth, natural feel
      once: true,          // only animate the first time into view
      offset: 60,          // trigger 60px before element enters viewport
      delay: 0,            // global delay (per-element delay set via data-aos-delay)
    });
  }, []);

  return null;
}
"use client";

import { useEffect, useRef } from "react";

const LOTTIE_SRC =
  "https://lottie.host/23c50314-7a3d-4704-9ccd-9cccbe054f76/NjDfbHcDcQ.lottie";

/**
 * Forward infinite loop: loop="true" + optional dotLottie API when present.
 */
export function AboutLottieBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let cancelled = false;
    let el: HTMLElement | null = null;

    const mount = async () => {
      try {
        await Promise.race([
          customElements.whenDefined("dotlottie-wc"),
          new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 12000)),
        ]);
      } catch {
        return;
      }

      if (cancelled || !ref.current) return;

      el = document.createElement("dotlottie-wc");
      el.setAttribute("src", LOTTIE_SRC);
      el.setAttribute("autoplay", "");
      el.setAttribute("loop", "true");
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.display = "block";
      el.style.minHeight = "280px";
      ref.current.appendChild(el);

      requestAnimationFrame(() => {
        const anyEl = el as HTMLElement & {
          dotLottie?: { setLoop?: (v: boolean) => void };
        };
        try {
          anyEl.dotLottie?.setLoop?.(true);
        } catch {
          /* optional */
        }
      });
    };

    void mount();

    return () => {
      cancelled = true;
      el?.remove();
    };
  }, []);

  return <div className="about-lottie-bg" ref={ref} aria-hidden />;
}

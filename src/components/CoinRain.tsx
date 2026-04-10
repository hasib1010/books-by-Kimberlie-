"use client";

import React from "react";

function rnd(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453123;
  return x - Math.floor(x);
}

type CoinLayer = "hero" | "about";

export function CoinRain({ layer = "hero" }: { layer?: CoinLayer }) {
  const isAbout = layer === "about";
  const count = isAbout ? 20 : 24;
  const seedOff = isAbout ? 31.4 : 0;

  const coins = Array.from({ length: count }, (_, i) => {
    const s = i * 9.17 + seedOff;
    return {
      id: i,
      left: rnd(s) * 100,
      delay: rnd(s + 1) * 7,
      duration: 4.5 + rnd(s + 2) * 5.5,
      size: 12 + rnd(s + 3) * (isAbout ? 18 : 20),
      opacity: (isAbout ? 0.35 : 0.18) + rnd(s + 4) * (isAbout ? 0.45 : 0.42),
    };
  });

  const wrapClass = isAbout ? "about-coin-rain" : "hero-coin-rain";
  const itemClass = isAbout ? "coin-fall-item coin-fall-item--about" : "coin-fall-item";

  return (
    <div className={wrapClass} aria-hidden>
      {coins.map((c) => (
        <div
          key={c.id}
          className={itemClass}
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            width: c.size,
            height: c.size,
            opacity: c.opacity,
            // KEY FIX: start above via top, not inside the animation
            top: `-${c.size + 4}px`,
          }}
        >
          <span className="coin-fall-symbol" style={{ fontSize: Math.max(9, c.size * 0.38) }}>
            $
          </span>
        </div>
      ))}
    </div>
  );
}
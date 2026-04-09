"use client";

import React, { useEffect, useRef, useState } from "react";

export const AnimatedHeroText = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className="relative z-10 w-full flex justify-center">
      <h1
        className={`font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight max-w-3xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="inline-block animate-float" style={{ animationDelay: "0s" }}>From chaos</span>{" "}
        <span className="inline-block animate-float" style={{ animationDelay: "0.3s" }}>to calm,</span>
        <br />
        <span className="inline-block animate-float" style={{ animationDelay: "0.6s" }}>one ledger</span>{" "}
        <span className="inline-block animate-float" style={{ animationDelay: "0.9s" }}>at a time.</span>
      </h1>
    </div>
  );
};

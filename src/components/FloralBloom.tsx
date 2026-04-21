// src/app/components/FloralBloom.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface FloralBloomProps {
  opacity?: number;
  cycleDuration?: number;
}

export default function FloralBloom({
  opacity = 0.82,
  cycleDuration = 24,
}: FloralBloomProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => setIsVisible(e.isIntersecting)),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 768px)");
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener("change", syncMobile);
    return () => media.removeEventListener("change", syncMobile);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="floral-bloom-shell absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity, zIndex: 1 }}
    >
      <svg
        ref={svgRef}
        viewBox={isMobile ? "0 0 900 1000" : "0 0 1600 900"}
        preserveAspectRatio="xMidYMid slice"
        className="floral-bloom-svg w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ============ FLOWERS (beefier) ============ */}
          <g id="f-daisy">
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45})`}>
                <ellipse cx="0" cy="-9" rx="3.2" ry="7.8" fill="#E8C55A" stroke="#A67D28" strokeWidth="0.85" />
                <ellipse cx="0" cy="-9.5" rx="1" ry="4" fill="#F5E089" opacity="0.78" />
              </g>
            ))}
            <circle cx="0" cy="0" r="3.4" fill="#7A4E26" />
            <circle cx="-0.8" cy="-0.8" r="1.7" fill="#B07D48" opacity="0.88" />
          </g>

          <g id="f-daisy-sm">
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45})`}>
                <ellipse cx="0" cy="-6.5" rx="2.4" ry="5.5" fill="#E8C55A" stroke="#A67D28" strokeWidth="0.7" />
                <ellipse cx="0" cy="-7" rx="0.7" ry="2.8" fill="#F5E089" opacity="0.75" />
              </g>
            ))}
            <circle cx="0" cy="0" r="2.4" fill="#7A4E26" />
            <circle cx="-0.5" cy="-0.5" r="1.1" fill="#B07D48" opacity="0.85" />
          </g>

          <g id="f-pink">
            {Array.from({ length: 5 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 72})`}>
                <ellipse cx="0" cy="-5.8" rx="3.7" ry="5.8" fill="#E8A4B0" stroke="#A4606D" strokeWidth="0.7" />
                <ellipse cx="0" cy="-6.5" rx="1.1" ry="3" fill="#F3C8D0" opacity="0.65" />
              </g>
            ))}
            <circle cx="0" cy="0" r="2.1" fill="#D9A84A" />
            <circle cx="-0.4" cy="-0.4" r="0.8" fill="#F3D98E" opacity="0.8" />
          </g>

          <g id="f-coral">
            {Array.from({ length: 5 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 72})`}>
                <ellipse cx="0" cy="-5.8" rx="3.7" ry="5.8" fill="#E88A6E" stroke="#9C4F38" strokeWidth="0.7" />
                <ellipse cx="0" cy="-6.5" rx="1.1" ry="3" fill="#F3B79F" opacity="0.65" />
              </g>
            ))}
            <circle cx="0" cy="0" r="2.1" fill="#D9A84A" />
            <circle cx="-0.4" cy="-0.4" r="0.8" fill="#F3D98E" opacity="0.8" />
          </g>

          <g id="f-purple">
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 60})`}>
                <ellipse cx="0" cy="-5.2" rx="2.4" ry="5.2" fill="#B89BC9" stroke="#6E4F82" strokeWidth="0.7" />
              </g>
            ))}
            <circle cx="0" cy="0" r="2.3" fill="white" opacity="0.78" />
            <circle cx="0" cy="0" r="1.3" fill="#E8C547" />
          </g>

          <g id="f-blue">
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 60})`}>
                <ellipse cx="0" cy="-5.2" rx="2.4" ry="5.2" fill="#A8C5E8" stroke="#567CA8" strokeWidth="0.7" />
              </g>
            ))}
            <circle cx="0" cy="0" r="2.3" fill="white" opacity="0.78" />
            <circle cx="0" cy="0" r="1.3" fill="#E8C547" />
          </g>

          {/* ============ LEAVES (thicker, fuller) ============ */}
          <g id="l-std">
            <path d="M 0 0 Q 5.8 -5.4 16.5 0 Q 5.8 5.4 0 0 Z" fill="#8AB07A" stroke="#4F6E3F" strokeWidth="0.65" />
            <line x1="1" y1="0" x2="15" y2="0" stroke="#4F6E3F" strokeWidth="0.55" opacity="0.65" />
          </g>

          <g id="l-sm">
            <path d="M 0 0 Q 4.2 -3.6 12.5 0 Q 4.2 3.6 0 0 Z" fill="#9BBE88" stroke="#4F6E3F" strokeWidth="0.55" />
            <line x1="1" y1="0" x2="11" y2="0" stroke="#4F6E3F" strokeWidth="0.45" opacity="0.62" />
          </g>

          <g id="l-long">
            <path d="M 0 0 Q 7 -6.4 20 0 Q 7 6.4 0 0 Z" fill="#7FA76E" stroke="#3F5F32" strokeWidth="0.7" />
            <line x1="1" y1="0" x2="18" y2="0" stroke="#3F5F32" strokeWidth="0.55" opacity="0.68" />
            <path d="M 6.5 -2 Q 10.5 -0.6 14.6 -1.8" fill="none" stroke="#5F8250" strokeWidth="0.38" opacity="0.5" />
            <path d="M 6.5 2 Q 10.5 0.6 14.6 1.8" fill="none" stroke="#5F8250" strokeWidth="0.38" opacity="0.5" />
          </g>

          <g id="l-round">
            <path d="M 0 0 Q 5 -5.8 13.6 -1.9 Q 13.8 3.8 0 0 Z" fill="#95B984" stroke="#4B6A3F" strokeWidth="0.62" />
            <line x1="1" y1="-0.2" x2="11.4" y2="-1.1" stroke="#4B6A3F" strokeWidth="0.45" opacity="0.62" />
          </g>

          {/* ============ GEMS (slightly larger) ============ */}
          <g id="g-pink">
            <path d="M 0 -3.8 L 3.7 0 L 0 5 L -3.7 0 Z" fill="#F0A8B5" stroke="#A4606D" strokeWidth="0.65" />
            <path d="M 0 -3.8 L 3.7 0 L 0 0 Z" fill="#F8D0D8" opacity="0.72" />
            <path d="M -3.7 0 L 0 -3.8 L 0 0 Z" fill="#FFFFFF" opacity="0.42" />
          </g>

          <g id="g-gold">
            <path d="M 0 -3.8 L 3.7 0 L 0 5 L -3.7 0 Z" fill="#EFCB78" stroke="#B38A3E" strokeWidth="0.65" />
            <path d="M 0 -3.8 L 3.7 0 L 0 0 Z" fill="#F7E4AA" opacity="0.78" />
            <path d="M -3.7 0 L 0 -3.8 L 0 0 Z" fill="#FFFFFF" opacity="0.42" />
          </g>

          <g id="g-cream">
            <path d="M 0 -3.2 L 3.2 0 L 0 4.4 L -3.2 0 Z" fill="#F5E8D0" stroke="#A8926A" strokeWidth="0.55" />
            <path d="M 0 -3.2 L 3.2 0 L 0 0 Z" fill="#FFFFFF" opacity="0.62" />
          </g>

          <g id="b-pink">
            <circle r="2.8" fill="#E8A4B0" stroke="#A4606D" strokeWidth="0.55" />
            <circle r="1" cx="-0.7" cy="-0.7" fill="#F5D0D8" opacity="0.72" />
          </g>

          <g id="b-gold">
            <circle r="2.6" fill="#EFCB78" stroke="#B38A3E" strokeWidth="0.55" />
            <circle r="0.9" cx="-0.6" cy="-0.6" fill="#F7E4AA" opacity="0.72" />
          </g>

          <g id="b-cream">
            <circle r="2.3" fill="#F5E8D0" stroke="#A8926A" strokeWidth="0.5" />
          </g>

          <g id="d-pink"><circle r="1.6" fill="#E8A4B0" opacity="0.88" /></g>
          <g id="d-gold"><circle r="1.6" fill="#EFCB78" opacity="0.88" /></g>
        </defs>

        {isVisible && (
          <g className="bloom-root">
            {isMobile ? (
              <>
                <g className="half-right">
                  {MOBILE_BRANCHES.map((branch, bi) => (
                    <BranchRender key={`mr-${bi}`} branch={branch} index={bi} cycleDuration={cycleDuration} strokeWidth={3} />
                  ))}
                </g>
                <g className="half-left" transform="translate(900, 0) scale(-1, 1)">
                  {MOBILE_BRANCHES.map((branch, bi) => (
                    <BranchRender key={`ml-${bi}`} branch={branch} index={bi} mirrored cycleDuration={cycleDuration} strokeWidth={3} />
                  ))}
                </g>
              </>
            ) : (
              <>
                <g className="half-right">
                  {RIGHT_BRANCHES.map((branch, bi) => (
                    <BranchRender key={`r-${bi}`} branch={branch} index={bi} cycleDuration={cycleDuration} strokeWidth={2.3} />
                  ))}
                </g>
                <g className="half-left" transform="translate(1600, 0) scale(-1, 1)">
                  {RIGHT_BRANCHES.map((branch, bi) => (
                    <BranchRender key={`l-${bi}`} branch={branch} index={bi} mirrored cycleDuration={cycleDuration} strokeWidth={2.3} />
                  ))}
                </g>
              </>
            )}
          </g>
        )}

        <style>{`
          .floral-bloom-shell { inset: 0; }
          .floral-bloom-svg { width: 100%; height: 100%; }

          @keyframes stemDraw {
            0%   { stroke-dashoffset: var(--len); opacity: 1; }
            22%  { stroke-dashoffset: 0;          opacity: 1; }
            88%  { stroke-dashoffset: 0;          opacity: 1; }
            100% { stroke-dashoffset: 0;          opacity: 0; }
          }

          @keyframes flowerUnfurl {
            0%, 3%   { opacity: 0; transform: scale(0) rotate(-35deg); }
            8%       { opacity: 1; transform: scale(1.18) rotate(8deg); }
            13%      { opacity: 1; transform: scale(0.95) rotate(-3deg); }
            17%      { opacity: 1; transform: scale(1) rotate(0deg); }
            88%      { opacity: 1; transform: scale(1) rotate(0deg); }
            100%     { opacity: 0; transform: scale(0.7) rotate(12deg); }
          }

          @keyframes leafBreeze {
            0%, 3%   { opacity: 0; transform: scale(0, 0.3) rotate(0deg); }
            10%      { opacity: 1; transform: scale(1.12, 1) rotate(0deg); }
            14%      { opacity: 1; transform: scale(1, 1) rotate(0deg); }
            30%      { opacity: 1; transform: scale(1, 1) rotate(7deg); }
            50%      { opacity: 1; transform: scale(1, 1) rotate(-5deg); }
            70%      { opacity: 1; transform: scale(1, 1) rotate(6deg); }
            88%      { opacity: 1; transform: scale(1, 1) rotate(0deg); }
            100%     { opacity: 0; transform: scale(0.8) rotate(0deg); }
          }

          @keyframes gemPop {
            0%, 4%   { opacity: 0; transform: scale(0); }
            8%       { opacity: 1; transform: scale(1.35); }
            12%      { opacity: 1; transform: scale(0.9); }
            15%      { opacity: 1; transform: scale(1); }
            40%      { opacity: 0.85; transform: scale(1); }
            45%      { opacity: 1; transform: scale(1.1); }
            50%      { opacity: 1; transform: scale(1); }
            88%      { opacity: 1; transform: scale(1); }
            100%     { opacity: 0; transform: scale(0.6); }
          }

          @keyframes flowerSway {
            0%, 100% { transform: translate(0, 0); }
            33%      { transform: translate(0.5px, -0.7px); }
            66%      { transform: translate(-0.4px, 0.5px); }
          }

          .vine-stem {
            stroke-dasharray: var(--len, 1000);
            stroke-dashoffset: var(--len, 1000);
            animation: stemDraw var(--cycle, 24s) cubic-bezier(0.4, 0, 0.2, 1) var(--delay, 0s) infinite;
          }

          .bloom-item {
            opacity: 0;
            transform-box: fill-box;
            transform-origin: center;
            animation-duration: var(--cycle, 24s);
            animation-timing-function: cubic-bezier(0.34, 1.4, 0.5, 1);
            animation-delay: var(--item-delay, 0s);
            animation-iteration-count: infinite;
          }
          .bloom-flower { animation-name: flowerUnfurl; }
          .bloom-leaf   { animation-name: leafBreeze; animation-timing-function: ease-in-out; }
          .bloom-gem    { animation-name: gemPop; }

          .sway-wrap {
            transform-box: fill-box;
            transform-origin: center;
            animation: flowerSway 5s ease-in-out infinite;
            animation-delay: var(--sway-delay, 0s);
          }
        `}</style>
      </svg>
    </div>
  );
}

interface Decoration {
  type: string;
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
  t: number;
}

interface Branch {
  path: string;
  pathLength: number;
  startOffset: number;
  growDuration: number;
  decorations: Decoration[];
}

function BranchRender({ branch, index, mirrored = false, cycleDuration, strokeWidth }: {
  branch: Branch;
  index: number;
  mirrored?: boolean;
  cycleDuration: number;
  strokeWidth: number;
}) {
  const kind = (d: Decoration) => {
    if (d.type.startsWith("f-")) return "bloom-flower";
    if (d.type.startsWith("l-")) return "bloom-leaf";
    return "bloom-gem";
  };

  return (
    <g>
      <path
        d={branch.path}
        fill="none"
        stroke="#7AA070"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="vine-stem"
        style={{
          "--len": branch.pathLength,
          "--delay": `${branch.startOffset}s`,
          "--cycle": `${cycleDuration}s`,
        } as React.CSSProperties}
      />
      {branch.decorations.map((d, di) => {
        const rot = (d.rotate ?? 0) * (mirrored ? -1 : 1);
        const scale = d.scale ?? 1;
        const itemDelay = branch.startOffset + d.t * branch.growDuration + 0.15;
        const swayDelay = -(d.t * 2.5 + index * 0.4);

        return (
          <g key={di} transform={`translate(${d.x} ${d.y}) rotate(${rot}) scale(${scale})`}>
            <g className="sway-wrap" style={{ "--sway-delay": `${swayDelay}s` } as React.CSSProperties}>
              <use
                href={`#${d.type}`}
                className={`bloom-item ${kind(d)}`}
                style={{
                  "--item-delay": `${itemDelay}s`,
                  "--cycle": `${cycleDuration}s`,
                } as React.CSSProperties}
              />
            </g>
          </g>
        );
      })}
    </g>
  );
}

// ============================================================================
// DESKTOP — keep existing composition, just use thicker strokes
// ============================================================================

const RIGHT_BRANCHES: Branch[] = [
  {
    path: "M 820 440 C 900 360, 1020 330, 1140 350 C 1260 370, 1340 340, 1400 270 C 1440 220, 1460 170, 1440 120",
    pathLength: 780, startOffset: 0.1, growDuration: 4.2,
    decorations: [
      { type: "l-std", x: 900, y: 368, rotate: -20, scale: 1.05, t: 0.12 },
      { type: "l-long", x: 930, y: 352, rotate: -8, scale: 0.92, t: 0.18 },
      { type: "f-daisy", x: 970, y: 340, scale: 1.15, t: 0.22 },
      { type: "g-pink", x: 1020, y: 335, scale: 1.05, t: 0.30 },
      { type: "l-std", x: 1070, y: 342, rotate: 10, scale: 1, t: 0.37 },
      { type: "l-round", x: 1100, y: 350, rotate: 28, scale: 0.95, t: 0.41 },
      { type: "f-pink", x: 1130, y: 348, scale: 1.1, t: 0.45 },
      { type: "b-gold", x: 1180, y: 360, scale: 1.05, t: 0.52 },
      { type: "l-std", x: 1220, y: 360, rotate: 25, scale: 1.15, t: 0.58 },
      { type: "l-long", x: 1252, y: 346, rotate: -18, scale: 0.96, t: 0.63 },
      { type: "f-daisy", x: 1280, y: 340, scale: 1.05, t: 0.66 },
      { type: "g-gold", x: 1330, y: 315, scale: 1.05, t: 0.74 },
      { type: "l-round", x: 1355, y: 292, rotate: -42, scale: 0.88, t: 0.79 },
      { type: "f-purple", x: 1380, y: 275, scale: 1, t: 0.82 },
      { type: "b-cream", x: 1420, y: 220, scale: 0.95, t: 0.89 },
      { type: "l-sm", x: 1430, y: 180, rotate: -25, scale: 0.95, t: 0.92 },
      { type: "f-daisy-sm", x: 1440, y: 150, scale: 1.05, t: 0.95 },
      { type: "g-pink", x: 1430, y: 110, scale: 1, t: 1.0 },
    ],
  },
  {
    path: "M 830 445 C 870 410, 920 420, 955 455 C 985 485, 965 520, 920 510 C 888 500, 880 475, 905 460",
    pathLength: 340, startOffset: 0.5, growDuration: 2.5,
    decorations: [
      { type: "l-sm", x: 895, y: 425, rotate: -20, scale: 0.95, t: 0.2 },
      { type: "f-daisy-sm", x: 950, y: 480, scale: 1.05, t: 0.55 },
      { type: "g-pink", x: 910, y: 465, scale: 0.95, t: 0.78 },
      { type: "b-gold", x: 935, y: 505, scale: 0.9, t: 0.95 },
    ],
  },
  {
    path: "M 1140 350 C 1180 285, 1220 255, 1275 270 C 1315 282, 1325 325, 1285 340 C 1255 351, 1245 325, 1260 310",
    pathLength: 340, startOffset: 1.8, growDuration: 2.3,
    decorations: [
      { type: "l-std", x: 1200, y: 265, rotate: -35, scale: 1, t: 0.25 },
      { type: "f-coral", x: 1255, y: 270, scale: 1.05, t: 0.45 },
      { type: "g-gold", x: 1300, y: 300, scale: 1, t: 0.65 },
      { type: "l-sm", x: 1265, y: 315, rotate: 60, scale: 0.9, t: 0.82 },
      { type: "b-pink", x: 1280, y: 340, scale: 0.95, t: 0.98 },
    ],
  },
  {
    path: "M 970 340 C 950 290, 960 240, 1000 210 C 1030 190, 1060 200, 1055 230",
    pathLength: 280, startOffset: 1.1, growDuration: 2.2,
    decorations: [
      { type: "l-sm", x: 955, y: 300, rotate: -70, scale: 0.9, t: 0.2 },
      { type: "f-pink", x: 980, y: 245, scale: 0.95, t: 0.45 },
      { type: "g-cream", x: 1020, y: 205, scale: 0.9, t: 0.7 },
      { type: "b-pink", x: 1050, y: 225, scale: 0.9, t: 0.95 },
    ],
  },
  {
    path: "M 1130 348 C 1160 380, 1200 400, 1245 395",
    pathLength: 160, startOffset: 1.4, growDuration: 1.8,
    decorations: [
      { type: "l-sm", x: 1175, y: 388, rotate: 30, scale: 0.9, t: 0.3 },
      { type: "f-purple", x: 1215, y: 398, scale: 0.9, t: 0.6 },
      { type: "d-gold", x: 1245, y: 395, scale: 1.05, t: 0.95 },
    ],
  },
  {
    path: "M 1440 120 C 1480 95, 1520 105, 1520 140 C 1520 170, 1490 178, 1475 160",
    pathLength: 200, startOffset: 3.2, growDuration: 1.5,
    decorations: [
      { type: "l-sm", x: 1485, y: 100, rotate: -45, scale: 0.95, t: 0.3 },
      { type: "f-daisy-sm", x: 1515, y: 140, scale: 1, t: 0.6 },
      { type: "g-cream", x: 1488, y: 170, scale: 0.95, t: 0.95 },
    ],
  },
  {
    path: "M 1280 340 C 1310 385, 1350 420, 1400 430",
    pathLength: 170, startOffset: 1.9, growDuration: 1.8,
    decorations: [
      { type: "l-sm", x: 1320, y: 395, rotate: 30, scale: 0.85, t: 0.3 },
      { type: "b-pink", x: 1370, y: 425, scale: 0.9, t: 0.6 },
      { type: "f-daisy-sm", x: 1400, y: 430, scale: 0.9, t: 0.9 },
    ],
  },
  {
    path: "M 855 305 C 840 275, 830 250, 845 225",
    pathLength: 110, startOffset: 0.4, growDuration: 1.4,
    decorations: [
      { type: "d-gold", x: 835, y: 290, scale: 1.05, t: 0.2 },
      { type: "b-pink", x: 838, y: 265, scale: 0.95, t: 0.5 },
      { type: "f-daisy-sm", x: 845, y: 225, scale: 0.95, t: 0.95 },
    ],
  },
  {
    path: "M 1020 335 C 1060 270, 1120 240, 1180 230",
    pathLength: 200, startOffset: 1.0, growDuration: 1.8,
    decorations: [
      { type: "l-sm", x: 1065, y: 268, rotate: -40, scale: 0.9, t: 0.25 },
      { type: "f-pink", x: 1130, y: 240, scale: 0.95, t: 0.6 },
      { type: "g-pink", x: 1175, y: 232, scale: 0.9, t: 0.95 },
    ],
  },
  {
    path: "M 820 460 C 900 540, 1020 570, 1140 550 C 1260 530, 1340 560, 1400 630 C 1440 680, 1460 730, 1440 780",
    pathLength: 780, startOffset: 0.2, growDuration: 4.2,
    decorations: [
      { type: "l-std", x: 900, y: 532, rotate: 20, scale: 1.05, t: 0.12 },
      { type: "l-long", x: 930, y: 548, rotate: 12, scale: 0.92, t: 0.18 },
      { type: "f-pink", x: 970, y: 560, scale: 1.15, t: 0.22 },
      { type: "g-gold", x: 1020, y: 565, scale: 1.05, t: 0.30 },
      { type: "l-std", x: 1070, y: 558, rotate: -10, scale: 1, t: 0.37 },
      { type: "l-round", x: 1100, y: 548, rotate: -24, scale: 0.95, t: 0.41 },
      { type: "f-daisy", x: 1130, y: 552, scale: 1.1, t: 0.45 },
      { type: "b-pink", x: 1180, y: 540, scale: 1.05, t: 0.52 },
      { type: "l-std", x: 1220, y: 540, rotate: -25, scale: 1.15, t: 0.58 },
      { type: "l-long", x: 1252, y: 556, rotate: 18, scale: 0.96, t: 0.63 },
      { type: "f-coral", x: 1280, y: 560, scale: 1.05, t: 0.66 },
      { type: "g-pink", x: 1330, y: 585, scale: 1.05, t: 0.74 },
      { type: "l-round", x: 1355, y: 608, rotate: 38, scale: 0.88, t: 0.79 },
      { type: "f-blue", x: 1380, y: 625, scale: 1, t: 0.82 },
      { type: "b-cream", x: 1420, y: 680, scale: 0.95, t: 0.89 },
      { type: "l-sm", x: 1430, y: 720, rotate: 25, scale: 0.95, t: 0.92 },
      { type: "f-daisy-sm", x: 1440, y: 750, scale: 1.05, t: 0.95 },
      { type: "g-gold", x: 1430, y: 790, scale: 1, t: 1.0 },
    ],
  },
  {
    path: "M 830 455 C 870 490, 920 480, 955 445 C 985 415, 965 380, 920 390 C 888 400, 880 425, 905 440",
    pathLength: 340, startOffset: 0.6, growDuration: 2.5,
    decorations: [
      { type: "l-sm", x: 895, y: 475, rotate: 20, scale: 0.95, t: 0.2 },
      { type: "f-daisy-sm", x: 950, y: 420, scale: 1.05, t: 0.55 },
      { type: "g-gold", x: 910, y: 435, scale: 0.95, t: 0.78 },
      { type: "b-pink", x: 935, y: 395, scale: 0.9, t: 0.95 },
    ],
  },
  {
    path: "M 1140 550 C 1180 615, 1220 645, 1275 630 C 1315 618, 1325 575, 1285 560 C 1255 549, 1245 575, 1260 590",
    pathLength: 340, startOffset: 1.9, growDuration: 2.3,
    decorations: [
      { type: "l-std", x: 1200, y: 635, rotate: 35, scale: 1, t: 0.25 },
      { type: "f-pink", x: 1255, y: 630, scale: 1.05, t: 0.45 },
      { type: "g-pink", x: 1300, y: 600, scale: 1, t: 0.65 },
      { type: "l-sm", x: 1265, y: 585, rotate: -60, scale: 0.9, t: 0.82 },
      { type: "b-gold", x: 1280, y: 560, scale: 0.95, t: 0.98 },
    ],
  },
  {
    path: "M 970 560 C 950 610, 960 660, 1000 690 C 1030 710, 1060 700, 1055 670",
    pathLength: 280, startOffset: 1.1, growDuration: 2.2,
    decorations: [
      { type: "l-sm", x: 955, y: 600, rotate: 70, scale: 0.9, t: 0.2 },
      { type: "f-coral", x: 980, y: 655, scale: 0.95, t: 0.45 },
      { type: "g-cream", x: 1020, y: 695, scale: 0.9, t: 0.7 },
      { type: "b-pink", x: 1050, y: 675, scale: 0.9, t: 0.95 },
    ],
  },
  {
    path: "M 1130 552 C 1160 520, 1200 500, 1245 505",
    pathLength: 160, startOffset: 1.3, growDuration: 1.8,
    decorations: [
      { type: "l-sm", x: 1175, y: 512, rotate: -30, scale: 0.9, t: 0.3 },
      { type: "f-purple", x: 1215, y: 502, scale: 0.9, t: 0.6 },
      { type: "d-gold", x: 1245, y: 505, scale: 1.05, t: 0.95 },
    ],
  },
  {
    path: "M 1440 780 C 1480 805, 1520 795, 1520 760 C 1520 730, 1490 722, 1475 740",
    pathLength: 200, startOffset: 3.3, growDuration: 1.5,
    decorations: [
      { type: "l-sm", x: 1485, y: 800, rotate: 45, scale: 0.95, t: 0.3 },
      { type: "f-daisy-sm", x: 1515, y: 760, scale: 1, t: 0.6 },
      { type: "g-cream", x: 1488, y: 730, scale: 0.95, t: 0.95 },
    ],
  },
  {
    path: "M 1280 560 C 1310 515, 1350 480, 1400 470",
    pathLength: 170, startOffset: 1.8, growDuration: 1.8,
    decorations: [
      { type: "l-sm", x: 1320, y: 505, rotate: -30, scale: 0.85, t: 0.3 },
      { type: "b-pink", x: 1370, y: 475, scale: 0.9, t: 0.6 },
      { type: "f-daisy-sm", x: 1400, y: 470, scale: 0.9, t: 0.9 },
    ],
  },
  {
    path: "M 855 595 C 840 625, 830 650, 845 675",
    pathLength: 110, startOffset: 0.5, growDuration: 1.4,
    decorations: [
      { type: "d-pink", x: 835, y: 610, scale: 1.05, t: 0.2 },
      { type: "b-gold", x: 838, y: 635, scale: 0.95, t: 0.5 },
      { type: "f-daisy-sm", x: 845, y: 675, scale: 0.95, t: 0.95 },
    ],
  },
  {
    path: "M 1020 565 C 1060 630, 1120 660, 1180 670",
    pathLength: 200, startOffset: 1.2, growDuration: 1.8,
    decorations: [
      { type: "l-sm", x: 1065, y: 632, rotate: 40, scale: 0.9, t: 0.25 },
      { type: "f-coral", x: 1130, y: 660, scale: 0.95, t: 0.6 },
      { type: "g-gold", x: 1175, y: 668, scale: 0.9, t: 0.95 },
    ],
  },
  {
    path: "M 820 450 C 920 445, 1040 455, 1160 450 C 1280 445, 1380 450, 1460 440",
    pathLength: 650, startOffset: 0.0, growDuration: 3.5,
    decorations: [
      { type: "l-sm", x: 900, y: 448, rotate: 90, scale: 0.9, t: 0.13 },
      { type: "d-pink", x: 960, y: 452, scale: 1.05, t: 0.22 },
      { type: "g-pink", x: 1020, y: 449, scale: 0.95, t: 0.31 },
      { type: "l-sm", x: 1080, y: 451, rotate: -90, scale: 0.9, t: 0.4 },
      { type: "b-gold", x: 1140, y: 450, scale: 0.95, t: 0.5 },
      { type: "d-gold", x: 1200, y: 448, scale: 1.05, t: 0.6 },
      { type: "g-cream", x: 1260, y: 447, scale: 0.95, t: 0.7 },
      { type: "l-sm", x: 1320, y: 447, rotate: 90, scale: 0.9, t: 0.8 },
      { type: "d-pink", x: 1400, y: 443, scale: 1.05, t: 0.95 },
    ],
  },
  {
    path: "M 820 448 C 900 420, 980 425, 1060 415 C 1140 405, 1220 415, 1300 405",
    pathLength: 500, startOffset: 0.3, growDuration: 3.0,
    decorations: [
      { type: "d-gold", x: 880, y: 428, scale: 1.05, t: 0.2 },
      { type: "l-sm", x: 950, y: 422, rotate: -60, scale: 0.85, t: 0.35 },
      { type: "g-pink", x: 1020, y: 418, scale: 0.9, t: 0.5 },
      { type: "b-cream", x: 1100, y: 410, scale: 0.9, t: 0.65 },
      { type: "l-sm", x: 1180, y: 411, rotate: -70, scale: 0.85, t: 0.8 },
      { type: "d-pink", x: 1260, y: 408, scale: 1.05, t: 0.95 },
    ],
  },
  {
    path: "M 820 452 C 900 480, 980 475, 1060 485 C 1140 495, 1220 485, 1300 495",
    pathLength: 500, startOffset: 0.35, growDuration: 3.0,
    decorations: [
      { type: "d-pink", x: 880, y: 472, scale: 1.05, t: 0.2 },
      { type: "l-sm", x: 950, y: 478, rotate: 60, scale: 0.85, t: 0.35 },
      { type: "g-gold", x: 1020, y: 482, scale: 0.9, t: 0.5 },
      { type: "b-pink", x: 1100, y: 490, scale: 0.9, t: 0.65 },
      { type: "l-sm", x: 1180, y: 489, rotate: 70, scale: 0.85, t: 0.8 },
      { type: "d-gold", x: 1260, y: 492, scale: 1.05, t: 0.95 },
    ],
  },
  {
    path: "M 820 445 C 820 420, 825 400, 835 385",
    pathLength: 80, startOffset: 0.2, growDuration: 1,
    decorations: [
      { type: "b-pink", x: 822, y: 420, scale: 0.9, t: 0.4 },
      { type: "d-gold", x: 830, y: 395, scale: 1.05, t: 0.85 },
    ],
  },
  {
    path: "M 820 460 C 820 485, 825 505, 835 520",
    pathLength: 80, startOffset: 0.3, growDuration: 1,
    decorations: [
      { type: "b-cream", x: 822, y: 485, scale: 0.9, t: 0.4 },
      { type: "d-pink", x: 830, y: 510, scale: 1.05, t: 0.85 },
    ],
  },
  {
    path: "M 1275 270 C 1310 200, 1360 170, 1400 180",
    pathLength: 200, startOffset: 2.6, growDuration: 1.5,
    decorations: [
      { type: "l-sm", x: 1315, y: 200, rotate: -50, scale: 0.9, t: 0.3 },
      { type: "f-purple", x: 1365, y: 178, scale: 0.95, t: 0.65 },
      { type: "g-pink", x: 1400, y: 180, scale: 0.9, t: 0.95 },
    ],
  },
  {
    path: "M 1275 630 C 1310 700, 1360 730, 1400 720",
    pathLength: 200, startOffset: 2.7, growDuration: 1.5,
    decorations: [
      { type: "l-sm", x: 1315, y: 700, rotate: 50, scale: 0.9, t: 0.3 },
      { type: "f-blue", x: 1365, y: 722, scale: 0.95, t: 0.65 },
      { type: "g-pink", x: 1400, y: 720, scale: 0.9, t: 0.95 },
    ],
  },
];

// ============================================================================
// MOBILE COMPOSITION — designed for portrait viewBox 900×1000
// Center at x=450. Branches arc through the full vertical space, with
// larger flowers and fewer (but bolder) branches for readability on small screens.
// ============================================================================

const MOBILE_BRANCHES: Branch[] = [
  // ========== TOP COMPOSITION ==========

  // Top-center main arch sweeping to upper-right
  {
    path: "M 450 180 C 540 120, 640 100, 740 140 C 820 170, 860 220, 850 290",
    pathLength: 430, startOffset: 0.1, growDuration: 3.2,
    decorations: [
      { type: "l-long", x: 510, y: 140, rotate: -18, scale: 1.25, t: 0.15 },
      { type: "f-daisy", x: 570, y: 118, scale: 1.35, t: 0.28 },
      { type: "l-std", x: 635, y: 105, rotate: 5, scale: 1.2, t: 0.38 },
      { type: "g-pink", x: 695, y: 120, scale: 1.25, t: 0.48 },
      { type: "f-pink", x: 750, y: 145, scale: 1.3, t: 0.6 },
      { type: "l-round", x: 810, y: 180, rotate: 55, scale: 1.1, t: 0.74 },
      { type: "b-gold", x: 848, y: 240, scale: 1.15, t: 0.88 },
      { type: "f-daisy-sm", x: 852, y: 290, scale: 1.2, t: 1.0 },
    ],
  },

  // Top-center secondary upper curl
  {
    path: "M 450 190 C 420 130, 470 80, 540 75 C 590 72, 620 105, 600 140",
    pathLength: 260, startOffset: 0.8, growDuration: 2.4,
    decorations: [
      { type: "l-sm", x: 432, y: 150, rotate: -90, scale: 1.1, t: 0.2 },
      { type: "f-coral", x: 475, y: 90, scale: 1.2, t: 0.45 },
      { type: "g-gold", x: 550, y: 78, scale: 1.15, t: 0.7 },
      { type: "b-pink", x: 605, y: 130, scale: 1.1, t: 0.95 },
    ],
  },

  // Top-center accent vertical
  {
    path: "M 480 175 C 500 140, 520 110, 545 95",
    pathLength: 140, startOffset: 0.5, growDuration: 1.6,
    decorations: [
      { type: "d-gold", x: 490, y: 155, scale: 1.2, t: 0.3 },
      { type: "b-cream", x: 515, y: 120, scale: 1.05, t: 0.65 },
      { type: "f-purple", x: 545, y: 95, scale: 1.1, t: 0.95 },
    ],
  },

  // ========== MIDDLE COMPOSITION ==========

  // Middle-left outward sweep
  {
    path: "M 450 500 C 360 480, 270 490, 180 520 C 110 545, 70 585, 60 640",
    pathLength: 440, startOffset: 0.2, growDuration: 3.3,
    decorations: [
      { type: "l-std", x: 400, y: 485, rotate: 195, scale: 1.2, t: 0.15 },
      { type: "l-long", x: 340, y: 482, rotate: 185, scale: 1.15, t: 0.26 },
      { type: "f-pink", x: 270, y: 490, scale: 1.3, t: 0.38 },
      { type: "g-pink", x: 210, y: 508, scale: 1.2, t: 0.5 },
      { type: "l-round", x: 155, y: 525, rotate: 200, scale: 1.1, t: 0.62 },
      { type: "f-daisy", x: 110, y: 548, scale: 1.3, t: 0.76 },
      { type: "b-gold", x: 78, y: 600, scale: 1.15, t: 0.9 },
      { type: "f-daisy-sm", x: 62, y: 640, scale: 1.2, t: 1.0 },
    ],
  },

  // Middle-right outward sweep (mirror of above will render via scale)
  {
    path: "M 450 500 C 540 480, 630 490, 720 520 C 790 545, 830 585, 840 640",
    pathLength: 440, startOffset: 0.25, growDuration: 3.3,
    decorations: [
      { type: "l-std", x: 500, y: 485, rotate: -15, scale: 1.2, t: 0.15 },
      { type: "l-long", x: 560, y: 482, rotate: -5, scale: 1.15, t: 0.26 },
      { type: "f-coral", x: 630, y: 490, scale: 1.3, t: 0.38 },
      { type: "g-gold", x: 690, y: 508, scale: 1.2, t: 0.5 },
      { type: "l-round", x: 745, y: 525, rotate: -20, scale: 1.1, t: 0.62 },
      { type: "f-daisy", x: 790, y: 548, scale: 1.3, t: 0.76 },
      { type: "b-cream", x: 822, y: 600, scale: 1.15, t: 0.9 },
      { type: "f-blue", x: 838, y: 640, scale: 1.2, t: 1.0 },
    ],
  },

  // Middle central inner curl
  {
    path: "M 450 490 C 420 455, 380 465, 370 500 C 362 530, 395 545, 420 525",
    pathLength: 220, startOffset: 0.9, growDuration: 2.2,
    decorations: [
      { type: "l-sm", x: 395, y: 462, rotate: -45, scale: 1.05, t: 0.25 },
      { type: "f-daisy-sm", x: 365, y: 500, scale: 1.15, t: 0.55 },
      { type: "g-pink", x: 400, y: 540, scale: 1.1, t: 0.85 },
    ],
  },

  // Middle central inner curl right mirror
  {
    path: "M 450 510 C 480 545, 520 535, 530 500 C 538 470, 505 455, 480 475",
    pathLength: 220, startOffset: 1.0, growDuration: 2.2,
    decorations: [
      { type: "l-sm", x: 505, y: 538, rotate: 45, scale: 1.05, t: 0.25 },
      { type: "f-daisy-sm", x: 535, y: 500, scale: 1.15, t: 0.55 },
      { type: "g-gold", x: 500, y: 460, scale: 1.1, t: 0.85 },
    ],
  },

  // ========== BOTTOM COMPOSITION ==========

  // Bottom-center main arch sweeping to lower-right
  {
    path: "M 450 820 C 540 880, 640 900, 740 860 C 820 830, 860 780, 850 710",
    pathLength: 430, startOffset: 0.15, growDuration: 3.2,
    decorations: [
      { type: "l-long", x: 510, y: 860, rotate: 18, scale: 1.25, t: 0.15 },
      { type: "f-pink", x: 570, y: 882, scale: 1.35, t: 0.28 },
      { type: "l-std", x: 635, y: 895, rotate: -5, scale: 1.2, t: 0.38 },
      { type: "g-gold", x: 695, y: 880, scale: 1.25, t: 0.48 },
      { type: "f-daisy", x: 750, y: 855, scale: 1.3, t: 0.6 },
      { type: "l-round", x: 810, y: 820, rotate: -55, scale: 1.1, t: 0.74 },
      { type: "b-pink", x: 848, y: 760, scale: 1.15, t: 0.88 },
      { type: "f-daisy-sm", x: 852, y: 710, scale: 1.2, t: 1.0 },
    ],
  },

  // Bottom-center secondary lower curl
  {
    path: "M 450 810 C 420 870, 470 920, 540 925 C 590 928, 620 895, 600 860",
    pathLength: 260, startOffset: 0.85, growDuration: 2.4,
    decorations: [
      { type: "l-sm", x: 432, y: 850, rotate: 90, scale: 1.1, t: 0.2 },
      { type: "f-coral", x: 475, y: 910, scale: 1.2, t: 0.45 },
      { type: "g-cream", x: 550, y: 922, scale: 1.15, t: 0.7 },
      { type: "b-gold", x: 605, y: 870, scale: 1.1, t: 0.95 },
    ],
  },

  // Bottom-center accent vertical
  {
    path: "M 480 825 C 500 860, 520 890, 545 905",
    pathLength: 140, startOffset: 0.55, growDuration: 1.6,
    decorations: [
      { type: "d-pink", x: 490, y: 845, scale: 1.2, t: 0.3 },
      { type: "b-cream", x: 515, y: 880, scale: 1.05, t: 0.65 },
      { type: "f-blue", x: 545, y: 905, scale: 1.1, t: 0.95 },
    ],
  },

  // ========== CONNECTING VERTICAL SPINE ==========

  // Center spine from top arch to middle
  {
    path: "M 450 200 C 440 280, 445 360, 450 480",
    pathLength: 300, startOffset: 0.3, growDuration: 2.5,
    decorations: [
      { type: "l-sm", x: 438, y: 260, rotate: -80, scale: 1, t: 0.2 },
      { type: "d-gold", x: 442, y: 310, scale: 1.1, t: 0.35 },
      { type: "l-sm", x: 450, y: 360, rotate: 80, scale: 1, t: 0.5 },
      { type: "b-pink", x: 445, y: 410, scale: 1.05, t: 0.7 },
      { type: "d-pink", x: 448, y: 460, scale: 1.15, t: 0.9 },
    ],
  },

  // Center spine from middle to bottom
  {
    path: "M 450 520 C 440 600, 445 680, 450 800",
    pathLength: 300, startOffset: 0.35, growDuration: 2.5,
    decorations: [
      { type: "l-sm", x: 438, y: 580, rotate: 80, scale: 1, t: 0.2 },
      { type: "d-pink", x: 442, y: 630, scale: 1.1, t: 0.35 },
      { type: "l-sm", x: 450, y: 680, rotate: -80, scale: 1, t: 0.5 },
      { type: "b-gold", x: 445, y: 730, scale: 1.05, t: 0.7 },
      { type: "d-gold", x: 448, y: 780, scale: 1.15, t: 0.9 },
    ],
  },

  // ========== CORNER ACCENTS ==========

  // Top-right flourish
  {
    path: "M 740 140 C 800 95, 860 85, 880 130",
    pathLength: 180, startOffset: 1.6, growDuration: 1.6,
    decorations: [
      { type: "l-sm", x: 790, y: 100, rotate: -30, scale: 1.05, t: 0.3 },
      { type: "f-purple", x: 855, y: 92, scale: 1.1, t: 0.65 },
      { type: "g-pink", x: 880, y: 130, scale: 1.05, t: 0.95 },
    ],
  },

  // Bottom-right flourish
  {
    path: "M 740 860 C 800 905, 860 915, 880 870",
    pathLength: 180, startOffset: 1.7, growDuration: 1.6,
    decorations: [
      { type: "l-sm", x: 790, y: 900, rotate: 30, scale: 1.05, t: 0.3 },
      { type: "f-purple", x: 855, y: 908, scale: 1.1, t: 0.65 },
      { type: "g-cream", x: 880, y: 870, scale: 1.05, t: 0.95 },
    ],
  },
];
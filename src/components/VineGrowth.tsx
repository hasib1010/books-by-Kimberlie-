// src/app/components/VineGrowth.tsx
"use client";

import { useEffect, useRef } from "react";

interface VineGrowthProps {
  maxVines?: number;
  maxAge?: number;
  opacity?: number;
}

export default function VineGrowth({
  maxVines = 28,
  maxAge = 16000,
  opacity = 0.65,
}: VineGrowthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- tunables ----
    const bloomTime = 2200;
    const leafGrowTime = 1500;
    const growthRate = 0.1;
    const maxSeconds = 120;
    const twistFactor = 5;
    const branchFactor = 2.5;
    const pFlower = 0.35;
    const pLeaf = 0.55;

    // Logo palette (from your image - sage green, warm earthy tones)
    const LOGO_SAGE = { h: 130, s: 38, l: 48 };      // richer sage for main vines
    const LOGO_SAGE_LIGHT = { h: 125, s: 35, l: 58 }; // lighter sage for tendrils
    const LOGO_DARK = { h: 135, s: 30, l: 38 };       // deeper shadow green
    const LEAF_GREEN = { h: 118, s: 42, l: 48 };      // natural leaf green
    const LEAF_GREEN_LIGHT = { h: 115, s: 38, l: 58 }; // highlight leaf

    // Flower palette - softer, more natural garden colors
    const FLOWER_PALETTE = [
      { h: 42, s: 68, l: 62, kind: "daisy" as const },   // warm butter yellow
      { h: 38, s: 65, l: 58, kind: "daisy" as const },   // deeper golden
      { h: 355, s: 48, l: 68, kind: "pink" as const },   // soft blush
      { h: 348, s: 52, l: 62, kind: "pink" as const },   // muted rose
      { h: 275, s: 32, l: 68, kind: "purple" as const }, // lavender
      { h: 200, s: 42, l: 68, kind: "blue" as const },   // soft periwinkle
      { h: 22, s: 58, l: 64, kind: "coral" as const },   // pale apricot
    ];

    let running = true;
    let oldt: number | undefined;
    let ellapsed = 30;
    let startTime: number | undefined;
    let dpr = 1;

    function setSize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
    }
    setSize();

    interface Point { x: number; y: number; }
    interface Color { h: number; s: number; l: number; }
    interface Flower {
      point: Point;
      angle: number;
      size: number;
      color: Color;
      kind: "daisy" | "pink" | "purple" | "blue" | "coral";
      age: number;
    }
    interface Leaf {
      point: Point;
      angle: number;
      size: number;
      side: 1 | -1;
      color: Color;
      age: number;
    }
    interface Vine {
      color: Color;
      root: Point;
      stem: Point[];
      flowers: Flower[];
      leaves: Leaf[];
      age: number;
      heading: number;
      curlRate: number;
      thickness: number;
    }

    const W = () => canvas!.width / dpr;
    const H = () => canvas!.height / dpr;

    function jitter(c: Color, jh = 5, js = 6, jl = 6): Color {
      return {
        h: c.h + (Math.random() - 0.5) * jh,
        s: Math.max(20, Math.min(75, c.s + (Math.random() - 0.5) * js)),
        l: Math.max(30, Math.min(80, c.l + (Math.random() - 0.5) * jl)),
      };
    }

    function pickVineColor(): Color {
      // 70% main sage, 20% lighter, 10% darker for depth
      const r = Math.random();
      if (r < 0.7) return jitter(LOGO_SAGE);
      if (r < 0.9) return jitter(LOGO_SAGE_LIGHT);
      return jitter(LOGO_DARK);
    }

    function pickLeafColor(): Color {
      return jitter(Math.random() < 0.65 ? LEAF_GREEN : LEAF_GREEN_LIGHT, 7, 10, 9);
    }

    function pickFlower() {
      const base = FLOWER_PALETTE[Math.floor(Math.random() * FLOWER_PALETTE.length)];
      return {
        color: jitter({ h: base.h, s: base.s, l: base.l }, 6, 8, 7),
        kind: base.kind,
      };
    }

    function newVine(fromPoint?: Point, forcedDir?: number, parentCurl?: number): Vine {
      const cx = W() / 2;
      const cy = H() / 2;
      // Root vines originate from bottom-center for a grounded look, like your logo
      const rootX = fromPoint ? fromPoint.x : cx + (Math.random() - 0.5) * 80;
      const rootY = fromPoint ? fromPoint.y : H() - 20 + Math.random() * 30;

      let heading: number;
      if (forcedDir !== undefined) heading = forcedDir;
      else if (fromPoint) heading = Math.atan2(cy - rootY, cx - rootX) + (Math.random() - 0.5) * 1.2;
      else heading = -Math.PI / 2 + (Math.random() - 0.5) * 1.5; // upward growth

      const baseCurl = 0.015 + Math.random() * 0.025;
      const curlRate = parentCurl !== undefined
        ? -parentCurl * (0.65 + Math.random() * 0.55)
        : baseCurl * (Math.random() < 0.6 ? 1 : -1);

      return {
        color: pickVineColor(),
        root: { x: rootX, y: rootY },
        stem: [{
          x: rootX + Math.cos(heading) * 1.2,
          y: rootY + Math.sin(heading) * 1.2,
        }],
        flowers: [],
        leaves: [],
        age: 0,
        heading,
        curlRate,
        thickness: 0.8 + Math.random() * 1.2,
      };
    }

    // Seed vines emerging from bottom area
    const seedCount = 10;
    const vines: Vine[] = [];
    for (let i = 0; i < seedCount; i++) {
      vines.push(newVine());
    }

    function growVine(v: Vine) {
      if (v.age > maxAge) return;
      v.age += ellapsed;

      const n = v.stem.length;
      const tip = v.stem[n - 1];
      const prev = v.stem[n - 2] || v.root;
      const dx = tip.x - prev.x;
      const dy = tip.y - prev.y;

      v.heading += v.curlRate * (ellapsed / 16);
      if (Math.random() < 0.006) v.curlRate *= -1;

      if (Math.random() < 1 / twistFactor) {
        const stepLen = 1.3 + Math.random() * 1.2;
        const wobble = (Math.random() - 0.5) * 0.25;
        v.stem.push({
          x: tip.x + Math.cos(v.heading + wobble) * stepLen,
          y: tip.y + Math.sin(v.heading + wobble) * stepLen,
        });

        const r = Math.random();
        if (!(n % 3)) {
          // Branching - more organic
          if (r < 1 / (vines.length / 2.5 + branchFactor) && vines.length < maxVines) {
            vines.push(newVine(tip, undefined, v.curlRate));
            if (Math.random() < 0.3 && vines.length < maxVines) {
              vines.push(newVine(tip, undefined, -v.curlRate));
            }
          }
          // Leaves - placed perpendicular to stem direction
          if (Math.random() < pLeaf) {
            const stemAngle = Math.atan2(dy, dx);
            v.leaves.push({
              point: { x: tip.x, y: tip.y },
              angle: stemAngle,
              size: 3.5 + Math.random() * 3,
              side: Math.random() < 0.5 ? 1 : -1,
              color: pickLeafColor(),
              age: 0,
            });
          }
          // Flowers
          if (r < pFlower) {
            const picked = pickFlower();
            v.flowers.push({
              point: { x: tip.x, y: tip.y },
              angle: Math.random() * Math.PI * 2,
              size: 0.8 + Math.random() * 0.6,
              color: picked.color,
              kind: picked.kind,
              age: 0,
            });
          }
        }
      } else {
        const d = growthRate * ellapsed * (0.6 + Math.random() * 0.6);
        tip.x += Math.cos(v.heading) * d;
        tip.y += Math.sin(v.heading) * d;
      }

      if (tip.x < -60 || tip.x > W() + 60 || tip.y < -60 || tip.y > H() + 60) {
        v.age = maxAge;
      }
    }

    function hsl(c: Color, a = 1) {
      return a < 1
        ? `hsla(${c.h}, ${c.s}%, ${c.l}%, ${a})`
        : `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
    }

    // Realistic leaf with veins and slight asymmetry
    function paintLeaf(leaf: Leaf) {
      const c = ctx!;
      const maturity = Math.min(1, leaf.age / leafGrowTime);
      if (maturity <= 0) return;

      const size = leaf.size * maturity * (0.8 + Math.sin(leaf.age * 0.02) * 0.1);

      c.save();
      c.translate(leaf.point.x, leaf.point.y);
      c.rotate(leaf.angle + leaf.side * Math.PI * 0.4);
      
      // Slight random offset for organic feel
      c.translate((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5);

      // Leaf body with realistic shape (tapered)
      c.fillStyle = hsl(leaf.color);
      c.strokeStyle = hsl({ ...leaf.color, l: leaf.color.l - 15 }, 0.6);
      c.lineWidth = 0.5;

      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(size * 0.8, -size * 0.5, size * 1.8, -size * 0.15);
      c.quadraticCurveTo(size * 1.2, size * 0.3, size * 1.6, size * 0.5);
      c.quadraticCurveTo(size * 0.8, size * 0.4, 0, 0);
      c.closePath();
      c.fill();
      c.stroke();

      // Main vein
      c.strokeStyle = hsl({ ...leaf.color, l: leaf.color.l - 18 }, 0.55);
      c.lineWidth = 0.4;
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(size * 1, -size * 0.05, size * 1.7, -size * 0.1);
      c.stroke();

      // Secondary veins
      for (let v = 0; v < 3; v++) {
        c.beginPath();
        c.moveTo(size * 0.4 + v * 0.4, -size * 0.1);
        c.lineTo(size * 0.8 + v * 0.3, -size * 0.35 - v * 0.05);
        c.stroke();
        c.beginPath();
        c.moveTo(size * 0.5 + v * 0.3, size * 0.05);
        c.lineTo(size * 0.9 + v * 0.25, size * 0.3 + v * 0.05);
        c.stroke();
      }

      c.restore();

      if (running && leaf.age < leafGrowTime) leaf.age += ellapsed;
    }

    // Realistic flowers with more detail
    function paintFlower(f: Flower) {
      const c = ctx!;
      const maturity = Math.min(1, f.age / bloomTime);
      if (maturity <= 0) return;

      c.save();
      c.translate(f.point.x, f.point.y);
      c.rotate(f.angle);
      c.scale(f.size * maturity, f.size * maturity);
      
      // Add slight random rotation for natural look
      c.rotate((Math.sin(f.age * 0.02) * 0.1));

      if (f.kind === "daisy") {
        // 12-petal daisy for fuller look
        const dark = { ...f.color, l: f.color.l - 12 };
        const light = { ...f.color, l: Math.min(85, f.color.l + 10) };

        c.fillStyle = hsl(f.color);
        c.strokeStyle = hsl(dark, 0.6);
        c.lineWidth = 0.3;
        for (let j = 0; j < 12; j++) {
          c.save();
          c.rotate((j * Math.PI * 2) / 12);
          c.beginPath();
          c.ellipse(0, -5.5, 1.8, 5, 0, 0, Math.PI * 2);
          c.fill();
          c.stroke();
          c.restore();
        }
        // Petal highlights
        c.fillStyle = hsl(light, 0.5);
        for (let j = 0; j < 12; j++) {
          c.save();
          c.rotate((j * Math.PI * 2) / 12);
          c.beginPath();
          c.ellipse(0, -6, 0.6, 2.5, 0, 0, Math.PI * 2);
          c.fill();
          c.restore();
        }
        // Warm brown/gold center
        c.fillStyle = "#b87c3a";
        c.beginPath();
        c.arc(0, 0, 2.2, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = "#d9a15c";
        c.beginPath();
        c.arc(-0.4, -0.4, 1.2, 0, Math.PI * 2);
        c.fill();
        // Tiny dots for texture
        c.fillStyle = "#8b5e2c";
        for (let d = 0; d < 6; d++) {
          c.beginPath();
          c.arc(Math.sin(d) * 1, Math.cos(d) * 1, 0.2, 0, Math.PI * 2);
          c.fill();
        }
      } else if (f.kind === "pink" || f.kind === "coral") {
        // 5-petal rounded blossom with more depth
        const dark = { ...f.color, l: f.color.l - 15 };
        const light = { ...f.color, l: Math.min(90, f.color.l + 8) };

        c.fillStyle = hsl(f.color);
        c.strokeStyle = hsl(dark, 0.5);
        c.lineWidth = 0.3;
        for (let j = 0; j < 5; j++) {
          c.save();
          c.rotate((j * Math.PI * 2) / 5);
          c.beginPath();
          c.ellipse(0, -4.2, 2.5, 4.5, 0, 0, Math.PI * 2);
          c.fill();
          c.stroke();
          c.restore();
        }
        // Highlight
        c.fillStyle = hsl(light, 0.5);
        for (let j = 0; j < 5; j++) {
          c.save();
          c.rotate((j * Math.PI * 2) / 5);
          c.beginPath();
          c.ellipse(0, -4.8, 0.8, 2, 0, 0, Math.PI * 2);
          c.fill();
          c.restore();
        }
        // Golden center
        c.fillStyle = "#e8bc6e";
        c.beginPath();
        c.arc(0, 0, 1.6, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = "#c9983a";
        c.beginPath();
        c.arc(0.2, 0.2, 0.8, 0, Math.PI * 2);
        c.fill();
      } else if (f.kind === "purple" || f.kind === "blue") {
        // 6-petal star-like flower with delicate look
        const dark = { ...f.color, l: f.color.l - 14 };

        c.fillStyle = hsl(f.color);
        c.strokeStyle = hsl(dark, 0.5);
        c.lineWidth = 0.3;
        for (let j = 0; j < 6; j++) {
          c.save();
          c.rotate((j * Math.PI * 2) / 6);
          c.beginPath();
          c.ellipse(0, -5.2, 1.6, 4.8, 0, 0, Math.PI * 2);
          c.fill();
          c.stroke();
          c.restore();
        }
        // White inner glow
        c.fillStyle = "rgba(255,255,255,0.6)";
        c.beginPath();
        c.arc(0, 0, 2.2, 0, Math.PI * 2);
        c.fill();
        // Yellow center
        c.fillStyle = "#e8c95a";
        c.beginPath();
        c.arc(0, 0, 1.2, 0, Math.PI * 2);
        c.fill();
      }

      c.restore();

      if (running && f.age < bloomTime) f.age += ellapsed;
    }

    function paintVine(v: Vine) {
      const c = ctx!;
      const ageRatio = Math.min(1, v.age / maxAge);
      
      // Thicker vines at base, thinner at tips
      const currentThickness = v.thickness * (1 - ageRatio * 0.5);

      // Draw leaves first
      v.leaves.forEach(paintLeaf);

      // Stem with gradient-like effect using varying opacity
      c.strokeStyle = hsl({
        h: v.color.h,
        s: v.color.s,
        l: v.color.l - ageRatio * 5,
      });
      c.lineWidth = currentThickness;
      c.lineCap = "round";
      c.lineJoin = "round";

      c.beginPath();
      c.moveTo(v.root.x, v.root.y);
      let i: number;
      const n = v.stem.length - 1;
      for (i = 0; i < n; i += 2) {
        c.quadraticCurveTo(
          v.stem[i].x, v.stem[i].y,
          v.stem[i + 1].x, v.stem[i + 1].y
        );
      }
      if (i === n) c.lineTo(v.stem[i].x, v.stem[i].y);
      c.stroke();

      // Flowers on top
      v.flowers.forEach(paintFlower);
    }

    function paint(t: number) {
      if (startTime === undefined) startTime = t;
      const totalElapsed = t - startTime;

      ctx!.clearRect(0, 0, W(), H());
      ellapsed = oldt ? Math.min(50, t - oldt) : 30;

      if (running) vines.forEach(growVine);
      vines.forEach(paintVine);

      running = running && totalElapsed < maxSeconds * 1000;
      oldt = t;

      if (running) {
        rafRef.current = requestAnimationFrame(paint);
      }
    }

    rafRef.current = requestAnimationFrame(paint);

    const handleResize = () => setSize();
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [maxVines, maxAge]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
        opacity,
        zIndex: 1,
      }}
    />
  );
}
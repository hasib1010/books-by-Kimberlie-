// src/app/components/Process.tsx
"use client";

import { STEPS } from "@/app/data"; 
import FloralBloom from "./FloralBloom";

export default function Process() {
  return (
    <section
      id="process"
      className="section-pad relative overflow-hidden"
      style={{
        background: "linear-gradient(140deg, #FBF7F0 0%, #F7F0F3 100%)",
        zIndex: 5,
        minHeight: 600,
      }}
    >
       <FloralBloom opacity={1.6} />


      <div className="max-w-[1160px] mx-auto relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div data-aos="fade-up" className="process-header-panel text-center mb-16">
          <div className="eyebrow text-center"  >
            The Process.
          </div>
          <h2 className="display-title text-center" style={{ marginBottom: 14 }}>
            Simple from <em className="italic text-[var(--rose)]">start to finish</em>
          </h2>
          <p className="body-text text-center max-w-[520px] mx-auto">
            Straightforward support tailored to your business. No confusion—just clear guidance and dependable results.
          </p>
        </div>

        {/* Step cards */}
        <div className="col-2-sm grid grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              <StepCard step={step} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: typeof STEPS[number];
  index: number;
}) {
  const isLast = index === STEPS.length - 1;
  const nextColor = !isLast ? STEPS[index + 1].c : step.c;

  return (
    <div
      className="rounded-[24px] text-center relative h-full"
      style={{
      
        backdropFilter: "blur(3px)",
        border: `1px solid ${step.c}22`,
        padding: "32px 24px",
      }}
    >
      <div
        className="rounded-full text-white flex items-center justify-center font-display font-semibold mx-auto mb-5"
        style={{
          width: 52,
          height: 52,
          background: `linear-gradient(135deg, ${step.c}, ${step.c}BB)`,
          fontSize: 20,
          boxShadow: `0 8px 24px ${step.c}35`,
        }}
      >
        {step.n}
      </div>

      {!isLast && (
        <div
          className="hide-sm absolute pointer-events-none"
          style={{
            top: "calc(32px + 26px)",
            left: "calc(50% + 26px + 10px)",
            width: "calc(100% - 52px - 20px)",
            height: 1,
            background: `linear-gradient(90deg, ${step.c}60, ${nextColor}60)`,
          }}
        />
      )}

      <h4 className="text-[15px] font-semibold text-[var(--ink)] mb-2.5 tracking-[.01em]">
        {step.title}
      </h4>
      <p className="text-[13px] text-black leading-[1.78]">{step.desc}</p>
    </div>
  );
}

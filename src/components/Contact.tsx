// src/app/components/Contact.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  Shield,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        background: "linear-gradient(140deg, #FDF6F8 0%, #FFFCF7 50%, #F4F9F7 100%)",
        zIndex: 8,
      }}
    >
      <div className="max-w-[1160px] mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-[72px]">
          <div className="eyebrow text-center">Get In Touch</div>
          <h2 className="display-title text-center" style={{ marginBottom: 14 }}>
            Ready to Make Sense of{" "}
            <em className="italic text-[var(--rose)]">YOUR Cents</em>?
          </h2>
          <p className="body-text text-center max-w-[460px] mx-auto">
            Let me help you grow that money tree.
          </p>
        </div>

        {/* Two-column layout: info + form */}
        <div
          className="col-1-sm grid items-stretch"
          style={{ gridTemplateColumns: "1fr 1px 1.1fr", gap: 0 }}
        >
          <div
            data-aos="fade-right"
            className="pr-14 flex flex-col gap-5"
          >
            <ContactPhoto />
            <ContactDetails />
          </div>

          {/* Vertical divider */}
          <div
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(192,85,106,.18), transparent)",
            }}
          />

          <div
            data-aos="fade-left"
            data-aos-delay="120"
            className="pl-14"
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────
   Photo + availability badge
───────────────────────────────────── */
function ContactPhoto() {
  return (
    <div
      className="relative rounded-[28px] overflow-hidden"
      style={{
        aspectRatio: "4/5",
        boxShadow: "0 32px 80px rgba(30,26,24,.12), 0 0 0 1px rgba(192,85,106,.12)",
      }}
    >
      <Image
        src="/contact-photo.png"
        alt="Books by Kimberlie workspace"
        fill
        style={{ objectFit: "cover", objectPosition: "center top" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(30,26,24,.55) 0%, transparent 52%)" }}
      />

      {/* "Available Now" pill */}
      <div
        className="absolute flex items-center gap-[7px] rounded-full"
        style={{
          top: 18,
          right: 18,
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(8px)",
          padding: "7px 14px",
          boxShadow: "0 4px 16px rgba(30,26,24,.1)",
        }}
      >
        <span
          className="rounded-full shrink-0"
          style={{ width: 8, height: 8, background: "var(--teal)" }}
        />
        <span className="text-[11px] font-semibold text-[var(--ink)] tracking-[.04em]">
          Available Now
        </span>
      </div>

      {/* Name overlay */}
      <div className="absolute text-white" style={{ bottom: 22, left: 22 }}>
        <div className="text-base font-semibold tracking-[.02em] mb-[3px]">
          Kimberlie Gerstner
        </div>
        <div className="text-xs opacity-80 tracking-[.03em]">
          Certified Bookkeeper · 30+ Years Experience
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Contact detail links (email, phone, etc.)
───────────────────────────────────── */
type ContactMethod = {
  icon: LucideIcon;
  label: string;
  val: string;
  c: string;
  href: string;
};

const CONTACT_METHODS: ContactMethod[] = [
  { icon: Mail, label: "Email", val: "kimberlie@booksbykimberlie.com", c: "#C0556A", href: "mailto:kimberlie@booksbykimberlie.com" },
  { icon: Phone, label: "Office", val: "830-730-4160", c: "#B07D3A", href: "tel:8307304160" },
  { icon: Phone, label: "Mobile", val: "830-515-9818", c: "#3A9E8F", href: "tel:8305159818" },
  { icon: MessageCircle, label: "WhatsApp", val: "Available", c: "#7E6BA8", href: "#contact" },
];

function ContactDetails() {
  return (
    <div className="flex flex-col gap-2.5">
      {CONTACT_METHODS.map((method) => (
        <a
          key={method.label}
          href={method.href}
          className="flex items-center gap-3.5 no-underline rounded-[16px] bg-white"
          style={{
            padding: "13px 18px",
            border: `1px solid ${method.c}20`,
            boxShadow: `0 2px 12px ${method.c}08`,
          }}
        >
          <div
            className="flex items-center justify-center rounded-[12px] shrink-0"
            style={{
              width: 40,
              height: 40,
              background: `${method.c}12`,
              border: `1px solid ${method.c}28`,
            }}
          >
            <method.icon size={16} color={method.c} />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-semibold text-[#BBB] tracking-[.1em] uppercase mb-[2px]">
              {method.label}
            </div>
            <div className="text-[13px] font-medium text-[var(--ink)]">{method.val}</div>
          </div>
          <ArrowRight size={13} color={method.c} style={{ opacity: 0.4 }} />
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   Contact form + success state
───────────────────────────────────── */
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormErr(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: msg }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          setFieldErrors(data.errors);
        } else {
          setFormErr(data.message || "Something went wrong.");
        }
        return;
      }

      setSent(true);
      setName("");
      setEmail("");
      setMsg("");
    } catch {
      setFormErr("Network error.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return <SuccessState onReset={() => setSent(false)} />;
  }

  return (
    <div
      className="bg-white rounded-[28px]"
      style={{
        border: "1px solid rgba(192,85,106,.1)",
        boxShadow: "0 8px 48px rgba(30,26,24,.06)",
        padding: "44px 40px 38px",
      }}
    >
      <div
        className="mb-8 pb-6"
        style={{ borderBottom: "1px solid rgba(192,85,106,.1)" }}
      >
        <h3 className="font-display font-normal text-[var(--ink)] mb-1.5" style={{ fontSize: 28 }}>
          Send a message
        </h3>
      </div>

      {formErr && (
        <div
          className="rounded-[12px] flex gap-2 mb-[22px]"
          style={{
            background: "#FFF0F0",
            border: "1px solid #FFB3B3",
            padding: "12px 16px",
            fontSize: 13,
            color: "#A8302C",
          }}
        >
          ⚠ {formErr}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3.5">
          <FormField
            label="Your Name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(v) => {
              setName(v);
              setFieldErrors((p) => ({ ...p, name: "" }));
            }}
            disabled={sending}
            error={fieldErrors.name}
          />
          <FormField
            label="Email"
            type="email"
            placeholder="jane@biz.com"
            value={email}
            onChange={(v) => {
              setEmail(v);
              setFieldErrors((p) => ({ ...p, email: "" }));
            }}
            disabled={sending}
            error={fieldErrors.email}
          />
        </div>

        <FormTextarea
          label="Tell me about your business"
          placeholder="What do you need help with? Tell me a bit about your business..."
          value={msg}
          onChange={(v) => {
            setMsg(v);
            setFieldErrors((p) => ({ ...p, message: "" }));
          }}
          disabled={sending}
          error={fieldErrors.message}
        />

        <button
          type="submit"
          disabled={sending}
          className="btn-primary w-full justify-center"
          style={{ borderRadius: 16, fontSize: 15, padding: "16px 32px" }}
        >
          {sending ? "Sending…" : <>Send Message <ArrowRight size={16} /></>}
        </button>

        <FormTrustLine />
      </form>
    </div>
  );
}

/* ─────────────────────────────────────
   Form field helpers
───────────────────────────────────── */
function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  error,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="text-[11px] font-semibold text-[#AAA] tracking-[.08em] uppercase">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`form-input ${error ? "is-error" : ""}`}
      />
      {error && <span className="text-[11px] text-[#e74c3c]">{error}</span>}
    </div>
  );
}

function FormTextarea({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="text-[11px] font-semibold text-[#AAA] tracking-[.08em] uppercase">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`form-input ${error ? "is-error" : ""}`}
        style={{ minHeight: 152, resize: "vertical" }}
      />
      {error && <span className="text-[11px] text-[#e74c3c]">{error}</span>}
    </div>
  );
}

function FormTrustLine() {
  return (
    <div className="flex items-center justify-center gap-[18px] pt-0.5 flex-wrap">
      <span className="flex items-center gap-[5px] text-xs text-[#CCC]">
        <CheckCircle2 size={12} color="#3A9E8F" /> Quick responses
      </span>
      <span className="rounded-full shrink-0" style={{ width: 3, height: 3, background: "#E0E0E0" }} />
      <span className="flex items-center gap-[5px] text-xs text-[#CCC]">
        <Shield size={12} color="#C0556A" /> No spam, ever
      </span>
      <span className="rounded-full shrink-0" style={{ width: 3, height: 3, background: "#E0E0E0" }} />
      <span className="flex items-center gap-[5px] text-xs text-[#CCC]">
        <Clock size={12} color="#B07D3A" /> 1 business day
      </span>
    </div>
  );
}

/* ─────────────────────────────────────
   Success state after sending
───────────────────────────────────── */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="bg-white rounded-[28px] text-center flex flex-col items-center justify-center"
      style={{
        border: "1px solid rgba(192,85,106,.1)",
        boxShadow: "0 4px 32px rgba(30,26,24,.05)",
        padding: "60px 40px",
        minHeight: 480,
      }}
    >
      <div
        className="rounded-full flex items-center justify-center mx-auto mb-6"
        style={{
          width: 80,
          height: 80,
          background: "rgba(192,85,106,.06)",
          border: "2px solid rgba(192,85,106,.16)",
        }}
      >
        <CheckCircle2 size={38} color="#C0556A" />
      </div>

      <h3 className="font-display font-normal text-[var(--ink)] mb-3" style={{ fontSize: 30 }}>
        Message sent!
      </h3>
      <p className="body-text max-w-[300px] mx-auto mb-7" style={{ fontSize: 14 }}>
        Thanks for reaching out. I&apos;ll be in touch within one business day.
      </p>

      <div
        className="rounded-[16px] text-[13px] text-[#666] flex flex-col gap-2.5 w-full mb-2"
        style={{ background: "var(--mist)", padding: "18px 24px" }}
      >
        <span className="flex items-center gap-2 justify-center">
          <Phone size={13} color="#C0556A" /> 830-730-4160{" "}
          <span className="opacity-75 text-[11px]">(office)</span>
        </span>
        <span className="flex items-center gap-2 justify-center">
          <Phone size={13} color="#3A9E8F" /> 830-515-9818{" "}
          <span className="opacity-75 text-[11px]">(mobile)</span>
        </span>
        <span className="flex items-center gap-2 justify-center">
          <Mail size={13} color="#C0556A" /> kimberlie@booksbykimberlie.com
        </span>
      </div>

      <button
        onClick={onReset}
        className="btn-primary w-full justify-center mt-4"
        style={{ borderRadius: 16 }}
      >
        Send Another Message
      </button>
    </div>
  );
}
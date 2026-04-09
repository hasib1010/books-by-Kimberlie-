"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Shield,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
  Calculator,
  PieChart,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* ─── Data ─── */
const services = [
  {
    title: "QuickBooks",
    description:
      "Setup and manage your QuickBooks with expert care and accuracy.",
    image: "/quickbooks.png",
    icon: Calculator,
  },
  {
    title: "Payroll",
    description:
      "Smooth payroll coordination so your team gets paid on time, every time.",
    image: "/payroll.png",
    icon: FileText,
  },
  {
    title: "Reports",
    description:
      "Clear financial reports that help you understand your business health.",
    image: "/reports.png",
    icon: PieChart,
  },
];

const testimonials = [
  {
    text: "Kimberlie's bookkeeping brought clarity to my chaotic finances—now I actually enjoy reviewing my numbers each month.",
    rating: 5,
    name: "Alex M.",
    role: "Agency Owner",
    image: "/clients-photo.png",
  },
  {
    text: "Kimberlie made my accounting stress disappear. Highly professional and easy to work with.",
    rating: 5,
    name: "Sarah T.",
    role: "Freelance Designer",
    image: "/clients-photo.png",
  },
  {
    text: "With 15 years of experience, she completely transformed how we view our cash flow.",
    rating: 5,
    name: "David R.",
    role: "Construction Lead",
    image: "/clients-photo.png",
  },
];

/* ─── Animation Variants ─── */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};
const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};
const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const floatingAnimation: Variants = {
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ─── Main Page ─── */
export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for your message! Kimberlie will be in touch soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center items-center py-6 px-8 bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 shadow-sm"
      >
        <Image
          src="/logo.png"
          alt="Books by Kimberlie"
          width={280}
          height={210}
          className="h-20 w-auto md:h-32 object-contain hover:scale-105 transition-transform duration-500"
        />
      </motion.header>

      {/* Hero */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center text-center min-h-[85vh] px-4 overflow-hidden bg-white"
      >
        {/* Animated Rotating Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,var(--tw-gradient-stops))] from-primary/30 via-secondary/30 to-primary/30 animate-rotate-bg blur-3xl" />
        </div>

        {/* Floating Background Elements (kept for extra depth) */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-2"
        >
          <motion.h1
            variants={scaleUp}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
          >
            From chaos to calm, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              one ledger at a time.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-12 text-slate-600 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed px-4"
          >
            Remote bookkeeping for builders, creatives & businesses
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 w-full h-14 text-base sm:text-lg transition-colors"
              >
                Get Started <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-300 text-slate-700 hover:bg-slate-100 w-full h-14 text-base sm:text-lg transition-colors"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section className="relative py-28 bg-gradient-to-b from-white to-primary/5 border-y border-slate-200/50">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInLeft} className="space-y-6">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-2">
                  Meet Kimberlie, Your Bookkeeper
                </h3>
              </div>

              <div className="pt-2">
                <div className="flex items-start gap-4 sm:gap-5">
                  <motion.div
                    variants={floatingAnimation}
                    animate="animate"
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mt-1"
                  >
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                      Trusted Expertise
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      I&apos;m Kimberlie Gerstner, and I help business owners
                      gain clear control over their finances so they can focus
                      on what they do best—growing their business. With 15 years
                      of hands-on experience in accounting and finance,
                      I&apos;ve supported family-owned companies and large
                      corporations alike across hospitality, banking,
                      construction, and service industries. My expertise spans
                      bookkeeping, accounts payable, billing, financial
                      reporting, budgeting, forecasting, cash flow management,
                      reconciliations, payroll, and process improvement. I take
                      a detail-oriented, collaborative approach with every
                      client, empowering small and medium-sized businesses to
                      stay organized, compliant, and confident in their
                      financial foundation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              className="relative lg:pl-16 mt-16 lg:mt-0"
            >
              {/* Secondary Overflow Background */}
              <div className="absolute -inset-4 sm:-inset-10 bg-secondary/10 rounded-[3rem] -rotate-2 scale-105 pointer-events-none z-0 border border-secondary/20" />
              
              {/* Coins Background Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[3rem]">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 sm:w-10 sm:h-10 animate-coin-fall text-secondary/30 flex items-center justify-center font-bold text-xl mix-blend-multiply"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${5 + Math.random() * 5}s`,
                      animationDelay: `${Math.random() * 5}s`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  >
                    $
                  </div>
                ))}
              </div>

              <div className="relative z-10 p-4 sm:p-0">
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    <motion.div
                      variants={floatingAnimation}
                      animate="animate"
                      className="flex-shrink-0 w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary shadow-lg shadow-secondary/10 border border-secondary/20"
                    >
                      <Heart className="w-6 h-6" />
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      Personalized Care
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8 text-base sm:text-lg">
                    Every business runs differently, so Kimberlie tailors
                    QuickBooks setups, workflows, and reporting to match how you
                    actually operate—whether you’re a solo owner or a growing
                    multi‑location team.
                  </p>
                  <h4 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
                    Why Choose Books by Kimberlie?
                  </h4>
                </div>
                
                {/* Bulleted List Style */}
                <div className="space-y-6">
                  {[
                    {
                      title: "Tailored Bookkeeping Solutions",
                      desc: "Customized services for construction, hospitality, and service businesses — from QuickBooks setup to daily transaction tracking.",
                    },
                    {
                      title: "Stress-Free Compliance",
                      desc: "GAAP-compliant reporting, audit-ready records, and tax prep support so you avoid surprises and penalties.",
                    },
                    {
                      title: "Time-Saving Automation",
                      desc: "Streamlined AP/AR workflows, payroll processing, and custom SOPs that cut your admin time in half.",
                    },
                    {
                      title: "Growth-Focused Insights",
                      desc: "Clear cash flow forecasts, job costing, and budgeting to help you bid smarter and scale confidently.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 group"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center mt-1 shadow-md shadow-secondary/20 group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-primary/20">
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    Ready to simplify your books?
                  </h4>
                  <p className="text-slate-600 text-base sm:text-lg mb-8">
                    Contact me for a free consultation and let&apos;s get your
                    finances working for you.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 bg-gradient-to-tr from-primary/10 via-slate-50 to-secondary/10 relative overflow-hidden">
        <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-sm font-bold text-secondary uppercase tracking-widest mb-3"
            >
              Our Expertise
            </motion.h2>
            <motion.h3
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Services We Offer
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-slate-600 text-lg">
              Helping builders and creatives find calm in their finances through
              dedicated, expert bookkeeping.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={scaleUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100 flex-shrink-0">
                  <div className="absolute inset-0 bg-primary/5 z-10" />
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={500}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <motion.div
                    variants={floatingAnimation}
                    animate="animate"
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-sm z-20 text-primary"
                  >
                    <s.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </motion.div>
                </div>
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-gradient-to-br from-secondary/10 to-primary/10 border-y border-white/50 relative">
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 max-w-2xl mx-auto mb-4">
              What Our Clients Are Saying
            </h2>
            <p className="text-slate-600 text-lg">
              Get helpful bookkeeping tips and updates
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative group"
              >
                <div className="absolute top-8 right-8 text-slate-100 group-hover:text-primary/10 transition-colors">
                  <div className="w-12 h-12 text-6xl font-serif">&quot;</div>
                </div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-5 w-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed mb-8 relative z-10 min-h-[80px]">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 relative z-10 border-t border-slate-100 pt-6">
                  <div className="relative">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-100"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-32 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-secondary/20 to-transparent skew-x-12 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-primary/20 to-transparent -skew-x-12 -translate-x-32" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="max-w-md">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Get in touch
              </h2>
              <p className="text-slate-300 mb-10 text-lg">
                Questions? Reach out via phone, email, or WhatsApp.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl shadow-sm flex items-center justify-center text-primary font-bold">
                    M
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Mobile</p>
                    <p className="font-bold text-white">830 515 9818</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl shadow-sm flex items-center justify-center text-secondary font-bold">
                    O
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Office</p>
                    <p className="font-bold text-white">830 730 4160</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-black/20 border border-slate-100 space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-slate-50 border-slate-200 h-12 px-4 rounded-xl focus:ring-primary focus:border-primary transition-shadow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-50 border-slate-200 h-12 px-4 rounded-xl focus:ring-primary focus:border-primary transition-shadow"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Message
                  </label>
                  <Textarea
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="bg-slate-50 border-slate-200 p-4 rounded-xl resize-none focus:ring-primary focus:border-primary transition-shadow"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 text-base font-bold transition-transform hover:-translate-y-1"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-primary to-secondary text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-8">
            <div className="md:col-span-4">
              <Image
                src="/logo.png"
                alt="Books by Kimberlie"
                width={200}
                height={150}
                className="h-16 w-auto object-contain mb-6 brightness-0 invert opacity-100"
              />
              <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-sm">
                Gaining clear control over your finances so you can focus on
                growing your business.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/80">
                <li>
                  <a
                    href="#home"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-white font-bold mb-6">Stay in the loop</h4>
              <p className="text-sm text-white/80 mb-4">
                Get helpful bookkeeping tips and updates
              </p>
              <div className="flex bg-black/20 p-1 rounded-xl">
                <Input
                  placeholder="Email address"
                  className="bg-transparent border-none text-white placeholder:text-white/50 h-12 focus-visible:ring-0"
                />
                <Button className="rounded-lg h-12 bg-white text-primary hover:bg-white/90 px-6 font-bold transition-colors">
                  Send Message
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} Books by Kimberlie. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

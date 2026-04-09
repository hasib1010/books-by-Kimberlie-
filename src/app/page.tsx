"use client";

import { useState } from "react";
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
} from "lucide-react";
import { CoinRain } from "@/components/CoinRain";
import { AnimatedHeroText } from "@/components/AnimatedHeroText";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import Image from "next/image";

/* ─── Data ─── */
const services = [
  {
    title: "QuickBooks",
    description:
      "Setup and manage your QuickBooks with expert care and accuracy.",
    image: "/quickbooks.png",
  },
  {
    title: "Payroll",
    description:
      "Smooth payroll coordination so your team gets paid on time, every time.",
    image: "/payroll.png",
  },
  {
    title: "Reports",
    description:
      "Clear financial reports that help you understand your business health.",
    image: "/reports.png",
  },
];

const testimonials = [
  {
    text: "Kimberlie's bookkeeping brought clarity to my chaotic finances—now I actually enjoy reviewing my numbers each month.",
    rating: 5,
    image: "/clients-photo.png"
  },
  {
    text: "Kimberlie made my accounting stress disappear. Highly professional and easy to work with.",
    rating: 5,
    image: "/clients-photo.png"
  },
  {
    text: "Kimberlie's bookkeeping brought clarity to my chaotic finances—now I actually enjoy reviewing my numbers each month.",
    rating: 5,
    image: "/clients-photo.png"
  },
];

/* ─── Main Page ─── */
export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [footerName, setFooterName] = useState("");

  const aboutReveal = useSectionReveal();
  const servicesReveal = useSectionReveal();
  const testimonialsReveal = useSectionReveal();
  const contactReveal = useSectionReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! Kimberlie will be in touch soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex justify-center items-center py-6 bg-background relative">
        <nav className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block">
          <a
            href="#home"
            className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </a>
        </nav>
        <Image
          src="/logo.png"
          alt="Books by Kimberlie logo"
          width={280}
          height={210}
          className="h-40 md:h-52 w-auto"
        />
      </header>

      {/* Hero with animated background */}
      <section
        id="home"
        className="hero-gradient flex flex-col items-center justify-center text-center min-h-[60vh] md:min-h-[70vh] px-4 relative overflow-hidden"
      >
        {/* Floating background particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary-foreground/5 animate-float"
              style={{
                width: 60 + i * 40,
                height: 60 + i * 40,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`,
              }}
            />
          ))}
        </div>
        <AnimatedHeroText />
        <p
          className="mt-4 text-primary-foreground/80 font-body text-lg md:text-xl max-w-xl animate-fade-in"
          style={{ animationDelay: "1.2s", animationFillMode: "both" }}
        >
          Remote bookkeeping for builders, creatives & businesses
        </p>
        <div
          className="flex gap-4 mt-8 animate-fade-in"
          style={{
            animationDelay: "1.5s",
            animationFillMode: "both",
            zIndex: 10,
          }}
        >
          <Button
            size="lg"
            className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-body"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-primary text-primary bg-primary-foreground/20 hover:bg-primary-foreground/40 font-body"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* About + Coins merged section */}
      <section
        ref={aboutReveal.ref}
        className={`relative section-padding transition-all duration-700 ${aboutReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Coins background */}
        <div className="absolute inset-0">
          <Image
            src="/coins-banner.jpg"
            alt=""
            width={1920}
            height={100}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <CoinRain />
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Meet Kimberlie, Your Bookkeeper
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                I&apos;m Kimberlie Gerstner, and I help business owners gain
                clear control over their finances so they can focus on what
                they do best—growing their business. With 15 years of
                hands-on experience in accounting and finance, I&apos;ve
                supported family-owned companies and large corporations alike
                across hospitality, banking, construction, and service
                industries. My expertise spans bookkeeping, accounts payable,
                billing, financial reporting, budgeting, forecasting, cash
                flow management, reconciliations, payroll, and process
                improvement. I take a detail-oriented, collaborative approach
                with every client, empowering small and medium-sized
                businesses to stay organized, compliant, and confident in
                their financial foundation.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">Trusted Expertise</h4>
                    <p className="text-sm text-muted-foreground">15+ years of cross-industry financial experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">Personalized Care</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Every business runs differently, so Kimberlie tailors QuickBooks setups, workflows, and reporting to match how you actually operate—whether you’re a solo owner or a growing multi‑location team.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 shadow-sm">
              <h3 className="font-heading text-2xl text-foreground mb-6">Why Choose Books by Kimberlie?</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">Tailored Bookkeeping Solutions</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-balance">Customized services for construction, hospitality, and service businesses — from QuickBooks setup to daily transaction tracking.</p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">Stress-Free Compliance</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-balance">GAAP-compliant reporting, audit-ready records, and tax prep support so you avoid surprises and penalties.</p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">Time-Saving Automation</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-balance">Streamlined AP/AR workflows, payroll processing, and custom SOPs that cut your admin time in half.</p>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">Growth-Focused Insights</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-balance">Clear cash flow forecasts, job costing, and budgeting to help you bid smarter and scale confidently.</p>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-primary/10 text-center">
                <p className="font-body text-foreground font-medium mb-4">Ready to simplify your books?</p>
                <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-body">
                  <a href="#contact">Contact me for a free consultation</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        ref={servicesReveal.ref}
        className={`section-padding bg-background transition-all duration-700 ${servicesReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground text-center mb-4">
            Our Services
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            Helping builders and creatives find calm in their finances.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-card"
              >
                <div className="overflow-hidden h-52">
                  <Image
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={768}
                    height={538}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsReveal.ref}
        className={`section-padding bg-secondary/30 transition-all duration-700 ${testimonialsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12">
            What Our Clients Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-8 shadow-sm">
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={t.image}
                    alt="Client photo"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/10 shadow-sm"
                  />
                  <p className="font-body text-muted-foreground italic leading-relaxed text-sm">
                    &quot;{t.text}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        ref={contactReveal.ref}
        className={`section-padding bg-background transition-all duration-700 ${contactReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground text-center mb-4">
            Get in touch
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12">
            Questions? Reach out via phone, email, or WhatsApp.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="font-body"
              />
              <Input
                type="email"
                placeholder="Your Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-body"
              />
              <Textarea
                placeholder="Message*"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="font-body"
              />
              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-body"
              >
                Get Started
              </Button>
            </form>
            <div className="hidden md:block">
              <Image
                src="/contact-photo.png"
                alt="Working at desk"
                loading="lazy"
                width={768}
                height={676}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-heading text-xl mb-4">Stay in the loop</h3>
              <p className="font-body text-primary-foreground/70 text-sm mb-4">
                Get helpful bookkeeping tips and updates
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your Name"
                  value={footerName}
                  onChange={(e) => setFooterName(e.target.value)}
                  className="font-body bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body whitespace-nowrap"
                >
                  Send Message
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl mb-4">Contact</h3>
              <p className="font-body text-primary-foreground/70 text-sm">
                Reach out anytime for bookkeeping help.
              </p>
              <p className="font-body text-primary-foreground/70 text-sm mt-2">
                830 515 9818 mobile
              </p>
              <p className="font-body text-primary-foreground/70 text-sm">
                830 730 4160 office
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end justify-between">
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <p className="font-body text-primary-foreground/50 text-xs mt-4">
                © 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

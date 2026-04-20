// src/app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AOSProvider from "@/components/AOSProvider";
export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AOSProvider />
      <Header />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
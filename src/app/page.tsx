"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, TrendingUp, Shield, Clock,
  BarChart3, Star, Mail, Phone, MessageCircle,
  Instagram, Facebook, Linkedin, Sparkles, ChevronDown, Menu, X,
} from "lucide-react";

/* ────────────────────────────────────────
   DATA
──────────────────────────────────────── */
const SERVICES = [
  { num:"01", title:"QuickBooks",        img:"/quickbooks.png",  accent:"#C0556A", bg:"#FDF4F6", icon:BarChart3,  desc:"Expert setup and ongoing management so your books stay accurate, clean, and always tax-ready." },
  { num:"02", title:"Payroll",           img:"/payroll.png",     accent:"#3A9E8F", bg:"#F0F9F7", icon:Clock,      desc:"On-time, every time. Smooth payroll runs so your team gets paid correctly and you stay compliant." },
  { num:"03", title:"Financial Reports", img:"/reports.png",     accent:"#B07D3A", bg:"#FBF6EE", icon:TrendingUp, desc:"Clear, actionable reports showing exactly where your cash is going — and where it should be." },
];

const WHY = [
  { icon:Shield,     c:"#C0556A", bg:"#FDF4F6", title:"Stress-Free Compliance",  desc:"GAAP-compliant records and audit-ready books. No more scrambling at tax time." },
  { icon:Clock,      c:"#3A9E8F", bg:"#F0F9F7", title:"Time-Saving Automation",  desc:"Streamlined AP/AR workflows that cut your admin time dramatically." },
  { icon:TrendingUp, c:"#B07D3A", bg:"#FBF6EE", title:"Growth-Focused Insights", desc:"Cash flow forecasts and job costing to help you bid smarter and scale." },
  { icon:Sparkles,   c:"#7E6BA8", bg:"#F5F2FA", title:"Tailored Just For You",   desc:"Custom QuickBooks setups and reporting to match exactly how you operate." },
];

const STEPS = [
  { n:"01", c:"#C0556A", title:"Free Consultation", desc:"We talk through your business, pain points, and what calm finances looks like for you." },
  { n:"02", c:"#3A9E8F", title:"Custom Setup",       desc:"I tailor QuickBooks, workflows, and reporting to match exactly how you operate." },
  { n:"03", c:"#B07D3A", title:"Ongoing Support",    desc:"Monthly bookkeeping, payroll, and reconciliations — delivered on time, every time." },
  { n:"04", c:"#7E6BA8", title:"Clear Insights",     desc:"Regular reports and proactive advice so you always know exactly where you stand." },
];

const TESTI = [
  { q:"Kimberlie brought clarity to my chaotic finances — now I actually enjoy reviewing my numbers each month.", name:"Alex M.",   role:"Contractor, Vermont",  img:"/client1.jpg", c:"#C0556A" },
  { q:"She made my accounting stress completely disappear. Highly professional and genuinely easy to work with.",  name:"Sarah T.", role:"Freelance Designer",   img:"/client2.jpg", c:"#3A9E8F" },
  { q:"Finally a bookkeeper who explains things in plain English. I feel confident about my finances for the first time.", name:"David R.", role:"Restaurant Owner", img:"/client3.jpg", c:"#B07D3A" },
];

const TICKER = ["QuickBooks Setup","Payroll Processing","Financial Reports","Cash Flow Forecasting","AP/AR Management","Tax Prep Support","Remote Bookkeeping","30+ Years Experience"];
const NAV    = ["About","Services","Process","Contact"];

/* ── LOTTIE COIN RAIN ── */
function GoldCoinShower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let anim: any = null;

    import("lottie-web").then((mod) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lottie: any = mod.default ?? mod;

      anim = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: true,           // lottie-web native loop
        autoplay: true,
        path: "/money_falling.json",
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
          progressiveLoad: false,
          hideOnTransparent: false,
        },
      });

      anim.setSpeed(0.75);

      // Belt-and-suspenders: if animation ever stops, restart it
      anim.addEventListener("complete", () => {
        anim.goToAndPlay(0, true);
      });

      // Keep playing even when tab is in background
      anim.addEventListener("loopComplete", () => {
        if (!anim.isPaused) return;
        anim.goToAndPlay(0, true);
      });
    });

    // Also handle page visibility — resume when user comes back
    const onVisible = () => {
      if (document.visibilityState === "visible" && anim && anim.isPaused) {
        anim.play();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      anim?.destroy();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  );
}


/* ────────────────────────────────────────
   PAGE
──────────────────────────────────────── */
export default function Page() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [msg,     setMsg]     = useState("");
  const [scrolled,setScrolled]= useState(false);
  const [drawer,  setDrawer]  = useState(false);
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [formErr, setFormErr] = useState<string|null>(null);
  const [fldErr,  setFldErr]  = useState<Record<string,string>>({});
  const [nlEmail, setNlEmail] = useState("");
  const [nlBusy,  setNlBusy]  = useState(false);
  const [nlOk,    setNlOk]    = useState(false);
  const [nlErr,   setNlErr]   = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const sendNl = async (e: React.FormEvent) => {
    e.preventDefault(); setNlBusy(true); setNlErr("");
    try {
      const r = await fetch("/api/newsletter", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ email: nlEmail }) });
      const d = await r.json();
      if (!r.ok) setNlErr(d.message || "Something went wrong.");
      else { setNlOk(true); setNlEmail(""); }
    } catch { setNlErr("Network error."); }
    finally { setNlBusy(false); }
  };

  const sendContact = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true); setFormErr(null); setFldErr({});
    try {
      const r = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ name, email, message: msg }) });
      const d = await r.json();
      if (!r.ok) {
        if (r.status === 422 && d.errors) setFldErr(d.errors);
        else setFormErr(d.message || "Something went wrong.");
        return;
      }
      setSent(true); setName(""); setEmail(""); setMsg("");
    } catch { setFormErr("Network error."); }
    finally { setSending(false); }
  };

  /* ── shared micro-styles ── */
  const ROSE   = "#C0556A";
  const TEAL   = "#3A9E8F";
  const GOLD   = "#B07D3A";
  const PLUM   = "#7E6BA8";
  const IVORY  = "#FFFCF7";
  const INK    = "#1E1A18";
  const MIST   = "#F7F3EE";

  const eyebrow = (c=ROSE): React.CSSProperties => ({
    fontSize:11, fontWeight:600, letterSpacing:".2em",
    textTransform:"uppercase", color:c, marginBottom:14,
  });

  const displayTitle = (extra?: React.CSSProperties): React.CSSProperties => ({
    fontFamily:"'Cormorant Garamond', serif",
    fontSize:"clamp(32px,3.5vw,52px)",
    fontWeight:400, lineHeight:1.12,
    letterSpacing:"-.02em", color:INK,
    marginBottom:20,
    ...extra,
  });

  const body = (extra?: React.CSSProperties): React.CSSProperties => ({
    fontSize:15, color:"#6B6461", lineHeight:1.9, ...extra,
  });

  const pill = (c=ROSE): React.CSSProperties => ({
    display:"inline-flex", alignItems:"center", gap:8,
    background:`${c}12`, border:`1px solid ${c}35`,
    borderRadius:50, padding:"7px 16px",
    fontSize:11, fontWeight:600, letterSpacing:".08em",
    color:c, width:"fit-content",
  });

  const primaryBtn = (extra?: React.CSSProperties): React.CSSProperties => ({
    display:"inline-flex", alignItems:"center", gap:9,
    background:`linear-gradient(135deg, ${ROSE} 0%, #D4756A 100%)`,
    color:"white", border:"none", borderRadius:50,
    padding:"14px 32px", fontSize:14, fontWeight:600,
    cursor:"pointer", textDecoration:"none",
    boxShadow:`0 8px 32px ${ROSE}35`,
    transition:"transform .22s, box-shadow .22s",
    ...extra,
  });

  const outlineBtn = (extra?: React.CSSProperties): React.CSSProperties => ({
    display:"inline-flex", alignItems:"center", gap:8,
    background:"transparent", color:INK,
    border:`1.5px solid rgba(30,26,24,.22)`,
    borderRadius:50, padding:"13px 30px",
    fontSize:14, fontWeight:500, cursor:"pointer",
    textDecoration:"none", transition:"all .22s",
    ...extra,
  });

  const cardBase = (extra?: React.CSSProperties): React.CSSProperties => ({
    background:"white",
    borderRadius:24,
    border:"1px solid rgba(192,85,106,.1)",
    boxShadow:"0 4px 32px rgba(30,26,24,.05)",
    ...extra,
  });

  const inputStyle = (err?: string): React.CSSProperties => ({
    width:"100%", background:"#FDFAF7",
    border:`1.5px solid ${err ? "#e74c3c" : "rgba(192,85,106,.2)"}`,
    borderRadius:12, padding:"13px 16px",
    fontSize:14, color:INK, outline:"none",
    fontFamily:"'Jost', sans-serif",
    transition:"border-color .2s",
  });

  const hoverLift = (e: React.MouseEvent<HTMLElement>, in_: boolean) => {
    e.currentTarget.style.transform = in_ ? "translateY(-4px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = in_ ? "0 20px 48px rgba(30,26,24,.1)" : "0 4px 32px rgba(30,26,24,.05)";
  };

  

  const avatarRow = (srcs: string[]) => (
    <div style={{ display:"flex" }}>
      {srcs.map((src, i) => (
        <div key={i} style={{ position:"relative", width:38, height:38, borderRadius:"50%", overflow:"hidden", border:"2.5px solid white", marginLeft:i ? -12 : 0, zIndex:srcs.length-i, flexShrink:0 }}>
          <Image src={src} alt="" fill style={{ objectFit:"cover", borderRadius:"50%" }} />
        </div>
      ))}
    </div>
  );

  const starRow = (n=5, sz=13) => (
    <div style={{ display:"flex", gap:2 }}>
      {[...Array(n)].map((_, i) => <Star key={i} size={sz} fill="#D4A843" color="#D4A843" />)}
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", overflowX:"hidden", background:IVORY, color:INK, fontFamily:"'Jost', sans-serif" }}>

      {/* ── GLOBAL CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { -webkit-font-smoothing:antialiased; }

        /* scrollbar */
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(192,85,106,.25); border-radius:3px; }
        ::selection { background:rgba(192,85,106,.15); }

        /* ticker */
        .tk { animation: tkMove 44s linear infinite; display:flex; width:max-content; }
        .tk:hover { animation-play-state:paused; }
        @keyframes tkMove { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }

        /* float cards */
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }

        /* pulse badge dot */
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.78)} }

        /* scroll cue */
        @keyframes cue { 0%,100%{opacity:.5;transform:translateX(-50%) translateY(0)} 50%{opacity:1;transform:translateX(-50%) translateY(8px)} }

        /* spinner */
        @keyframes spin { to{transform:rotate(360deg)} }

        /* hover helpers */
        .card-hover { transition: transform .26s, box-shadow .26s !important; }
        .card-hover:hover { transform:translateY(-6px) !important; box-shadow:0 24px 56px rgba(30,26,24,.09) !important; }
        .btn-hover { transition: transform .22s, box-shadow .22s !important; }
        .btn-hover:hover { transform:translateY(-2px) !important; box-shadow:0 16px 40px rgba(192,85,106,.42) !important; }
        .link-hover:hover { opacity:.7; }

        /* mobile */
        @media(max-width:768px) {
          .hide-sm   { display:none !important; }
          .show-sm   { display:flex !important; }
          .col-1-sm  { grid-template-columns:1fr !important; }
          .col-2-sm  { grid-template-columns:1fr 1fr !important; }
          .sec-pad   { padding:72px 6% !important; }

          /* Hero: single column, hero image as bg, content on top */
          .hero-sect {
            grid-template-columns: 1fr !important;
            min-height: 100dvh !important;
            padding-top: 0 !important;
          }
          .hero-left {
            min-height: 100dvh !important;
            padding: 96px 6% 52px !important;
            justify-content: flex-end !important;
            // background-image: url("/hero.jpg") !important;
            background-size: cover !important;
            background-position: center 25% !important;
            position: relative !important;
          }
          .hero-left::before {
            content: "";
            position: absolute;
            inset: 0;
            // background: linear-gradient(to bottom, rgba(255,246,248,0.45) 0%, rgba(253,241,244,0.82) 45%, rgba(253,241,244,0.97) 100%);
            z-index: 0;
          }
          .hero-left > * { position: relative; z-index: 1; }
          .hero-h1 { font-size: clamp(38px,9vw,56px) !important; }
          .hero-badge { margin-bottom: 14px !important; }
          .hero-sub { font-size: 14px !important; margin-bottom: 18px !important; }
          .hero-proof { margin-bottom: 18px !important; }
          .hero-btns { margin-bottom: 28px !important; }
          .hero-btns a:last-child { display: none !important; }
        }
        @media(max-width:480px) {
          .col-2-sm  { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ══════════ MOBILE DRAWER ══════════ */}
      {drawer && (
        <div style={{ position:"fixed", inset:0, zIndex:400, display:"flex", flexDirection:"column", padding:"32px 7%", background:"linear-gradient(160deg, #2A1A1E 0%, #1E2820 100%)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:28, borderBottom:"1px solid rgba(255,255,255,.08)", marginBottom:32 }}>
            <Image src="/logo.png" alt="Books by Kimberlie" width={180} height={72} style={{ objectFit:"contain", height:154 }} />
            <button onClick={() => setDrawer(false)} style={{ background:"rgba(255,255,255,.08)", border:"none", borderRadius:"50%", width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"white" }}>
              <X size={20} />
            </button>
          </div>
          <nav style={{ display:"flex", flexDirection:"column" }}>
            {NAV.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setDrawer(false)}
                style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:300, color:"rgba(255,255,255,.88)", textDecoration:"none", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,.07)", letterSpacing:"-.01em" }}>
                {l}
              </a>
            ))}
          </nav>
          <a href="#contact" onClick={() => setDrawer(false)}
            style={{ ...primaryBtn({ marginTop:36, alignSelf:"flex-start" }) }}>
            Get Started <ArrowRight size={15} />
          </a>
        </div>
      )}

      {/* ══════════ NAV ══════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 6%", height:"250px",
        background: scrolled ? "rgba(255,252,247,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(192,85,106,.1), 0 4px 32px rgba(30,26,24,.05)" : "none",
        transition:"background .3s, box-shadow .3s",
      }}>
        <Image src="/logo.png" alt="Books by Kimberlie" width={460} height={204} style={{ objectFit:"contain", height:"200px", width:"auto" }} />

        <nav className="hide-sm" style={{ display:"flex", alignItems:"center", gap:28 }}>
          {NAV.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize:13, fontWeight:500, letterSpacing:".03em", color:"#6B6461", textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = ROSE}
              onMouseLeave={e => e.currentTarget.style.color = "#6B6461"}>
              {l}
            </a>
          ))}
          <a href="#contact" className="btn-hover" style={primaryBtn({ padding:"10px 22px", fontSize:13 }) as React.CSSProperties}>
            Get Started <ArrowRight size={13} />
          </a>
        </nav>

        <button className="show-sm" onClick={() => setDrawer(true)} style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:4, color:ROSE }}>
          <Menu size={26} />
        </button>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section id="home" className="hero-sect mt-56" style={{
        minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr",
        position:"relative", overflow:"hidden", paddingTop:80,
        background:`linear-gradient(140deg, #FDF6F8 0%, ${IVORY} 45%, #F4F9F7 100%)`,
      }}>
        {/* Soft background shapes */}
        <div style={{ position:"absolute", top:-140, right:-120, width:700, height:700, borderRadius:"50%", background:`radial-gradient(circle, rgba(212,168,67,.12) 0%, transparent 68%)`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-100, left:-100, width:560, height:560, borderRadius:"50%", background:`radial-gradient(circle, rgba(192,85,106,.1) 0%, transparent 68%)`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"35%", left:"48%", width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle, rgba(58,158,143,.07) 0%, transparent 68%)`, pointerEvents:"none" }} />

        {/* LEFT — content */}
        <div className="hero-left" style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding:"72px 5% 72px 8%", position:"relative", zIndex:2 }}>

          <div className="hero-badge" style={pill()}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:ROSE, flexShrink:0, animation:"blink 2.2s infinite" }} />
            Remote Bookkeeping · Vermont
          </div>

          <h1 className="hero-h1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(46px,4.6vw,74px)", fontWeight:300, lineHeight:1.06, color:INK, margin:"22px 0 18px", letterSpacing:"-.025em" }}>
            From <em style={{ fontStyle:"italic", color:ROSE }}>chaos</em><br />
            to calm, <em style={{ fontStyle:"italic" }}>one</em><br />
            <em style={{ fontStyle:"italic", color:ROSE }}>ledger</em> at a time.
          </h1>

          <p className="hero-sub" style={{ ...body(), maxWidth:440, marginBottom:26 }}>
            Remote bookkeeping for builders, creatives &amp; businesses — so you can focus on growing what you love.{" "}
            <span style={{ color:ROSE, fontWeight:500 }}>No spreadsheet nightmares, just crystal-clear numbers.</span>
          </p>

          {/* social proof */}
          <div className="hero-proof" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
            {avatarRow(["/client1.jpg", "/client2.jpg", "/client3.jpg"])}
            <div>
              {starRow(5, 12)}
              <span style={{ fontSize:13, color:"#888", marginTop:3, display:"block" }}>
                <strong style={{ color:INK }}>200+ clients</strong> trust Kimberlie
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-btns" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:44 }}>
            <a href="#contact" className="btn-hover" style={primaryBtn() as React.CSSProperties}>
              Get a Free Consultation <ArrowRight size={16} />
            </a>
            <a href="#services" className="link-hover" style={outlineBtn() as React.CSSProperties}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ROSE; e.currentTarget.style.color = ROSE; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(30,26,24,.22)"; e.currentTarget.style.color = INK; }}>
              See My Services
            </a>
          </div>

          {/* Stats — clean 4-col, each its own card */}
          <div className="col-2-sm" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
            {[
              { v:"30+",  l:"Years Exp.",    c:ROSE },
              { v:"200+", l:"Happy Clients", c:TEAL },
              { v:"100%", l:"Remote",        c:GOLD },
              { v:"$0",   l:"Hidden Fees",   c:PLUM },
            ].map(s => (
              <div key={s.l} style={{ background:"white", borderRadius:16, padding:"16px 10px", textAlign:"center", border:`1px solid ${s.c}22`, boxShadow:`0 2px 12px ${s.c}12` }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:600, color:s.c, lineHeight:1, marginBottom:4 }}>{s.v}</div>
                <div style={{ fontSize:10, fontWeight:500, color:"#AAA", letterSpacing:".04em", lineHeight:1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — hero photo */}
        <div className="hide-sm" style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 6% 60px 2%", position:"relative", zIndex:2 }}>
          <div style={{ position:"relative", width:"100%", maxWidth:500, aspectRatio:"4/5", borderRadius:48, overflow:"hidden", boxShadow:`0 48px 120px rgba(30,26,24,.16), 0 0 0 1px rgba(212,168,67,.25)` }}>
            <Image src="/hero.jpg" alt="Bookkeeping" fill style={{ objectFit:"cover", objectPosition:"center 25%" }} />
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom, transparent 50%, rgba(30,26,24,.35))` }} />
          </div>

          {/* Floating status card */}
          <div style={{ position:"absolute", top:"14%", left:"0%", background:"white", borderRadius:20, padding:"14px 18px", display:"flex", alignItems:"center", gap:11, boxShadow:"0 12px 48px rgba(30,26,24,.1)", animation:"floatA 4.5s ease-in-out infinite" }}>
            <div style={{ width:36, height:36, borderRadius:10, background:`${TEAL}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <CheckCircle2 size={18} color={TEAL} />
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"#BBB", marginBottom:2 }}>Books Status</div>
              <div style={{ fontSize:13, fontWeight:600, color:TEAL }}>All Up to Date ✓</div>
            </div>
          </div>

          {/* Floating cash flow card */}
          <div style={{ position:"absolute", bottom:"12%", right:"3%", background:"white", borderRadius:20, padding:"16px 20px", boxShadow:"0 12px 48px rgba(30,26,24,.1)", minWidth:190, animation:"floatB 5.5s ease-in-out infinite" }}>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"#BBB", marginBottom:6 }}>Cash Flow · This Month</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:600, color:ROSE, lineHeight:1 }}>$12,480</div>
            <div style={{ fontSize:11, fontWeight:600, color:TEAL, marginTop:5 }}>↑ 18% vs last month</div>
          </div>
        </div>

        <div style={{ position:"absolute", bottom:20, left:"50%", color:ROSE, animation:"cue 2.4s ease-in-out infinite", opacity:.6 }}>
          <ChevronDown size={22} />
        </div>
      </section>

      {/* ══════════ TICKER ══════════ */}
      <div style={{ overflow:"hidden", padding:"13px 0", background:`linear-gradient(90deg, ${ROSE} 0%, #C97060 30%, ${TEAL} 65%, #5B8FA8 100%)` }}>
        <div className="tk">
          {[...Array(4)].map((_, r) =>
            TICKER.map((t, i) => (
              <span key={`${r}-${i}`} style={{ display:"inline-flex", alignItems:"center", gap:10, paddingRight:36, fontSize:10.5, fontWeight:600, letterSpacing:".16em", textTransform:"uppercase", color:"white", whiteSpace:"nowrap" }}>
                <span style={{ width:4, height:4, borderRadius:"50%", background:"rgba(255,255,255,.55)", flexShrink:0 }} />{t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="sec-pad" style={{ padding:"108px 8%", background:IVORY }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>

          {/* Photo + text */}
          <div className="col-1-sm" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center", marginBottom:96 }}>

            {/* Photo col */}
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ position:"relative", width:"100%", aspectRatio:"3/4", borderRadius:36, overflow:"hidden", boxShadow:`0 32px 80px rgba(30,26,24,.12), 0 0 0 1px rgba(212,168,67,.2)` }}>
                <Image src="/hero2.svg" alt="Kimberlie Gerstner" fill style={{ objectFit:"cover", objectPosition:"top center" }} />
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, rgba(30,26,24,.55) 0%, transparent 50%)` }} />
                {/* experience badge */}
                <div style={{ position:"absolute", bottom:24, left:24, background:`linear-gradient(135deg, ${ROSE}, #D4756A)`, borderRadius:18, padding:"12px 20px", color:"white" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:600, lineHeight:1 }}>30+</div>
                  <div style={{ fontSize:11, opacity:.9, marginTop:3, letterSpacing:".04em" }}>Years of Experience</div>
                </div>
              </div>

              {/* Trust strip */}
              <div style={{ ...cardBase({ padding:"16px 20px" }), display:"flex", alignItems:"center", gap:14 }}>
                {avatarRow(["/client1.jpg", "/client2.jpg", "/client3.jpg"])}
                <div>
                  {starRow(5, 12)}
                  <div style={{ fontSize:12, color:"#888", marginTop:3 }}>Trusted by 200+ business owners</div>
                </div>
              </div>
            </div>

            {/* Text col */}
            <div style={{ display:"flex", flexDirection:"column" }}>
              <div style={eyebrow()}>Meet Your Bookkeeper</div>
              <h2 style={displayTitle()}>
                Hi, I&apos;m Kimberlie —<br />
                <em style={{ color:ROSE, fontStyle:"italic" }}>your financial calm</em><br />
                in the storm.
              </h2>
              <p style={{ ...body(), marginBottom:14 }}>
                With 30+ years of hands-on experience across construction, hospitality, banking, and service industries,
                I help business owners gain clear control of their finances — so they can focus on what they love most.
              </p>
              <p style={{ ...body(), marginBottom:36 }}>
                I know bookkeeping can sound about as exciting as watching paint dry — but I promise, clear books mean
                more money in your pocket and zero tax-season panic. That&apos;s actually pretty wonderful.
              </p>
              <a href="#contact" className="btn-hover" style={primaryBtn({ alignSelf:"flex-start" }) as React.CSSProperties}>
                Book a Free Call <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Why choose */}
          <div style={{ background:MIST, borderRadius:32, padding:"52px 30px" }}>
            <div style={{ marginBottom:20 }}>
              <div style={eyebrow()}>Why Choose Kimberlie?</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,2.8vw,38px)", fontWeight:300, lineHeight:1.15, letterSpacing:"-.02em", color:INK }}>
                Four reasons clients <em style={{ color:ROSE, fontStyle:"italic" }}>keep coming back</em>
              </h3>
            </div>
            <div className="col-2-sm" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
              {WHY.map(w => (
                <div key={w.title} style={{ background:"white", border:`1px solid ${w.c}18`, borderRadius:22, padding:"26px 20px", transition:"transform .25s, box-shadow .25s", cursor:"default" }}
                  onMouseEnter={e => hoverLift(e as unknown as React.MouseEvent<HTMLElement>, true)}
                  onMouseLeave={e => hoverLift(e as unknown as React.MouseEvent<HTMLElement>, false)}>
                  <div style={{ width:44, height:44, borderRadius:13, background:w.bg, border:`1px solid ${w.c}30`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                    <w.icon size={20} color={w.c} />
                  </div>
                  <div style={{ fontSize:14, fontWeight:600, color:INK, marginBottom:8, letterSpacing:".01em" }}>{w.title}</div>
                  <div style={{ fontSize:13, color:"#888", lineHeight:1.72 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" className="sec-pad" style={{ padding:"108px 8%", background:"white" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:24, marginBottom:56 }}>
            <div>
              <div style={eyebrow(TEAL)}>What I Offer</div>
              <h2 style={displayTitle()}>
                Services built for<br />
                <em style={{ color:ROSE, fontStyle:"italic" }}>builders &amp; creatives</em>
              </h2>
            </div>
            <p style={{ ...body(), maxWidth:300 }}>Every service is customized to your business — not a one-size-fits-all template.</p>
          </div>

          <div className="col-1-sm" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
            {SERVICES.map(s => (
              <div key={s.title} className="card-hover" style={{ ...cardBase({ overflow:"hidden" }), cursor:"default" }}>
                <div style={{ position:"relative", height:214, background:s.bg }}>
                  <Image src={s.img} alt={s.title} fill style={{ objectFit:"contain", padding:20 }} />
                  <span style={{ position:"absolute", bottom:6, right:14, fontFamily:"'Cormorant Garamond',serif", fontSize:52, fontWeight:600, color:s.accent, opacity:.09, lineHeight:1, pointerEvents:"none", userSelect:"none" }}>{s.num}</span>
                </div>
                <div style={{ padding:"26px 28px 30px" }}>
                  <div style={{ height:2, width:40, borderRadius:1, background:s.accent, marginBottom:16, opacity:.7 }} />
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:25, fontWeight:400, color:INK, marginBottom:10, letterSpacing:"-.01em" }}>{s.title}</h3>
                  <p style={{ fontSize:13, color:"#888", lineHeight:1.82 }}>{s.desc}</p>
                  <Link href="#contact" className="link-hover" style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, color:s.accent, textDecoration:"none", marginTop:18, letterSpacing:".03em", transition:"opacity .2s" }}>
                    Learn more <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS — gold coin shower ══════════ */}
      <section id="process" className="sec-pad" style={{ padding:"108px 8%", position:"relative", overflow:"hidden", background:`linear-gradient(140deg, #FBF7F0 0%, #F7F0F3 100%)` }}>
        <GoldCoinShower />

        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <div style={{ ...eyebrow(GOLD), textAlign:"center" }}>The Process</div>
            <h2 style={{ ...displayTitle({ textAlign:"center", marginBottom:14 }) }}>
              Simple from <em style={{ color:ROSE, fontStyle:"italic" }}>start to finish</em>
            </h2>
            <p style={{ ...body({ textAlign:"center" }), maxWidth:400, margin:"0 auto" }}>
              No accounting jargon. No confusing meetings. Just four clear steps to financial peace.
            </p>
          </div>

          <div className="col-2-sm" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} className="card-hover" style={{ background:"rgba(255,255,255,.88)", backdropFilter:"blur(12px)", border:`1px solid ${s.c}22`, borderRadius:24, padding:"32px 24px", textAlign:"center", cursor:"default" }}>
                {/* Step number circle */}
                <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg, ${s.c}, ${s.c}BB)`, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, margin:"0 auto 20px", boxShadow:`0 8px 24px ${s.c}35` }}>
                  {s.n}
                </div>
                {/* connector line — desktop only */}
                {i < 3 && (
                  <div className="hide-sm" style={{ position:"absolute", top:"calc(32px + 26px)", left:"calc(50% + 26px + 10px)", width:"calc(100% - 52px - 20px)", height:1, background:`linear-gradient(90deg, ${s.c}60, ${STEPS[i+1].c}60)`, pointerEvents:"none" }} />
                )}
                <h4 style={{ fontSize:15, fontWeight:600, color:INK, marginBottom:10, letterSpacing:".01em" }}>{s.title}</h4>
                <p style={{ fontSize:13, color:"#888", lineHeight:1.78 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section id="testimonials" className="sec-pad" style={{ padding:"108px 8%", background:IVORY }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20, marginBottom:56 }}>
            <div>
              <div style={eyebrow()}>Client Stories</div>
              <h2 style={displayTitle()}>
                What clients<br />
                <em style={{ color:TEAL, fontStyle:"italic" }}>are saying</em>
              </h2>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              {starRow(5, 20)}
              <span style={{ fontSize:13, color:"#AAA", marginLeft:8 }}>5.0 average</span>
            </div>
          </div>

          <div className="col-1-sm" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {TESTI.map((t, i) => (
              <div key={i} className="card-hover" style={{ ...cardBase({ padding:"32px 28px", overflow:"hidden", position:"relative" }), cursor:"default" }}>
                {/* decorative quote mark */}
                <div style={{ position:"absolute", top:16, right:20, fontFamily:"'Cormorant Garamond',serif", fontSize:72, color:t.c, opacity:.07, lineHeight:1, pointerEvents:"none", userSelect:"none" }}>&ldquo;</div>
                {starRow(5, 13)}
                <p style={{ fontSize:14, color:"#666", lineHeight:1.88, fontStyle:"italic", margin:"16px 0 24px", position:"relative", zIndex:1 }}>
                  &ldquo;{t.q}&rdquo;
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:14, borderTop:"1px solid rgba(30,26,24,.07)", paddingTop:20 }}>
                  <div style={{ position:"relative", width:46, height:46, borderRadius:"50%", overflow:"hidden", border:`2px solid ${t.c}50`, flexShrink:0 }}>
                    <Image src={t.img} alt={t.name} fill style={{ objectFit:"cover", borderRadius:"50%" }} />
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:INK }}>{t.name}</div>
                    <div style={{ fontSize:11, color:"#AAA", marginTop:2, letterSpacing:".02em" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="sec-pad" style={{ padding:"108px 8%", background:"white" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div className="col-1-sm" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>

            {/* Left */}
            <div style={{ display:"flex", flexDirection:"column" }}>
              <div style={eyebrow()}>Get In Touch</div>
              <h2 style={displayTitle()}>
                Let&apos;s simplify your<br />
                <em style={{ color:ROSE, fontStyle:"italic" }}>books together</em>
              </h2>
              <p style={{ ...body(), marginBottom:26 }}>
                Ready to go from chaos to calm? I&apos;ll get back to you quickly — no jargon, no pressure,
                just a friendly conversation about your finances.
              </p>

              {/* Contact photo */}
              <div style={{ position:"relative", height:252, borderRadius:22, overflow:"hidden", marginBottom:28, boxShadow:`0 16px 48px rgba(30,26,24,.1), 0 0 0 1px rgba(212,168,67,.18)` }}>
                <Image src="/contact-photo.png" alt="Kimberlie Gerstner" fill style={{ objectFit:"cover", objectPosition:"center top" }} />
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, rgba(30,26,24,.6) 0%, transparent 52%)` }} />
                <div style={{ position:"absolute", bottom:18, left:22, color:"white" }}>
                  <div style={{ fontSize:15, fontWeight:600, letterSpacing:".02em" }}>Kimberlie Gerstner</div>
                  <div style={{ fontSize:12, opacity:.75, marginTop:2, letterSpacing:".03em" }}>Certified Bookkeeper</div>
                </div>
              </div>

              {/* Contact items */}
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  { icon:Mail,         label:"Email",    val:"kimberlie@booksbykimberlie.com", c:ROSE, href:"mailto:kimberlie@booksbykimberlie.com" },
                  { icon:Phone,        label:"Mobile",   val:"830-515-9818",                   c:TEAL, href:"tel:8305159818" },
                  { icon:Phone,        label:"Office",   val:"830-730-4160",                   c:GOLD, href:"tel:8307304160" },
                  { icon:MessageCircle,label:"WhatsApp", val:"Available",                      c:PLUM, href:"#contact" },
                ].map(d => (
                  <a key={d.label} href={d.href} style={{ display:"flex", alignItems:"center", gap:14, textDecoration:"none", padding:"12px 16px", borderRadius:14, background:MIST, border:"1px solid rgba(30,26,24,.06)", transition:"opacity .2s, transform .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = ".8"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateX(0)"; }}>
                    <div style={{ width:40, height:40, borderRadius:11, background:`${d.c}14`, border:`1px solid ${d.c}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <d.icon size={16} color={d.c} />
                    </div>
                    <div>
                      <div style={{ fontSize:10, fontWeight:600, color:"#BBB", letterSpacing:".08em", textTransform:"uppercase", marginBottom:1 }}>{d.label}</div>
                      <div style={{ fontSize:13, fontWeight:500, color:INK }}>{d.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div>
              {sent ? (
                <div style={{ ...cardBase({ padding:"52px 40px", textAlign:"center" }) }}>
                  <div style={{ width:76, height:76, borderRadius:"50%", background:`${ROSE}12`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 22px" }}>
                    <CheckCircle2 size={40} color={ROSE} />
                  </div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:400, color:INK, marginBottom:12 }}>Message sent!</h3>
                  <p style={{ ...body({ fontSize:14 }), maxWidth:320, margin:"0 auto 24px" }}>
                    Thanks for reaching out. I&apos;ll get back to you quickly — check your inbox for a confirmation.
                  </p>
                  <div style={{ background:MIST, borderRadius:14, padding:"16px 20px", fontSize:13, color:"#666", display:"flex", flexDirection:"column", gap:8, marginBottom:4 }}>
                    <span style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center" }}><Phone size={13} color={ROSE} /> 830-515-9818</span>
                    <span style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center" }}><Mail size={13} color={ROSE} /> kimberlie@booksbykimberlie.com</span>
                  </div>
                  <button onClick={() => { setSent(false); setFormErr(null); }} className="btn-hover"
                    style={primaryBtn({ width:"100%", justifyContent:"center", marginTop:20, borderRadius:14 }) as React.CSSProperties}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={sendContact} noValidate style={{ ...cardBase({ padding:"40px 38px" }) }}>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:400, color:INK, marginBottom:6 }}>Send a message</h3>
                  <p style={{ fontSize:13, color:"#AAA", marginBottom:28 }}>I&apos;ll respond within one business day.</p>

                  {formErr && (
                    <div style={{ background:"#FFF0F0", border:"1px solid #FFB3B3", borderRadius:10, padding:"12px 16px", fontSize:13, color:"#A8302C", display:"flex", gap:8, marginBottom:20 }}>
                      ⚠ {formErr}
                    </div>
                  )}

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                    {[
                      { label:"Your Name", type:"text",  ph:"Jane Smith",     val:name,  set:setName,  k:"name" },
                      { label:"Email",     type:"email", ph:"jane@biz.com",   val:email, set:setEmail, k:"email" },
                    ].map(f => (
                      <div key={f.k} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        <label style={{ fontSize:11, fontWeight:600, color:"#AAA", letterSpacing:".06em", textTransform:"uppercase" }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={f.val}
                          onChange={e => { f.set(e.target.value); setFldErr(p => ({ ...p, [f.k]:"" })); }}
                          disabled={sending} style={inputStyle(fldErr[f.k])}
                          onFocus={e => e.target.style.borderColor = ROSE}
                          onBlur={e => e.target.style.borderColor = fldErr[f.k] ? "#e74c3c" : "rgba(192,85,106,.2)"} />
                        {fldErr[f.k] && <span style={{ fontSize:11, color:"#e74c3c" }}>{fldErr[f.k]}</span>}
                      </div>
                    ))}
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:22 }}>
                    <label style={{ fontSize:11, fontWeight:600, color:"#AAA", letterSpacing:".06em", textTransform:"uppercase" }}>Tell me about your business</label>
                    <textarea placeholder="I'm a contractor and need help with..." value={msg}
                      onChange={e => { setMsg(e.target.value); setFldErr(p => ({ ...p, message:"" })); }}
                      disabled={sending}
                      style={{ ...inputStyle(fldErr.message), minHeight:130, resize:"vertical" } as React.CSSProperties}
                      onFocus={e => e.target.style.borderColor = ROSE}
                      onBlur={e => e.target.style.borderColor = fldErr.message ? "#e74c3c" : "rgba(192,85,106,.2)"} />
                    {fldErr.message && <span style={{ fontSize:11, color:"#e74c3c" }}>{fldErr.message}</span>}
                  </div>

                  <button type="submit" disabled={sending} className="btn-hover"
                    style={{ ...primaryBtn({ width:"100%", justifyContent:"center", borderRadius:14, opacity:sending ? .72 : 1, cursor:sending ? "not-allowed" : "pointer" }) as React.CSSProperties }}>
                    {sending
                      ? <><span style={{ width:15, height:15, border:"2px solid rgba(255,255,255,.35)", borderTopColor:"white", borderRadius:"50%", animation:"spin .7s linear infinite", display:"inline-block", flexShrink:0 }} /> Sending…</>
                      : <>Send Message <ArrowRight size={15} /></>
                    }
                  </button>
                  <p style={{ textAlign:"center", fontSize:12, color:"#CCC", marginTop:12, display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                    <CheckCircle2 size={12} color={TEAL} /> Quick responses · No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <div style={{ background:`linear-gradient(135deg, #2A1A1E 0%, #1A2420 100%)`, padding:"60px 8%" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", gap:32, flexWrap:"wrap" }}>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, color:"white", marginBottom:6, letterSpacing:"-.01em" }}>
              Stay in the loop
            </h3>
            <p style={{ fontSize:14, color:"rgba(255,255,255,.5)" }}>Helpful bookkeeping tips, money wins &amp; cheerful updates.</p>
          </div>
          {nlOk ? (
            <div style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,.85)", fontWeight:500, fontSize:14 }}>
              <CheckCircle2 size={18} color={TEAL} /> You&apos;re subscribed — thank you!
            </div>
          ) : (
            <form onSubmit={sendNl} noValidate style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ display:"flex", background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.14)", borderRadius:50, padding:5 }}>
                <input type="email" placeholder="your@email.com" value={nlEmail}
                  onChange={e => { setNlEmail(e.target.value); setNlErr(""); }}
                  disabled={nlBusy}
                  style={{ background:"transparent", border:"none", color:"white", padding:"10px 18px", fontSize:14, outline:"none", minWidth:220, fontFamily:"'Jost',sans-serif" }} />
                <button type="submit" disabled={nlBusy}
                  style={{ background:`linear-gradient(135deg, ${ROSE}, #D4756A)`, color:"white", border:"none", borderRadius:50, padding:"10px 26px", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
                  {nlBusy ? "Subscribing…" : "Subscribe"}
                </button>
              </div>
              {nlErr && <p style={{ fontSize:12, color:"rgba(255,255,255,.6)", paddingLeft:8 }}>{nlErr}</p>}
            </form>
          )}
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background:"#120D0F", padding:"68px 8% 28px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div className="col-2-sm" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr", gap:48, marginBottom:56 }}>

            <div>
              <Image src="/logo.png" alt="Books by Kimberlie" width={180} height={152}
                style={{ objectFit:"contain", filter:"brightness(0) invert(1)", marginBottom:16, display:"block" }} />
              <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.88, maxWidth:240, marginBottom:22 }}>
                Remote bookkeeping for builders, creatives &amp; businesses.<br />
                From chaos to calm, one ledger at a time.
              </p>
              <div style={{ display:"flex", gap:10 }}>
                {[{ I:Facebook, c:ROSE }, { I:Instagram, c:GOLD }, { I:Linkedin, c:TEAL }].map(({ I:Icon, c }, i) => (
                  <a key={i} href="#" style={{ width:34, height:34, borderRadius:9, background:`${c}14`, border:`1px solid ${c}30`, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", transition:"transform .2s, background .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = `${c}25`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = `${c}14`; }}>
                    <Icon size={14} color={c} />
                  </a>
                ))}
              </div>
            </div>

            {[
              { h:"Services", links:[{ l:"QuickBooks", href:"#services" },{ l:"Payroll", href:"#services" },{ l:"Financial Reports", href:"#services" },{ l:"Cash Flow", href:"#services" }] },
              { h:"Company",  links:[{ l:"About", href:"#about" },{ l:"How It Works", href:"#process" },{ l:"Reviews", href:"#testimonials" },{ l:"Contact", href:"#contact" }] },
              { h:"Contact",  links:[{ l:"kimberlie@booksbykimberlie.com", href:"mailto:kimberlie@booksbykimberlie.com" },{ l:"830-515-9818", href:"tel:8305159818" },{ l:"830-730-4160", href:"tel:8307304160" },{ l:"WhatsApp", href:"#contact" }] },
            ].map(col => (
              <div key={col.h}>
                <div style={{ fontSize:10, fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:ROSE, marginBottom:18 }}>{col.h}</div>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                  {col.links.map(l => (
                    <li key={l.l}>
                      <a href={l.href} style={{ fontSize:13, color:"rgba(255,255,255,.38)", textDecoration:"none", transition:"color .2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.8)"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.38)"}>
                        {l.l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <span style={{ fontSize:12, color:"rgba(255,255,255,.2)" }}>© {new Date().getFullYear()} Books by Kimberlie. All rights reserved.</span>
            <div style={{ display:"flex", gap:24 }}>
              {["Privacy Policy", "Terms of Service"].map(l => (
                <a key={l} href="#" style={{ fontSize:12, color:"rgba(255,255,255,.2)", textDecoration:"none", transition:"color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.55)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.2)"}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
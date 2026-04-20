// src/app/data.ts
import {
  BarChart3,
  Clock,
  TrendingUp,
  CreditCard,
  Receipt,
  FileText,
  Shield,
  Sparkles,
  LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  img: string;
  accent: string;
  bg: string;
  icon: LucideIcon;
  desc: string;
};

export const SERVICES: Service[] = [
  {
    title: "QuickBooks",
    img: "/quickbooks.png",
    accent: "#C0556A",
    bg: "#FDF4F6",
    icon: BarChart3,
    desc: "Expert setup and ongoing management so your books stay accurate, clean, and always tax-ready.",
  },
  {
    title: "Payroll",
    img: "/payroll.png",
    accent: "#3A9E8F",
    bg: "#F0F9F7",
    icon: Clock,
    desc: "On-time, every time. Smooth payroll runs so your team gets paid correctly and you stay compliant.",
  },
  {
    title: "Financial Reports",
    img: "/reports.png",
    accent: "#B07D3A",
    bg: "#FBF6EE",
    icon: TrendingUp,
    desc: "Clear, actionable reports showing exactly where your cash is going — and where it should be.",
  },
  {
    title: "Accounts Payable",
    img: "/payable.png",
    accent: "#7E6BA8",
    bg: "#F5F2FA",
    icon: CreditCard,
    desc: "Stay on top of every bill and vendor payment. We track, schedule, and manage what you owe so nothing slips through.",
  },
  {
    title: "Accounts Receivable",
    img: "/recivable.png",
    accent: "#C0556A",
    bg: "#FDF4F6",
    icon: Receipt,
    desc: "Get paid faster. We manage your invoices, follow up on outstanding balances, and keep your cash flowing in.",
  },
  {
    title: "Payment Processing",
    img: "/processing.png",
    accent: "#3A9E8F",
    bg: "#F0F9F7",
    icon: FileText,
    desc: "Accurate recording and reconciliation of every transaction — bank feeds, credit cards, and payments all in sync.",
  },
];

export const BOOKKEEPING_SERVICES = [
  "Record and organize financial transactions",
  "Categorize income and expenses accurately",
  "Reconcile bank and credit card accounts",
  "Manage accounts payable and accounts receivable",
  "Track invoices, bills, and payments",
  "Prepare basic financial reports",
  "Keep books clean, current, and easy to understand",
  "Organize receipts and supporting documents",
  "Help prepare records for tax time",
  "Identify errors, duplicates, and discrepancies",
  "Support cash flow tracking and financial visibility",
  "Maintain accurate records in accounting software",
];

export type Industry = {
  name: string;
  emoji: string;
  note: string;
  c: string;
  bg: string;
};

export const INDUSTRIES: Industry[] = [
  { name: "Construction", emoji: "🏗️", note: "Job costing, WIP tracking, subcontractor payments", c: "#B07D3A", bg: "#FBF6EE" },
  { name: "Hospitality", emoji: "🏨", note: "Revenue management, tips, seasonal cash flow", c: "#C0556A", bg: "#FDF4F6" },
  { name: "Tech & SaaS", emoji: "💻", note: "ARR tracking, payroll scaling, investor-ready books", c: "#7E6BA8", bg: "#F5F2FA" },
  { name: "Real Estate", emoji: "🏡", note: "Property management, escrow, rental income tracking", c: "#3A9E8F", bg: "#F0F9F7" },
  { name: "Retail & E-commerce", emoji: "🛍️", note: "Inventory, COGS, multi-channel payment reconciliation", c: "#B07D3A", bg: "#FBF6EE" },
  { name: "Professional Services", emoji: "💼", note: "Billable hours, retainer tracking, expense management", c: "#C0556A", bg: "#FDF4F6" },
  { name: "Healthcare", emoji: "🩺", note: "Insurance receivables, compliance, payroll management", c: "#3A9E8F", bg: "#F0F9F7" },
  { name: "Non-profit", emoji: "🤝", note: "Grant tracking, fund accounting, donor reporting", c: "#7E6BA8", bg: "#F5F2FA" },
];

export type WhyItem = {
  icon: LucideIcon;
  c: string;
  bg: string;
  title: string;
  desc: string;
};

export const WHY: WhyItem[] = [
  {
    icon: Shield,
    c: "#C0556A",
    bg: "#FDF4F6",
    title: "Controller/CFO Experience",
    desc: "Provided senior accounting leadership for decades, guiding businesses from $100,000 startups to multi-million-dollar companies with confidence, precision, and strategic financial oversight.",
  },
  {
    icon: Clock,
    c: "#3A9E8F",
    bg: "#F0F9F7",
    title: "Proven Across Industries",
    desc: "Construction job costing, hospitality revenue management, banking compliance, and tech payroll scaling.",
  },
  {
    icon: TrendingUp,
    c: "#B07D3A",
    bg: "#FBF6EE",
    title: "QuickBooks Specialist",
    desc: "Setup, cleanup, automation, and monthly maintenance that actually saves you time and headaches.",
  },
  {
    icon: Sparkles,
    c: "#7E6BA8",
    bg: "#F5F2FA",
    title: "GAAP-Compliant Reporting",
    desc: "P&L, Balance Sheet, cash flow your CPA will love and you will actually understand.",
  },
];

export type Step = {
  n: string;
  c: string;
  title: string;
  desc: string;
};

export const STEPS: Step[] = [
  { n: "01", c: "#C0556A", title: "Free Consultation", desc: "We talk through your business, pain points, and what calm finances looks like for you." },
  { n: "02", c: "#3A9E8F", title: "Custom Setup", desc: "I tailor QuickBooks, workflows, and reporting to match exactly how you operate." },
  { n: "03", c: "#B07D3A", title: "Ongoing Support", desc: "Monthly bookkeeping, payroll, and reconciliations — delivered on time, every time." },
  { n: "04", c: "#7E6BA8", title: "Clear Insights", desc: "Regular reports and proactive advice so you always know exactly where you stand." },
];

export type SimpleTestimonial = {
  variant?: "simple";
  q: string;
  name: string;
  role: string;
  img: string;
  c: string;
  logo: true;
};

export type ExpandTestimonial = {
  variant: "expand";
  preview: string;
  strengths: string[];
  closing: string;
  name: string;
  role: string;
  img: string;
  c: string;
  logo: true;
};

export type Testimonial = SimpleTestimonial | ExpandTestimonial;

export const TESTIMONIALS: Testimonial[] = [
  {
    q: "Books by Kimberlie has been a game changer for our construction business. Kimberlie understands construction accounting, keeps our books accurate and current, and gives us clear financial insight to make better decisions. She is timely, dependable, and quick to solve problems, bringing professionalism and peace of mind every step of the way. Five stars.",
    name: "VR Construction",
    role: "Construction",
    img: "/construction.png",
    c: "#B07D3A",
    logo: true,
  },
  {
    q: "Kimberlie makes our accounting easy and simple. She tracks money in and out perfect, keeps books clean, and helps us run better. Always positive and pro—best partner for our business!",
    name: "Innovative Plastering",
    role: "Plastering",
    img: "/innovative%20plusturing.png",
    c: "#3A9E8F",
    logo: true,
  },
  {
    variant: "expand",
    preview:
      "Books by Kimberlie provides exceptional accounting for our complex, high-volume operations at 1to1 Plans, where credit card transactions, multi-channel payments, and tech-construction revenue streams demand precision and adaptability.",
    strengths: [
      "Expertly manages high-volume credit card/digital transactions with flawless categorization and reconciliation.",
      "Organizes layered revenue models for clear structure across client payments.",
      "Delivers seamless systems integration across platforms, ensuring efficient alignment.",
      "Produces timely, insightful financial reports that drive confident decisions.",
    ],
    closing:
      "Kimberlie's proactive communication, calm professionalism, and forward-thinking support resolve issues before they escalate, building total trust. She transforms fragmented financials into a streamlined, reliable system—ideal for tech-construction hybrids.",
    name: "1to1 Plans",
    role: "New Braunfels, TX",
    img: "/1tolplans.png",
    c: "#7E6BA8",
    logo: true,
  },
  {
    variant: "expand",
    preview:
      "Bespoke Fine Homes partnered with Books by Kimberlie six months ago for our custom home building and small commercial construction accounting needs. From day one, Kimberlie brought exceptional clarity, structure, and confidence to this intricate and demanding area of our business.",
    strengths: [
      "Unmatched accuracy: meticulous financial preparation and organization ensure total confidence in our numbers.",
      "Job costing expertise: masterful tracking of budgets, allocations, and real-time project costs across every job.",
      "Actionable reporting: timely, insightful reports that guide decisions and keep projects financially on track.",
    ],
    closing:
      "Kimberlie's proactive communication, unwavering responsiveness, and solution-focused approach keep us informed and supported. Her calm professionalism and positive attitude transform overwhelming accounting challenges into a streamlined, enjoyable process—making her a trusted team extension.",
    name: "Bespoke Fine Homes",
    role: "Custom home building",
    img: "/bespokefinehomes.png",
    c: "#C0556A",
    logo: true,
  },
];

export const CLIENT_LOGOS = [
  { src: "/construction.png", alt: "VR Construction" },
  { src: "/innovative%20plusturing.png", alt: "Innovative Plastering" },
  { src: "/1tolplans.png", alt: "1to1 Plans" },
  { src: "/bespokefinehomes.png", alt: "Bespoke Fine Homes" },
];

export const NAV_LINKS = ["About", "Services", "Process", "Contact"];

export const HERO_STATS = [
  { v: "30+", l: "Years Exp.", c: "#C0556A" },
  { v: "200+", l: "Happy Clients", c: "#3A9E8F" },
  { v: "100%", l: "Remote", c: "#B07D3A" },
  { v: "$0", l: "Hidden Fees", c: "#7E6BA8" },
];

export const WHAT_SETS_APART = [
  "Extensive Controller/CFO experience across multiple industries",
  "QuickBooks specialist — setup, cleanup & automation",
  "GAAP-compliant P&L, Balance Sheet & cash flow reporting",
  "Available as on-going monthly support or one-time project work",
  "Clean books = more money in your pocket + zero tax-season panic",
];

export const ABOUT_TAGS = [
  "Controller/CFO",
  "Construction",
  "Hospitality",
  "Banking",
  "Tech",
  "GAAP Reporting",
  "Outsourced Accounting",
];
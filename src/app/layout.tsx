import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Books by Kimberlie | Bookkeeping & Outsourced Accounting Services",
  description:
    "Professional bookkeeping and outsourced accounting services for businesses of every kind. QuickBooks setup, payroll, financial reports, Controller & CFO services. Remote bookkeeper serving all 50 states from Vermont.",
  keywords: [
    "outsourced accounting services",
    "bookkeeping services",
    "QuickBooks bookkeeper",
    "remote bookkeeper Vermont",
    "outsourced CFO",
    "controller services",
    "small business accounting",
    "payroll services",
    "financial reports",
    "GAAP reporting",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Books by Kimberlie | Outsourced Accounting & Bookkeeping",
    description:
      "From chaos to calm — professional bookkeeping and outsourced accounting for growing businesses.",
    url: "https://booksbykimberlie.com",
    siteName: "Books by Kimberlie",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-cream text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
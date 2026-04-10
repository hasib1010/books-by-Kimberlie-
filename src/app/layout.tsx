import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Books by Kimberlie - Expert Bookkeeping",
  description: "Remote bookkeeping for builders, creatives & businesses",
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

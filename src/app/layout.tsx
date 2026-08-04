import type { Metadata } from "next";
import { Poppins, Roboto, Figtree, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NattyPay — One Wallet. Multiple Currencies. Endless Possibilities.",
  description:
    "NattyPay is a next-generation digital banking platform. Transforming Banking Experiences — Empower Your Finances where security meets simplicity for seamless online banking. Licenced by CBN.",
  keywords: "NattyPay, digital banking, fintech, Nigeria, multicurrency wallet, online banking, CBN licensed",
  openGraph: {
    title: "NattyPay — One Wallet. Multiple Currencies.",
    description: "Transforming Banking Experiences. Empower Your Finances with NattyPay.",
    type: "website",
  },
};

import ScrollToTop from '@/components/ui/ScrollToTop';
import FloatingSupportWidget from '@/components/ui/FloatingSupportWidget';
import TermsConsentBanner from '@/components/ui/TermsConsentBanner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} ${figtree.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        {children}
        <ScrollToTop />
        <FloatingSupportWidget />
        <TermsConsentBanner />
      </body>
    </html>
  );
}

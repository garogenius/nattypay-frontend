"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TermsHeroSection from '../components/TermsHeroSection';
import TermsContentSection from '../components/TermsContentSection';
import FaqSupportSection from '@/features/faq/components/FaqSupportSection';

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F9F9FB] overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />

      {/* Hero Section */}
      <TermsHeroSection />

      {/* Main Legal Content */}
      <div className="w-full flex justify-center bg-[#0B0B0F]">
        <TermsContentSection />
      </div>

      {/* Account / Support Section */}
      <div className="w-full bg-[#F5F5F5]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <FaqSupportSection />
      </div>

      <Footer />
    </main>
  );
}

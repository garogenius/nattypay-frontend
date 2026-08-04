"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TermsConditionHeroSection from '../components/TermsConditionHeroSection';
import TermsConditionContentSection from '../components/TermsConditionContentSection';
import FaqSupportSection from '@/features/faq/components/FaqSupportSection';

export default function TermsConditionPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F9F9FB] overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />

      {/* Hero Section */}
      <TermsConditionHeroSection />

      {/* Main Legal Content */}
      <div className="w-full flex justify-center bg-[#0B0B0F]">
        <TermsConditionContentSection />
      </div>

      {/* Account / Support Section */}
      <div className="w-full bg-[#F5F5F5]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <FaqSupportSection />
      </div>

      <Footer />
    </main>
  );
}

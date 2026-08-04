"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RefundPolicyHeroSection from '../components/RefundPolicyHeroSection';
import RefundPolicyContentSection from '../components/RefundPolicyContentSection';
import FaqSupportSection from '@/features/faq/components/FaqSupportSection';

export default function RefundPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F9F9FB] overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />
      
      {/* Hero Section */}
      <RefundPolicyHeroSection />

      {/* Main Legal Content */}
      <div className="w-full flex justify-center bg-white">
        <RefundPolicyContentSection />
      </div>

      {/* Account / Support Section */}
      <div className="w-full bg-[#FFFFFF]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <FaqSupportSection />
      </div>

      <Footer />
    </main>
  );
}

"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PrivacyPolicyHeroSection from '../components/PrivacyPolicyHeroSection';
import PrivacyPolicyContentSection from '../components/PrivacyPolicyContentSection';
import FaqSupportSection from '@/features/faq/components/FaqSupportSection';

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />
      
      {/* Hero Section */}
      <PrivacyPolicyHeroSection />

      {/* Main Legal Content */}
      <div className="w-full flex justify-center bg-[#F4F6F8]">
        <PrivacyPolicyContentSection />
      </div>

      {/* Account / Support Section */}
      <div className="w-full bg-[#FFFFFF]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <FaqSupportSection />
      </div>

      <Footer />
    </main>
  );
}

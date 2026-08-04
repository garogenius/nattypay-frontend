"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqHeroSection from '../components/FaqHeroSection';
import FaqMissionVisionSection from '../components/FaqMissionVisionSection';
import FaqAccordionSection from '../components/FaqAccordionSection';
import FaqSupportSection from '../components/FaqSupportSection';

export default function FaqPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F9F9FB] overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />

      {/* Hero Section */}
      <FaqHeroSection />

      {/* Main Content Area */}
      <div className="w-full flex justify-center">
        <section className="max-w-[1234px] w-full flex flex-col items-center mt-20 md:mt-32 pb-16 md:pb-24 gap-12 md:gap-20 px-4">

          {/* Intro */}
          <div className="flex flex-col items-center text-center gap-2 max-w-[747px]">
            <h2 className="text-black font-medium text-[28px] md:text-[38px] leading-[36px] md:leading-[57px] font-poppins">
              Frequently Asked Questions
            </h2>
            <p className="text-black text-[15px] md:text-[18px] leading-[24px] md:leading-[32px] font-poppins opacity-80">
              See some of the frequently asked questions from our customers about our services
            </p>
          </div>

          {/* Mission and Vision */}
          <FaqMissionVisionSection />

          {/* FAQs Grid */}
          <FaqAccordionSection />

        </section>
      </div>

      {/* Account / Support Section — with gap above and below */}
      <div className="w-full" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <FaqSupportSection />
      </div>

      <Footer />
    </main>
  );
}

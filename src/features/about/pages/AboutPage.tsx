"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutHeroSection from '../components/AboutHeroSection';
import AboutCommitmentSection from '../components/AboutCommitmentSection';
import AboutValuesSection from '../components/AboutValuesSection';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      <Header currentCurrency="NGN" />

      {/* Hero Section */}
      <AboutHeroSection />

      {/* 25px Gap between Hero and Commitment (883px - 858px) */}
      <div className="w-full h-[25px] flex-shrink-0" />

      {/* Commitment Section */}
      <AboutCommitmentSection />

      {/* 127px Gap between Commitment and Values (1675px - 1548px) */}
      <div className="w-full h-[127px] flex-shrink-0" />

      {/* Values (Manage) Section */}
      <AboutValuesSection />
      <div className="w-full h-[100px] flex-shrink-0" />
      <Footer />
    </main>
  );
}

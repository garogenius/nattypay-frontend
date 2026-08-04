"use client";

import React from 'react';
import DeveloperHeader from '../components/DeveloperHeader';
import DeveloperHeroSection from '../components/DeveloperHeroSection';
import Footer from '@/components/layout/Footer';

export default function DevelopersLandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-['Poppins']">
      <DeveloperHeader />
      <DeveloperHeroSection />
      
      {/* Rest of the developer content would go here */}
      <div className="flex-1 min-h-[400px] bg-white"></div>
      
      <Footer />
    </main>
  );
}

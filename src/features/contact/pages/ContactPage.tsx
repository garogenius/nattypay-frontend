"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactHeroSection from '../components/ContactHeroSection';
import ContactFormSection from '../components/ContactFormSection';
import ContactSocialSection from '../components/ContactSocialSection';

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />

      {/* Hero Section */}
      <ContactHeroSection />

      {/* White gap between hero and form */}
      <div style={{ height: '80px' }} />

      {/* Main Content Area — centered */}
      <div className="w-full flex justify-center">
        <ContactFormSection />
      </div>

      {/* White gap between form and social */}
      <div style={{ height: '80px' }} />

      {/* Social Section */}
      <ContactSocialSection />

      {/* White gap between social and footer */}
      <div style={{ height: '80px' }} />

      <Footer />
    </main>
  );
}

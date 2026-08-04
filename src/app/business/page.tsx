import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BusinessHero from '@/features/business/components/BusinessHero';
import BusinessFeatures from '@/features/business/components/BusinessFeatures';
import BusinessScaleSection from '@/features/business/components/BusinessScaleSection';
import BusinessDashboardShowcase from '@/features/business/components/BusinessDashboardShowcase';
import BusinessCTA from '@/features/business/components/BusinessCTA';

export default function BusinessAccountPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Header />
      
      {/* Page Content */}
      <div className="flex-1">
        <BusinessHero />
        <BusinessFeatures />
        <BusinessDashboardShowcase />
        <BusinessScaleSection />
        <BusinessCTA />
      </div>

      <Footer />
    </main>
  );
}

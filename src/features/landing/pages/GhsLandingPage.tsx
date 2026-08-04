import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GhsHeroSection from '@/features/landing/components/GhsHeroSection';
import ServicesStrip from '@/features/landing/components/ServicesStrip';
import FinancialSuccessSection from '@/features/landing/components/FinancialSuccessSection';
import NotificationsSection from '@/features/landing/components/NotificationsSection';
import LiveExchangeSection from '@/features/landing/components/LiveExchangeSection';
import MulticurrencySection from '@/features/landing/components/MulticurrencySection';
import PartnersSection from '@/features/landing/components/PartnersSection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import ManageSection from '@/features/landing/components/ManageSection';
import WhyChooseSection from '@/features/landing/components/WhyChooseSection';
import GhsHowItWorksSection from '@/features/landing/components/GhsHowItWorksSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import NewsSection from '@/features/landing/components/NewsSection';
import DownloadSection from '@/features/landing/components/DownloadSection';

export default function GhsLandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header currentCurrency="GHS" />

      {/* GHS Hero Section */}
      <GhsHeroSection />

      <PartnersSection />
      <div style={{ width: '100%', backgroundColor: '#D9D9D9', height: '24px' }} />
      <MulticurrencySection activeCurrencyCode="GHS" />
      {/* <div style={{ width: '100%', backgroundColor: '#D9D9D9', height: '24px' }} />
      <ServicesStrip />
      <div style={{ width: '100%', backgroundColor: '#D9D9D9', height: '24px' }} /> */}
      <LiveExchangeSection targetCurrency="GHS" />
      {/* <div style={{ width: '100%', backgroundColor: '#D9D9D9', height: '24px' }} /> */}
      {/* <FinancialSuccessSection /> */}
      {/* <div style={{ width: '100%', backgroundColor: '#D9D9D9', height: '24px' }} /> */}
      {/* <NotificationsSection /> */}
      <ManageSection />
      {/* <WhyChooseSection /> */}

      <GhsHowItWorksSection />

      {/* <FeaturesSection /> */}
      <TestimonialsSection />
      <NewsSection />
      <DownloadSection />
      <Footer />
    </main>
  );
}

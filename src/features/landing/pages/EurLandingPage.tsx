import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EurHeroSection from '@/features/landing/components/EurHeroSection';
import ServicesStrip from '@/features/landing/components/ServicesStrip';
import FinancialSuccessSection from '@/features/landing/components/FinancialSuccessSection';
import NotificationsSection from '@/features/landing/components/NotificationsSection';
import LiveExchangeSection from '@/features/landing/components/LiveExchangeSection';
import MulticurrencySection from '@/features/landing/components/MulticurrencySection';
import PartnersSection from '@/features/landing/components/PartnersSection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import ManageSection from '@/features/landing/components/ManageSection';
import WhyChooseSection from '@/features/landing/components/WhyChooseSection';
import HowItWorksSection from '@/features/landing/components/HowItWorksSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import NewsSection from '@/features/landing/components/NewsSection';
import DownloadSection from '@/features/landing/components/DownloadSection';
import EurLiveExchangeSection from '../components/EurLiveExchangeSection';
import EurServiceSection from '../components/EurServiceSection';

export default function EurLandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header currentCurrency="EUR" />

      {/* EUR Specific Hero Section */}
      <EurHeroSection />

      <PartnersSection />
      <div style={{ width: '100%', backgroundColor: '#D9D9D9', height: '24px' }} />
      <MulticurrencySection activeCurrencyCode="EUR" />
      <EurLiveExchangeSection />
      <EurServiceSection />
      <TestimonialsSection />
      <NewsSection />
      <DownloadSection />
      <Footer />
    </main>
  );
}

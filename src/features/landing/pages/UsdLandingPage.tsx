import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UsdHeroSection from '@/features/landing/components/UsdHeroSection';
import ServicesStrip from '@/features/landing/components/ServicesStrip';
import FinancialSuccessSection from '@/features/landing/components/FinancialSuccessSection';
import NotificationsSection from '@/features/landing/components/NotificationsSection';
import LiveExchangeSection from '@/features/landing/components/LiveExchangeSection';
import UsdLiveExchangeSection from '@/features/landing/components/UsdLiveExchangeSection';
import UsdTransferSection from '@/features/landing/components/UsdTransferSection';
import MulticurrencySection from '@/features/landing/components/MulticurrencySection';
import PartnersSection from '@/features/landing/components/PartnersSection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import ManageSection from '@/features/landing/components/ManageSection';
import WhyChooseSection from '@/features/landing/components/WhyChooseSection';
import HowItWorksSection from '@/features/landing/components/HowItWorksSection';
import FeaturesSection from '@/features/landing/components/FeaturesSection';
import NewsSection from '@/features/landing/components/NewsSection';
import DownloadSection from '@/features/landing/components/DownloadSection';

export default function UsdLandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header currentCurrency="USD" />
      <UsdHeroSection />

      <PartnersSection />

      {/* Separator */}
      <div style={{ width: '100%', backgroundColor: '#D9D9D9', height: '24px' }} />

      <MulticurrencySection activeCurrencyCode="USD" />
      <UsdLiveExchangeSection />
      <UsdTransferSection />
      <TestimonialsSection />

      <NewsSection />

      <DownloadSection />

      <Footer />
    </main>
  );
}

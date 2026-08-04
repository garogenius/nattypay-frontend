import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';

export default async function CurrencyLandingPage({ params }: { params: Promise<{ currency: string }> }) {
  const { currency } = await params;
  const currencyUpper = currency.toUpperCase();

  const validCurrencies = ['USD', 'GBP', 'EUR', 'GHS'];
  
  if (!validCurrencies.includes(currencyUpper)) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header currentCurrency={currencyUpper} />
      
      {/* Placeholder for the specific currency landing page */}
      <section className="flex-1 w-full flex items-center justify-center py-32 bg-gray-50">
        <div className="text-center">
          <h1 className="font-poppins text-4xl font-semibold mb-4 text-black">
            {currencyUpper} Landing Page
          </h1>
          <p className="font-poppins text-gray-500">
            This design will be implemented according to the {currencyUpper} UI specifications.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

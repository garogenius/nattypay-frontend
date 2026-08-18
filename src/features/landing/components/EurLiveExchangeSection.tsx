"use client";

import React, { useState, useEffect } from 'react';

const getFlagUrl = (currency: string) => {
  switch (currency.toUpperCase()) {
    case 'USD': return 'https://flagcdn.com/w80/us.png';
    case 'EUR': return 'https://flagcdn.com/w80/eu.png';
    case 'GBP': return 'https://flagcdn.com/w80/gb.png';
    case 'KES': return 'https://flagcdn.com/w80/ke.png';
    case 'GHS': return 'https://flagcdn.com/w80/gh.png';
    case 'UGX': return 'https://flagcdn.com/w80/ug.png';
    case 'NGN': return 'https://flagcdn.com/w80/ng.png';
    default: return 'https://flagcdn.com/w80/un.png';
  }
};

interface RateData {
  currency: string;
  pair: string;
  flag1: string;
  flag2: string;
  rate: string;
  rawRate: number;
  trend: 'up' | 'down';
}

const initialRates: RateData[] = [
  { currency: 'USD', pair: 'USD/NGN', flag1: 'https://flagcdn.com/w80/us.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,550.00', rawRate: 1550, trend: 'up' },
  { currency: 'EUR', pair: 'EUR/NGN', flag1: 'https://flagcdn.com/w80/eu.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,680.00', rawRate: 1680, trend: 'up' },
  { currency: 'GBP', pair: 'GBP/NGN', flag1: 'https://flagcdn.com/w80/gb.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,980.00', rawRate: 1980, trend: 'up' },
  { currency: 'KES', pair: 'KES/NGN', flag1: 'https://flagcdn.com/w80/ke.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N12.00', rawRate: 12, trend: 'down' },
  { currency: 'GHS', pair: 'GHS/NGN', flag1: 'https://flagcdn.com/w80/gh.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N105.00', rawRate: 105, trend: 'down' },
  { currency: 'UGX', pair: 'UGX/NGN', flag1: 'https://flagcdn.com/w80/ug.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N0.42', rawRate: 0.42, trend: 'down' },
];

const steps = [
  { number: '1', title: 'Create Account', subtitle: 'Sign up and verify your account' },
  { number: '2', title: 'Fund Wallet', subtitle: 'Add fund via bank transfer or card' },
  { number: '3', title: 'Send payment', subtitle: 'Send money globally in minute' },
];

export default function EurLiveExchangeSection() {
  const [exchangeRates, setExchangeRates] = useState<RateData[]>(initialRates);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [tagPosition, setTagPosition] = useState<'left' | 'right' | 'center'>('right');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/public/currencies/rates`);
        const data = await res.json();
        
        if (data && data.rates) {
          const mappedRates = data.rates.map((r: any) => ({
            currency: r.currency,
            pair: `${r.currency}/${data.baseCurrency}`,
            flag1: getFlagUrl(r.currency),
            flag2: getFlagUrl(data.baseCurrency),
            rate: `N${Number(r.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            rawRate: Number(r.rate),
            trend: Number(r.rate) < 500 ? 'down' : 'up'
          }));
          setExchangeRates(mappedRates);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRates();
  }, []);

  // Automatically cycle and rotate currencies every 2 seconds
  useEffect(() => {
    if (exchangeRates.length <= 1) return;
    
    const interval = setInterval(() => {
      setExchangeRates(prevRates => {
        const newRates = [...prevRates];
        const first = newRates.shift();
        if (first) {
          newRates.push(first);
          setSelectedCurrency(newRates[0].currency);
        }
        return newRates;
      });
      const positions: ('left' | 'right' | 'center')[] = ['left', 'right', 'center'];
      setTagPosition(positions[Math.floor(Math.random() * positions.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [exchangeRates.length]);

  return (
    <section
      className="w-full flex justify-center"
      style={{ padding: '60px 20px', backgroundColor: '#F1F1EB' }}
    >
      <div
        className="w-full flex flex-col lg:flex-row lg:items-start items-center"
        style={{ maxWidth: '1324px', gap: '35px' }}
      >

        {/* ─── Left Card: How it Works (yellow gradient) ─── */}
        <div
          style={{
            flex: '1 1 400px',
            maxWidth: '786px',
            minHeight: '492px',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, #FFCE65 0%, #FFFFFF 100%)',
            padding: '32px 40px 48px 52px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '34px', lineHeight: 1.5, color: '#000', margin: 0 }}>
            How it Works
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((step) => (
              <div
                key={step.number}
                className={step.number === '3' ? 'hidden md:flex' : 'flex'}
                style={{
                  backgroundColor: '#000000',
                  borderRadius: '36px',
                  padding: '20px 24px',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '24px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Number Circle */}
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  backgroundColor: '#FFCE65',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '32px', lineHeight: 1, color: '#000' }}>
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '20px', color: '#FFCE65', lineHeight: 1.4 }}>
                    {step.title}
                  </span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '13px', color: '#FFCE65', lineHeight: 1.5, opacity: 0.85 }}>
                    {step.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right Card: Blue Exchange Rate ─── */}
        <div
          className="w-full relative"
          style={{
            maxWidth: '503px',
            backgroundColor: '#003399',
            borderRadius: '40px',
            padding: '30px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flexShrink: 0,
          }}
        >
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '26px', lineHeight: 1.5, color: '#F0BF4C', margin: 0 }}>
            Live Exchange Rate
          </h2>
          
          {/* Active rates floating tags - Half outside */}
          <div className={`absolute -top-[14px] ${tagPosition === 'left' ? 'left-6 lg:left-10' : tagPosition === 'center' ? 'left-1/2 -translate-x-1/2' : 'right-6 lg:right-10'} flex items-center gap-2 lg:gap-3 z-10 transition-all duration-700 ease-in-out`} style={{ top: '-14px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
            {exchangeRates.slice(0, 3).map((rate, idx) => (
              <div key={`tag-${rate.currency}-${idx}`} className={`bg-white px-3 py-1.5 rounded-[12px] border-[1.5px] border-[#F0BF4C] transition-all duration-300 ${idx > 1 ? 'hidden lg:flex' : 'flex'}`} style={{ backgroundColor: '#ffffff', padding: '6px 12px', borderRadius: '12px', border: '1.5px solid #F0BF4C', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                 <span className="relative flex h-2.5 w-2.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                 </span>
                 <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '13px', color: '#000000', whiteSpace: 'nowrap' }}>
                   <span style={{ fontWeight: 700, color: '#F0BF4C' }}>{rate.pair}</span> {rate.rate}
                 </span>
              </div>
            ))}
          </div>

          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-70' : 'opacity-100'}`} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {exchangeRates.map((item, index) => (
              <React.Fragment key={index}>
                <div style={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 'calc(100% + 20px)',
                  padding: '10px', margin: '0 -10px', borderRadius: '8px',
                  backgroundColor: selectedCurrency === item.currency ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}>

                  {/* Flags + Pair */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', flex: '1 1 0', minWidth: 0 }}>
                    <div style={{ position: 'relative', width: '34px', height: '34px', flexShrink: 0 }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundImage: `url(${item.flag1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }} />
                      <div style={{ position: 'absolute', bottom: 0, right: '-6px', width: '16px', height: '16px', borderRadius: '50%', backgroundImage: `url(${item.flag2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd', border: '2px solid white' }} />
                    </div>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '15px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                      {item.pair}
                    </span>
                  </div>

                  {/* Rate */}
                  <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'center', minWidth: 0 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '15px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                      {item.rate}
                    </span>
                  </div>

                  {/* Button */}
                  <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
                    <div style={{
                      display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '5px',
                      padding: '5px 10px', borderRadius: '8px', minWidth: '75px', height: '30px',
                      backgroundColor: item.trend === 'up' ? 'rgba(70, 185, 0, 0.52)' : 'rgba(255, 0, 0, 0.45)',
                      flexShrink: 0,
                    }}>
                      {item.trend === 'up' ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                        </svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
                        </svg>
                      )}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#F5F5F5', whiteSpace: 'nowrap' }}>Button</span>
                    </div>
                  </div>
                </div>

                {index < exchangeRates.length - 1 && (
                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

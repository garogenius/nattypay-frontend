import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BusinessHero() {
  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <section className="relative w-full min-w-[1440px] bg-black flex items-center min-h-[800px] overflow-hidden" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
          
          {/* Background Accent Grid / Glow */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #F0BF4C 0%, transparent 40%)' }} />
          
          <div 
            className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-row items-center h-full justify-between"
            style={{ paddingLeft: '96px', paddingRight: '96px', gap: '78px' }}
          >
            
            {/* Left: Content */}
            <div className="flex flex-col items-start w-[632px] flex-shrink-0" style={{ gap: '32px' }}>
              <div className="flex flex-col" style={{ gap: '16px' }}>
                <h1 className="font-poppins font-bold text-[64px] leading-[1.1] text-white m-0 tracking-tight">
                  Power Your Business with <span className="text-[#F0BF4C]">Limitless Scale.</span>
                </h1>
                <p className="font-poppins font-normal text-[20px] leading-[1.6] text-[#CCCCCC] m-0 w-full">
                  Corporate accounts built for Africa's fastest-growing companies. Manage bulk transfers, automated payroll, and multi-currency wallets from a single powerful dashboard.
                </p>
              </div>
              
              <div className="flex flex-row items-center w-full" style={{ gap: '16px', marginTop: '8px' }}>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center bg-[#F0BF4C] hover:bg-[#EBBB4D] rounded-[12px] font-poppins font-semibold text-[16px] text-black transition-colors shadow-[0_4px_20px_rgba(240,191,76,0.3)] hover:shadow-[0_6px_25px_rgba(240,191,76,0.4)]"
                  style={{ height: '56px', padding: '0 32px' }}
                >
                  Open a Business Account
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center bg-transparent border border-[#555555] hover:border-[#F0BF4C] hover:text-[#F0BF4C] rounded-[12px] font-poppins font-medium text-[16px] text-white transition-colors"
                  style={{ height: '56px', padding: '0 32px' }}
                >
                  Contact Sales
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-col w-full border-t border-[#333333]" style={{ gap: '12px', marginTop: '24px', paddingTop: '24px' }}>
                <p className="font-poppins font-medium text-[12px] text-[#777777] uppercase tracking-widest m-0">
                  Trusted by 10,000+ Businesses
                </p>
                <div className="flex items-center opacity-60 grayscale hover:grayscale-0 transition-all" style={{ gap: '24px' }}>
                  <div className="font-bold text-white/80 font-poppins text-lg leading-none">FinTech Co.</div>
                  <div className="font-bold text-white/80 font-poppins text-lg leading-none">TechStart</div>
                  <div className="font-bold text-white/80 font-poppins text-lg leading-none">GlobalCorp</div>
                </div>
              </div>
            </div>

            {/* Right: Graphic / Dashboard Mockup */}
            <div className="flex-shrink-0 w-[531px] relative">
              <div className="relative w-full aspect-[4/3] rounded-[40px] bg-[#111111] border border-[#333333] shadow-2xl overflow-hidden flex items-center justify-center group p-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#221c0b]" />
                <Image
                  src="/img/d1.png"
                  alt="Business Dashboard Preview"
                  fill
                  className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
          </div>
        </section>
      </div>

      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <section 
          className="relative w-full bg-black overflow-hidden flex flex-col items-center justify-center"
          style={{ paddingTop: '64px', paddingBottom: '80px' }}
        >
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #F0BF4C 0%, transparent 40%)' }} />
          
          <div 
            className="relative z-10 w-full mx-auto flex flex-col items-start h-full"
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
          >
            
            <div className="w-full flex flex-col items-start gap-8">
              <div className="flex flex-col gap-4 w-full">
                <h1 className="font-poppins font-bold text-[36px] md:text-[56px] leading-[1.1] text-white w-full m-0 tracking-tight">
                  Power Your Business with <span className="text-[#F0BF4C]">Limitless Scale.</span>
                </h1>
                <p className="font-poppins font-normal text-[15px] text-[#CCCCCC] leading-[1.6] w-full m-0">
                  Corporate accounts built for Africa's fastest-growing companies. Manage bulk transfers, automated payroll, and multi-currency wallets from a single powerful dashboard.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <Link 
                  href="/contact" 
                  className="flex-1 w-full flex items-center justify-center bg-[#F0BF4C] hover:bg-[#EBBB4D] rounded-[10px] font-poppins font-semibold text-[15px] text-black transition-colors"
                  style={{ padding: '14px 20px' }}
                >
                  Open Business Account
                </Link>
                <Link 
                  href="/contact" 
                  className="flex-1 w-full flex items-center justify-center bg-transparent border border-[#555555] hover:border-[#F0BF4C] hover:text-[#F0BF4C] rounded-[10px] font-poppins font-medium text-[15px] text-white transition-colors"
                  style={{ padding: '14px 20px' }}
                >
                  Contact Sales
                </Link>
              </div>

              {/* Graphic Mockup for Mobile */}
              <div className="w-full relative mt-6 mb-6">
                <div className="relative w-full aspect-[4/3] rounded-[24px] bg-[#111111] border border-[#333333] shadow-2xl overflow-hidden flex items-center justify-center p-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#221c0b]" />
                  <Image
                    src="/img/d1.png"
                    alt="Business Dashboard Preview"
                    fill
                    className="object-cover object-top opacity-90"
                  />
                </div>
              </div>
              
              <div className="flex flex-col w-full border-t border-[#333333] pt-6">
                <p className="font-poppins font-medium text-[11px] text-[#777777] uppercase tracking-widest text-center m-0" style={{ marginBottom: '16px' }}>
                  Trusted by 10,000+ Businesses
                </p>
                <div className="flex items-center justify-center gap-6 opacity-60">
                  <div className="font-bold text-white/80 font-poppins text-[13px] leading-none">FinTech Co.</div>
                  <div className="font-bold text-white/80 font-poppins text-[13px] leading-none">TechStart</div>
                  <div className="font-bold text-white/80 font-poppins text-[13px] leading-none">GlobalCorp</div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

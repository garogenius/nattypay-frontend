import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <>
      {/* DESKTOP VIEW - 100% UNTOUCHED ORIGINAL CODE */}
      <div className="hidden lg:block">
        <section className="relative w-full min-w-[1440px] bg-[#111] flex items-center min-h-[800px] py-[100px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/banner/bg-banner.png')" }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div
            className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-row items-center h-full"
            style={{ paddingLeft: '96px', paddingRight: '96px', gap: '78px' }}
          >

            {/* Left Visuals / Woman using Phone */}
            <div className="flex-shrink-0 w-[531px]">
              <div className="relative w-[531px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                <img src="/img/banner/frame.png" alt="Hero Frame" className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" />
                <img src="/img/banner/image.png" alt="Hero Image" className="absolute inset-0 w-full h-full object-cover z-20" />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="flex-shrink-0 w-[632px] flex flex-col items-start pt-6">
              <h1 className="font-poppins font-bold text-[76px] leading-[1.05] text-white whitespace-nowrap" style={{ marginBottom: '40px' }}>
                One Dashboard.<br />
                <span className="text-[#FFCE65]">Multiple Currencies.</span><br />
                Endless possibilities
              </h1>
              <p className="font-poppins text-[18px] text-[#CCCCCC] leading-[1.6] w-full" style={{ marginBottom: '40px' }}>
                Transforming Banking Experiences, Empower Your Finances with NattyPay, where security meets simplicity for seamless online banking.
              </p>

              {/* Action Buttons — App Store + Play Store */}
              <div className="flex flex-row items-center gap-[16px]" style={{ marginBottom: '40px' }}>
                {/* Apple App Store */}
                <a href="#" className="flex-shrink-0 flex items-center gap-[10px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '16px 32px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[10px] text-white/70">Download on the</span>
                    <span className="font-poppins font-semibold text-[16px] text-white">App Store</span>
                  </div>
                </a>
                {/* Google Play Store */}
                <a href="https://play.google.com/store/apps/details?id=com.nattypay.nattypay" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-[10px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '16px 32px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M2.78 1.53c-.35.37-.56.96-.56 1.72v17.5c0 .76.21 1.35.56 1.72l.07.07 9.87-9.87v-.14L2.85 1.46l-.07.07z" fill="#4285F4" />
                    <path d="M15.96 15.65l-3.24-3.24v-.14l3.24-3.24.11.06 3.86 2.19c1.1.63 1.1 1.66 0 2.29l-3.86 2.19-.11.06z" fill="#FBBC04" />
                    <path d="M12.83 12.52l-9.98 9.98c.34.37.93.44 1.63.04l8.35-4.73 2.11-2.11-2.11-3.18z" fill="#EA4335" />
                    <path d="M12.83 11.48L4.48 6.75C3.78 6.35 3.19 6.42 2.85 6.79l9.98 9.98 2.11-3.18-2.11-2.11z" fill="#34A853" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[10px] text-white/70">Get it on</span>
                    <span className="font-poppins font-semibold text-[16px] text-white">Google Play</span>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-row items-center gap-[40px] opacity-90 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-[16px] text-[#CCCCCC] whitespace-nowrap">Licenced by CBN</span>
                  <img src="/img/icons/cbn.png" alt="CBN Logo" className="h-[36px] object-contain flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-[16px] text-[#CCCCCC] whitespace-nowrap">Deposits Insured by</span>
                  <img src="/img/icons/ndic.png" alt="NDIC Logo" className="h-[36px] object-contain flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE VIEW - RESPONSIVE CUSTOM CODE */}
      <div className="block lg:hidden">
        <section className="relative w-full bg-[#111] flex items-start pt-16 pb-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/banner/bg-banner.png')" }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div
            className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-start h-full px-[16px]"
          >

            {/* Right Text Content (Aligned top on mobile) */}
            <div className="w-full flex flex-col items-start pt-6 overflow-hidden gap-6 sm:gap-8">
              <h1 className="font-poppins font-bold text-[32px] sm:text-[36px] md:text-[56px] leading-[1.1] text-white w-full">
                One Dashboard.<br />
                <span className="text-[#FFCE65]">Multiple Currencies.</span><br />
                Endless possibilities
              </h1>

              <p className="font-poppins text-[15px] text-[#CCCCCC] leading-[1.6] w-full">
                Transforming Banking Experiences, Empower Your Finances with NattyPay, where security meets simplicity for seamless online banking.
              </p>

              {/* Action Buttons — App Store + Play Store */}
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                {/* Apple App Store */}
                <a href="#" className="flex-1 flex items-center justify-center gap-[8px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '14px 20px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[9px] text-white/70">Download on the</span>
                    <span className="font-poppins font-semibold text-[12px] text-white">App Store</span>
                  </div>
                </a>
                {/* Google Play Store */}
                <a href="https://play.google.com/store/apps/details?id=com.nattypay.nattypay" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-[8px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '14px 20px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M2.78 1.53c-.35.37-.56.96-.56 1.72v17.5c0 .76.21 1.35.56 1.72l.07.07 9.87-9.87v-.14L2.85 1.46l-.07.07z" fill="#4285F4" />
                    <path d="M15.96 15.65l-3.24-3.24v-.14l3.24-3.24.11.06 3.86 2.19c1.1.63 1.1 1.66 0 2.29l-3.86 2.19-.11.06z" fill="#FBBC04" />
                    <path d="M12.83 12.52l-9.98 9.98c.34.37.93.44 1.63.04l8.35-4.73 2.11-2.11-2.11-3.18z" fill="#EA4335" />
                    <path d="M12.83 11.48L4.48 6.75C3.78 6.35 3.19 6.42 2.85 6.79l9.98 9.98 2.11-3.18-2.11-2.11z" fill="#34A853" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[9px] text-white/70">Get it on</span>
                    <span className="font-poppins font-semibold text-[12px] text-white">Google Play</span>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 opacity-90 w-full" style={{ marginBottom: '40px' }}>
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-[11px] sm:text-[13px] text-[#CCCCCC] whitespace-nowrap">Licenced by CBN</span>
                  <img src="/img/icons/cbn.png" alt="CBN Logo" className="h-[24px] object-contain flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-poppins text-[11px] sm:text-[13px] text-[#CCCCCC] whitespace-nowrap">Deposits Insured by</span>
                  <img src="/img/icons/ndic.png" alt="NDIC Logo" className="h-[20px] object-contain flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

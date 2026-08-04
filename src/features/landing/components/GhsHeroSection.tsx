import React from 'react';

export default function GhsHeroSection() {
  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <section 
          className="relative w-full min-w-[1440px] flex items-center h-[755px] overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.94) 43.24%, rgba(102, 102, 102, 0) 100%), url("/img/ghs_hero_bg_pink.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundColor: '#000',
          }}
        >
          <div 
            className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-start justify-center h-full"
            style={{ paddingLeft: '116px', paddingRight: '116px' }}
          >
            {/* Main Content Container */}
            <div className="flex flex-col items-start gap-[42px] max-w-[662px]">
              
              {/* Top Text Block (Pill + Titles) */}
              <div className="flex flex-col items-start gap-[32px] w-full">
                
                {/* Pill */}
                <div className="flex flex-row items-center gap-[14px] bg-[#4D4D4D] rounded-[16px] px-[12px] py-[10px] w-max">
                  <div className="w-[29px] h-[29px] rounded-full bg-white flex items-center justify-center text-[18px] leading-none overflow-hidden shrink-0">
                    🇬🇭
                  </div>
                  <span className="font-poppins font-medium text-[15px] leading-[22px] text-[#FFCE65]">
                    GHS Ghana
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-poppins font-semibold text-[64px] leading-[61px] text-white m-0 max-w-[662px]">
                  Receive, Hold & Spend <span className="text-[#FFCE65]">GHS</span> Anywhere
                </h1>

                {/* Subtitle */}
                <p className="font-poppins font-normal text-[20px] leading-[35px] text-white m-0 max-w-[517px]">
                  Open your GHS Account with NattyPay and receive internationaly payment, hold s GHS securely convert currency instantly and pay globally- all from one wallet
                </p>

              </div>

              {/* Action Buttons — Exact buttons used in NGN landing page (HeroSection.tsx) */}
              <div className="flex flex-row items-center gap-[16px]">
                {/* Apple App Store */}
                <a href="#" className="flex-shrink-0 flex items-center gap-[10px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '16px 32px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[10px] text-white/70">Download on the</span>
                    <span className="font-poppins font-semibold text-[16px] text-white">App Store</span>
                  </div>
                </a>
                {/* Google Play Store */}
                <a href="https://play.google.com/store/apps/details?id=com.nattypay.nattypay" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center gap-[10px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '16px 32px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path d="M3.18 23.76a2 2 0 0 1-.93-1.76V2a2 2 0 0 1 .93-1.76l.1-.06 12.09 12.09-.1.09L3.18 23.76z" fill="#EA4335"/>
                    <path d="M20.49 13.7l-2.4 1.38-2.68-2.68.01-.01 2.67-2.67 2.41 1.38a1.5 1.5 0 0 1 0 2.6z" fill="#FBBC04"/>
                    <path d="M3.28.18l12 12-2.68 2.68L3.18.24l.1-.06z" fill="#4285F4"/>
                    <path d="M3.18 23.76l9.42-9.42 2.68 2.68-12.1 6.8v-.06z" fill="#34A853"/>
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[10px] text-white/70">Get it on</span>
                    <span className="font-poppins font-semibold text-[16px] text-white">Google Play</span>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-row items-center gap-[40px] opacity-90 flex-shrink-0 mt-[16px]">
                <div className="flex items-center gap-[12px]">
                  <span className="font-figtree text-[21px] leading-[20px] text-[#CCCCCC] whitespace-nowrap">Licenced by CBN</span>
                  <img src="/img/icons/cbn.png" alt="CBN Logo" className="w-[62px] object-contain flex-shrink-0" />
                </div>
                <div className="flex items-center gap-[12px]">
                  <span className="font-figtree text-[21px] leading-[20px] text-[#CCCCCC] whitespace-nowrap">Deposits Insured by</span>
                  <img src="/img/icons/ndic.png" alt="NDIC Logo" className="w-[78px] object-contain flex-shrink-0" />
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* MOBILE VIEW - Responsive Layout */}
      <div className="block lg:hidden">
        <section 
          className="relative w-full flex flex-col items-center justify-start min-h-[700px] overflow-hidden bg-[#111]"
        >
          {/* Mobile Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-right"
              style={{ backgroundImage: 'url("/img/ghs_hero_bg_pink.png")' }}
            />
            {/* Stronger overlay on mobile for readability */}
            <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black via-black/80 to-black/30"></div>
          </div>

          <div 
            className="relative z-10 w-full mx-auto flex flex-col items-start justify-center h-full px-[32px] py-[60px]"
          >
            <div className="flex flex-col items-start gap-8 w-full mt-10">
              
              {/* Top Text Block (Pill + Titles) */}
              <div className="flex flex-col items-start gap-6 w-full">
                
                {/* Pill */}
                <div className="flex flex-row items-center gap-3 bg-[#4D4D4D] rounded-[16px] px-3 py-2 w-max">
                  <div className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center text-[14px] leading-none overflow-hidden shrink-0">
                    🇬🇭
                  </div>
                  <span className="font-poppins font-medium text-[13px] leading-[18px] text-[#FFCE65]">
                    GHS Ghana
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="font-poppins font-semibold text-[42px] leading-[48px] text-white m-0">
                  Receive, Hold & Spend <span className="text-[#FFCE65]">GHS</span> Anywhere
                </h1>

                {/* Subtitle */}
                <p className="font-poppins font-normal text-[16px] leading-[28px] text-white/90 m-0">
                  Open your GHS Account with NattyPay and receive internationaly payment, hold s GHS securely convert currency instantly and pay globally- all from one wallet
                </p>

              </div>

              {/* Action Buttons — Exact buttons used in NGN landing page */}
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                {/* Apple App Store */}
                <a href="#" className="flex-1 flex items-center justify-center gap-[8px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '14px 20px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[9px] text-white/70">Download on the</span>
                    <span className="font-poppins font-semibold text-[12px] text-white">App Store</span>
                  </div>
                </a>
                {/* Google Play Store */}
                <a href="https://play.google.com/store/apps/details?id=com.nattypay.nattypay" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-[8px] bg-black border border-white/20 rounded-[10px] hover:bg-white/10 transition-colors" style={{ padding: '14px 20px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" className="flex-shrink-0">
                    <path d="M3.18 23.76a2 2 0 0 1-.93-1.76V2a2 2 0 0 1 .93-1.76l.1-.06 12.09 12.09-.1.09L3.18 23.76z" fill="#EA4335"/>
                    <path d="M20.49 13.7l-2.4 1.38-2.68-2.68.01-.01 2.67-2.67 2.41 1.38a1.5 1.5 0 0 1 0 2.6z" fill="#FBBC04"/>
                    <path d="M3.28.18l12 12-2.68 2.68L3.18.24l.1-.06z" fill="#4285F4"/>
                    <path d="M3.18 23.76l9.42-9.42 2.68 2.68-12.1 6.8v-.06z" fill="#34A853"/>
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-poppins text-[9px] text-white/70">Get it on</span>
                    <span className="font-poppins font-semibold text-[12px] text-white">Google Play</span>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 opacity-90 w-full mt-6">
                <div className="flex items-center gap-2">
                  <span className="font-figtree text-[13px] sm:text-[15px] text-[#CCCCCC] whitespace-nowrap">Licenced by CBN</span>
                  <img src="/img/icons/cbn.png" alt="CBN Logo" className="w-[40px] sm:w-[50px] object-contain flex-shrink-0" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-figtree text-[13px] sm:text-[15px] text-[#CCCCCC] whitespace-nowrap">Deposits Insured by</span>
                  <img src="/img/icons/ndic.png" alt="NDIC Logo" className="w-[50px] sm:w-[60px] object-contain flex-shrink-0" />
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}

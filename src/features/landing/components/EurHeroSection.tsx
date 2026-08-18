import React from 'react';

export default function EurHeroSection() {
  return (
    <>
      {/* ─── DESKTOP VIEW ─── */}
      <div className="hidden lg:block">
        <section
          className="relative w-full min-w-[1440px] flex items-center h-[755px] overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(102, 102, 102, 0) -13.02%, rgba(0, 0, 0, 0.94) 51.48%), url("/img/eur_hero_bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-row items-center justify-end h-full"
            style={{ paddingLeft: '96px', paddingRight: '96px' }}
          >
            <div className="flex flex-col items-start gap-[58px] max-w-[662px] w-[662px]">
              
              {/* Inner content — pill, heading, subtitle, buttons */}
              <div className="flex flex-col items-start gap-[42px] w-full">
                
                {/* Top block */}
                <div className="flex flex-col items-start gap-[32px] w-full">
                  {/* Pill */}
                  <div className="flex flex-row items-center gap-[14px] bg-[#4D4D4D] rounded-[16px] px-[12px] py-[9px] w-max">
                    <img
                      src="https://flagcdn.com/w80/eu.png"
                      alt="EU Flag"
                      className="w-[27px] h-[27px] rounded-full object-cover"
                    />
                    <span className="font-poppins font-medium text-[15px] leading-[22px]">
                      <span className="text-[#FFCE65]">EUR</span>{' '}
                      <span className="text-[#CCCCCC]">European Union</span>
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="font-poppins font-semibold text-[64px] leading-[61px] text-white m-0 w-full">
                    Receive, Hold &amp;<br />
                    Spend <span className="text-[#FFCE65]">EUR</span><br />
                    Anywhere
                  </h1>

                  {/* Subtitle */}
                  <p className="font-poppins font-normal text-[20px] leading-[35px] text-white m-0 max-w-[517px]">
                    Open your EUR Account with NattyPay and receive international payment, hold s EUR securely convert currency instantly and pay globally- all from one wallet
                  </p>
                </div>

                {/* Action Buttons — App Store + Play Store */}
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
                                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M2.78 1.53c-.35.37-.56.96-.56 1.72v17.5c0 .76.21 1.35.56 1.72l.07.07 9.87-9.87v-.14L2.85 1.46l-.07.07z" fill="#4285F4"/>
                    <path d="M15.96 15.65l-3.24-3.24v-.14l3.24-3.24.11.06 3.86 2.19c1.1.63 1.1 1.66 0 2.29l-3.86 2.19-.11.06z" fill="#FBBC04"/>
                    <path d="M12.83 12.52l-9.98 9.98c.34.37.93.44 1.63.04l8.35-4.73 2.11-2.11-2.11-3.18z" fill="#EA4335"/>
                    <path d="M12.83 11.48L4.48 6.75C3.78 6.35 3.19 6.42 2.85 6.79l9.98 9.98 2.11-3.18-2.11-2.11z" fill="#34A853"/>
                  </svg>
                    <div className="flex flex-col items-start leading-none">
                      <span className="font-poppins text-[10px] text-white/70">Get it on</span>
                      <span className="font-poppins font-semibold text-[16px] text-white">Google Play</span>
                    </div>
                  </a>
                </div>

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

      {/* ─── MOBILE VIEW ─── */}
      <div className="block lg:hidden">
        <section className="relative w-full bg-[#111] flex items-start pt-16 pb-16 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("/img/eur_hero_bg.png")' }}
            />
            {/* The gradient on mobile is bottom-to-top */}
            <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black via-black/90 to-black/30" />
          </div>

          <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-start h-full px-[16px]">
            <div className="w-full flex flex-col items-start pt-6 overflow-hidden gap-6 sm:gap-8">

              <div className="flex flex-col items-start gap-6 w-full">
                {/* Pill */}
                <div className="flex flex-row items-center gap-3 bg-[#4D4D4D] rounded-[16px] px-3 py-2 w-max">
                  <img src="https://flagcdn.com/w80/eu.png" alt="EU Flag" className="w-[24px] h-[24px] rounded-full object-cover" />
                  <span className="font-poppins font-medium text-[13px] leading-[18px]">
                    <span className="text-[#FFCE65]">EUR</span>{' '}
                    <span className="text-[#CCCCCC]">European Union</span>
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-poppins font-semibold text-[40px] leading-[46px] text-white m-0">
                  Receive, Hold &amp; Spend{' '}
                  <span className="text-[#FFCE65]">EUR</span>{' '}
                  Anywhere
                </h1>

                {/* Subtitle */}
                <p className="font-poppins font-normal text-[16px] leading-[28px] text-white/90 m-0">
                  Open your EUR Account with NattyPay and receive international payment, hold s EUR securely convert currency instantly and pay globally- all from one wallet
                </p>
              </div>

              {/* Action Buttons — App Store + Play Store */}
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
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                    <path d="M2.78 1.53c-.35.37-.56.96-.56 1.72v17.5c0 .76.21 1.35.56 1.72l.07.07 9.87-9.87v-.14L2.85 1.46l-.07.07z" fill="#4285F4"/>
                    <path d="M15.96 15.65l-3.24-3.24v-.14l3.24-3.24.11.06 3.86 2.19c1.1.63 1.1 1.66 0 2.29l-3.86 2.19-.11.06z" fill="#FBBC04"/>
                    <path d="M12.83 12.52l-9.98 9.98c.34.37.93.44 1.63.04l8.35-4.73 2.11-2.11-2.11-3.18z" fill="#EA4335"/>
                    <path d="M12.83 11.48L4.48 6.75C3.78 6.35 3.19 6.42 2.85 6.79l9.98 9.98 2.11-3.18-2.11-2.11z" fill="#34A853"/>
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

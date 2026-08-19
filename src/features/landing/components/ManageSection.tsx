import React from 'react';

export default function ManageSection() {
  return (
    <section className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      <div 
        className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0 px-4 lg:px-0"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)', paddingRight: 'clamp(16px, 6vw, 96px)' }}
      >
        
        {/* Left Side: Features List */}
        <div className="flex flex-col gap-5 w-full max-w-[540px]">
          
          {/* Card 1 */}
          <div 
            className="w-full bg-[#F0BF4C] rounded-[24px] flex flex-row items-center lg:items-start"
            style={{ padding: '20px 20px', gap: '16px' }}
          >
            <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3M9 8v8M12 8v8M15 8v8" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 md:gap-3 text-left flex-1">
              <h3 className="font-poppins font-semibold text-[20px] leading-[30px] text-[#2A2A2A] m-0">
                Efficient Transactions
              </h3>
              <p className="font-poppins font-normal text-[16px] lg:text-[18px] leading-[24px] lg:leading-[32px] text-[#4A4A4A] m-0">
                Quick, secure, smooth financial interactions and operations.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            className="w-full bg-[#F0BF4C] rounded-[24px] flex flex-row items-center lg:items-start"
            style={{ padding: '20px 20px', gap: '16px' }}
          >
            <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5zM2 9v1c0 1.1.9 2 2 2h1M16 11h.01" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 md:gap-3 text-left flex-1">
              <h3 className="font-poppins font-semibold text-[20px] leading-[30px] text-[#2A2A2A] m-0">
                Elevate Your Savings
              </h3>
              <p className="font-poppins font-normal text-[16px] lg:text-[18px] leading-[24px] lg:leading-[32px] text-[#4A4A4A] m-0">
                Boost savings for greater financial growth potential.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            className="w-full bg-[#F0BF4C] rounded-[24px] flex flex-row items-center lg:items-start"
            style={{ padding: '20px 20px', gap: '16px' }}
          >
            <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px] bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </div>
            <div className="flex flex-col gap-1 md:gap-3 text-left flex-1">
              <h3 className="font-poppins font-semibold text-[20px] leading-[30px] text-[#2A2A2A] m-0">
                Built for Growth
              </h3>
              <p className="font-poppins font-normal text-[16px] lg:text-[18px] leading-[24px] lg:leading-[32px] text-[#4A4A4A] m-0">
                Structured for expansion and sustainable finance development.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Text & Chart */}
        <div className="flex flex-col items-start w-full max-w-[652px]" style={{ gap: '48px' }}>
          
          <div className="flex flex-col" style={{ gap: '24px' }}>
            <h2 className="font-poppins font-medium text-[32px] lg:text-[38px] leading-tight lg:leading-[57px] text-[#2A2A2A] m-0">
              Manage Your Financial Account Anywhere and Anytime
            </h2>
            <p className="font-poppins font-normal text-[16px] lg:text-[18px] leading-relaxed lg:leading-[32px] text-[#4A4A4A] m-0">
              Effortlessly manage your finances through our intuitive internet banking platform, providing a seamless and user-friendly experience for streamlined transactions and account oversight.
            </p>
          </div>

          {/* Chart Card */}
          <div 
            className="w-full max-w-[652px] rounded-[20px] relative overflow-x-auto hide-scroll lg:overflow-hidden"
            style={{ height: '268px', backgroundColor: 'rgba(255, 206, 101, 0.33)' }}
          >
            {/* Inner Fixed Width Container to enable mobile slider */}
            <div className="relative w-[652px] h-full flex-shrink-0">
              {/* Title */}
              <h4 
                className="font-poppins font-semibold text-[20px] leading-[30px] text-[#2A2A2A] m-0 absolute"
                style={{ left: '20px', top: '21px' }}
              >
                NattyPay Record
              </h4>
              
              {/* Badges/Pill */}
              <div 
                className="flex flex-row items-center absolute"
                style={{ left: '20px', top: '55px', gap: '10px' }}
              >
                <div className="bg-[#D4B039] rounded-[4px]" style={{ padding: '3px 6px' }}>
                  <span className="font-poppins font-semibold text-[12px] leading-[18px] text-black">
                    $10.230.997.123
                  </span>
                </div>
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-black">
                  Managed assets
                </span>
              </div>

              {/* Fake Chart Line SVG (Live Animated) */}
              <svg 
                className="absolute"
                style={{ left: '20px', top: '107px', width: '612px', height: '88px' }}
                preserveAspectRatio="none" 
                viewBox="0 0 100 50"
              >
                <defs>
                  <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F0BF4C" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F0BF4C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Glowing animated fill */}
                <path fill="url(#chart-glow)" stroke="none">
                  <animate 
                    attributeName="d" 
                    dur="4s" 
                    repeatCount="indefinite"
                    values="
                      M0 45 Q15 50 30 40 T60 30 T85 10 T100 5 L100 50 L0 50 Z;
                      M0 43 Q15 46 30 42 T60 28 T85 12 T100 2 L100 50 L0 50 Z;
                      M0 47 Q15 54 30 38 T60 32 T85 8 T100 8 L100 50 L0 50 Z;
                      M0 45 Q15 50 30 40 T60 30 T85 10 T100 5 L100 50 L0 50 Z
                    "
                  />
                </path>

                {/* Animated stroke line */}
                <path fill="none" stroke="#685E40" strokeWidth="1">
                  <animate 
                    attributeName="d" 
                    dur="4s" 
                    repeatCount="indefinite"
                    values="
                      M0 45 Q15 50 30 40 T60 30 T85 10 T100 5;
                      M0 43 Q15 46 30 42 T60 28 T85 12 T100 2;
                      M0 47 Q15 54 30 38 T60 32 T85 8 T100 8;
                      M0 45 Q15 50 30 40 T60 30 T85 10 T100 5
                    "
                  />
                </path>
              </svg>

              {/* Black Gradient Bar - Visible on mobile via scroll */}
              <div 
                className="absolute rounded-t-[4px]"
                style={{ 
                  left: '521px', 
                  top: '55px', 
                  width: '111px', 
                  height: '203px',
                  background: 'linear-gradient(180deg, #FFCE65 0%, #000000 100%)'
                }}
              >
                {/* Tooltip Pill */}
                <div 
                  className="absolute bg-white/50 backdrop-blur-sm rounded-[4px] flex flex-row items-center justify-center"
                  style={{ left: '28px', top: '31px', width: '54px', height: '16px', gap: '2px', padding: '2px 4px' }}
                >
                  <span className="font-poppins font-normal text-[8px] leading-[12px] text-[#2A2A2A]">
                    2.010.355
                  </span>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                  </svg>
                </div>

                {/* Dot on Line */}
                <div className="absolute w-[7px] h-[7px] bg-[#F0BF4C] rounded-full flex items-center justify-center" style={{ left: '52px', top: '55px' }}>
                  <div className="absolute w-full h-full bg-[#F0BF4C] rounded-full animate-ping opacity-75" />
                  <div className="w-[3px] h-[3px] bg-white rounded-full z-10" />
                </div>
              </div>

              {/* X-Axis Labels */}
              <span className="font-poppins font-semibold text-[12px] leading-[18px] text-black absolute" style={{ left: '58px', top: '230px' }}>2019</span>
              <span className="font-poppins font-semibold text-[12px] leading-[18px] text-black absolute" style={{ left: '183px', top: '230px' }}>2020</span>
              <span className="font-poppins font-semibold text-[12px] leading-[18px] text-black absolute" style={{ left: '312px', top: '230px' }}>2021</span>
              <span className="font-poppins font-semibold text-[12px] leading-[18px] text-black absolute" style={{ left: '438px', top: '230px' }}>2022</span>
            </div>
          </div>

        </div>

      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

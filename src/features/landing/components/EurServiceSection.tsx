import React from 'react';

export default function EurServiceSection() {
  return (
    <section className="w-full flex items-center justify-center py-[80px]">
      
      {/* Centered, Constrained Container with Background */}
      <div 
        className="relative w-full max-w-[1327px] rounded-[40px] shadow-2xl flex flex-col lg:flex-row items-center justify-center gap-[40px] lg:gap-[79px]"
        style={{ 
          paddingTop: 'clamp(30px, 5vw, 50px)', 
          paddingBottom: 'clamp(30px, 5vw, 50px)', 
          paddingLeft: 'clamp(20px, 5vw, 60px)', 
          paddingRight: 'clamp(20px, 5vw, 60px)' 
        }}
      >
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[40px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/img/eur_service_bg.png")' }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center gap-[40px] lg:gap-[79px]">
        
        {/* Left: Features Cards */}
        <div className="flex flex-col gap-[31px] w-full max-w-[752px]">
          
          {/* Developer Friendly Card */}
          <div className="flex flex-row items-center sm:items-start bg-white rounded-[30px] sm:rounded-[59px] p-[20px] sm:py-[55px] sm:px-[50px] gap-[15px] sm:gap-[39px] w-full shadow-lg">
            <div className="flex-shrink-0 w-[60px] h-[60px] sm:w-[112px] sm:h-[112px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40px] h-[40px] sm:w-[80px] sm:h-[80px]">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <path d="M9 10l-2 2 2 2" />
                <path d="M15 10l2 2-2 2" />
              </svg>
            </div>
            <div className="flex flex-col gap-[4px] sm:gap-[10px] text-left justify-center h-full sm:pt-[10px]">
              <h3 className="font-poppins font-medium sm:font-normal text-[18px] sm:text-[39px] leading-tight text-black m-0">
                Developer Friendly
              </h3>
              <p className="font-poppins font-normal text-[13px] sm:text-[29px] leading-tight text-black/80 m-0">
                Powerful API, Easy Integration
              </p>
            </div>
          </div>

          {/* Bank-grade Security Card */}
          <div className="flex flex-row items-center sm:items-start bg-white rounded-[30px] sm:rounded-[59px] p-[20px] sm:py-[55px] sm:px-[50px] gap-[15px] sm:gap-[39px] w-full shadow-lg">
            <div className="flex-shrink-0 w-[60px] h-[60px] sm:w-[112px] sm:h-[112px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[40px] h-[40px] sm:w-[80px] sm:h-[80px]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
            </div>
            <div className="flex flex-col gap-[4px] sm:gap-[10px] text-left justify-center h-full sm:pt-[10px]">
              <h3 className="font-poppins font-medium sm:font-normal text-[18px] sm:text-[39px] leading-tight text-black m-0">
                Bank-grade Security
              </h3>
              <p className="font-poppins font-normal text-[13px] sm:text-[29px] leading-tight text-black/80 m-0">
                Your money and data are secured
              </p>
            </div>
          </div>

        </div>

        {/* Right: Phone Mockup */}
        <div 
          className="relative w-full flex justify-center items-center flex-shrink-0"
          style={{ maxWidth: '420px', height: 'clamp(400px, 60vh, 550px)' }}
        >
          <img 
            src="/img/nmobile.png" 
            alt="NattyPay Mobile App" 
            className="object-contain w-full h-full drop-shadow-2xl scale-125 lg:scale-[1.35] origin-center" 
          />
        </div>

        </div>
      </div>
    </section>
  );
}

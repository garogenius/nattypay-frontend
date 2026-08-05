import React from 'react';

const stats = [
  {
    title: "N200.78M+",
    subtitle: "Total Volume Transfered",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-1.2-1.8A2 2 0 0 0 7.55 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        <path d="M9 13l-3 3 3 3" />
        <path d="M15 17l3-3-3-3" />
        <path d="M6 16h8" />
        <path d="M18 14h-8" />
      </svg>
    )
  },
  {
    title: "1.5K+",
    subtitle: "Happy Customers",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <polygon points="19 8 20.5 11 24 11 21.5 13.5 22.5 17 19 15 15.5 17 16.5 13.5 14 11 17.5 11" />
      </svg>
    )
  },
  {
    title: "20+",
    subtitle: "Currency Supported",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <line x1="4" y1="4" x2="8" y2="8" />
        <line x1="20" y1="4" x2="16" y2="8" />
        <line x1="4" y1="20" x2="8" y2="16" />
        <line x1="20" y1="20" x2="16" y2="16" />
      </svg>
    )
  },
  {
    title: "99.9%",
    subtitle: "System Uptime",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 10l3 3 7-7" />
      </svg>
    )
  }
];

const mockups = [
  "/img/icons/1.png",
  "/img/icons/2.png",
  "/img/icons/3.png",
  "/img/icons/4.png"
];

export default function HowItWorksSection() {
  return (
    <section 
      className="w-full relative flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: 'url(/img/background-line-abstract-gradient-design_483537-2558.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0px'
      }}
    >
      <div 
        className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[80px] xl:gap-[120px]"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)', paddingRight: 'clamp(16px, 6vw, 96px)' }}
      >
        
        {/* Left Side: Stats Grid */}
        <div className="flex flex-col items-center w-full lg:w-auto" style={{ gap: 'clamp(30px, 8vw, 47px)', marginBottom: 'clamp(40px, 8vw, 0px)' }}>
          
          {/* Top Row */}
          <div className="flex flex-row items-start justify-center w-full" style={{ gap: 'clamp(16px, 5vw, 80px)', maxWidth: '600px' }}>
            {stats.slice(0, 2).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center" style={{ gap: '12px', width: 'clamp(130px, 40vw, 150px)' }}>
                <div className="bg-[#FFCE65] flex items-center justify-center flex-shrink-0" style={{ width: 'clamp(80px, 25vw, 100px)', height: 'clamp(80px, 25vw, 100px)', borderRadius: 'clamp(16px, 5vw, 24px)' }}>
                  {React.cloneElement(stat.icon, { style: { width: 'clamp(40px, 12vw, 50px)', height: 'clamp(40px, 12vw, 50px)' } })}
                </div>
                <div className="flex flex-col items-center w-full">
                  <h3 className="font-inter font-bold leading-tight text-white m-0 text-center" style={{ fontSize: 'clamp(18px, 5vw, 22px)' }}>
                    {stat.title}
                  </h3>
                  <p className="font-inter font-normal leading-tight text-white m-0 text-center mt-1" style={{ fontSize: 'clamp(11px, 3.5vw, 14px)' }}>
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex flex-row items-start justify-center w-full" style={{ gap: 'clamp(16px, 5vw, 80px)', maxWidth: '600px' }}>
            {stats.slice(2, 4).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center" style={{ gap: '12px', width: 'clamp(130px, 40vw, 150px)' }}>
                <div className="bg-[#FFCE65] flex items-center justify-center flex-shrink-0" style={{ width: 'clamp(80px, 25vw, 100px)', height: 'clamp(80px, 25vw, 100px)', borderRadius: 'clamp(16px, 5vw, 24px)' }}>
                  {React.cloneElement(stat.icon, { style: { width: 'clamp(40px, 12vw, 50px)', height: 'clamp(40px, 12vw, 50px)' } })}
                </div>
                <div className="flex flex-col items-center w-full">
                  <h3 className="font-inter font-bold leading-tight text-white m-0 text-center" style={{ fontSize: 'clamp(18px, 5vw, 22px)' }}>
                    {stat.title}
                  </h3>
                  <p className="font-inter font-normal leading-tight text-white m-0 text-center mt-1" style={{ fontSize: 'clamp(11px, 3.5vw, 14px)' }}>
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Titles & Mockups */}
        <div className="flex flex-col items-center lg:items-start gap-[24px] lg:gap-[43px] max-w-[701px] w-full lg:w-auto">
          
          {/* Titles */}
          <div className="flex flex-col text-left w-full" style={{ paddingLeft: 'clamp(8px, 4vw, 0px)' }}>
            <h2 className="font-poppins font-medium leading-tight lg:leading-normal xl:leading-[57px] text-[#FFCE65] m-0" style={{ fontSize: 'clamp(18px, 5vw, 38px)' }}>
              Beautiful, Simple and Powerful
            </h2>
            <p className="font-poppins font-normal leading-normal xl:leading-[38px] text-[#FFCE65] m-0 mt-1 lg:mt-0" style={{ fontSize: 'clamp(12px, 3.5vw, 25px)' }}>
              Beautiful, Simple and Powerful
            </p>
          </div>

          {/* Mockups Row */}
          <div className="flex flex-row items-center justify-start lg:justify-start gap-[12px] overflow-x-auto w-full pb-4 hide-scroll">
            {mockups.map((src, idx) => (
              <img 
                key={idx}
                src={src}
                alt={`NattyPay Mockup ${idx + 1}`}
                className="flex-shrink-0 object-cover"
                style={{
                  width: 'calc(50vw - 22px)',
                  maxWidth: '168px',
                  height: 'auto',
                  aspectRatio: '168/364',
                  borderRadius: '13px'
                }}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

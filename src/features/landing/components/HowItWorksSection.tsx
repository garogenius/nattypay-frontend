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
        padding: '100px 29px'
      }}
    >
      <div 
        className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[80px] xl:gap-[120px]"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)', paddingRight: 'clamp(16px, 6vw, 96px)' }}
      >
        
        {/* Left Side: Stats Grid */}
        <div className="flex flex-col items-center gap-[60px] md:gap-[80px] lg:gap-[47px] mb-[60px] lg:mb-0 w-full lg:w-auto px-4 lg:px-0">
          
          {/* Top Row */}
          <div className="flex flex-row justify-between md:justify-center md:gap-[80px] w-full max-w-[600px]">
            {stats.slice(0, 2).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-[15px] w-[45%] lg:w-[138px]">
                <div className="w-[100px] h-[100px] lg:w-[80px] lg:h-[80px] bg-[#FFCE65] rounded-[24px] lg:rounded-[12px] flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(stat.icon, { className: "w-[50px] h-[50px] lg:w-[40px] lg:h-[40px]" })}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-inter font-bold text-[18px] md:text-[22px] lg:text-[19px] leading-tight text-white m-0 text-center">
                    {stat.title}
                  </h3>
                  <p className="font-inter font-normal text-[14px] md:text-[16px] lg:text-[12px] leading-tight text-[#EAEAEA] lg:text-white m-0 text-center mt-1">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex flex-row justify-between md:justify-center md:gap-[80px] w-full max-w-[600px]">
            {stats.slice(2, 4).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-[15px] w-[45%] lg:w-[138px]">
                <div className="w-[100px] h-[100px] lg:w-[80px] lg:h-[80px] bg-[#FFCE65] rounded-[24px] lg:rounded-[12px] flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(stat.icon, { className: "w-[50px] h-[50px] lg:w-[40px] lg:h-[40px]" })}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-inter font-bold text-[18px] md:text-[22px] lg:text-[19px] leading-tight text-white m-0 text-center">
                    {stat.title}
                  </h3>
                  <p className="font-inter font-normal text-[14px] md:text-[16px] lg:text-[12px] leading-tight text-[#EAEAEA] lg:text-white m-0 text-center mt-1">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Titles & Mockups */}
        <div className="flex flex-col items-center lg:items-start gap-[43px] max-w-[701px] w-full lg:w-auto">
          
          {/* Titles */}
          <div className="flex flex-col text-center lg:text-left px-4 lg:px-0">
            <h2 className="font-poppins font-medium text-[18px] md:text-[24px] lg:text-[32px] xl:text-[38px] leading-tight lg:leading-normal xl:leading-[57px] text-[#FFCE65] m-0">
              Beautiful, Simple and Powerful
            </h2>
            <p className="font-poppins font-normal text-[12px] md:text-[16px] lg:text-[20px] xl:text-[25px] leading-normal xl:leading-[38px] text-[#FFCE65] m-0 mt-1 lg:mt-0">
              Beautiful, Simple and Powerful
            </p>
          </div>

          {/* Mockups Row */}
          <div className="flex flex-row items-center gap-[9px] overflow-x-auto w-full pb-4 scrollbar-hide">
            {mockups.map((src, idx) => (
              <img 
                key={idx}
                src={src}
                alt={`NattyPay Mockup ${idx + 1}`}
                className="flex-shrink-0 object-cover"
                style={{
                  width: '168px',
                  height: '364px',
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

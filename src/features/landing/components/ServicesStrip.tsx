import React from 'react';

const services = [
  {
    title: 'Saving',
    description: 'Build your future with effective savings strategies',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Piggy bank / savings box */}
        <rect x="8" y="12" width="28" height="22" rx="4" />
        <line x1="22" y1="12" x2="22" y2="8" />
        <circle cx="22" cy="6" r="2" />
        <text x="22" y="27" textAnchor="middle" fontSize="12" fontWeight="bold" stroke="none" fill="black">$</text>
        <line x1="30" y1="34" x2="30" y2="38" />
        <line x1="14" y1="34" x2="14" y2="38" />
      </svg>
    )
  },
  {
    title: 'Payments',
    description: 'Simplify payments with secure internet banking solutions',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Credit card */}
        <rect x="6" y="12" width="32" height="20" rx="3" />
        <line x1="6" y1="18" x2="38" y2="18" />
        <line x1="10" y1="25" x2="18" y2="25" />
        <line x1="10" y1="28" x2="15" y2="28" />
      </svg>
    )
  },
  {
    title: 'Investing',
    description: 'Invest online for maximum returns with internet banking',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Coin with upward arrow / hand */}
        <circle cx="22" cy="18" r="9" />
        <text x="22" y="23" textAnchor="middle" fontSize="11" fontWeight="bold" stroke="none" fill="black">$</text>
        <path d="M15 34 Q22 28 29 34" />
        <line x1="22" y1="27" x2="22" y2="31" />
      </svg>
    )
  },
  {
    title: 'Loan',
    description: 'Secure hassle-free loans with internet banking convenience',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Hand holding coin */}
        <circle cx="22" cy="14" r="7" />
        <text x="22" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" stroke="none" fill="black">$</text>
        <path d="M10 30 Q10 26 14 26 L20 26 Q22 26 24 24 L28 20 Q30 18 32 20 Q34 22 32 24 L26 30" />
        <path d="M10 30 L10 36 Q22 38 34 34 L34 30" />
      </svg>
    )
  },
  {
    title: 'Tracking',
    description: 'Easily track finances with the convenience of online banking',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Scan / tracker brackets */}
        <path d="M8 16 L8 10 L14 10" />
        <path d="M30 10 L36 10 L36 16" />
        <path d="M8 28 L8 34 L14 34" />
        <path d="M30 34 L36 34 L36 28" />
        <circle cx="22" cy="22" r="5" />
        <circle cx="22" cy="22" r="2" fill="black" stroke="none" />
      </svg>
    )
  }
];

export default function ServicesStrip() {
  return (
    <section className="w-full bg-[#F0BF4C] px-[16px] lg:px-[96px] flex flex-col items-center justify-center">
      
      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[43px] flex-shrink-0" />

      <div className="w-full max-w-[1240px] mx-auto flex flex-row flex-wrap lg:flex-nowrap justify-center items-start lg:items-center gap-8 lg:gap-[45px]">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col items-center gap-5 lg:gap-[28px] w-[calc(50%-16px)] sm:w-[calc(33%-21px)] lg:w-[212px] group cursor-pointer">
            
            {/* Icon Circle */}
            <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full border border-[#000000] flex items-center justify-center flex-shrink-0 bg-transparent group-hover:bg-black/5 transition-colors">
              {service.icon}
            </div>

            {/* Text Container */}
            <div className="flex flex-col items-center gap-2 lg:gap-[24px] w-full">
              {/* Title */}
              <h3 className="font-poppins font-semibold text-[16px] lg:text-[20px] leading-tight lg:leading-[30px] text-[#000000] text-center m-0">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="font-poppins font-normal text-[14px] lg:text-[18px] leading-[1.6] lg:leading-[32px] text-[#000000] text-center w-full lg:w-[212px] m-0">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[43px] flex-shrink-0" />

    </section>
  );
}

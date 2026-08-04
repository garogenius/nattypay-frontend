const fs = require('fs');

const code = `import React from 'react';

const services = [
  {
    label: 'Invest and\\nGrow',
    icon: <img src="/img/invest_icon.png" alt="Invest and Grow" className="w-full h-full object-cover rounded-full" />,
  },
  {
    label: 'Loan',
    icon: <img src="/img/loan_icon.png" alt="Loan" className="w-full h-full object-cover rounded-full" />,
  },
  {
    label: 'Insurance',
    icon: <img src="/img/insurance_icon.png" alt="Insurance" className="w-full h-full object-cover rounded-full" />,
  },
  {
    label: 'More...',
    icon: (
      // Three golden circles arranged in a triangle
      <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="20" r="7" stroke="#F0BF4C" strokeWidth="2.5" fill="none" />
        <circle cx="20" cy="42" r="7" stroke="#F0BF4C" strokeWidth="2.5" fill="none" />
        <circle cx="44" cy="42" r="7" stroke="#F0BF4C" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
];

const mobileServices = [
  {
    label: 'International\\nTransfer',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M7 10h14l-4-4" />
        <path d="M17 14H3l4 4" />
      </svg>
    ),
  },
  {
    label: 'Virtual Cards',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    label: 'USSD Banking',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polygon points="12 2 2 7 22 7" />
        <rect x="4" y="9" width="4" height="9" />
        <rect x="10" y="9" width="4" height="9" />
        <rect x="16" y="9" width="4" height="9" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    label: 'Savings Goals',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
];

export default function GbpServicesSection() {
  return (
    <section
      className="w-full relative overflow-hidden flex flex-col justify-center items-center max-md:!bg-[linear-gradient(180deg,#FFCE65_0%,#FFFFFF_100%)] max-md:!min-h-[auto] max-md:!p-[24px_16px]"
      style={{ minHeight: '600px' }}
    >
      {/* Background image (hidden on mobile) */}
      <div
        className="absolute inset-0 max-md:!hidden"
        style={{
          backgroundImage: 'url("/img/gbp_services_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.85)',
        }}
      />
      {/* Subtle overlay to improve card contrast (hidden on mobile) */}
      <div className="absolute inset-0 bg-black/10 max-md:!hidden" />

      {/* DESKTOP CONTENT */}
      <div className="relative z-10 w-full flex items-center justify-center py-[100px] px-[20px] lg:px-[58px] max-md:!hidden">
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ maxWidth: '1100px', width: '100%', gap: '40px' }}
        >
          {services.map((service) => (
            <div
              key={service.label}
              className="flex flex-row items-center cursor-pointer hover:scale-[1.02] transition-transform"
              style={{
                backgroundColor: '#000000',
                borderRadius: '40px',
                padding: '30px 40px',
                gap: '40px',
                minHeight: '180px',
              }}
            >
              {/* Circle icon */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                {service.icon}
              </div>

              {/* Label */}
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: 1.4,
                  color: '#F0BF4C',
                  whiteSpace: 'pre-line',
                }}
              >
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CONTENT */}
      <div className="hidden max-md:flex flex-col w-full relative z-10 max-w-[400px]">
        <h2 className="font-poppins font-medium text-[20px] text-black mb-[16px]">
          Featured Services
        </h2>
        <div className="grid grid-cols-2 gap-[12px]">
          {mobileServices.map((service) => (
            <div
              key={service.label}
              className="flex flex-row items-center justify-start bg-black rounded-[16px] p-[16px_12px] gap-[10px] min-h-[70px] shadow-sm cursor-pointer"
            >
              {/* Icon */}
              <div className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
                {service.icon}
              </div>

              {/* Label */}
              <span className="font-poppins font-normal text-[11.5px] leading-[1.3] text-[#F0BF4C] whitespace-pre-line">
                {service.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('src/features/landing/components/GbpServicesSection.tsx', code);

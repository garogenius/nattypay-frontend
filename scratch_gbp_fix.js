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
      <svg width="52" height="52" viewBox="0 0 64 64" fill="none" className="max-md:!w-[68.9px] max-md:!h-[68.9px]">
        <circle cx="32" cy="20" r="7" stroke="#F0BF4C" strokeWidth="2.5" fill="none" />
        <circle cx="20" cy="42" r="7" stroke="#F0BF4C" strokeWidth="2.5" fill="none" />
        <circle cx="44" cy="42" r="7" stroke="#F0BF4C" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
];

export default function GbpServicesSection() {
  return (
    <section
      className="w-full relative overflow-hidden flex flex-col justify-center items-center max-md:!p-[31.9px_15px] max-md:!min-h-[auto]"
      style={{ minHeight: '600px' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/img/gbp_services_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.85)',
        }}
      />
      {/* Subtle overlay to improve card contrast */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center justify-center py-[100px] px-[20px] lg:px-[58px] max-md:!p-0">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 max-md:!grid-cols-1 max-md:!gap-[15px]"
          style={{ maxWidth: '1100px', width: '100%', gap: '40px' }}
        >
          {services.map((service) => (
            <div
              key={service.label}
              className="flex flex-row items-center cursor-pointer hover:scale-[1.02] transition-transform max-md:!h-[150.2px] max-md:!rounded-[37.5px] max-md:!p-[35px_18px] max-md:!gap-[25px]"
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
                className="max-md:!w-[92.9px] max-md:!h-[92.9px]"
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
                className="max-md:!text-[25px] max-md:!leading-[38px]"
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
    </section>
  );
}
\`;
fs.writeFileSync('src/features/landing/components/GbpServicesSection.tsx', code);

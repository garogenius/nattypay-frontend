import React from 'react';

const partners = [
  { name: 'PalmPay',          logo: '/img/icons/palmpay.png' },
  { name: 'NIBSS',            logo: '/img/icons/nibss.png' },
  { name: 'The Kingdom Bank', logo: '/img/icons/kingdom.png' },
  { name: 'Safe Haven MFB',   logo: '/img/icons/safe.png' },
  { name: 'Flutterwave',      logo: '/img/icons/flutterwave.png' },
  { name: 'ProvidusBank',     logo: '/img/icons/providus.png' },
  { name: 'Kuda',             logo: '/img/icons/kuda.png' },
  { name: 'Remita',           logo: '/img/icons/remita.png' },
  { name: 'VISA',             logo: '/img/icons/visa.png' },
  { name: 'Verve',            logo: '/img/icons/verve.png' },
];

export default function PartnersSection() {
  return (
    <>
      {/* White gap between dark hero and yellow section */}
      <div className="w-full bg-white h-[24px] lg:h-[32px]" />

      <section className="w-full bg-[#F0BF4C] pt-[40px] pb-[60px] lg:pt-[60px] lg:pb-[72px]">
        <div 
          className="w-full max-w-[1720px] mx-auto flex flex-col items-center gap-5 lg:gap-8 px-[16px] lg:px-0"
          style={{ paddingLeft: 'var(--desktop-pad, 16px)', paddingRight: 'var(--desktop-pad, 16px)' }}
        >
          <style>{`@media (min-width: 1024px) { :root { --desktop-pad: 96px; } }`}</style>

          {/* Title */}
          <h2 className="font-poppins font-medium text-[20px] md:text-[28px] lg:text-[36px] text-black text-center m-0">
            Trusted By Leading Organization
          </h2>

          {/* DESKTOP VIEW - 100% Original Code */}
          <div className="hidden lg:block w-full bg-white shadow-md overflow-x-auto">
            <div
              className="flex items-center h-[90px] min-w-0 w-full justify-between"
              style={{ paddingLeft: '32px', paddingRight: '32px' }}
            >
              {partners.map((partner) => (
                <div
                  key={`desktop-${partner.name}`}
                  className="flex-1 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-[32px] w-auto object-contain max-w-[100px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE VIEW - Responsive Grid */}
          <div className="block lg:hidden w-full bg-white shadow-md rounded-[12px] overflow-hidden">
            <div className="flex flex-row flex-wrap items-center justify-center py-[24px] gap-6 px-[16px]">
              {partners.map((partner) => (
                <div
                  key={`mobile-${partner.name}`}
                  className="flex-shrink-0 flex items-center justify-center w-[calc(33%-16px)] sm:w-[calc(25%-16px)]"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-[24px] w-auto object-contain max-w-[100px]"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Yellow gap below the partners section */}
      <div className="w-full bg-[#F0BF4C] h-[32px] lg:h-[48px]" />
    </>
  );
}

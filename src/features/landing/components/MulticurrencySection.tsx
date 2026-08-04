import React from 'react';

const currencies = [
  {
    country: 'USA',
    code: 'USD',
    flag: 'https://flagcdn.com/w160/us.png',
  },
  {
    country: 'Ghana',
    code: 'GHS',
    flag: 'https://flagcdn.com/w160/gh.png',
  },
  {
    country: 'United Kingdom',
    code: 'GBP',
    flag: 'https://flagcdn.com/w160/gb.png',
  },
  {
    country: 'European Union',
    code: 'EUR',
    flag: 'https://flagcdn.com/w160/eu.png',
  },
  {
    country: 'Nigerian Naira',
    code: 'NGN',
    flag: 'https://flagcdn.com/w160/ng.png',
  },
];

export default function MulticurrencySection({ activeCurrencyCode = 'NGN' }: { activeCurrencyCode?: string }) {
  // Sort currencies so the active one is first
  const sortedCurrencies = [
    ...currencies.filter(c => c.code === activeCurrencyCode),
    ...currencies.filter(c => c.code !== activeCurrencyCode)
  ];
  return (
    <section
      className="w-full flex justify-center py-[60px] lg:py-[100px] min-h-auto lg:min-h-[600px]"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          linear-gradient(rgba(220, 80, 80, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220, 80, 80, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* Main Container (1720px) */}
      <div className="flex flex-col items-center px-[16px] md:px-[48px] lg:px-[96px] pt-[40px] md:pt-[80px] gap-[24px] md:gap-[36px] w-full max-w-[1720px]">

        {/* Explicit Spacer for Gap Space */}
        <div className="w-full h-[40px]" />

        {/* Title Container (Centered on mobile, left on desktop) */}
        <div className="w-full max-w-[1336px] flex justify-center md:justify-start">
          <h2 className="font-poppins font-semibold md:font-medium text-[24px] md:text-[38px] leading-tight md:leading-[57px] text-[#000000] text-center md:text-left m-0">
            Hold and Manage Multicurrency
          </h2>
        </div>

        {/* Golden Rounded Container */}
        <div className="w-full max-w-[1336px] h-auto lg:h-[291px] bg-[#F0BF4C] rounded-[24px] md:rounded-[40px] px-6 lg:py-[36px] lg:px-0 flex flex-col lg:flex-row items-center justify-center lg:justify-start overflow-hidden lg:overflow-x-auto hide-scrollbar">

          {/* Explicit Top Margin Spacer (Mobile only to force padding) */}
          <div className="w-full h-[48px] block lg:hidden flex-shrink-0" />

          {/* Explicit Left Margin Spacer (Desktop only) */}
          <div className="hidden lg:block w-[37px] flex-shrink-0" />

          {/* Cards Wrapper (Wraps on mobile, row on desktop) */}
          <div className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-6 lg:gap-[23px] w-full lg:w-auto">
            {sortedCurrencies.map((currency) => {
              const isActive = currency.code === activeCurrencyCode;
              return (
                <div
                  key={currency.code}
                  className={`flex-shrink-0 w-[calc(50%-12px)] max-w-[180px] lg:w-[234px] lg:max-w-none min-h-[150px] lg:min-h-[219px] rounded-[16px] lg:rounded-[20px] py-4 lg:py-[24px] px-[8px] lg:px-[16px] flex flex-col items-center justify-center ${isActive ? 'bg-[#000000]' : 'bg-[#FFFFFF]'
                    }`}
                >
                  {isActive ? (
                    /* Active Card Layout */
                    <div className="flex flex-col items-center gap-[15px] w-full">
                      <div className="flex flex-row justify-center items-center gap-[6px] lg:gap-[16px] w-full">
                        {/* Flag */}
                        <div className="w-[32px] h-[32px] lg:w-[48px] lg:h-[49px] rounded-full overflow-hidden flex-shrink-0">
                          <img src={currency.flag} alt={currency.country} className="w-full h-full object-cover" />
                        </div>

                        {/* Featured Pill / Button */}
                        <div className="flex flex-row items-center justify-center w-[85px] lg:w-[110px] h-[24px] lg:h-[32px] bg-[#FFFFFF] rounded-full flex-shrink-0 px-[10px] lg:px-[14px]">
                          <span className="font-poppins font-medium text-[9px] lg:text-[11px] leading-tight text-[#000000]">
                            Featured
                          </span>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex flex-col items-center justify-center w-full mt-2 lg:mt-0">
                        <span className="font-poppins font-medium text-[14px] lg:text-[20px] leading-tight lg:leading-[30px] text-center text-[#FFFFFF] whitespace-nowrap">
                          {currency.code} Account
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Inactive Card Layout */
                    <div className="flex flex-col items-center gap-2 lg:gap-[15px] w-full">
                      {/* Flag */}
                      <div className="w-[64px] h-[64px] lg:w-[97px] lg:h-[97px] rounded-[100px] overflow-hidden flex-shrink-0">
                        <img
                          src={currency.flag}
                          alt={currency.country}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text Container */}
                      <div className="flex flex-col items-center gap-[2px] lg:gap-[4px] w-full mt-1 lg:mt-0">
                        <span className="font-poppins font-medium text-[13px] lg:text-[20px] leading-tight lg:leading-[30px] text-center text-[#000000] whitespace-nowrap">
                          {currency.country}
                        </span>
                        <span className="font-poppins font-medium text-[13px] lg:text-[20px] leading-tight lg:leading-[30px] text-center text-[#000000] whitespace-nowrap">
                          {currency.code}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explicit Right Margin Spacer (Desktop only) */}
          <div className="hidden lg:block w-[37px] flex-shrink-0" />

          {/* Explicit Bottom Margin Spacer (Mobile only to force padding) */}
          <div className="w-full h-[48px] block lg:hidden flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
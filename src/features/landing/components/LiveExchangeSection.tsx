import React from 'react';

const exchangeRates = [
  { pair: 'USD/NGN', flag1: '🇺🇸', flag2: '🇳🇬', rate: 'N1,350.00', trend: 'up' },
  { pair: 'GBP/NGN', flag1: '🇬🇧', flag2: '🇳🇬', rate: 'N1,350.00', trend: 'up' },
  { pair: 'EUR/NGN', flag1: '🇪🇺', flag2: '🇳🇬', rate: 'N1,350.00', trend: 'down' },
  { pair: 'GCD/NGN', flag1: '🇬🇭', flag2: '🇳🇬', rate: 'N1,350.00', trend: 'up' },
  { pair: 'SAC/NGN', flag1: '🇿🇦', flag2: '🇳🇬', rate: 'N1,350.00', trend: 'down' },
  { pair: 'AGC/NGN', flag1: '🇦🇴', flag2: '🇳🇬', rate: 'N1,350.00', trend: 'up' },
];

const features = [
  { label: 'Lower Fee' },
  { label: 'Best Rate' },
  { label: 'Fast Transfer' },
  { label: '24/7 Support' },
];

interface LiveExchangeSectionProps {
  targetCurrency?: string;
}

export default function LiveExchangeSection({ targetCurrency = 'USD' }: LiveExchangeSectionProps) {
  const getRecipientDetails = () => {
    switch(targetCurrency.toUpperCase()) {
      case 'GHS': return { flag: '🇬🇭', amount: '₵18,450', country: 'Ghana' };
      case 'EUR': return { flag: '🇪🇺', amount: '€1,050', country: 'European Union' };
      case 'GBP': return { flag: '🇬🇧', amount: '£890', country: 'United Kingdom' };
      case 'USD':
      default: return { flag: '🇺🇸', amount: '$1,130', country: 'United States' };
    }
  };

  const recipient = getRecipientDetails();

  return (
    <section className="w-full bg-[#F5F5F5] px-[16px] lg:px-[96px] flex flex-col items-center justify-center">

      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      <div className="w-full max-w-[1324px] mx-auto flex flex-col xl:flex-row items-stretch justify-center gap-8 lg:gap-[35px]">

        {/* Left Side: Live Exchange Rate */}
        <div
          className="w-full xl:w-[503px] bg-black rounded-[40px] flex flex-col gap-[30px] lg:gap-[45px] flex-shrink-0"
          style={{ padding: '30px' }}
        >
          <h2 className="font-poppins font-medium text-[24px] lg:text-[30px] leading-tight lg:leading-[45px] text-[#F0BF4C] m-0">
            Live Exchange Rate
          </h2>

          <div className="flex flex-col w-full gap-[12px]">
            {exchangeRates.map((item, idx) => (
              <React.Fragment key={item.pair}>
                <div className="flex flex-row items-center justify-between w-full h-[37px]">

                  {/* Flags & Pair */}
                  <div className="flex flex-row items-center gap-[13px] min-w-[145px]">
                    <div className="relative w-[37px] h-[37px] flex items-center justify-center rounded-full bg-white text-[20px] overflow-visible">
                      {item.flag1}
                      <div className="absolute -bottom-1 -right-1 w-[17px] h-[17px] bg-white rounded-full flex items-center justify-center text-[10px] leading-none overflow-hidden border border-white">
                        {item.flag2}
                      </div>
                    </div>
                    <span className="font-poppins font-medium text-[16px] lg:text-[20px] leading-[30px] text-white">
                      {item.pair}
                    </span>
                  </div>

                  {/* Rate */}
                  <div className="font-poppins font-medium text-[16px] lg:text-[20px] leading-[30px] text-white text-center flex-1">
                    {item.rate}
                  </div>

                  {/* Button */}
                  <div
                    className={`flex flex-row items-center justify-center gap-[8px] px-2 py-1 lg:px-2 lg:py-2 rounded-[8px] w-[75px] lg:w-[91px] h-[28px] lg:h-[32px] flex-shrink-0 ${item.trend === 'up' ? 'bg-[#46B90085]' : 'bg-[#FF000073]'}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {item.trend === 'up' ? (
                        <>
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </>
                      ) : (
                        <>
                          <line x1="7" y1="7" x2="17" y2="17" />
                          <polyline points="17 7 17 17 7 17" />
                        </>
                      )}
                    </svg>
                    <span className="font-inter font-normal text-[12px] lg:text-[16px] leading-[1] text-[#F5F5F5]">
                      Button
                    </span>
                  </div>

                </div>
                {idx < exchangeRates.length - 1 && (
                  <div className="w-full border-t border-white opacity-20" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Side: Send Money Across Borders */}
        <div
          className="flex-1 w-full bg-gradient-to-b from-[#FFCE65] to-[#FFFFFF] rounded-[24px] flex flex-col justify-between gap-8 lg:gap-[59px]"
          style={{ padding: '32px 24px 40px 24px' }}
        >

          <div className="flex flex-col gap-4 lg:gap-[46px] max-w-[590px]">
            <h2 className="font-poppins font-medium text-[28px] lg:text-[38px] leading-tight lg:leading-[57px] text-black m-0">
              Send Money Across Borders
            </h2>
            <p className="font-poppins font-normal text-[16px] lg:text-[20px] leading-snug lg:leading-[30px] text-black m-0">
              Fast, Secure and Affordable International Money Transfer
            </p>
          </div>

          {/* Transfer Flow Graphic */}
          <div className="flex flex-row items-center justify-between gap-2 md:gap-6 lg:gap-[47px] w-full max-w-[717px] mx-auto">
            {/* Sender Box */}
            <div
              className="flex flex-col items-center justify-center gap-1 lg:gap-[10px] w-[45%] md:w-full max-w-[289px] h-[90px] md:h-[140px] lg:h-[166px] bg-white rounded-[16px] lg:rounded-[30px] shadow-sm"
              style={{ padding: '16px' }}
            >
              <div className="flex flex-row items-center justify-center gap-2 lg:gap-[20px] w-full">
                <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] lg:w-[73px] lg:h-[73px] bg-gray-100 rounded-full flex items-center justify-center text-[16px] md:text-[40px] flex-shrink-0">
                  🇳🇬
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-poppins font-normal text-[10px] md:text-[14px] lg:text-[20px] text-black mb-1">You sent</span>
                  <span className="font-poppins font-medium text-[12px] md:text-[20px] lg:text-[29px] text-black">N2,000,400</span>
                  <span className="font-poppins font-normal text-[10px] md:text-[14px] lg:text-[20px] text-black mt-1">Nigeria</span>
                </div>
              </div>
            </div>

            {/* Airplane Icon */}
            <div className="flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="black" className="w-[20px] h-[20px] md:w-[45px] md:h-[45px]">
                <path d="M21,16V14L13,9V3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
              </svg>
            </div>

            {/* Recipient Box */}
            <div
              className="flex flex-col items-center justify-center gap-1 lg:gap-[10px] w-[45%] md:w-full max-w-[289px] h-[90px] md:h-[140px] lg:h-[166px] bg-white rounded-[16px] lg:rounded-[30px] shadow-sm"
              style={{ padding: '16px' }}
            >
              <div className="flex flex-row items-center justify-center gap-2 lg:gap-[20px] w-full">
                <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] lg:w-[73px] lg:h-[73px] bg-gray-100 rounded-full flex items-center justify-center text-[16px] md:text-[40px] flex-shrink-0">
                  {recipient.flag}
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-poppins font-normal text-[10px] md:text-[14px] lg:text-[20px] text-black mb-1">Recipient get</span>
                  <span className="font-poppins font-medium text-[12px] md:text-[20px] lg:text-[29px] text-black">{recipient.amount}</span>
                  <span className="font-poppins font-normal text-[10px] md:text-[14px] lg:text-[20px] text-black mt-1">{recipient.country}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Toggles */}
          <div className="flex flex-row flex-nowrap md:flex-wrap items-center justify-between md:justify-center gap-1 md:gap-4 lg:gap-[24px] w-full mt-4 overflow-x-auto no-scrollbar pb-2">
            {features.map((feature) => (
              <div 
                key={feature.label} 
                className="bg-white rounded-[8px] lg:rounded-[12px] h-[28px] md:h-[40px] flex flex-row items-center gap-[4px] lg:gap-[8px] shadow-sm cursor-pointer hover:bg-gray-50 transition-colors flex-shrink-0 px-2 lg:px-4"
              >
                <div className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] rounded-full bg-[#F0BF4C] flex items-center justify-center text-white text-[8px] md:text-[12px] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[8px] h-[8px] md:w-[12px] md:h-[12px]">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="font-roboto font-medium text-[14px] leading-[20px] text-black tracking-[0.1px]">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

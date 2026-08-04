import React from 'react';

const features = [
  "Competitive Exchange Rate",
  "Low Transfer Fee",
  "Instant Transfer",
  "Virtual Cards",
  "Cashback",
  "24/7 Customer Support",
  "Business Accounts",
  "Global Accessibility"
];

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-mobile-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-mobile-scrollbar::-webkit-scrollbar-track {
          background: #D9D9D9;
          border-radius: 4px;
        }
        .custom-mobile-scrollbar::-webkit-scrollbar-thumb {
          background: #FFCE65;
          border-radius: 4px;
        }
      `}} />

      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      {/* Title */}
      <div 
        className="w-full max-w-[1720px] mx-auto px-4 lg:px-0"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)', paddingRight: 'clamp(16px, 6vw, 96px)', marginBottom: '39px' }}
      >
        <h2 className="font-poppins font-medium text-[24px] lg:text-[38px] leading-tight lg:leading-[57px] text-black m-0 text-center lg:text-left">
          Why Choose NattyPay
        </h2>
      </div>

      <div 
        className="w-full max-w-[1720px] mx-auto flex flex-col lg:flex-row items-start justify-between px-4 lg:px-0"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)', paddingRight: 'clamp(16px, 6vw, 96px)', gap: '40px' }}
      >
        
        {/* Left Side: Table */}
        <div className="flex flex-col flex-1 w-full max-w-[1000px] min-w-0">

          {/* Comparison Table */}
          <div className="w-full overflow-x-auto pb-4 custom-mobile-scrollbar">
            <table className="w-full min-w-[650px] lg:min-w-[700px] border-collapse" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th 
                    className="font-poppins font-bold text-[14px] lg:text-[21px] leading-[32px] text-black text-left align-bottom"
                    style={{ width: '40%', paddingBottom: '24px', paddingRight: '20px' }}
                  >
                    Features
                  </th>
                  <th 
                    className="font-poppins font-bold text-[14px] lg:text-[21px] leading-[32px] text-black text-center align-bottom whitespace-nowrap px-2"
                    style={{ width: '20%', paddingBottom: '24px' }}
                  >
                    Traditional Banks
                  </th>
                  <th 
                    className="font-poppins font-bold text-[14px] lg:text-[21px] leading-[32px] text-black text-center align-bottom whitespace-nowrap px-2"
                    style={{ width: '20%', paddingBottom: '24px' }}
                  >
                    Other Fintechs
                  </th>
                  <th 
                    className="font-poppins font-bold text-[14px] lg:text-[21px] leading-[32px] text-black text-center align-bottom whitespace-nowrap px-2"
                    style={{ width: '20%', paddingBottom: '24px' }}
                  >
                    NattyPay
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx}>
                    <td 
                      className="font-poppins font-normal text-[12px] lg:text-[21px] leading-[24px] lg:leading-[32px] text-black text-left align-top pb-4 lg:pb-6"
                      style={{ paddingRight: '20px' }}
                    >
                      {feature}
                    </td>
                    
                    {/* Traditional Banks - Red X */}
                    <td className="text-center align-top" style={{ paddingBottom: '16px' }}>
                      <div className="inline-flex items-center justify-center w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#EA0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      </div>
                    </td>

                    {/* Other Fintechs - Yellow Check Outline */}
                    <td className="text-center align-top" style={{ paddingBottom: '16px' }}>
                      <div className="inline-flex items-center justify-center w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                      </div>
                    </td>

                    {/* NattyPay - Solid Yellow Check */}
                    <td className="text-center align-top" style={{ paddingBottom: '16px' }}>
                      <div className="inline-flex items-center justify-center w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]">
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="#F0BF4C" stroke="#F0BF4C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" fill="#F0BF4C" stroke="none" />
                          <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" fill="none" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Side: Graphic Card */}
        <div className="flex flex-col items-center justify-center w-full max-w-[432px] flex-shrink-0 mt-8 lg:mt-0 relative mx-auto">
          
          {/* Black Card Container */}
          <div 
            className="w-full h-[350px] sm:h-[477px] rounded-[33px] relative overflow-hidden bg-black"
            style={{ 
              backgroundImage: 'url(/img/image-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            {/* 3D Scene Container */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center scale-75 sm:scale-100">
              
              {/* Mobile Phone Mockup (No CSS Rotation) */}
              <img 
                src="/img/m-dashboard.png" 
                alt="NattyPay Dashboard" 
                className="absolute object-contain"
                style={{
                  width: '240px',
                  height: 'auto',
                  zIndex: 10,
                  marginLeft: '20px'
                }}
              />

              {/* Glass Shield (No CSS Rotation) */}
              <img 
                src="/img/icons/security.png" 
                alt="Security Shield" 
                className="absolute drop-shadow-2xl object-contain"
                style={{
                  width: '340px',
                  height: 'auto',
                  zIndex: 20,
                  marginRight: '20px'
                }}
              />

            </div>
          </div>

        </div>

      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

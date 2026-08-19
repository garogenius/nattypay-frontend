import React from 'react';

export default function GhsHowItWorksSection() {
  return (
    <section className="w-full flex justify-center items-center py-[60px] lg:py-[80px] px-[20px] lg:px-[58px] bg-[#F9F8F4]">
      <div className="w-full max-w-[1324px] flex flex-col lg:flex-row shadow-lg rounded-[24px] overflow-hidden" style={{ margin: '0 auto' }}>
        
        {/* Left Content */}
        <div 
          className="flex-1 flex flex-col justify-center min-h-[380px] lg:min-h-[420px] px-6 lg:px-0"
          style={{ 
            background: 'linear-gradient(180deg, #FFCE65 0%, #FFFFFF 100%)',
            paddingLeft: '102px',
            paddingTop: '24px',
            paddingBottom: '23px',
            paddingRight: '40px'
          }}
        >
          <div className="flex flex-col gap-[39px] max-w-[512px] w-full">
            <h2 className="font-poppins font-medium text-[32px] leading-[49px] text-black m-0">
              Made for Ghana, Loved by you
            </h2>
            
            <div className="flex flex-col gap-[39px]">
              <p className="font-poppins font-normal text-[17px] leading-[26px] text-black m-0">
                Fast, Secure and Affordable International Money Transfer
              </p>
              
              <div className="flex flex-col gap-[14px]">
                {/* List Item 1 */}
                <div className="flex flex-row items-center gap-[17px]">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                    <path d="M8 12.5L10.5 15L16 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-poppins font-normal text-[14px] leading-[21px] text-black">
                    Mobile Money Transfer
                  </span>
                </div>
                {/* List Item 2 */}
                <div className="flex flex-row items-center gap-[17px]">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                    <path d="M8 12.5L10.5 15L16 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-poppins font-normal text-[14px] leading-[21px] text-black">
                    International Remittance
                  </span>
                </div>
                {/* List Item 3 */}
                <div className="flex flex-row items-center gap-[17px]">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                    <path d="M8 12.5L10.5 15L16 9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-poppins font-normal text-[14px] leading-[21px] text-black">
                    Pay Bills and Top up Airtime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Content */}
        <div 
          className="w-full lg:w-[590px] min-h-[380px] lg:min-h-[420px] flex-shrink-0 relative flex items-center justify-center overflow-hidden"
          style={{
            background: 'url("/img/ghana_city_bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img 
            src="/img/icons/3.png" 
            alt="App Mockup" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-auto object-contain z-10 drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

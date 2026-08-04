import React from 'react';
import Link from 'next/link';
export default function FinancialSuccessSection() {
  return (
    <section className="w-full bg-[#F0BF4C] px-6 md:px-12 lg:px-[96px] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      <div 
        className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-[48px]"
        style={{ paddingLeft: '24px', paddingRight: '24px' }}
      >
        
        {/* Left Side: Graphic & Card */}
        <div className="relative w-full max-w-[562px] flex-shrink-0 flex flex-col items-center lg:items-start pb-12 lg:pb-0 lg:h-[363px]">
          
          {/* Main Gold Card Image */}
          <div 
            className="w-full max-w-[552px] aspect-[1.6] bg-gray-300 rounded-[20px] shadow-lg relative overflow-hidden flex-shrink-0"
            style={{ 
              backgroundImage: 'url(/img/atm.png), linear-gradient(135deg, #FFCE65, #D4AF37)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Overlapping Black Widget */}
          <div className="absolute z-10 -bottom-4 lg:bottom-[auto] lg:top-[207px] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[40px] w-[90%] max-w-[352px] h-auto min-h-[110px] sm:min-h-[156px] bg-black shadow-[4px_2px_12px_rgba(0,0,0,0.1)] rounded-[20px] flex flex-row items-center p-3 sm:p-[20px] gap-3 sm:gap-[22px]">
            
            {/* Donut Chart */}
            <div className="relative w-[80px] h-[80px] sm:w-[116px] sm:h-[116px] flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 116 116">
                <circle
                  cx="58"
                  cy="58"
                  r="52"
                  fill="none"
                  stroke="#ACACAC"
                  strokeWidth="12"
                />
                <circle
                  cx="58"
                  cy="58"
                  r="52"
                  fill="none"
                  stroke="#FFCE65"
                  strokeWidth="12"
                  strokeDasharray="326.7"
                  strokeDashoffset="130.68"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-poppins font-semibold text-[16px] sm:text-[24px] leading-tight sm:leading-[36px] text-white">60%</span>
              </div>
            </div>

            {/* Widget Info */}
            <div className="flex flex-col gap-[10px]">
              <p className="font-poppins font-normal text-[12px] leading-[18px] text-white m-0 opacity-80">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              
              <div className="flex flex-row items-center gap-[24px]">
                {/* Debit */}
                <div className="flex flex-row items-center gap-[4px]">
                  <div className="w-[16px] h-[16px] rounded-full bg-gradient-to-b from-[#FFCE65] to-[#FFCE6596]" />
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-white">Debit</span>
                </div>
                {/* Credit */}
                <div className="flex flex-row items-center gap-[4px]">
                  <div className="w-[16px] h-[16px] rounded-full bg-[#ACACAC]" />
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-white">Credit</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex flex-col items-start lg:gap-[48px] gap-8 w-full max-w-[590px]">
          <div className="flex flex-col gap-[24px]">
            <h2 className="font-poppins font-medium text-[32px] lg:text-[38px] leading-tight lg:leading-[57px] text-black m-0">
              Your Path to Financial Success is In Your hand
            </h2>
            <p className="font-poppins font-normal text-[16px] lg:text-[18px] leading-relaxed lg:leading-[32px] text-black m-0">
              Explore secure transactions and account management on Viztrust's internet banking.
            </p>
          </div>
          
          <Link href="/about" className="flex flex-row items-center justify-center px-[10px] gap-[10px] w-[193px] h-[51px] border border-black rounded-[8px] hover:bg-black hover:text-white transition-colors">
            <span className="font-figtree font-medium text-[20px] lg:text-[24px] leading-[18px]">
              View More...
            </span>
          </Link>
        </div>
        
      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

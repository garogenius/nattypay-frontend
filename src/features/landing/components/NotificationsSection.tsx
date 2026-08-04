import React from 'react';

export default function NotificationsSection() {
  return (
    <section className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center overflow-hidden">

      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      <div
        className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between px-4 lg:px-0"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)', paddingRight: 'clamp(16px, 6vw, 96px)' }}
      >

        {/* Left Side: Text Content */}
        <div className="flex flex-col items-start gap-8 lg:gap-[48px] w-full max-w-[590px]">
          <div className="flex flex-col gap-6 lg:gap-[32px]">
            <div className="flex flex-col gap-4 lg:gap-[24px]">
              <h2 className="font-poppins font-medium text-[32px] lg:text-[38px] leading-tight lg:leading-[57px] text-[#2A2A2A] m-0">
                In-the-Moment Financial Notifications
              </h2>
              <p className="font-poppins font-normal text-[16px] lg:text-[18px] leading-relaxed lg:leading-[32px] text-[#4A4A4A] m-0">
                Receive instant updates on transactions and account activity with our internet banking notification feature.
              </p>
            </div>

            {/* List Items */}
            <div className="flex flex-col gap-[12px] lg:gap-[8px]">
              {[
                "Receive instant notifications for your any finance activity.",
                "Stay informed with real-time alerts on financial account.",
                "Efficient financial oversight through fast notifications."
              ].map((text, idx) => (
                <div key={idx} className="flex flex-row items-center gap-[12px]">
                  <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-b from-[#008DFF] to-[#02D3FF] flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-poppins font-normal text-[16px] lg:text-[18px] leading-[32px] text-[#4A4A4A]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          {/* <button className="hidden md:flex flex-row items-center justify-center px-[10px] gap-[10px] w-[152px] h-[51px] border border-[#F0BF4C] rounded-[8px] hover:bg-[#F0BF4C] hover:text-white transition-colors text-black">
            <span className="font-figtree font-medium text-[20px] lg:text-[24px] leading-[18px]">
              More...
            </span>
          </button> */}
        </div>

        {/* Right Side: Visuals (Phone Mockup + Floating Cards) */}
        <div className="relative w-full max-w-[728px] h-[450px] lg:h-[531px] flex-shrink-0 flex items-center justify-end">

          {/* Mobile Image */}
          <div className="absolute right-0 top-0 w-[80%] md:w-[480px] h-[100%] rounded-[30px] overflow-hidden">
            <img
              src="/img/mobile.png"
              alt="Mobile App"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Floating Cards Container */}
          <div className="absolute left-8 lg:left-36 top-0 lg:top-16 flex flex-col items-start gap-5 z-10 w-full max-w-[362px]">

            {/* Card 1: Deposit */}
            <div
              className="w-[280px] h-[160px] bg-[#FFCE65] shadow-[4px_2px_12px_rgba(0,0,0,0.1)] rounded-[20px] flex flex-col justify-between"
              style={{ padding: '20px' }}
            >
              <div className="flex flex-row items-center justify-between w-full h-[42px]">
                <span className="font-poppins font-semibold text-[28px] leading-[42px] text-[#008E28]">
                  +₦100
                </span>
                <div
                  className="bg-black rounded-full h-[36px] flex items-center justify-center"
                  style={{ padding: '2px 10px' }}
                >
                  <span className="font-poppins font-medium text-[16px] leading-[32px] text-white">
                    ₦123.100
                  </span>
                </div>
              </div>
              <p className="font-poppins font-normal text-[12px] leading-[18px] text-black m-0">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#7D7D7D]">
                Dec 01st, 2023
              </span>
            </div>

            {/* Card 2: Withdrawal */}
            <div
              className="w-[280px] h-[160px] bg-[#FFCE65] shadow-[4px_2px_12px_rgba(0,0,0,0.1)] rounded-[20px] flex flex-col justify-between"
              style={{ padding: '20px' }}
            >
              <div className="flex flex-row items-center justify-between w-full h-[42px]">
                <span className="font-poppins font-semibold text-[28px] leading-[42px] text-[#EA0000]">
                  -₦100
                </span>
                <div
                  className="bg-black rounded-full h-[36px] flex items-center justify-center"
                  style={{ padding: '2px 10px' }}
                >
                  <span className="font-poppins font-medium text-[16px] leading-[32px] text-white">
                    ₦123.000
                  </span>
                </div>
              </div>
              <p className="font-poppins font-normal text-[12px] leading-[18px] text-black m-0">
                Excepteur sint occaecat cupidatat non proident.
              </p>
              <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#7D7D7D]">
                Dec 01st, 2023
              </span>
            </div>

            {/* Card 3: Report */}
            <div
              className="w-[100%] max-w-[362px] h-[92px] bg-[#FFCE65] shadow-[4px_2px_12px_rgba(0,0,0,0.1)] rounded-[20px] flex flex-row items-center gap-[14px]"
              style={{ padding: '20px' }}
            >
              <div className="w-[39px] h-[39px] bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFCE65" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>

              <div className="flex flex-col flex-1 gap-[8px]">
                <div className="flex flex-row items-end justify-between w-full">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-black">7 days report</span>
                  <span className="font-poppins font-semibold text-[16px] leading-[22px] text-[#46B900]">+₦325</span>
                </div>
                <div className="flex flex-row items-end justify-between w-full">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-black">Total balance</span>
                  <span className="font-poppins font-semibold text-[16px] leading-[22px] text-black">₦123.000</span>
                </div>
              </div>

              <div className="w-[1px] h-[52px] bg-[#EEEEEE] mx-2" />

              <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#7D7D7D] w-[51px]">
                Dec 07th, 2023
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

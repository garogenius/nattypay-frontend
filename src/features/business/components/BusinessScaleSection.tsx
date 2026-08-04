import React from 'react';

export default function BusinessScaleSection() {
  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <section className="w-full bg-black relative overflow-hidden" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
          
          {/* Background Graphic */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#F0BF4C" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="10" />
              <line x1="50" y1="0" x2="50" y2="100" />
              <line x1="0" y1="50" x2="100" y2="50" />
            </svg>
          </div>

          <div 
            className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-row items-center justify-between"
            style={{ paddingLeft: '96px', paddingRight: '96px', gap: '64px' }}
          >
            
            {/* Left Side: Stats */}
            <div className="flex flex-col w-1/2" style={{ gap: '40px' }}>
              <div className="flex flex-col border-l-4 border-[#F0BF4C]" style={{ gap: '8px', paddingLeft: '24px', paddingBottom: '8px', paddingTop: '8px' }}>
                <h3 className="font-poppins font-bold text-[64px] text-white leading-none m-0">
                  ₦1B<span className="text-[#F0BF4C]">+</span>
                </h3>
                <p className="font-poppins font-medium text-[18px] text-[#888888] uppercase tracking-widest m-0">
                  Monthly Volume Processed
                </p>
              </div>
              
              <div className="flex flex-col border-l-4 border-[#333333] hover:border-[#F0BF4C] transition-colors" style={{ gap: '8px', paddingLeft: '24px', paddingBottom: '8px', paddingTop: '8px' }}>
                <h3 className="font-poppins font-bold text-[64px] text-white leading-none m-0">
                  99.9<span className="text-[#F0BF4C]">%</span>
                </h3>
                <p className="font-poppins font-medium text-[18px] text-[#888888] uppercase tracking-widest m-0">
                  API & System Uptime
                </p>
              </div>

              <div className="flex flex-col border-l-4 border-[#333333] hover:border-[#F0BF4C] transition-colors" style={{ gap: '8px', paddingLeft: '24px', paddingBottom: '8px', paddingTop: '8px' }}>
                <h3 className="font-poppins font-bold text-[64px] text-white leading-none m-0">
                  24<span className="text-[#F0BF4C]">/</span>7
                </h3>
                <p className="font-poppins font-medium text-[18px] text-[#888888] uppercase tracking-widest m-0">
                  Priority Support
                </p>
              </div>
            </div>

            {/* Right Side: Copy */}
            <div className="flex flex-col w-1/2" style={{ gap: '32px', paddingLeft: '64px' }}>
              <h2 className="font-poppins font-semibold text-[40px] text-white leading-tight m-0">
                Built for Scale. <br/>
                Backed by Experts.
              </h2>
              <p className="font-poppins font-normal text-[18px] text-[#AAAAAA] leading-relaxed m-0">
                We don't just provide software; we provide financial infrastructure you can rely on. As a CBN-licensed entity, we ensure enterprise-grade security and compliance for all corporate accounts.
              </p>
              <ul className="flex flex-col m-0 p-0" style={{ gap: '16px', marginTop: '8px' }}>
                <li className="flex items-center" style={{ gap: '12px' }}>
                  <div className="w-6 h-6 rounded-full bg-[#F0BF4C]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-poppins text-[16px] text-white">Dedicated Account Manager</span>
                </li>
                <li className="flex items-center" style={{ gap: '12px' }}>
                  <div className="w-6 h-6 rounded-full bg-[#F0BF4C]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-poppins text-[16px] text-white">Custom High-Volume Transfer Limits</span>
                </li>
                <li className="flex items-center" style={{ gap: '12px' }}>
                  <div className="w-6 h-6 rounded-full bg-[#F0BF4C]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-poppins text-[16px] text-white">Priority API Integration Support</span>
                </li>
              </ul>
            </div>

          </div>
        </section>
      </div>

      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <section className="w-full bg-black relative overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          
          <div className="absolute right-0 top-0 w-[400px] h-[400px] opacity-10 pointer-events-none translate-x-[20%] -translate-y-[20%]">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#F0BF4C" strokeWidth="0.5">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>

          <div 
            className="relative z-10 w-full flex flex-col items-start gap-[48px]"
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
          >
            
            {/* Top Side: Copy (Flipped for Mobile) */}
            <div className="flex flex-col w-full gap-[24px]">
              <h2 className="font-poppins font-semibold text-[32px] text-white leading-tight m-0">
                Built for Scale. <br/>
                Backed by Experts.
              </h2>
              <p className="font-poppins font-normal text-[15px] text-[#AAAAAA] leading-relaxed m-0">
                We don't just provide software; we provide financial infrastructure you can rely on. As a CBN-licensed entity, we ensure enterprise-grade security and compliance for all corporate accounts.
              </p>
              <ul className="flex flex-col m-0 p-0 gap-[16px] mt-[8px]">
                <li className="flex items-center gap-[12px]">
                  <div className="w-5 h-5 rounded-full bg-[#F0BF4C]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-poppins text-[14px] text-white">Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-[12px]">
                  <div className="w-5 h-5 rounded-full bg-[#F0BF4C]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-poppins text-[14px] text-white">Custom High-Volume Transfer Limits</span>
                </li>
                <li className="flex items-center gap-[12px]">
                  <div className="w-5 h-5 rounded-full bg-[#F0BF4C]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-poppins text-[14px] text-white">Priority API Integration Support</span>
                </li>
              </ul>
            </div>

            {/* Bottom Side: Stats */}
            <div className="flex flex-col w-full gap-[32px] bg-[#111111] p-[24px] rounded-[24px] border border-[#333333]">
              <div className="flex flex-col border-l-4 border-[#F0BF4C] pl-[16px] py-[4px] gap-[4px]">
                <h3 className="font-poppins font-bold text-[40px] text-white leading-none m-0">
                  ₦1B<span className="text-[#F0BF4C]">+</span>
                </h3>
                <p className="font-poppins font-medium text-[13px] text-[#888888] uppercase tracking-widest m-0">
                  Monthly Volume
                </p>
              </div>
              
              <div className="flex flex-col border-l-4 border-[#333333] pl-[16px] py-[4px] gap-[4px]">
                <h3 className="font-poppins font-bold text-[40px] text-white leading-none m-0">
                  99.9<span className="text-[#F0BF4C]">%</span>
                </h3>
                <p className="font-poppins font-medium text-[13px] text-[#888888] uppercase tracking-widest m-0">
                  API & System Uptime
                </p>
              </div>

              <div className="flex flex-col border-l-4 border-[#333333] pl-[16px] py-[4px] gap-[4px]">
                <h3 className="font-poppins font-bold text-[40px] text-white leading-none m-0">
                  24<span className="text-[#F0BF4C]">/</span>7
                </h3>
                <p className="font-poppins font-medium text-[13px] text-[#888888] uppercase tracking-widest m-0">
                  Priority Support
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

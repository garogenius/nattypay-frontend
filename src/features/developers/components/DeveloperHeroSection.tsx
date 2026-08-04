import React from 'react';
import Link from 'next/link';

export default function DeveloperHeroSection() {
  return (
    <section
      className="relative w-full h-[250px] md:h-[342px] bg-cover bg-center flex flex-col items-center justify-center pt-8 px-4 text-center"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), url('/img/developer-bg.png')",
      }}
    >
      <div className="flex flex-col items-center gap-1 z-10">
        <h1 className="font-poppins text-[32px] md:text-[48px] font-medium text-white leading-tight md:leading-[90px]">
          Developers
        </h1>
        <h2 className="font-poppins text-[28px] md:text-[64px] font-semibold text-[#FFCE65] leading-tight md:leading-[90px] md:mt-[-20px]">
          Build with NattyPay APIs
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4 md:mt-0">
          <Link href="/api-docs" className="flex items-center justify-center h-[38px] bg-[#D4B039] rounded-[8px] hover:bg-[#c4a029] transition-colors" style={{ paddingLeft: '28px', paddingRight: '28px' }}>
            <span className="font-figtree text-[14px] font-medium text-[#141313]">
              Documentation
            </span>
          </Link>
          <Link href="/api-references" className="flex items-center justify-center h-[38px] border border-[#FFCE65] rounded-[8px] hover:bg-[#FFCE65]/10 transition-colors" style={{ paddingLeft: '28px', paddingRight: '28px' }}>
            <span className="font-figtree text-[14px] font-medium text-[#FFCE65]">
              API References
            </span>
          </Link>
        </div>
      </div>
      
      {/* Bottom border line for design match */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1A8DFF]"></div>
    </section>
  );
}

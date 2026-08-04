import React from 'react';
import Link from 'next/link';

export default function BusinessCTA() {
  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <section 
          className="w-full bg-black" 
          style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '96px', paddingRight: '96px' }}
        >
          <div 
            className="w-full max-w-[1720px] mx-auto bg-[#F0BF4C] rounded-[32px] flex flex-col items-center text-center relative overflow-hidden"
            style={{ padding: '80px' }}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-desktop" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-desktop)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-[700px]">
              <h2 className="font-poppins font-bold text-[56px] text-black leading-tight m-0">
                Ready to upgrade your business finances?
              </h2>
              <p className="font-poppins font-medium text-[18px] text-black/80 max-w-[500px] m-0" style={{ marginTop: '24px', marginBottom: '40px' }}>
                Join thousands of businesses that trust NattyPay for secure, fast, and scalable corporate banking.
              </p>
              <div className="flex flex-row items-center justify-center" style={{ gap: '16px' }}>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center bg-black rounded-[12px] font-poppins font-semibold text-[16px] text-white hover:bg-[#222222] transition-colors shadow-xl"
                  style={{ height: '56px', padding: '0 40px' }}
                >
                  Open Account Now
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center bg-transparent border border-black rounded-[12px] font-poppins font-semibold text-[16px] text-black hover:bg-black/5 transition-colors"
                  style={{ height: '56px', padding: '0 40px' }}
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE VIEW */}
      <div className="block lg:hidden">
        <section 
          className="w-full bg-black" 
          style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px' }}
        >
          <div 
            className="w-full mx-auto bg-[#F0BF4C] rounded-[24px] flex flex-col items-center text-center relative overflow-hidden"
            style={{ padding: '40px 24px' }}
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-mobile" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-mobile)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full">
              <h2 className="font-poppins font-bold text-[32px] text-black leading-tight m-0">
                Ready to upgrade your business finances?
              </h2>
              <p className="font-poppins font-medium text-[15px] text-black/80 m-0 w-full" style={{ marginTop: '16px', marginBottom: '32px' }}>
                Join thousands of businesses that trust NattyPay for secure, fast, and scalable corporate banking.
              </p>
              <div className="flex flex-col items-center w-full" style={{ gap: '16px' }}>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center w-full bg-black rounded-[12px] font-poppins font-semibold text-[16px] text-white hover:bg-[#222222] transition-colors shadow-xl"
                  style={{ height: '56px' }}
                >
                  Open Account Now
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center w-full bg-transparent border border-black rounded-[12px] font-poppins font-semibold text-[16px] text-black hover:bg-black/5 transition-colors"
                  style={{ height: '56px' }}
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

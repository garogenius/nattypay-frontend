import React, { useState } from 'react';
import Link from 'next/link';

export default function DeveloperHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full h-[80px] lg:h-[103px] bg-black shadow-[0px_4px_50px_rgba(0,0,0,0.05)] relative z-50">
      <div 
        className="mx-auto flex h-full w-full max-w-[1720px] items-center justify-between"
        style={{ paddingLeft: 'clamp(24px, 5vw, 96px)', paddingRight: 'clamp(24px, 5vw, 96px)' }}
      >
        {/* Left side: Logo & Search */}
        <div className="flex items-center gap-4 lg:gap-[105px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-[14px]">
            <img
              src="/img/logo.png"
              alt="NattyPay"
              className="w-[40px] h-[40px] lg:w-[89px] lg:h-[87px]"
            />
            <span className="font-roboto text-[20px] lg:text-[37px] font-medium leading-[1.2] lg:leading-[43px] text-[#FFCE65]">
              NATTYPAY
            </span>
          </Link>

          {/* Search - Hidden on mobile */}
          <div className="hidden lg:flex w-[391px] h-[48px] bg-white/5 border border-white rounded-[6px] items-center gap-3 relative" style={{ paddingLeft: '20px', paddingRight: '16px' }}>
            <svg className="w-5 h-5 text-[#FFCE65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21L16.65 16.65"></path>
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none text-[#FFCE65] placeholder:text-[#FFCE65]/30 font-roboto text-[16px] font-medium"
            />
          </div>
        </div>

        {/* Right side: Navigation & Button - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-[60px]">
          <nav className="flex items-center gap-10">
            <span className="font-roboto text-[16px] font-medium text-[#FFCE65] cursor-default">
              API
            </span>
            <Link href="/contact" className="font-roboto text-[16px] font-medium text-[#FFCE65] hover:opacity-80 transition-opacity">
              Support
            </Link>
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[#FFCE65]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <path d="M3 6h18v2.5H3V6zm0 5.5h18V14H3v-2.5zm0 5.5h18V19.5H3V17z" fill="currentColor" stroke="none" />
            )}
          </svg>
        </button>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-t border-[#FFCE65]/20 flex flex-col p-4 gap-4 lg:hidden">
            <span className="font-roboto text-[16px] text-[#FFCE65] cursor-default">
              API
            </span>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="font-roboto text-[16px] text-[#FFCE65]">
              Support
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center w-full h-[48px] bg-[#D4B039] rounded-[8px] font-figtree font-medium text-[#141313]">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

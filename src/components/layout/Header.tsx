"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Currency {
  code: string;
  name: string;
  flag: string;
  image: string;
}

const currencies: Currency[] = [
  { code: 'NGN', name: 'Nigeria', flag: '🇳🇬', image: '/flags/ng.svg' },
  { code: 'GBP', name: 'United Kingdom', flag: '🇬🇧', image: '/flags/gb.svg' },
  { code: 'EUR', name: 'European Union', flag: '🇪🇺', image: '/flags/eu.svg' },
  { code: 'GHS', name: 'Ghana', flag: '🇬🇭', image: '/flags/gh.svg' },
  { code: 'USD', name: 'United States', flag: '🇺🇸', image: '/flags/us.svg' }
];

interface HeaderProps {
  currentCurrency?: string;
}

export default function Header({ currentCurrency = 'NGN' }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [developerDropdownOpen, setDeveloperDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDeveloperOpen, setMobileDeveloperOpen] = useState(false);
  const pathname = usePathname();
  const activeCurrency = currencies.find(c => c.code === currentCurrency) || currencies[0];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* DESKTOP VIEW - 100% UNTOUCHED ORIGINAL CODE */}
      <header className="hidden lg:block bg-black h-[94px] w-full min-w-[1440px] relative z-50">
        <div
          className="mx-auto flex h-full max-w-[1720px] items-center justify-between"
          style={{ paddingLeft: '96px', paddingRight: '96px' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0">
            <img
              src="/img/logo.png"
              alt="NattyPay"
              className="w-[74px] h-[74px]"
            />
            <span className="font-poppins text-[40px] font-bold leading-none text-[#F6C65B]">
              NATTYPAY
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-[48px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-poppins text-[18px] transition-colors ${isActive
                      ? 'font-semibold text-[#F6C65B]'
                      : 'font-normal text-white hover:text-[#F6C65B]'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="relative">
              <button
                onClick={() => setDeveloperDropdownOpen(!developerDropdownOpen)}
                className="flex items-center gap-[6px] font-poppins text-[18px] font-normal text-[#F6C65B] hover:text-white transition-colors"
              >
                Developer
                <svg
                  className={`w-3 h-3 transition-transform ${developerDropdownOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {developerDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 16px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#F6C65B',
                    borderRadius: '20px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    minWidth: '200px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                    zIndex: 50,
                  }}
                >
                  <Link
                    href="/api-docs"
                    onClick={() => setDeveloperDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#D9D9D9',
                      borderRadius: '16px',
                      padding: '10px 22px',
                      transition: 'background-color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c9c9c9')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#D9D9D9')}
                  >
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', color: '#000' }}>
                      API Doc
                    </span>
                  </Link>
                  <Link
                    href="/api-references"
                    onClick={() => setDeveloperDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#D9D9D9',
                      borderRadius: '16px',
                      padding: '10px 22px',
                      transition: 'background-color 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c9c9c9')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#D9D9D9')}
                  >
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', color: '#000' }}>
                      API References
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-[24px]">
            {/* Currency */}
            <div className="relative flex items-center">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex h-[46px] items-center gap-[10px] rounded-[14px] border border-white/20 px-[14px] hover:bg-white/10 transition-colors"
              >
                <div className="h-[28px] w-[38px] rounded-[6px] overflow-hidden bg-white flex items-center justify-center text-xl shrink-0">
                  {activeCurrency.flag}
                </div>
                <span className="font-poppins text-[18px] font-normal text-[#F6C65B]">
                  {activeCurrency.code}
                </span>
                <svg
                  className={`w-3 h-3 text-[#F6C65B] transition-transform shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-4 bg-[#F6C65B] rounded-[24px] p-3 flex flex-col gap-2 w-[210px] shadow-2xl z-50">
                  {currencies.map((currency) => {
                    const isActive = currency.code === currentCurrency;
                    return (
                      <Link
                        key={currency.code}
                        href={currency.code === 'NGN' ? '/' : `/${currency.code.toLowerCase()}`}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-3 w-full p-2 px-3 rounded-[16px] transition-colors ${isActive ? 'bg-black' : 'bg-[#D9D9D9] hover:bg-gray-300'}`}
                      >
                        <div className="w-[49px] h-[49px] rounded-full flex items-center justify-center bg-white text-3xl shadow-sm overflow-hidden shrink-0 border border-black/5">
                          {currency.flag}
                        </div>
                        <div className="flex flex-col items-start leading-tight">
                          <span className={`font-poppins font-semibold text-[15px] leading-tight ${isActive ? 'text-[#F6C65B]' : 'text-black'}`}>
                            {currency.code}
                          </span>
                          <span className={`font-poppins font-light text-[15px] leading-tight ${isActive ? 'text-[#F6C65B]' : 'text-black'}`}>
                            {currency.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE VIEW - RESPONSIVE CUSTOM CODE */}
      <header className="block lg:hidden bg-black h-[94px] w-full relative z-50">
        <div
          className="mx-auto flex h-full w-full items-center justify-between px-[32px]"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0">
            <img
              src="/img/logo.png"
              alt="NattyPay"
              className="w-[40px] h-[40px]"
            />
            <span className="font-poppins text-[24px] font-bold leading-none text-[#F6C65B]">
              NATTYPAY
            </span>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-[12px]">
            {/* Currency */}
            <div className="relative flex items-center">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex h-[36px] items-center gap-[6px] rounded-[10px] border border-white/20 px-[10px] hover:bg-white/10 transition-colors"
              >
                <div className="h-[20px] w-[28px] rounded-[4px] overflow-hidden bg-white flex items-center justify-center text-sm shrink-0">
                  {activeCurrency.flag}
                </div>
                <span className="font-poppins text-[14px] font-normal text-[#F6C65B]">
                  {activeCurrency.code}
                </span>
                <svg
                  className={`w-3 h-3 text-[#F6C65B] transition-transform shrink-0 ${dropdownOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-4 bg-[#F6C65B] rounded-[24px] p-3 flex flex-col gap-2 w-[210px] shadow-2xl z-50">
                  {currencies.map((currency) => {
                    const isActive = currency.code === currentCurrency;
                    return (
                      <Link
                        key={currency.code}
                        href={currency.code === 'NGN' ? '/' : `/${currency.code.toLowerCase()}`}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-3 w-full p-2 px-3 rounded-[16px] transition-colors ${isActive ? 'bg-black' : 'bg-[#D9D9D9] hover:bg-gray-300'}`}
                      >
                        <div className="w-[49px] h-[49px] rounded-full flex items-center justify-center bg-white text-3xl shadow-sm overflow-hidden shrink-0 border border-black/5">
                          {currency.flag}
                        </div>
                        <div className="flex flex-col items-start leading-tight">
                          <span className={`font-poppins font-semibold text-[15px] leading-tight ${isActive ? 'text-[#F6C65B]' : 'text-black'}`}>
                            {currency.code}
                          </span>
                          <span className={`font-poppins font-light text-[15px] leading-tight ${isActive ? 'text-[#F6C65B]' : 'text-black'}`}>
                            {currency.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="flex items-center justify-center p-2 text-[#F6C65B]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 6h18v2.5H3V6zm0 5.5h18V14H3v-2.5zm0 5.5h18V19.5H3V17z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Overlay Menu - rendered via portal to cover entire screen */}
        {isMobileMenuOpen && (
          <div
            style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', backgroundColor: '#000', zIndex: 9999, display: 'flex', flexDirection: 'column' }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '94px', padding: '0 32px', borderBottom: '1px solid #F6C65B', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                <img src="/img/logo.png" alt="NattyPay" style={{ width: '40px', height: '40px' }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#F6C65B', lineHeight: '1' }}>
                  NATTYPAY
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', color: '#F6C65B', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Links */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '32px', gap: '0' }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      width: '100%',
                      backgroundColor: isActive ? '#D4AE36' : 'transparent',
                      color: isActive ? '#000' : '#ffffff',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '16px',
                      fontWeight: isActive ? 500 : 400,
                      padding: '14px 24px',
                      borderRadius: isActive ? '8px' : '0px',
                      marginBottom: isActive ? '20px' : '0px',
                      textDecoration: 'none'
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  onClick={() => setMobileDeveloperOpen(!mobileDeveloperOpen)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 400, padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  Developer
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileDeveloperOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {mobileDeveloperOpen && (
                  <div style={{ padding: '0 24px 16px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link
                      href="/api-docs"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ display: 'block', color: '#F6C65B', fontFamily: 'Poppins, sans-serif', fontSize: '15px', padding: '8px 16px', textDecoration: 'none' }}
                    >
                      API Documentation
                    </Link>
                    <Link
                      href="/api-references"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ display: 'block', color: '#F6C65B', fontFamily: 'Poppins, sans-serif', fontSize: '15px', padding: '8px 16px', textDecoration: 'none' }}
                    >
                      API References
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

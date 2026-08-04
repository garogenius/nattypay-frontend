import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: "Corporate Multi-Currency Wallets",
    description: "Hold, manage, and exchange NGN, USD, GBP, and EUR instantly. Shield your business from currency fluctuations with our competitive live rates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
    colSpan: "lg:col-span-2",
  },
  {
    title: "Automated Payroll",
    description: "Upload a CSV and pay 10,000 employees instantly across multiple banks without fail.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    colSpan: "lg:col-span-1",
  },
  {
    title: "Multi-User Roles & Approvals",
    description: "Assign roles to your finance team. Require Maker-Checker approvals for large outflows to ensure absolute security.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    colSpan: "lg:col-span-1",
  },
  {
    title: "API Integrations",
    description: "Plug NattyPay directly into your ERP or custom software. Automate payouts and reconciliation programmatically.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    colSpan: "lg:col-span-2",
  }
];

export default function BusinessFeatures() {
  return (
    <section className="w-full bg-[#111111]" style={{ paddingTop: 'clamp(80px, 8vw, 120px)', paddingBottom: 'clamp(80px, 8vw, 120px)' }}>
      
      {/* DESKTOP VIEW */}
      <div 
        className="hidden lg:flex w-full max-w-[1720px] mx-auto flex-col items-center"
        style={{ paddingLeft: '96px', paddingRight: '96px' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[800px]" style={{ marginBottom: '80px' }}>
          <h2 className="font-poppins font-semibold text-[48px] leading-tight text-white m-0">
            Everything your business needs to <span className="text-[#F0BF4C]">move fast.</span>
          </h2>
          <p className="font-poppins font-normal text-[18px] text-[#888888]" style={{ marginTop: '24px' }}>
            We've removed the friction from corporate banking. Experience tools designed exclusively for high-growth enterprises.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-row flex-wrap w-full justify-center" style={{ gap: '24px' }}>
          
          {/* Row 1: 3 Items (33.33% each) */}
          <div 
            className="bg-black border border-[#333333] rounded-[24px] flex flex-col justify-between group hover:border-[#F0BF4C]/50 transition-colors"
            style={{ width: 'calc(33.333% - 16px)', padding: '40px' }}
          >
            <div className="flex flex-col items-center text-center" style={{ gap: '24px' }}>
              <div className="w-14 h-14 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center group-hover:bg-[#F0BF4C] group-hover:text-black transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div className="flex flex-col items-center text-center" style={{ gap: '12px' }}>
                <h3 className="font-poppins font-semibold text-[24px] text-white m-0 leading-tight">
                  Corporate Multi-Currency Wallets
                </h3>
                <p className="font-poppins font-normal text-[15px] text-[#AAAAAA] leading-relaxed m-0">
                  Hold, manage, and exchange NGN, USD, GBP, and EUR instantly. Shield your business with our live rates.
                </p>
              </div>
            </div>
          </div>

          <div 
            className="bg-black border border-[#333333] rounded-[24px] flex flex-col justify-between group hover:border-[#F0BF4C]/50 transition-colors"
            style={{ width: 'calc(33.333% - 16px)', padding: '40px' }}
          >
            <div className="flex flex-col items-center text-center" style={{ gap: '24px' }}>
              <div className="w-14 h-14 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center group-hover:bg-[#F0BF4C] group-hover:text-black transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="flex flex-col items-center text-center" style={{ gap: '12px' }}>
                <h3 className="font-poppins font-semibold text-[24px] text-white m-0 leading-tight">
                  Automated Payroll
                </h3>
                <p className="font-poppins font-normal text-[15px] text-[#AAAAAA] leading-relaxed m-0">
                  Upload a CSV and pay 10,000 employees instantly across multiple banks without fail.
                </p>
              </div>
            </div>
          </div>
          
          <div 
            className="bg-black border border-[#333333] rounded-[24px] flex flex-col justify-between group hover:border-[#F0BF4C]/50 transition-colors"
            style={{ width: 'calc(33.333% - 16px)', padding: '40px' }}
          >
            <div className="flex flex-col items-center text-center" style={{ gap: '24px' }}>
              <div className="w-14 h-14 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center group-hover:bg-[#F0BF4C] group-hover:text-black transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className="flex flex-col items-center text-center" style={{ gap: '12px' }}>
                <h3 className="font-poppins font-semibold text-[24px] text-white m-0 leading-tight">
                  Corporate Cards
                </h3>
                <p className="font-poppins font-normal text-[15px] text-[#AAAAAA] leading-relaxed m-0">
                  Issue virtual and physical expense cards to your team and track global spending in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: 2 Items (50% each) */}
          <div 
            className="bg-black border border-[#333333] rounded-[24px] flex flex-col justify-between group hover:border-[#F0BF4C]/50 transition-colors"
            style={{ width: 'calc(50% - 12px)', padding: '40px' }}
          >
            <div className="flex flex-col items-center text-center" style={{ gap: '24px' }}>
              <div className="w-14 h-14 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center group-hover:bg-[#F0BF4C] group-hover:text-black transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="flex flex-col items-center text-center" style={{ gap: '12px' }}>
                <h3 className="font-poppins font-semibold text-[26px] text-white m-0 leading-tight">
                  Multi-User Roles & Approvals
                </h3>
                <p className="font-poppins font-normal text-[16px] text-[#AAAAAA] leading-relaxed m-0">
                  Assign roles to your finance team. Require Maker-Checker approvals for large outflows to ensure absolute security.
                </p>
              </div>
            </div>
          </div>

          <div 
            className="bg-black border border-[#333333] rounded-[24px] flex flex-col justify-between group hover:border-[#F0BF4C]/50 transition-colors"
            style={{ width: 'calc(50% - 12px)', padding: '40px' }}
          >
            <div className="flex flex-col items-center text-center" style={{ gap: '24px' }}>
              <div className="w-14 h-14 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center group-hover:bg-[#F0BF4C] group-hover:text-black transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="flex flex-col items-center text-center" style={{ gap: '12px' }}>
                <h3 className="font-poppins font-semibold text-[26px] text-white m-0 leading-tight">
                  API Integrations
                </h3>
                <p className="font-poppins font-normal text-[16px] text-[#AAAAAA] leading-relaxed m-0">
                  Plug NattyPay directly into your ERP or custom software. Automate payouts and reconciliation programmatically.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE VIEW */}
      <div 
        className="flex lg:hidden w-full mx-auto flex-col items-center"
        style={{ paddingLeft: '24px', paddingRight: '24px' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center w-full" style={{ marginBottom: '40px' }}>
          <h2 className="font-poppins font-semibold text-[32px] leading-tight text-white m-0">
            Everything your business needs to <br/><span className="text-[#F0BF4C]">move fast.</span>
          </h2>
          <p className="font-poppins font-normal text-[15px] text-[#888888]" style={{ marginTop: '16px' }}>
            We've removed the friction from corporate banking. Experience tools designed exclusively for high-growth enterprises.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col w-full" style={{ gap: '16px' }}>
          
          <div className="bg-black border border-[#333333] rounded-[24px] flex flex-col w-full" style={{ padding: '32px 24px' }}>
            <div className="flex flex-col items-center text-center" style={{ gap: '16px' }}>
              <div className="w-12 h-12 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-[20px] text-white m-0">Corporate Multi-Currency Wallets</h3>
              <p className="font-poppins font-normal text-[14px] text-[#AAAAAA] m-0">Hold, manage, and exchange NGN, USD, GBP, and EUR instantly. Shield your business with our live rates.</p>
            </div>
          </div>

          <div className="bg-black border border-[#333333] rounded-[24px] flex flex-col w-full" style={{ padding: '32px 24px' }}>
            <div className="flex flex-col items-center text-center" style={{ gap: '16px' }}>
              <div className="w-12 h-12 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-[20px] text-white m-0">Automated Payroll</h3>
              <p className="font-poppins font-normal text-[14px] text-[#AAAAAA] m-0">Upload a CSV and pay 10,000 employees instantly across multiple banks without fail.</p>
            </div>
          </div>
          
          <div className="bg-black border border-[#333333] rounded-[24px] flex flex-col w-full" style={{ padding: '32px 24px' }}>
            <div className="flex flex-col items-center text-center" style={{ gap: '16px' }}>
              <div className="w-12 h-12 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-[20px] text-white m-0">Corporate Cards</h3>
              <p className="font-poppins font-normal text-[14px] text-[#AAAAAA] m-0">Issue virtual and physical expense cards to your team and track global spending in real-time.</p>
            </div>
          </div>

          <div className="bg-black border border-[#333333] rounded-[24px] flex flex-col w-full" style={{ padding: '32px 24px' }}>
            <div className="flex flex-col items-center text-center" style={{ gap: '16px' }}>
              <div className="w-12 h-12 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-[20px] text-white m-0">Multi-User Roles & Approvals</h3>
              <p className="font-poppins font-normal text-[14px] text-[#AAAAAA] m-0">Assign roles to your finance team. Require Maker-Checker approvals for large outflows to ensure absolute security.</p>
            </div>
          </div>

          <div className="bg-black border border-[#333333] rounded-[24px] flex flex-col w-full" style={{ padding: '32px 24px' }}>
            <div className="flex flex-col items-center text-center" style={{ gap: '16px' }}>
              <div className="w-12 h-12 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-[20px] text-white m-0">API Integrations</h3>
              <p className="font-poppins font-normal text-[14px] text-[#AAAAAA] m-0">Plug NattyPay directly into your ERP or custom software. Automate payouts and reconciliation programmatically.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

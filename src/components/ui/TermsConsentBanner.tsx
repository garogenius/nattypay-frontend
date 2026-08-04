"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TermsConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('nattypay_terms_consent');
    if (!consent) {
      // Small delay for dramatic effect so it slides in after page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const handleChoice = (choice: 'agree' | 'decline' | 'later') => {
    if (choice !== 'later') {
      // If they agree or decline, save choice so it doesn't show again
      localStorage.setItem('nattypay_terms_consent', choice);
    }
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 pointer-events-none flex justify-center animate-fade-in-up">
      {/* 
        We use pointer-events-none on the wrapper so clicks pass through to the page behind the empty space,
        and pointer-events-auto on the actual banner box so the buttons are clickable.
      */}
      <div 
        className="pointer-events-auto w-full max-w-[1240px] bg-[#111111] text-white rounded-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border border-[#333333] flex flex-col lg:flex-row items-center justify-between"
        style={{ padding: 'clamp(24px, 4vw, 32px)', gap: '24px' }}
      >
        
        {/* Left Side: Text */}
        <div className="flex flex-col items-start flex-1" style={{ gap: '12px' }}>
          <div className="flex items-center" style={{ gap: '12px' }}>
            <div className="w-10 h-10 rounded-full bg-[#F0BF4C] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="font-poppins font-semibold text-[18px] md:text-[22px] text-white m-0">
              Your Privacy & Agreement
            </h3>
          </div>
          <p className="font-poppins font-normal text-[14px] md:text-[15px] text-[#AAAAAA] leading-relaxed m-0 max-w-[900px]">
            To ensure a highly secure, transparent, and compliant financial experience, we require all users to review and accept our <Link href="/terms-conditions" className="text-[#F0BF4C] hover:underline underline-offset-4 transition-all">Terms and Conditions</Link>. By selecting "I Agree", you acknowledge that you have read and consent to our policies.
          </p>
        </div>

        {/* Right Side: Actions */}
        <div className="grid grid-cols-2 lg:flex lg:flex-row items-center w-full lg:w-auto" style={{ gap: '12px' }}>
          <button 
            onClick={() => handleChoice('later')}
            className="col-span-1 lg:col-auto w-full lg:w-auto rounded-full font-poppins font-medium text-[14px] md:text-[15px] text-[#888888] hover:text-white transition-colors border border-transparent hover:border-[#555555] flex items-center justify-center"
            style={{ padding: '12px 16px' }}
          >
            Later
          </button>
          <button 
            onClick={() => handleChoice('decline')}
            className="col-span-1 lg:col-auto w-full lg:w-auto rounded-full font-poppins font-medium text-[14px] md:text-[15px] text-white border border-[#444444] hover:bg-[#222222] transition-colors flex items-center justify-center"
            style={{ padding: '12px 16px' }}
          >
            Decline
          </button>
          <button 
            onClick={() => handleChoice('agree')}
            className="col-span-2 lg:col-auto w-full lg:w-auto rounded-full font-poppins font-semibold text-[15px] text-black bg-[#F0BF4C] hover:bg-[#EBBB4D] transition-colors whitespace-nowrap shadow-[0_4px_14px_rgba(240,191,76,0.3)] hover:shadow-[0_6px_20px_rgba(240,191,76,0.4)] flex items-center justify-center"
            style={{ padding: '12px 32px' }}
          >
            I Agree
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}

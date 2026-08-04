import React from 'react';
import Link from "next/link";

export default function FaqSupportSection() {
  return (
    <section
      className="w-full bg-black flex justify-center items-center px-6 md:px-12"
      style={{ paddingTop: '40px', paddingBottom: '40px' }}
    >
      {/* Yellow/Gold rounded card */}
      <div
        className="w-full max-w-[1220px] rounded-[20px] flex flex-col md:flex-row items-center md:justify-between"
        style={{
          backgroundColor: '#F0BF4C',
          padding: '28px 32px',
          gap: '24px',
        }}
      >
        {/* Left: Icon + Text */}
        <div className="flex items-center w-full md:w-auto" style={{ gap: '20px' }}>
          {/* Headphone icon in dark circle */}
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{ width: '52px', height: '52px', backgroundColor: '#1a1a1a' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11C3 7.13 7.03 4 12 4C16.97 4 21 7.13 21 11" stroke="#F0BF4C" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 11V15C3 16.1 3.9 17 5 17H6C7.1 17 8 16.1 8 15V11.5C8 10.4 7.1 9.5 6 9.5H5C4.13 9.5 3.37 10 3 11Z" stroke="#F0BF4C" strokeWidth="2" />
              <path d="M21 11V15C21 16.1 20.1 17 19 17H18C16.9 17 16 16.1 16 15V11.5C16 10.4 16.9 9.5 18 9.5H19C19.87 9.5 20.63 10 21 11Z" stroke="#F0BF4C" strokeWidth="2" />
              <path d="M19 17V18C19 19.1 18.1 20 17 20H13" stroke="#F0BF4C" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col" style={{ gap: '4px' }}>
            <h4
              className="font-poppins font-bold text-black"
              style={{ fontSize: '18px', lineHeight: '26px' }}
            >
              Still have questions?
            </h4>
            <p
              className="font-poppins text-black"
              style={{ fontSize: '14px', lineHeight: '20px', opacity: 0.8 }}
            >
              Our support team is here to help you.
            </p>
          </div>
        </div>

        {/* Right: Contact Support button — full width centered on mobile */}
        <Link
          href="/contact"
          className="flex items-center justify-center font-poppins font-semibold transition-opacity hover:opacity-80 w-full md:w-auto flex-shrink-0"
          style={{
            backgroundColor: '#1a1a1a',
            color: '#F0BF4C',
            padding: '14px 28px',
            borderRadius: '10px',
            fontSize: '15px',
            gap: '10px',
            whiteSpace: 'nowrap',
          }}
        >
          Contact Support
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="#F0BF4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="#F0BF4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

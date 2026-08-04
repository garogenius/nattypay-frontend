import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/* DESKTOP VIEW - EXACTLY MATCHING HEADER/HERO STRUCTURE */}
      <div className="hidden lg:block">
        <footer 
          className="w-full min-w-[1440px] bg-[#000000] flex flex-col items-center relative"
          style={{ paddingTop: '100px', paddingBottom: '100px' }}
        >
          <div
            className="w-full max-w-[1720px] mx-auto flex flex-col gap-[48px]"
            style={{ paddingLeft: '96px', paddingRight: '96px' }}
          >

            {/* Top Section: Logos and Intro */}
            <div className="flex flex-col items-start gap-[24px]">

              {/* Logos Row */}
              <div className="flex flex-row items-center justify-start w-full gap-[60px]">

                {/* Left: Logo Text */}
                <div className="flex items-center gap-3">
                  <img src="/img/logo.png" alt="NattyPay Logo" className="w-[50px] h-[50px] object-contain" />
                  <span className="font-roboto font-medium text-[37px] leading-[43px] text-[#FFCE65]">
                    NATTYPAY
                  </span>
                </div>

                {/* Right: 5 Compliance Badges (1.png to 5.png) */}
                <div className="flex flex-row items-center gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="bg-white rounded-[10px] w-[187px] h-[53px] flex items-center justify-center overflow-hidden">
                      <img
                        src={`/img/${num}.png`}
                        alt={`Compliance Badge ${num}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

              </div>

              {/* Intro Text */}
              <p className="font-poppins font-normal text-[18px] leading-[32px] text-white text-left max-w-[610px] m-0">
                NattyPay is more than just a financial service provider; we are a community dedicated to improving financial well-being. Join thousands of satisfied users who trust NattyPay for their financial needs. Download the NattyPay app today and experience the future of finance in Nigeria.
              </p>

            </div>

            {/* Middle Section: Links */}
            <div className="flex flex-row items-start justify-between w-full pt-[24px]">

              {/* Column 1: Company */}
              <div className="flex flex-col items-start gap-3">
                <h4 className="font-poppins font-bold text-[18px] leading-[32px] text-[#FFCE65] m-0 mb-2">
                  Company
                </h4>
                <Link href="/about" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">About Us</Link>
                <Link href="/business" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Business</Link>
                <Link href="/blog" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Blog</Link>
                <Link href="/contact" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Contact Us</Link>
                <Link href="/delete-account" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Delete my Account</Link>
              </div>

              {/* Column 2: Resources */}
              <div className="flex flex-col items-start gap-3">
                <h4 className="font-poppins font-bold text-[18px] leading-[32px] text-[#FFCE65] m-0 mb-2">
                  Resources
                </h4>
                <Link href="/terms" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Terms of Use</Link>
                <Link href="/terms-and-conditions" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Terms & Condition</Link>
                <Link href="/privacy-policy" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Privacy Policy</Link>
                <Link href="/refund-policy" className="font-poppins font-normal text-[17px] leading-[32px] text-white hover:text-[#FFCE65] transition-colors">Refund Policy</Link>
              </div>

              {/* Column 3: Info */}
              <div className="flex flex-col items-start gap-3 max-w-[387px]">
                <h4 className="font-poppins font-bold text-[18px] leading-[32px] text-[#FFCE65] m-0 mb-2">
                  Info
                </h4>
                <p className="font-poppins font-normal text-[17px] leading-[32px] text-white m-0">
                  Head office: C3 & C4 Suite second floor Ejiobi plaza new market road Main market onitsha Anambra state<br />
                  +2348134146906<br />
                  support@nattypay.com
                </p>
              </div>

            </div>

            {/* Bottom Section: Divider, Copyright and Social */}
            <div className="flex flex-col w-full gap-[20px] mt-[12px]">

              {/* Divider */}
              <div className="w-full h-[1px] bg-white opacity-20" />

              {/* Copyright and Social Icons */}
              <div className="flex flex-row items-center justify-between w-full pt-2">
                <p className="font-poppins font-normal text-[14px] leading-[21px] text-white m-0">
                  © 2026 NattyPay • All Rights Reserved
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center gap-4">

                  {/* Facebook */}
                  <a href="https://www.facebook.com/profile.php?id=100084829514458" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="#1877F2" />
                      <path d="M21.1 16H18.2V27.1H13.6V16H11.4V12.1H13.6V9.4C13.6 6.8 15.1 5.3 17.8 5.3C18.9 5.3 20 5.5 20 5.5V8H18.8C17.6 8 17.2 8.7 17.2 9.5V12.1H21.4L21.1 16Z" fill="white" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a href="https://www.instagram.com/nattypays?igsh=MWYxdW9iY2M1bzVmbg==" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <defs>
                        <linearGradient id="ig" x1="5" y1="27" x2="27" y2="5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FEC564" />
                          <stop offset="0.5" stopColor="#E1306C" />
                          <stop offset="1" stopColor="#833AB4" />
                        </linearGradient>
                      </defs>
                      <rect width="32" height="32" rx="10" fill="url(#ig)" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9ZM16 11.5C18.485 11.5 20.5 13.515 20.5 16C20.5 18.485 18.485 20.5 16 20.5C13.515 20.5 11.5 18.485 11.5 16C11.5 13.515 13.515 11.5 16 11.5ZM16 13.5C14.619 13.5 13.5 14.619 13.5 16C13.5 17.381 14.619 18.5 16 18.5C17.381 18.5 18.5 17.381 18.5 16C18.5 14.619 17.381 13.5 16 13.5ZM21.5 11.75C21.5 12.44 20.94 13 20.25 13C19.56 13 19 12.44 19 11.75C19 11.06 19.56 10.5 20.25 10.5C20.94 10.5 21.5 11.06 21.5 11.75Z" fill="white" />
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a href="https://www.tiktok.com/@nattypayglobal?_t=ZM-8tjAVR0cYQ1&_r=1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="black" />
                      <path d="M21.9 13.5C21.8 13.5 21.7 13.5 21.6 13.5C20.2 13.5 18.9 12.7 18.3 11.5V19.1C18.3 21.9 16 24.2 13.2 24.2C10.4 24.2 8.1 21.9 8.1 19.1C8.1 16.3 10.4 14 13.2 14C13.5 14 13.9 14 14.2 14.1V16.7C13.9 16.6 13.5 16.5 13.2 16.5C11.8 16.5 10.6 17.7 10.6 19.1C10.6 20.5 11.8 21.7 13.2 21.7C14.6 21.7 15.8 20.5 15.8 19.1V7.8H18.3C18.4 9.6 19.8 11.1 21.9 11.1V13.5Z" fill="white" />
                      <path d="M22 13.5C21.9 13.5 21.8 13.5 21.7 13.5C20.3 13.5 19 12.7 18.4 11.5V19.1C18.4 21.9 16.1 24.2 13.3 24.2C10.5 24.2 8.2 21.9 8.2 19.1C8.2 16.3 10.5 14 13.3 14C13.6 14 14 14 14.3 14.1V16.7C14 16.6 13.6 16.5 13.3 16.5C11.9 16.5 10.7 17.7 10.7 19.1C10.7 20.5 11.9 21.7 13.3 21.7C14.7 21.7 15.9 20.5 15.9 19.1V7.8H18.4C18.5 9.6 19.9 11.1 22 11.1V13.5Z" fill="#00f2fe" style={{ mixBlendMode: 'screen' }} />
                      <path d="M21.8 13.5C21.7 13.5 21.6 13.5 21.5 13.5C20.1 13.5 18.8 12.7 18.2 11.5V19.1C18.2 21.9 15.9 24.2 13.1 24.2C10.3 24.2 8 21.9 8 19.1C8 16.3 10.3 14 13.1 14C13.4 14 13.8 14 14.1 14.1V16.7C13.8 16.6 13.4 16.5 13.1 16.5C11.7 16.5 10.5 17.7 10.5 19.1C10.5 20.5 11.7 21.7 13.1 21.7C14.5 21.7 15.7 20.5 15.7 19.1V7.8H18.2C18.3 9.6 19.7 11.1 21.8 11.1V13.5Z" fill="#fe004f" style={{ mixBlendMode: 'screen' }} />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a href="https://youtube.com/@nattypayglobal?si=9LyF8iMK1pwnGX8P" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect y="4" width="32" height="24" rx="6" fill="#FF0000" />
                      <path d="M21.5 16L13.5 20.5V11.5L21.5 16Z" fill="white" />
                    </svg>
                  </a>

                  {/* Snapchat */}
                  <a href="https://www.snapchat.com/add/nattypayglobal" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="#FFFC00" />
                      <path d="M16 22.5C14.5 22.5 13 22 12.2 21.6C12 21.5 11.8 21.6 11.7 21.8C11.6 22 11 23 10.2 23C10 23 9.7 22.9 9.6 22.6C9.5 22.3 9.6 21.9 9.8 21.6C10 21.4 10.1 21.2 10.1 21C10.1 20.8 10 20.6 9.8 20.5C9 20 8.3 19.5 8.1 19.2C7.9 18.9 8.1 18.7 8.5 18.7H9.2C9.5 18.7 9.8 18.5 9.8 18.2C9.8 17.9 9.6 17.6 9.3 17.5C8.8 17.3 8.4 17 8.2 16.6C8 16 8.5 15.6 9 15.6H9.7C10.1 15.6 10.4 15.3 10.4 14.9C10.4 14 10.6 12 11.6 10.2C12.6 8.5 14.2 7.7 16 7.7C17.8 7.7 19.4 8.5 20.4 10.2C21.4 12 21.6 14 21.6 14.9C21.6 15.3 21.9 15.6 22.3 15.6H23C23.5 15.6 24 16 23.8 16.6C23.6 17 23.2 17.3 22.7 17.5C22.4 17.6 22.2 17.9 22.2 18.2C22.2 18.5 22.5 18.7 22.8 18.7H23.5C23.9 18.7 24.1 18.9 23.9 19.2C23.7 19.5 23 20 22.2 20.5C22 20.6 21.9 20.8 21.9 21C21.9 21.2 22 21.4 22.2 21.6C22.4 21.9 22.5 22.3 22.4 22.6C22.3 22.9 22 23 21.8 23C21 23 20.4 22 20.3 21.8C20.2 21.6 20 21.5 19.8 21.6C19 22 17.5 22.5 16 22.5Z" fill="white" />
                      <path d="M16 22.5C14.5 22.5 13 22 12.2 21.6C12 21.5 11.8 21.6 11.7 21.8C11.6 22 11 23 10.2 23C10 23 9.7 22.9 9.6 22.6C9.5 22.3 9.6 21.9 9.8 21.6C10 21.4 10.1 21.2 10.1 21C10.1 20.8 10 20.6 9.8 20.5C9 20 8.3 19.5 8.1 19.2C7.9 18.9 8.1 18.7 8.5 18.7H9.2C9.5 18.7 9.8 18.5 9.8 18.2C9.8 17.9 9.6 17.6 9.3 17.5C8.8 17.3 8.4 17 8.2 16.6C8 16 8.5 15.6 9 15.6H9.7C10.1 15.6 10.4 15.3 10.4 14.9C10.4 14 10.6 12 11.6 10.2C12.6 8.5 14.2 7.7 16 7.7C17.8 7.7 19.4 8.5 20.4 10.2C21.4 12 21.6 14 21.6 14.9C21.6 15.3 21.9 15.6 22.3 15.6H23C23.5 15.6 24 16 23.8 16.6C23.6 17 23.2 17.3 22.7 17.5C22.4 17.6 22.2 17.9 22.2 18.2C22.2 18.5 22.5 18.7 22.8 18.7H23.5C23.9 18.7 24.1 18.9 23.9 19.2C23.7 19.5 23 20 22.2 20.5C22 20.6 21.9 20.8 21.9 21C21.9 21.2 22 21.4 22.2 21.6C22.4 21.9 22.5 22.3 22.4 22.6C22.3 22.9 22 23 21.8 23C21 23 20.4 22 20.3 21.8C20.2 21.6 20 21.5 19.8 21.6C19 22 17.5 22.5 16 22.5Z" stroke="black" strokeWidth="1.5" />
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a href="https://x.com/Nattypays" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.08L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.084 4.126H5.117L17.083 19.77Z" fill="white" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/company/nattypay/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#0077B5" />
                      <path d="M19 8h-14c-.552 0-1 .448-1 1v10c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-10c0-.552-.448-1-1-1zm-9 10h-2v-6h2v6zm-1-7c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm8 7h-2v-3c0-1.5-2-1.5-2 0v3h-2v-6h2v1.5c.8-1.5 4-1.5 4 1.5v3z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </footer>
      </div>

      {/* MOBILE VIEW - RESPONSIVE CUSTOM CODE */}
      <div className="block lg:hidden">
        <footer 
          className="w-full bg-[#000000] flex flex-col items-center relative"
          style={{ paddingTop: '80px', paddingBottom: '80px' }}
        >
          <div
            className="w-full mx-auto flex flex-col gap-12 px-[32px]"
          >

            {/* Top Section: Logos and Intro */}
            <div className="flex flex-col items-start gap-8">

              {/* Logos Row */}
              <div className="flex flex-col items-start w-full gap-6">

                {/* Left: Logo Text */}
                <div className="flex items-center gap-3">
                  <img src="/img/logo.png" alt="NattyPay Logo" className="w-[40px] h-[40px] object-contain" />
                  <span className="font-roboto font-medium text-[28px] leading-[36px] text-[#FFCE65]">
                    NATTYPAY
                  </span>
                </div>

                {/* Right: 5 Compliance Badges (1.png to 5.png) */}
                <div className="flex flex-row items-center gap-3 flex-wrap">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="bg-white rounded-[8px] w-[120px] h-[40px] flex items-center justify-center overflow-hidden">
                      <img
                        src={`/img/${num}.png`}
                        alt={`Compliance Badge ${num}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

              </div>

              {/* Intro Text */}
              <p className="font-poppins font-normal text-[15px] leading-[26px] text-white text-left m-0">
                NattyPay is more than just a financial service provider; we are a community dedicated to improving financial well-being. Join thousands of satisfied users who trust NattyPay for their financial needs. Download the NattyPay app today and experience the future of finance in Nigeria.
              </p>

            </div>

            {/* Middle Section: Links */}
            <div className="flex flex-col items-start justify-start w-full gap-8">

              {/* Column 1: Company */}
              <div className="flex flex-col items-start gap-2">
                <h4 className="font-poppins font-bold text-[16px] leading-[28px] text-[#FFCE65] m-0 mb-1">
                  Company
                </h4>
                <Link href="/about" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">About Us</Link>
                <Link href="/business" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Business</Link>
                <Link href="/blog" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Blog</Link>
                <Link href="/contact" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Contact Us</Link>
                <Link href="/delete-account" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Delete my Account</Link>
              </div>

              {/* Column 2: Resources */}
              <div className="flex flex-col items-start gap-2">
                <h4 className="font-poppins font-bold text-[16px] leading-[28px] text-[#FFCE65] m-0 mb-1">
                  Resources
                </h4>
                <Link href="/terms" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Terms of Use</Link>
                <Link href="/terms-and-conditions" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Terms & Condition</Link>
                <Link href="/privacy-policy" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Privacy Policy</Link>
                <Link href="/refund-policy" className="font-poppins font-normal text-[15px] leading-[28px] text-white hover:text-[#FFCE65] transition-colors">Refund Policy</Link>
              </div>

              {/* Column 3: Info */}
              <div className="flex flex-col items-start gap-2">
                <h4 className="font-poppins font-bold text-[16px] leading-[28px] text-[#FFCE65] m-0 mb-1">
                  Info
                </h4>
                <p className="font-poppins font-normal text-[15px] leading-[28px] text-white m-0">
                  Head office: C3 & C4 Suite second floor Ejiobi plaza new market road Main market onitsha Anambra state<br />
                  +2348134146906<br />
                  support@nattypay.com
                </p>
              </div>

            </div>

            {/* Bottom Section: Divider, Copyright and Social */}
            <div className="flex flex-col w-full gap-[20px] mt-2">

              {/* Divider */}
              <div className="w-full h-[1px] bg-white opacity-20" />

              {/* Copyright and Social Icons */}
              <div className="flex flex-col items-center justify-center w-full pt-2 gap-6">

                {/* Social Media Icons */}
                <div className="flex items-center gap-4">
                  {/* ... same SVG tags but scaling slightly ... */}
                  <a href="https://www.facebook.com/profile.php?id=100084829514458" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="#1877F2" />
                      <path d="M21.1 16H18.2V27.1H13.6V16H11.4V12.1H13.6V9.4C13.6 6.8 15.1 5.3 17.8 5.3C18.9 5.3 20 5.5 20 5.5V8H18.8C17.6 8 17.2 8.7 17.2 9.5V12.1H21.4L21.1 16Z" fill="white" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/nattypays?igsh=MWYxdW9iY2M1bzVmbg==" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <defs>
                        <linearGradient id="ig-mobile" x1="5" y1="27" x2="27" y2="5" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FEC564" />
                          <stop offset="0.5" stopColor="#E1306C" />
                          <stop offset="1" stopColor="#833AB4" />
                        </linearGradient>
                      </defs>
                      <rect width="32" height="32" rx="10" fill="url(#ig-mobile)" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9ZM16 11.5C18.485 11.5 20.5 13.515 20.5 16C20.5 18.485 18.485 20.5 16 20.5C13.515 20.5 11.5 18.485 11.5 16C11.5 13.515 13.515 11.5 16 11.5ZM16 13.5C14.619 13.5 13.5 14.619 13.5 16C13.5 17.381 14.619 18.5 16 18.5C17.381 18.5 18.5 17.381 18.5 16C18.5 14.619 17.381 13.5 16 13.5ZM21.5 11.75C21.5 12.44 20.94 13 20.25 13C19.56 13 19 12.44 19 11.75C19 11.06 19.56 10.5 20.25 10.5C20.94 10.5 21.5 11.06 21.5 11.75Z" fill="white" />
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@nattypayglobal?_t=ZM-8tjAVR0cYQ1&_r=1" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="black" />
                      <path d="M21.9 13.5C21.8 13.5 21.7 13.5 21.6 13.5C20.2 13.5 18.9 12.7 18.3 11.5V19.1C18.3 21.9 16 24.2 13.2 24.2C10.4 24.2 8.1 21.9 8.1 19.1C8.1 16.3 10.4 14 13.2 14C13.5 14 13.9 14 14.2 14.1V16.7C13.9 16.6 13.5 16.5 13.2 16.5C11.8 16.5 10.6 17.7 10.6 19.1C10.6 20.5 11.8 21.7 13.2 21.7C14.6 21.7 15.8 20.5 15.8 19.1V7.8H18.3C18.4 9.6 19.8 11.1 21.9 11.1V13.5Z" fill="white" />
                      <path d="M22 13.5C21.9 13.5 21.8 13.5 21.7 13.5C20.3 13.5 19 12.7 18.4 11.5V19.1C18.4 21.9 16.1 24.2 13.3 24.2C10.5 24.2 8.2 21.9 8.2 19.1C8.2 16.3 10.5 14 13.3 14C13.6 14 14 14 14.3 14.1V16.7C14 16.6 13.6 16.5 13.3 16.5C11.9 16.5 10.7 17.7 10.7 19.1C10.7 20.5 11.9 21.7 13.3 21.7C14.7 21.7 15.9 20.5 15.9 19.1V7.8H18.4C18.5 9.6 19.9 11.1 22 11.1V13.5Z" fill="#00f2fe" style={{ mixBlendMode: 'screen' }} />
                      <path d="M21.8 13.5C21.7 13.5 21.6 13.5 21.5 13.5C20.1 13.5 18.8 12.7 18.2 11.5V19.1C18.2 21.9 15.9 24.2 13.1 24.2C10.3 24.2 8 21.9 8 19.1C8 16.3 10.3 14 13.1 14C13.4 14 13.8 14 14.1 14.1V16.7C13.8 16.6 13.4 16.5 13.1 16.5C11.7 16.5 10.5 17.7 10.5 19.1C10.5 20.5 11.7 21.7 13.1 21.7C14.5 21.7 15.7 20.5 15.7 19.1V7.8H18.2C18.3 9.6 19.7 11.1 21.8 11.1V13.5Z" fill="#fe004f" style={{ mixBlendMode: 'screen' }} />
                    </svg>
                  </a>
                  <a href="https://youtube.com/@nattypayglobal?si=9LyF8iMK1pwnGX8P" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <rect y="4" width="32" height="24" rx="6" fill="#FF0000" />
                      <path d="M21.5 16L13.5 20.5V11.5L21.5 16Z" fill="white" />
                    </svg>
                  </a>
                  <a href="https://www.snapchat.com/add/nattypayglobal" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="#FFFC00" />
                      <path d="M16 22.5C14.5 22.5 13 22 12.2 21.6C12 21.5 11.8 21.6 11.7 21.8C11.6 22 11 23 10.2 23C10 23 9.7 22.9 9.6 22.6C9.5 22.3 9.6 21.9 9.8 21.6C10 21.4 10.1 21.2 10.1 21C10.1 20.8 10 20.6 9.8 20.5C9 20 8.3 19.5 8.1 19.2C7.9 18.9 8.1 18.7 8.5 18.7H9.2C9.5 18.7 9.8 18.5 9.8 18.2C9.8 17.9 9.6 17.6 9.3 17.5C8.8 17.3 8.4 17 8.2 16.6C8 16 8.5 15.6 9 15.6H9.7C10.1 15.6 10.4 15.3 10.4 14.9C10.4 14 10.6 12 11.6 10.2C12.6 8.5 14.2 7.7 16 7.7C17.8 7.7 19.4 8.5 20.4 10.2C21.4 12 21.6 14 21.6 14.9C21.6 15.3 21.9 15.6 22.3 15.6H23C23.5 15.6 24 16 23.8 16.6C23.6 17 23.2 17.3 22.7 17.5C22.4 17.6 22.2 17.9 22.2 18.2C22.2 18.5 22.5 18.7 22.8 18.7H23.5C23.9 18.7 24.1 18.9 23.9 19.2C23.7 19.5 23 20 22.2 20.5C22 20.6 21.9 20.8 21.9 21C21.9 21.2 22 21.4 22.2 21.6C22.4 21.9 22.5 22.3 22.4 22.6C22.3 22.9 22 23 21.8 23C21 23 20.4 22 20.3 21.8C20.2 21.6 20 21.5 19.8 21.6C19 22 17.5 22.5 16 22.5Z" fill="white" />
                      <path d="M16 22.5C14.5 22.5 13 22 12.2 21.6C12 21.5 11.8 21.6 11.7 21.8C11.6 22 11 23 10.2 23C10 23 9.7 22.9 9.6 22.6C9.5 22.3 9.6 21.9 9.8 21.6C10 21.4 10.1 21.2 10.1 21C10.1 20.8 10 20.6 9.8 20.5C9 20 8.3 19.5 8.1 19.2C7.9 18.9 8.1 18.7 8.5 18.7H9.2C9.5 18.7 9.8 18.5 9.8 18.2C9.8 17.9 9.6 17.6 9.3 17.5C8.8 17.3 8.4 17 8.2 16.6C8 16 8.5 15.6 9 15.6H9.7C10.1 15.6 10.4 15.3 10.4 14.9C10.4 14 10.6 12 11.6 10.2C12.6 8.5 14.2 7.7 16 7.7C17.8 7.7 19.4 8.5 20.4 10.2C21.4 12 21.6 14 21.6 14.9C21.6 15.3 21.9 15.6 22.3 15.6H23C23.5 15.6 24 16 23.8 16.6C23.6 17 23.2 17.3 22.7 17.5C22.4 17.6 22.2 17.9 22.2 18.2C22.2 18.5 22.5 18.7 22.8 18.7H23.5C23.9 18.7 24.1 18.9 23.9 19.2C23.7 19.5 23 20 22.2 20.5C22 20.6 21.9 20.8 21.9 21C21.9 21.2 22 21.4 22.2 21.6C22.4 21.9 22.5 22.3 22.4 22.6C22.3 22.9 22 23 21.8 23C21 23 20.4 22 20.3 21.8C20.2 21.6 20 21.5 19.8 21.6C19 22 17.5 22.5 16 22.5Z" stroke="black" strokeWidth="1.5" />
                    </svg>
                  </a>
                  <a href="https://x.com/Nattypays" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.08L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.084 4.126H5.117L17.083 19.77Z" fill="white" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/nattypay/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#0077B5" />
                      <path d="M19 8h-14c-.552 0-1 .448-1 1v10c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-10c0-.552-.448-1-1-1zm-9 10h-2v-6h2v6zm-1-7c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm8 7h-2v-3c0-1.5-2-1.5-2 0v3h-2v-6h2v1.5c.8-1.5 4-1.5 4 1.5v3z" fill="white"/>
                    </svg>
                  </a>
                </div>

                <p className="font-poppins font-normal text-[12px] leading-[18px] text-white/70 m-0">
                  © 2023 NattyPay • All Rights Reserved
                </p>

              </div>

            </div>

          </div>
        </footer>
      </div>
    </>
  );
}

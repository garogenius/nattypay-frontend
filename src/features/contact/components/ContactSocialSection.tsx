import React from 'react';

export default function ContactSocialSection() {
  return (
    <section
      className="w-full bg-[#F0BF4C] flex flex-col items-center gap-8 px-6 md:px-16 overflow-hidden"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* Heading */}
      <div className="flex flex-col items-start md:items-center text-left md:text-center gap-3 md:gap-2 max-w-[871px] w-full px-2 md:px-0">
        <h2 className="text-black font-bold text-[26px] md:text-[38px] leading-[36px] md:leading-[57px] font-poppins whitespace-normal md:whitespace-nowrap">
          Connect with us via our<br className="md:hidden" /> social media handles
        </h2>
        <p className="text-black text-[16px] md:text-[18px] leading-[26px] md:leading-[32px] font-poppins mb-4 md:mb-0">
          The following is NattyPay social media Handles
        </p>
      </div>

      {/* Social Media Icons Pill */}
      <div
        className="flex items-center justify-center gap-3 md:gap-8 flex-wrap w-full max-w-[900px] rounded-[16px] md:rounded-[40px] px-4 md:px-[28px]"
        style={{ backgroundColor: '#111111', paddingTop: '24px', paddingBottom: '24px', marginTop: '16px' }}
      >
        {/* Facebook */}
        <a href="https://www.facebook.com/profile.php?id=100084829514458" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-[72px] md:h-[72px] bg-[#1877F2] rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5 md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="white">
            <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/nattypays?igsh=MWYxdW9iY2M1bzVmbg==" target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 md:w-[72px] md:h-[72px] rounded-[10px] md:rounded-[16px] flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
          style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
        >
          <svg className="w-5 h-5 md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* TikTok */}
        <a href="https://www.tiktok.com/@nattypayglobal?_t=ZM-8tjAVR0cYQ1&_r=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-[72px] md:h-[72px] bg-black flex items-center justify-center rounded-full border border-gray-600 flex-shrink-0 hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5 md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="white">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.41-2.91 5.86-1.76 1.43-4.14 2.1-6.4 1.83-2.67-.32-5.11-1.95-6.3-4.32-1.2-2.39-1.07-5.32.33-7.58 1.34-2.18 3.73-3.61 6.27-3.83v4.06c-1.27.08-2.52.74-3.26 1.78-.71 1-1 2.3-.77 3.52.24 1.25 1.05 2.36 2.17 2.94 1.14.59 2.54.67 3.75.24 1.26-.45 2.24-1.57 2.51-2.88.11-.53.13-1.08.13-1.62v-16.6z"/>
          </svg>
        </a>

        {/* YouTube */}
        <a href="https://youtube.com/@nattypayglobal?si=9LyF8iMK1pwnGX8P" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-[72px] md:h-[72px] bg-[#FF0000] rounded-[10px] md:rounded-xl flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5 md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="white">
            <path d="M21.582 6.186a2.71 2.71 0 00-1.904-1.916C17.999 3.8 12 3.8 12 3.8s-5.999 0-7.678.47a2.71 2.71 0 00-1.904 1.916C1.948 7.876 1.948 12 1.948 12s0 4.124.47 5.814a2.71 2.71 0 001.904 1.916C5.999 20.2 12 20.2 12 20.2s5.999 0 7.678-.47a2.71 2.71 0 001.904-1.916C22.052 16.124 22.052 12 22.052 12s0-4.124-.47-5.814zM9.9 15.5V8.5L15.9 12l-6 3.5z"/>
          </svg>
        </a>

        {/* Snapchat */}
        <a href="https://www.snapchat.com/add/nattypayglobal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-[72px] md:h-[72px] bg-[#FFFC00] rounded-[10px] md:rounded-2xl flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5 md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="black">
            <path d="M12.012 2C8.36 2 5.397 5.097 5.397 8.914c0 1.966.721 3.593 2.062 4.908-.184.664-.783 1.155-1.547 1.341-1.127.275-2.074.887-2.613 1.834-.236.417-.306.918-.124 1.4.156.412.502.738.932.9l1.62.611c.219.083.473.082.68-.009.619-.271 1.258-.291 1.821-.064 1.303.527 2.506 1.15 3.541 1.895l.231.165h.001c.214.154.492.154.707 0l.232-.165c1.034-.744 2.237-1.368 3.54-1.895.563-.227 1.202-.207 1.821.064.207.091.461.092.68.009l1.62-.611c.43-.162.776-.488.932-.9.182-.482.112-.983-.124-1.4-.539-.947-1.486-1.559-2.613-1.834-.764-.186-1.363-.677-1.547-1.341 1.341-1.315 2.062-2.942 2.062-4.908C18.627 5.097 15.664 2 12.012 2zM12 17.5c-1.282 0-2.456-.474-3.34-1.246a.75.75 0 11.983-1.127C10.237 15.642 11.082 16 12 16s1.763-.358 2.357-.873a.75.75 0 11.983 1.127C14.456 17.026 13.282 17.5 12 17.5z"/>
          </svg>
        </a>

        {/* X (Twitter) */}
        <a href="https://x.com/Nattypays" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-[72px] md:h-[72px] bg-black flex items-center justify-center rounded-[10px] md:rounded-xl border border-gray-600 flex-shrink-0 hover:opacity-80 transition-opacity">
          <svg className="w-4 h-4 md:w-[26px] md:h-[26px]" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/company/nattypay/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-[72px] md:h-[72px] bg-[#0077B5] flex items-center justify-center rounded-[10px] md:rounded-xl flex-shrink-0 hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5 md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="white">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

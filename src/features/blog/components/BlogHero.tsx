import React from 'react';

export default function BlogHero() {
  return (
    <section className="w-full bg-[#000000] flex flex-col items-center justify-center font-['Poppins'] px-6 md:px-12 relative overflow-hidden" style={{ paddingTop: 'clamp(80px, 12vw, 140px)', paddingBottom: 'clamp(60px, 10vw, 100px)' }}>
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#111111] to-black opacity-80 pointer-events-none" />
      
      {/* Glow effect */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#F0BF4C] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="flex flex-col items-center text-center gap-6 max-w-[900px] w-full relative z-10">
        <div className="bg-[#111111] border border-[#222222] rounded-full px-4 py-1.5 flex items-center justify-center mb-2">
          <span className="text-[#F0BF4C] font-medium text-[13px] md:text-[14px] uppercase tracking-wider">Our Journal</span>
        </div>
        
        <h1 className="text-white font-bold text-[40px] md:text-[64px] leading-[1.1] font-poppins m-0">
          Insights & Updates from <span className="text-[#F0BF4C]">NattyPay</span>
        </h1>
        
        <p className="text-white/80 font-normal text-[16px] md:text-[22px] leading-[1.6] max-w-[700px]">
          Discover the latest news, financial tips, and product updates to help you navigate your journey to financial freedom.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-[600px] mt-8 relative">
          <div 
            className="absolute flex items-center pointer-events-none" 
            style={{ top: 0, bottom: 0, left: '24px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-[#111111] border border-[#333333] rounded-full text-white text-[16px] outline-none focus:border-[#F0BF4C] transition-colors"
            style={{ height: '64px', paddingLeft: '56px', paddingRight: '128px' }}
          />
          <button 
            className="absolute bg-[#F0BF4C] hover:bg-[#d4a844] text-black font-semibold rounded-full transition-colors flex items-center justify-center text-[15px]"
            style={{ top: '8px', bottom: '8px', right: '8px', width: '130px' }}
          >
            Search
          </button>
        </div>
        
      </div>
    </section>
  );
}

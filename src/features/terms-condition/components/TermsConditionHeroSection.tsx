import React from 'react';

export default function TermsConditionHeroSection() {
  return (
    <section
      className="relative w-full h-[350px] md:h-[500px] bg-cover bg-center flex items-center justify-center pt-16"
      style={{
        backgroundImage: "linear-gradient(0deg, rgba(11, 11, 15, 0.85), rgba(11, 11, 15, 0.85)), url('/img/contact.png')",
      }}
    >
      <div className="max-w-[1227px] w-full px-4 mx-auto flex flex-col items-center justify-center text-center">
        <div className="flex flex-col gap-6 max-w-[800px] items-center">
          <div className="px-6 py-2 rounded-full border border-[#F0BF4C]/30 bg-[#F0BF4C]/10 backdrop-blur-sm">
            <span className="text-[#F0BF4C] font-poppins font-medium tracking-[0.2em] text-[13px] uppercase">LEGAL AGREEMENT</span>
          </div>
          <h1 className="text-white font-bold text-[40px] md:text-[64px] leading-[1.1] font-poppins m-0">
            Terms & Conditions
          </h1>
          <p className="text-white/70 text-[16px] md:text-[20px] leading-[1.6] font-poppins m-0">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>
    </section>
  );
}

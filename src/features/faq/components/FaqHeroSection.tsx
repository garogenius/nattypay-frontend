import React from 'react';

export default function FaqHeroSection() {
  return (
    <section
      className="relative w-full h-[300px] md:h-[450px] bg-cover bg-center flex items-center justify-center pt-16"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), url('/img/faq.jpg')",
      }}
    >
      <div className="max-w-[1227px] w-full px-4 mx-auto flex flex-col items-center justify-center text-center">
        <div className="flex flex-col gap-6 max-w-[800px]">
          <h1 className="text-[#FFCE65] font-bold text-[36px] md:text-[64px] leading-[44px] md:leading-[90px] font-poppins">
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-white text-[16px] md:text-[20px] leading-[26px] md:leading-[35px] font-poppins opacity-90">
            Here are some of the answers to your questions and doubts
          </p>
        </div>
      </div>
    </section>
  );
}

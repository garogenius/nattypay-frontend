import React from 'react';
import Image from 'next/image';

const showcases = [
  {
    title: "API Product Pages",
    description: "Seamlessly manage and monitor your API products, usage, and integrations in one unified view. Gain full visibility into your transactional flow.",
    image: "/img/d2.png",
  },
  {
    title: "Customer List & Wallets",
    description: "Keep track of your customers, view their generated wallets, and monitor balances instantly. Streamline customer relationship management.",
    image: "/img/d3.png",
  },
  {
    title: "Developer Hub & API Keys",
    description: "Generate API keys, manage webhooks, and securely configure your integration settings with ease, directly from your dashboard.",
    image: "/img/d4.png",
  }
];

export default function BusinessDashboardShowcase() {
  return (
    <section className="w-full bg-[#111111] overflow-hidden" style={{ paddingTop: 'clamp(80px, 8vw, 120px)', paddingBottom: 'clamp(80px, 8vw, 120px)' }}>
      <div className="w-full max-w-[1720px] mx-auto flex flex-col items-center gap-[64px] lg:gap-[100px]" style={{ paddingLeft: 'clamp(24px, 5vw, 96px)', paddingRight: 'clamp(24px, 5vw, 96px)' }}>
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[800px]">
          <h2 className="font-poppins font-semibold text-[32px] lg:text-[48px] leading-tight text-white m-0">
            A Dashboard built for <span className="text-[#F0BF4C]">Total Control.</span>
          </h2>
          <p className="font-poppins font-normal text-[15px] lg:text-[18px] text-[#888888] mt-4 lg:mt-6">
            Everything you need to manage your business operations, from tracking customers to generating API keys for seamless integration.
          </p>
        </div>

        {/* Showcase Items */}
        <div className="flex flex-col w-full gap-[64px] lg:gap-[120px]">
          {showcases.map((showcase, index) => (
            <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-[32px] lg:gap-[80px]`}>
              
              {/* Text Side */}
              <div className="w-full lg:w-1/3 flex flex-col gap-[16px] text-center lg:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#F0BF4C]/10 text-[#F0BF4C] flex items-center justify-center mx-auto lg:mx-0">
                   <span className="font-poppins font-bold text-[20px]">{index + 1}</span>
                </div>
                <h3 className="font-poppins font-semibold text-[24px] lg:text-[32px] text-white m-0 leading-tight">
                  {showcase.title}
                </h3>
                <p className="font-poppins font-normal text-[15px] lg:text-[18px] text-[#AAAAAA] leading-relaxed m-0">
                  {showcase.description}
                </p>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-2/3 relative">
                <div className="relative w-full aspect-[16/11] lg:aspect-[16/9] rounded-[24px] lg:rounded-[40px] bg-black border border-[#333333] shadow-2xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#221c0b]" />
                  <Image 
                    src={showcase.image} 
                    alt={showcase.title} 
                    fill 
                    className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

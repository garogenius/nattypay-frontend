"use client";
import React, { useRef } from 'react';

const newsItems = [
  {
    title: "Global Markets Rally as Economic Recovery Gains Momentum",
    description: "Global markets surge on the back of a strengthening economic recovery, reflecting increased optimism and positive momentum in various sectors worldwide.",
    date: "December 07th, 2023",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80" // Stock market/finance image
  },
  {
    title: "Financial Experts Predict Positive Outlook for Q4 Economic Growth",
    description: "Robert Mc Caney, Financial experts, anticipate a positive Q4 economic growth outlook, forecasting optimism and potential opportunities for sustained financial improvement.",
    date: "December 07th, 2023",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" // Trading/ROI image
  },
  {
    title: "Tech Sector Leads the Way in Green Energy Investments",
    description: "Major technology firms are increasingly pouring funds into renewable energy, signaling a massive shift towards sustainable corporate operations in the coming decade.",
    date: "November 28th, 2023",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80" // Modern tech/energy image
  },
  {
    title: "Central Bank Announces New Interest Rate Policies for 2024",
    description: "In an unexpected move, the Central Bank has outlined a revised framework for interest rates, aiming to curb inflation while stimulating small business growth.",
    date: "November 15th, 2023",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80" // Money/Banking image
  }
];

export default function NewsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -632, behavior: 'smooth' }); // Card width (608) + gap (24)
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 632, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      {/* Custom CSS to hide scrollbar */}
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Main Container */}
      <div 
        className="w-full max-w-[1440px] mx-auto px-4 lg:px-0 flex flex-col"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)' }}
      >
        
        {/* Header Row: Title & Nav Buttons */}
        <div 
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between w-full" 
          style={{ paddingRight: 'clamp(16px, 6vw, 96px)', marginBottom: '100px' }}
        >
          
          {/* Title and Subtitle */}
          <div className="flex flex-col max-w-[707px] gap-6">
            <h2 className="font-poppins font-medium text-[32px] lg:text-[38px] leading-tight lg:leading-[57px] text-black m-0">
              Latest Finance Information for You
            </h2>
            <p className="font-poppins font-normal text-[16px] lg:text-[18px] leading-relaxed lg:leading-[32px] text-[#4A4A4A] m-0">
              Stay updated with the latest in internet banking and financial innovations
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-row items-center gap-6 mt-8 lg:mt-0">
            <button 
              onClick={scrollLeft}
              className="flex items-center justify-center w-[150px] lg:w-[173px] h-[54px] rounded-[8px] border border-[#D4B039] bg-transparent hover:bg-[#D4B039]/10 transition-colors"
            >
              <span className="font-figtree font-medium text-[20px] lg:text-[24px] text-black">
                Previous
              </span>
            </button>
            <button 
              onClick={scrollRight}
              className="flex items-center justify-center w-[150px] lg:w-[173px] h-[54px] rounded-[8px] border border-[#D4B039] bg-transparent hover:bg-[#D4B039]/10 transition-colors"
            >
              <span className="font-figtree font-medium text-[20px] lg:text-[24px] text-black">
                Next
              </span>
            </button>
          </div>

        </div>

        {/* Slider Container */}
        <div 
          ref={sliderRef}
          className="flex flex-row items-start gap-[24px] w-full overflow-x-auto snap-x snap-mandatory hide-scroll pb-8"
          style={{ paddingRight: 'clamp(16px, 6vw, 96px)' }}
        >
          {newsItems.map((news, idx) => (
            <div 
              key={idx}
              className="flex flex-col flex-shrink-0 w-[350px] lg:w-[608px] h-[534px] relative snap-center"
            >
              
              {/* Top Image */}
              <div 
                className="w-full h-[300px] absolute top-0 left-0 bg-gray-300"
                style={{ borderRadius: '24px 24px 0px 0px' }}
              >
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '24px 24px 0px 0px' }}
                />
              </div>

              {/* Bottom Yellow Card (Overlaps the image by 40px) */}
              <div 
                className="flex flex-col items-start bg-[#F0BF4C] absolute left-0 w-full"
                style={{ 
                  top: '260px', 
                  height: '274px', 
                  borderRadius: '24px',
                  padding: '40px 40px 60px'
                }}
              >
                <div className="flex flex-col gap-6 w-full h-full justify-between">
                  
                  {/* Title */}
                  <h3 className="font-poppins font-semibold text-[22px] lg:text-[28px] leading-[32px] lg:leading-[38px] text-black m-0 line-clamp-1">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="font-poppins font-normal text-[14px] lg:text-[18px] leading-[24px] lg:leading-[32px] text-black m-0 line-clamp-2">
                    {news.description}
                  </p>

                  {/* Date */}
                  <p className="font-poppins font-normal text-[14px] lg:text-[16px] leading-[24px] text-[#7D7D7D] m-0 self-end">
                    {news.date}
                  </p>
                  
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

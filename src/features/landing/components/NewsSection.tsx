"use client";
import React, { useRef, useState, useEffect } from 'react';

export default function NewsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/content/nattypay/news');
        if (response.ok) {
          const data = await response.json();
          const mappedPosts = data.slice(0, 5).map((apiPost: any) => {
            // Excerpt from content
            let textContent = "";
            if (typeof document !== 'undefined') {
              const tmp = document.createElement("DIV");
              tmp.innerHTML = apiPost.content || "";
              textContent = tmp.textContent || tmp.innerText || "";
            } else {
              textContent = (apiPost.content || "").replace(/<[^>]*>?/gm, '');
            }
            const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");

            const dateObj = new Date(apiPost.createdAt);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return {
              title: apiPost.title,
              description: excerpt,
              category: apiPost.tags && apiPost.tags.length > 0 ? apiPost.tags[0] : 'News',
              date: formattedDate,
              image: apiPost.thumbnail || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'
            };
          });
          setNewsItems(mappedPosts);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

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
          style={{ paddingRight: 'clamp(16px, 6vw, 96px)', marginBottom: '48px' }}
        >
          
          {/* Title and Subtitle */}
          <div className="flex flex-col max-w-[707px] gap-2 lg:gap-6">
            <h2 className="font-poppins font-medium text-[22px] lg:text-[38px] leading-[30px] lg:leading-[57px] text-black m-0">
              Latest Finance Information for You
            </h2>
            <p className="font-poppins font-normal text-[12px] lg:text-[18px] leading-[20px] lg:leading-[32px] text-[#4A4A4A] m-0">
              Stay updated with the latest in internet banking and financial innovations
            </p>
          </div>

          {/* Navigation Buttons (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-row items-center gap-6 mt-8 lg:mt-0">
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

          {isLoading ? (
            <div className="flex flex-row items-start gap-[16px] lg:gap-[24px] w-full hide-scroll">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col flex-shrink-0 w-[280px] lg:w-[608px] h-[340px] lg:h-[534px] relative bg-[#E5E7EB] rounded-[16px] lg:rounded-[24px] animate-pulse">
                  <div className="w-full h-[180px] lg:h-[300px] bg-gray-300 rounded-t-[16px]"></div>
                  <div className="flex flex-col gap-4 p-6 mt-4">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              ref={sliderRef}
              className="flex flex-row items-start gap-[16px] lg:gap-[24px] w-full overflow-x-auto snap-x snap-mandatory hide-scroll pb-4 lg:pb-8"
              style={{ paddingRight: 'clamp(16px, 6vw, 96px)' }}
            >
              {newsItems.map((news, idx) => (
            <div 
              key={idx}
              className="flex flex-col flex-shrink-0 w-[280px] lg:w-[608px] h-[340px] lg:h-[534px] relative snap-center"
            >
              
              {/* Top Image */}
              <div 
                className="w-full h-[180px] lg:h-[300px] absolute top-0 left-0 bg-gray-300"
                style={{ borderRadius: '16px 16px 0px 0px' }}
              >
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '16px 16px 0px 0px' }}
                />
              </div>

              {/* Bottom Yellow Card */}
              <div 
                className="flex flex-col items-start bg-[#F0BF4C] absolute left-0 w-full"
                style={{ 
                  top: 'clamp(150px, 25vw, 260px)', 
                  height: 'clamp(190px, 27vw, 274px)', 
                  borderRadius: 'clamp(16px, 2vw, 24px)',
                  padding: 'clamp(24px, 4vw, 40px)' 
                }}
              >
                <div className="flex flex-col gap-2 lg:gap-6 w-full h-full justify-between">
                  
                  {/* Category */}
                  {news.category && (
                    <span className="font-poppins font-bold text-[10px] lg:text-[14px] leading-none text-black/60 uppercase tracking-widest mb-[-4px] lg:mb-[-12px]">
                      {news.category}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-poppins font-semibold text-[14px] lg:text-[28px] leading-[20px] lg:leading-[38px] text-black m-0 line-clamp-1">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="font-poppins font-normal text-[11px] lg:text-[18px] leading-[16px] lg:leading-[32px] text-black m-0 line-clamp-2">
                    {news.description}
                  </p>

                  {/* Date */}
                  <p className="font-poppins font-normal text-[10px] lg:text-[16px] leading-[14px] lg:leading-[24px] text-[#7D7D7D] m-0 self-end mt-auto">
                    {news.date}
                  </p>
                  
                </div>
              </div>

            </div>
          ))}
        </div>
        )}

        {/* Scrollbar / Progress Bar (Mobile Only) */}
        <div className="w-full flex lg:hidden mt-4 items-center justify-start max-w-[280px] mx-auto">
          <div className="w-full h-[3px] bg-[#D1D5DB] rounded-full overflow-hidden">
             <div className="w-1/3 h-full bg-[#F0BF4C] rounded-full"></div>
          </div>
        </div>

      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

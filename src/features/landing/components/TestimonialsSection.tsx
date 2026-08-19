"use client";
import React, { useRef, useState, useEffect } from 'react';

const fallbackTestimonials = [
  {
    name: "Amaka Okafor",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    text: "Internet banking made my life easier—effortless transactions, robust security. A game-changer for financial management!",
    rating: 5
  },
  {
    name: "Chinedu Eze",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80",
    text: "Seamless and secure, Internet banking streamlines my transactions, providing convenience and peace of mind. Highly recommended!",
    rating: 4
  },
  {
    name: "Oluwaseun Adeyemi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    text: "Exceptional service! Internet banking ensures swift transactions and top-notch security. A reliable partner in managing finances efficiently.",
    rating: 5
  },
  {
    name: "Ngozi Chukwu",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80",
    text: "NattyPay has completely transformed how I handle my business payments. The instant transfers are truly instant. I love it!",
    rating: 5
  },
  {
    name: "Fatima Ibrahim",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80",
    text: "I used to worry about hidden fees, but NattyPay is transparent and affordable. The virtual cards work perfectly for my international subscriptions.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/content/nattypay/testimonials');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const mapped = data.map((item: any) => ({
              name: item.name,
              image: item.profileImage || "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
              text: item.review,
              rating: item.rating || 5
            }));
            setTestimonials(mapped);
          } else {
            setTestimonials(fallbackTestimonials);
          }
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  // Auto-play slider on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 1024 && sliderRef.current && sliderRef.current.children.length > 0) {
        const firstChild = sliderRef.current.children[0] as HTMLElement;
        const cardWidth = firstChild.offsetWidth + 24; // card width + gap
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        
        if (sliderRef.current.scrollLeft >= maxScroll - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -477, behavior: 'smooth' }); // Card width + gap
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 477, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center overflow-hidden">

      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      {/* Custom CSS to guarantee scrollbar is hidden across all browsers */}
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
          <div className="flex flex-col max-w-[612px] gap-2 lg:gap-6">
            <h2 className="font-poppins font-medium text-[22px] lg:text-[38px] leading-[30px] lg:leading-[57px] text-black m-0">
              Customers Feedback
            </h2>
            <p className="font-poppins font-normal text-[12px] lg:text-[18px] leading-[20px] lg:leading-[32px] text-[#4A4A4A] m-0">
              Our users share stories of satisfaction, trust, and exceptional experiences. Explore now!
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

        {/* Slider Container */}
        {/* We remove right padding on the container so the cards bleed to the edge of the screen */}
        {isLoading ? (
          <div 
            className="flex flex-row items-start w-full overflow-x-auto lg:overflow-hidden hide-scroll pb-4 lg:pb-8 gap-[24px] snap-x snap-mandatory lg:snap-none lg:gap-[32px]"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 snap-center w-[280px] lg:w-[453px]">
                <div 
                  className="flex flex-col flex-shrink-0 w-full h-[360px] lg:h-[440px] bg-[#E5E7EB] rounded-[16px] lg:rounded-[24px] animate-pulse"
                  style={{ padding: 'clamp(24px, 4vw, 40px)' }}
                >
                  {/* Profile Image Shimmer */}
                  <div className="w-[90px] h-[90px] lg:w-[140px] lg:h-[140px] rounded-full bg-gray-300 self-center flex-shrink-0"></div>
                  
                  {/* Text Content Shimmer */}
                  <div className="flex flex-col items-start text-left gap-2 lg:gap-3 w-full mt-6 lg:mt-[36px]">
                    <div className="h-5 lg:h-8 w-3/4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 lg:h-5 w-full bg-gray-300 rounded"></div>
                    <div className="h-3 lg:h-5 w-full bg-gray-300 rounded"></div>
                    <div className="h-3 lg:h-5 w-4/5 bg-gray-300 rounded"></div>
                  </div>
                  
                  {/* Star Rating Shimmer */}
                  <div className="flex flex-row items-center justify-end self-end gap-1 mt-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="w-full overflow-hidden pb-4 lg:pb-8 relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex flex-row items-start w-full overflow-x-auto lg:overflow-hidden hide-scroll gap-[24px] snap-x snap-mandatory lg:snap-none lg:gap-[32px]"
            style={{ paddingRight: '24px' }}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="flex-shrink-0 snap-center w-[280px] lg:w-[453px]">
                <div
                  className="flex flex-col flex-shrink-0 w-full h-[360px] lg:h-[440px] bg-[#F0BF4C] rounded-[16px] lg:rounded-[24px] transition-transform hover:-translate-y-2"
                  style={{ padding: 'clamp(24px, 4vw, 40px)' }}
                >
                  {/* Profile Image (Centered) */}
                  <div className="w-[90px] h-[90px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden self-center flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Content (Left Aligned) */}
                  <div className="flex flex-col items-start text-left gap-2 lg:gap-3 w-full mt-6 lg:mt-[36px]">
                    <h3 className="font-poppins font-medium text-[16px] lg:text-[28px] leading-[22px] lg:leading-[42px] text-black m-0">
                      {testimonial.name}
                    </h3>
                    <p className="font-poppins font-normal text-[12px] lg:text-[18px] leading-[18px] lg:leading-[32px] text-[#4A4A4A] m-0 line-clamp-4">
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Star Rating (Right Aligned) */}
                  <div className="flex flex-row items-center justify-end self-end gap-1 mt-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill={star <= testimonial.rating ? "white" : "transparent"}
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

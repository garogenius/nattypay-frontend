import React from 'react';

const features = [
  { 
    title: "Airtime Top Ups", 
    desc: "Top up your mobile phone with airtime from your favorite network service providers locally and internationally" 
  },
  { 
    title: "Mobile Data Top Up", 
    desc: "Top up your mobile devices with your favorite internet subscription plans from all internet network providers" 
  },
  { 
    title: "Internets", 
    desc: "Pay for internet subscriptions from internet routers and network internet cables like Smile, Swift, Mobitel etc" 
  },
  { 
    title: "Savings & Investments", 
    desc: "Create savings goals and track your progress. Earn attractive interest rates on your savings, and Manage your investment portfolios" 
  },
  { 
    title: "Instant Transfers", 
    desc: "Send money to friends and family instantly to any bank or physically through cash pickups. Receive funds quickly and securely." 
  },
  { 
    title: "Instant Virtual Cards", 
    desc: "Create Naira and USD virtual cards for secure online shopping. Set spending limits and track your expenses effortlessly" 
  },
  { 
    title: "Flight/Bus Tickets", 
    desc: "Book bus tickets for intercity travel within Nigeria. Book domestic and international flights at competitive rates." 
  },
  { 
    title: "Healthcare & Insurance", 
    desc: "Access healthcare services and purchase insurance plans. Find the best options for your health and insurance needs" 
  }
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      {/* Main Container */}
      <div 
        className="w-full max-w-[1440px] mx-auto px-4 lg:px-0 flex flex-col"
        style={{ paddingLeft: 'clamp(16px, 6vw, 96px)', paddingRight: 'clamp(16px, 6vw, 96px)' }}
      >
        
        {/* Header: Title and Subtitle */}
        <div className="flex flex-col w-full" style={{ marginBottom: '86px' }}>
          <h2 className="font-poppins font-medium text-[32px] lg:text-[38px] leading-tight lg:leading-[57px] text-black m-0 mb-4 lg:mb-0">
            NattyPay Features
          </h2>
          <p className="font-poppins font-normal text-[16px] lg:text-[25px] leading-relaxed lg:leading-[38px] text-black m-0 w-full lg:max-w-[1271px]">
            Pay all your bills at once with Nattypay without leaving your home. Whether you need to send money, pay bills, buy airtime, or manage your finances and savings, Nattypay is here to simplify your financial life.
          </p>
        </div>

        {/* Content: 2-Column Grid and Image Card */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-[27px] w-full">
          
          {/* Left Side: Features Grid */}
          <div className="flex-1 w-full max-w-[700px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[14px] gap-y-[33px]">
              
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-row items-start gap-[17px] w-full max-w-[320px] pb-[33px]"
                  style={{ borderBottom: '1px solid #008DFF' }}
                >
                  {/* Icon */}
                  <div className="w-[72px] h-[72px] bg-black rounded-[83px] flex-shrink-0 flex items-center justify-center" style={{ border: '0.83px solid #F0BF4C' }}>
                    <svg width="43" height="43" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#F0BF4C" />
                      <polyline points="9 12 11 14 15 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <h3 className="font-poppins font-semibold text-[16px] leading-[24px] text-black m-0 mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-poppins font-normal text-[12px] leading-[20px] text-[#4A4A4A] m-0">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Right Side: Gradient Image Card */}
          <div className="flex flex-col items-center justify-end w-full min-h-[400px] lg:min-h-0 max-w-[562px] rounded-[24px] flex-shrink-0 relative overflow-hidden"
               style={{ background: 'linear-gradient(180deg, #FFCE65 0%, #000000 100%)' }}>
            
            {/* The Image */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pb-6">
              <img 
                src="/img/icons/mm.png" 
                alt="NattyPay App Interface" 
                className="w-[85%] h-[85%] object-contain drop-shadow-2xl"
              />
            </div>
            
          </div>

        </div>

      </div>

      {/* Explicit Bottom Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

    </section>
  );
}

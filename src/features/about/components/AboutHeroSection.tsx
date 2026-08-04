import React from 'react';

export default function AboutHeroSection() {
  return (
    <section className="relative w-full h-[755px] bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), url(/img/about_hero_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full flex flex-row items-center justify-center px-6 lg:px-[58px] mt-[100px] lg:mt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[60px] lg:gap-[60px] w-full max-w-[1324px]">
          
          {/* Left Side */}
          <div className="flex flex-col items-start gap-[60px] lg:gap-[165px] w-full lg:w-1/2 flex-shrink-0">
            <div className="flex flex-col items-start gap-10 lg:gap-[42px] w-full">
              <div className="flex flex-col items-start gap-[12px] w-full">
                
                {/* Pill */}
                <div className="flex items-center justify-center bg-[#F0BF4C] rounded-[7px] px-4 py-[6px] h-[35px] w-[173px]">
                  <span className="font-poppins font-normal text-[20px] leading-[35px] text-black whitespace-nowrap">
                    About NattyPay
                  </span>
                </div>
                
                <h1 className="font-poppins font-semibold text-[32px] md:text-[48px] leading-tight md:leading-[70px] text-[#FFCE65] m-0 w-full max-w-[585px]">
                  Empowering Financial Freedom Across Africa
                </h1>
              </div>
              
              <p className="font-poppins font-normal text-[16px] md:text-[20px] leading-relaxed md:leading-[35px] text-white m-0 w-full max-w-[550px]">
                We're revolutionizing the way Africa transacts, making financial services more accessible, secure, and efficient for everyone, everywhere.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start gap-[60px] lg:gap-[165px] w-full lg:w-1/2 flex-shrink-0 lg:mt-[20px]">
            <div className="flex flex-col items-start gap-6 lg:gap-[42px] w-full lg:pl-[20px]">
              <div className="flex flex-col items-start gap-[12px] w-full">
                <h2 className="font-poppins font-semibold text-[40px] md:text-[64px] leading-tight md:leading-[90px] text-[#FFCE65] m-0 w-full max-w-[585px]">
                  Who are we
                </h2>
              </div>
              
              <p className="font-poppins font-normal text-[16px] md:text-[20px] leading-relaxed md:leading-[35px] text-white m-0 w-full max-w-[517px]">
                Nattypay Global Solution Ltd. is a registered Fin Tech company in Nigeria, committed to revolutionizing local and global financial services by providing innovative, secure, and user-friendly solutions that cater to the diverse needs of our customers. Founded with the vision of enhancing financial inclusion and empowering individuals and businesses.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

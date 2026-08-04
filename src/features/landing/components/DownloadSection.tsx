import React from 'react';

export default function DownloadSection() {
  return (
    <section className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center pb-[100px]">
      
      {/* Explicit Top Padding Spacer */}
      <div className="w-full h-[60px] lg:h-[100px] flex-shrink-0" />

      {/* Main Yellow Banner Full-Bleed Background */}
      <div className="w-full bg-[#F0BF4C] flex flex-col items-center justify-center relative">
        <div className="w-full max-w-[1440px] h-auto min-h-[222px] lg:h-[222px] relative flex flex-col lg:flex-row items-start justify-start lg:items-center lg:justify-start lg:px-0 lg:py-0 lg:pl-[100px] xl:pl-[150px]">
          
          {/* MOBILE CONTENT WRAPPER */}
          <div className="w-full flex flex-col items-start justify-start lg:hidden" style={{ padding: '40px 32px' }}>
            <div className="flex flex-col items-start justify-start gap-6 z-10 w-full">
              
              {/* Left: Text Block */}
              <div className="flex flex-col items-start text-left gap-2 w-full">
                <h2 className="font-poppins font-medium text-[20px] leading-[30px] text-black m-0">
                  Ready to Unlock Your Financial Potential?
                </h2>
                <p className="font-poppins font-normal text-[12px] leading-[18px] text-black m-0">
                  Download the NattyPay app and experience bordless banking
                </p>
              </div>

              {/* Center: QR Code and Store Buttons */}
              <div className="flex flex-row items-center gap-4">
                {/* QR Code */}
                <div className="w-[140px] h-[140px] bg-white p-2 flex-shrink-0 shadow-lg">
                  <img src="/img/icons/qr.png" alt="Download QR Code" className="w-full h-full object-cover" />
                </div>
                {/* Store Buttons */}
                <div className="flex flex-col gap-3">
                  <button className="flex flex-row items-center justify-center w-[140px] h-[44px] bg-[#E5E7EB] hover:bg-gray-300 rounded-[8px] transition-colors gap-2 px-2">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 2C3.22 2 3 2.22 3 2.5V21.5C3 21.78 3.22 22 3.5 22C3.63 22 3.76 21.95 3.85 21.85L14.7 11.95L3.85 2.15C3.76 2.05 3.63 2 3.5 2Z" fill="#00B0FF"/>
                      <path d="M19.7 10.35L15.65 14L14.7 11.95L15.65 9.9L19.7 13.65C19.82 13.76 19.88 13.9 19.88 14.05C19.88 14.2 19.82 14.34 19.7 14.45V10.35Z" fill="#FFC107"/>
                      <path d="M15.65 9.9L3.85 2.15C3.99 2.02 4.19 2 4.4 2C4.54 2 4.67 2.03 4.78 2.09L15.65 9.9Z" fill="#F44336"/>
                      <path d="M15.65 14L4.78 21.91C4.67 21.97 4.54 22 4.4 22C4.19 22 3.99 21.98 3.85 21.85L15.65 14Z" fill="#4CAF50"/>
                    </svg>
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-[9px] font-medium leading-[10px] text-gray-600 uppercase">GET IT ON</span>
                      <span className="text-[14px] font-semibold leading-[14px] text-black">Google Play</span>
                    </div>
                  </button>
                  <button className="flex flex-row items-center justify-center w-[140px] h-[44px] bg-[#E5E7EB] hover:bg-gray-300 rounded-[8px] transition-colors gap-2 px-2">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.36 10.51C16.36 8.52 17.98 7.55 18.06 7.5C17.06 6.04 15.48 5.8 14.93 5.76C13.64 5.63 12.39 6.52 11.72 6.52C11.05 6.52 10.03 5.78 8.94 5.79C7.52 5.81 6.2 6.62 5.46 7.9C3.94 10.56 5.07 14.49 6.55 16.62C7.27 17.65 8.12 18.81 9.24 18.77C10.32 18.72 10.74 18.12 12.04 18.12C13.33 18.12 13.71 18.77 14.83 18.75C15.99 18.73 16.73 17.7 17.45 16.64C18.28 15.43 18.62 14.26 18.64 14.2C18.61 14.19 16.36 13.33 16.36 10.51V10.51Z"/>
                      <path d="M13.79 3.84C14.39 3.11 14.79 2.13 14.68 1.15C13.84 1.18 12.8 1.7 12.18 2.41C11.64 3.03 11.16 4.04 11.29 5.01C12.23 5.08 13.2 4.56 13.79 3.84Z"/>
                    </svg>
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-[9px] font-medium leading-[10px] text-gray-600 uppercase">Download on the</span>
                      <span className="text-[14px] font-semibold leading-[14px] text-black">App Store</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP CONTENT WRAPPER */}
          <div className="hidden lg:flex flex-row items-center justify-start gap-[150px] xl:gap-[286px] z-10 w-auto">
            
            {/* Left: Text Block */}
            <div className="flex flex-col items-start text-left gap-2 max-w-[280px]">
              <h2 className="font-poppins font-medium text-[21px] leading-[32px] text-black m-0">
                Ready to Unlock Your Financial Potential?
              </h2>
              <p className="font-poppins font-normal text-[12px] leading-[18px] text-black m-0">
                Download the NattyPay app and experience bordless banking
              </p>
            </div>

            {/* Center: QR Code and Store Buttons */}
            <div className="flex flex-row items-center gap-6">
              
              {/* QR Code */}
              <div className="w-[176px] h-[176px] bg-white p-2 rounded-lg flex-shrink-0 shadow-lg">
                <img 
                  src="/img/icons/qr.png" 
                  alt="Download QR Code" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Store Buttons */}
              <div className="flex flex-col gap-3">
                {/* Google Play Button */}
                <button className="flex flex-row items-center justify-center w-[160px] h-[50px] bg-[#E5E7EB] hover:bg-gray-300 rounded-[8px] transition-colors gap-2 px-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 2C3.22 2 3 2.22 3 2.5V21.5C3 21.78 3.22 22 3.5 22C3.63 22 3.76 21.95 3.85 21.85L14.7 11.95L3.85 2.15C3.76 2.05 3.63 2 3.5 2Z" fill="#00B0FF"/>
                    <path d="M19.7 10.35L15.65 14L14.7 11.95L15.65 9.9L19.7 13.65C19.82 13.76 19.88 13.9 19.88 14.05C19.88 14.2 19.82 14.34 19.7 14.45V10.35Z" fill="#FFC107"/>
                    <path d="M15.65 9.9L3.85 2.15C3.99 2.02 4.19 2 4.4 2C4.54 2 4.67 2.03 4.78 2.09L15.65 9.9Z" fill="#F44336"/>
                    <path d="M15.65 14L4.78 21.91C4.67 21.97 4.54 22 4.4 22C4.19 22 3.99 21.98 3.85 21.85L15.65 14Z" fill="#4CAF50"/>
                  </svg>
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[10px] font-medium leading-[10px] text-gray-600 uppercase">GET IT ON</span>
                    <span className="text-[16px] font-semibold leading-[16px] text-black">Google Play</span>
                  </div>
                </button>

                {/* App Store Button */}
                <button className="flex flex-row items-center justify-center w-[160px] h-[50px] bg-[#E5E7EB] hover:bg-gray-300 rounded-[8px] transition-colors gap-2 px-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.36 10.51C16.36 8.52 17.98 7.55 18.06 7.5C17.06 6.04 15.48 5.8 14.93 5.76C13.64 5.63 12.39 6.52 11.72 6.52C11.05 6.52 10.03 5.78 8.94 5.79C7.52 5.81 6.2 6.62 5.46 7.9C3.94 10.56 5.07 14.49 6.55 16.62C7.27 17.65 8.12 18.81 9.24 18.77C10.32 18.72 10.74 18.12 12.04 18.12C13.33 18.12 13.71 18.77 14.83 18.75C15.99 18.73 16.73 17.7 17.45 16.64C18.28 15.43 18.62 14.26 18.64 14.2C18.61 14.19 16.36 13.33 16.36 10.51V10.51Z"/>
                    <path d="M13.79 3.84C14.39 3.11 14.79 2.13 14.68 1.15C13.84 1.18 12.8 1.7 12.18 2.41C11.64 3.03 11.16 4.04 11.29 5.01C12.23 5.08 13.2 4.56 13.79 3.84Z"/>
                  </svg>
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[10px] font-medium leading-[10px] text-gray-600 uppercase">Download on the</span>
                    <span className="text-[16px] font-semibold leading-[16px] text-black">App Store</span>
                  </div>
                </button>
              </div>
            </div>
            
          </div>

          {/* Right Side: Phone Image (Absolutely positioned flush to bottom) */}
          <div className="hidden lg:block absolute right-[100px] xl:right-[150px] bottom-0 w-[264px] h-[209px]">
            <img 
              src="/img/icons/1.png" 
              alt="NattyPay Mobile App" 
              className="w-full h-full object-cover object-top drop-shadow-2xl"
              style={{ borderRadius: '12px 12px 0px 0px' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

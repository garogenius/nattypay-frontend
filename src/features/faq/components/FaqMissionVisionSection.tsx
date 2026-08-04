import React from 'react';

export default function FaqMissionVisionSection() {
  return (
    <div className="hidden md:flex flex-row justify-between w-full gap-12 mt-8 md:mt-16">
      <div className="flex flex-col gap-10 flex-1 max-w-[585px]">
        <h3 className="text-black font-semibold text-[64px] leading-[90px]">
          Our Mission
        </h3>
        <p className="text-black text-[20px] leading-[35px]">
          Our mission at Nattypay is to deliver cutting-edge global financial services that improve the lives of Nigerians by offering unparalleled convenience, robust security, and financial freedom. We strive to bridge the gap between traditional banking and modern financial needs, ensuring that every individual, regardless of their location or socio-economic status, has access to reliable financial tools.
        </p>
      </div>

      <div className="hidden md:block w-[2px] h-[300px] bg-black self-center"></div>

      <div className="flex flex-col gap-10 flex-1 max-w-[585px]">
        <h3 className="text-black font-semibold text-[64px] leading-[90px]">
          Our Vision
        </h3>
        <p className="text-black text-[20px] leading-[35px]">
          We envision becoming the most trusted and widely used financial service provider across the globe. Our goal is to transform the financial landscape by continually innovating and expanding our services to meet the evolving needs of our customers. We aim to be a catalyst for economic growth and prosperity, helping individuals and businesses thrive in the digital age.
        </p>
      </div>
    </div>
  );
}

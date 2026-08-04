import React from 'react';

export default function AboutCommitmentSection() {
  return (
    <section className="relative w-full min-h-[665px] bg-[#F0BF4C] py-16 lg:py-[100px] flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[67px]"
        style={{
          width: 'calc(100% - 48px)',
          maxWidth: '1234px',
          margin: '0 auto',
        }}
      >

        {/* Left Content */}
        <div className="flex flex-col items-start w-full lg:w-[598px] flex-shrink-0">
          <div className="flex flex-col items-start gap-[25px] w-full lg:w-[585px]">
            <h2 className="font-poppins font-semibold text-[32px] md:text-[45px] leading-tight md:leading-[65px] text-black m-0 w-full">
              Our Commitment to Excellence
            </h2>

            <p className="font-poppins font-normal text-[16px] md:text-[20px] leading-relaxed md:leading-[35px] text-black m-0 w-full">
              At Nattypay, we are dedicated to providing cutting-edge financial solutions that empower individuals and businesses across Africa. Our platform is built on a foundation of trust, security, and innovation, ensuring that every transaction is seamless and every user experience is exceptional. We understand the dynamic needs of the modern consumer and are committed to crafting solutions that not only meet but exceed expectations. Our team of experts works tirelessly to ensure that our services remain at the forefront of financial technology, driving financial inclusion across the continent.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div
          className="w-full lg:w-[569px] h-[350px] lg:h-[565px] rounded-[28px] flex-shrink-0 shadow-lg"
          style={{
            background: 'url(/img/about_commitment.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

      </div>
    </section>
  );
}

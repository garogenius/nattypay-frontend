import React from 'react';

export default function ContactHeroSection() {
  return (
    <section
      className="relative w-full h-[300px] md:h-[450px] bg-cover bg-center flex items-center justify-center pt-16"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), url('/img/contact.png')",
      }}
    >
      <div className="max-w-[876px] w-full px-4 mx-auto flex flex-col items-center justify-center text-center gap-6">
        <h1 className="text-[#FFCE65] font-bold text-[32px] md:text-[64px] leading-[40px] md:leading-[90px] font-poppins">
          Get In Touch With Us
        </h1>
        <p className="text-white text-[15px] md:text-[20px] leading-[24px] md:leading-[35px] max-w-[666px] font-poppins opacity-90">
          For any inquiries or assistance, do not hesitate to reach out to us. At Nattypay, your satisfaction is our priority.
        </p>
      </div>
    </section>
  );
}

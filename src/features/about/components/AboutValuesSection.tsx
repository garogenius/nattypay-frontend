import React from 'react';

const values = [
  {
    title: 'Integrity',
    description: 'Quick, secure, smooth financial interactions and operations.',
    icon: (
      <svg className="w-6 h-6 xl:w-9 xl:h-9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'We embrace creativity and innovation to drive financial solutions.',
    icon: (
      <svg className="w-6 h-6 xl:w-9 xl:h-9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
      </svg>
    ),
  },
  {
    title: 'Customer Focus',
    description: 'Our customers are at the heart of everything we do.',
    icon: (
      <svg className="w-6 h-6 xl:w-9 xl:h-9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in all aspects of our services.',
    icon: (
      <svg className="w-6 h-6 xl:w-9 xl:h-9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: 'Teamwork',
    description: 'We believe in the power of collaboration and teamwork.',
    icon: (
      <svg className="w-6 h-6 xl:w-9 xl:h-9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function AboutValuesSection() {
  return (
    <section
      className="relative w-full bg-black overflow-hidden flex flex-col items-center justify-center xl:py-[90px]"
      style={{ paddingTop: '64px', paddingBottom: '64px' }}
    >
      <div
        className="flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-[60px]"
        style={{
          width: 'calc(100% - 48px)',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        {/* Left column — Frame 146 */}
        <div
          className="flex flex-col items-start flex-shrink-0 w-full xl:w-[540px] gap-4 xl:gap-[20px]"
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-row items-center w-full xl:w-[540px] bg-[#F0BF4C] hover:scale-[1.01] transition-transform duration-200 rounded-[16px] xl:rounded-[20px]"
              style={{ paddingTop: 'clamp(16px, 2vw, 24px)', paddingBottom: 'clamp(16px, 2vw, 24px)', paddingLeft: 'clamp(20px, 3vw, 32px)', paddingRight: 'clamp(20px, 3vw, 32px)', gap: 'clamp(16px, 3vw, 24px)' }}
            >
              {/* Icon circle — Frame 129 */}
              <div
                className="flex items-center justify-center flex-shrink-0 bg-black rounded-full w-12 h-12 xl:w-16 xl:h-16"
              >
                {value.icon}
              </div>

              {/* Text — Frame 132 */}
              <div className="flex flex-col items-start w-full">
                <h3
                  className="m-0 font-poppins font-semibold text-[15px] xl:text-[16px] leading-[22px] xl:leading-[24px] text-[#2A2A2A]"
                >
                  {value.title}
                </h3>
                <p
                  className="m-0 font-poppins font-normal text-[12px] xl:text-[11px] leading-[18px] text-[#4A4A4A]"
                >
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right image — Rectangle 1642 */}
        <div
          className="flex-shrink-0 w-full xl:w-[612px] h-[250px] md:h-[400px] xl:h-[560px] overflow-hidden shadow-2xl rounded-[30px] xl:rounded-[60px]"
          style={{
            background: 'url(/img/about_values.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    </section>
  );
}

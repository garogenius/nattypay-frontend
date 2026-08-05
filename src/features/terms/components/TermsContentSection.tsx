import React from 'react';

const terms = [
  {
    id: '1',
    title: 'Acceptance of Terms',
    content: 'By accessing or using personal account, Business account, Bill Payments, creation of USD card, NGN card, International transactions, investment, savings and other financial services (the “Service”), you agree to comply with and be bound by these Terms of Use (the “Terms”) and our Privacy Policy. If you do not agree with any part of these Terms, you must not use the Service by Cook Island Trust.'
  },
  {
    id: '2',
    title: 'Modifications',
    content: 'We reserve the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting to our site, and you agree to be bound by any modifications by continuing to use the Service.'
  },
  {
    id: '3',
    title: 'Eligibility',
    content: 'You must be at least 18 years old to use our Service. By using the Service, you represent and warrant that you meet this requirement.'
  },
  {
    id: '4',
    title: 'Account Registration',
    content: 'You may need to create an account to access certain features. You agree to provide accurate, complete information and to keep your account details up to date. You are responsible for maintaining the confidentiality of your account and password. You are liable for any activities under your account.'
  },
  {
    id: '5',
    title: 'Use of the Service',
    content: 'You agree to use the Service only for lawful purposes and in a way that does not infringe upon the rights of others. Prohibited activities include, but are not limited to:\n\n• Uploading, sharing, or transmitting any illegal content\n• Engaging in harassment or discrimination\n• Impersonating others or misrepresenting your identity\n• Attempting to hack or gain unauthorized access to our systems'
  },
  {
    id: '6',
    title: 'Intellectual Property',
    content: 'All content on the Service, including text, graphics, logos, and software, is the property of NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY) and is protected by intellectual property laws. You may not use, copy, or distribute any content from the Service without explicit permission from NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY)'
  },
  {
    id: '7',
    title: 'User-Generated Content',
    content: 'By submitting content to the Service (e.g., posts, comments, reviews), you grant us a worldwide, royalty-free, perpetual license to use, display, reproduce, and distribute your content. You agree not to submit any content that is unlawful or infringes upon others’ rights.'
  },
  {
    id: '8',
    title: 'Disclaimers',
    content: 'The Service is provided “as is” and “as available.” We make no warranties, express or implied, about the accuracy or reliability of the Service. We do not guarantee that the Service will be error-free or uninterrupted.'
  },
  {
    id: '9',
    title: 'Limitation of Liability',
    content: 'To the fullest extent permitted by law, NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY) and its affiliates are not liable for any indirect, incidental, or consequential damages arising out of your use of the Service.'
  },
  {
    id: '10',
    title: 'Termination',
    content: 'We reserve the right to suspend or terminate your account or access to the Service at our discretion, without notice, if we determine that you have violated these Terms.'
  },
  {
    id: '11',
    title: 'Governing Law',
    content: 'These Terms are governed by the laws of Cook Island Trust and any disputes will be resolved in the courts of Cook Island Trust.'
  },
  {
    id: '12',
    title: 'Contact Information',
    content: 'If you have any questions or concerns about these Terms, please contact us at:\n\nEmail: support@nattypay.com\nCall: +2348134146906'
  }
];

export default function TermsContentSection() {
  return (
    <section className="w-full max-w-[1200px] px-6 lg:px-12 py-[80px] lg:py-[120px] flex flex-col items-center text-left gap-[60px]">
      
      {/* Header Info */}
      <div className="flex flex-col items-center text-center gap-4 pb-6 w-full max-w-[800px]">
        <h2 className="font-poppins font-bold text-[36px] md:text-[48px] leading-tight text-white m-0">
          Terms of Use
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#F0BF4C]"></div>
          <p className="font-poppins font-medium text-[16px] md:text-[18px] text-[#808080] m-0 tracking-wide">
            LAST UPDATED: 11TH NOVEMBER 2024
          </p>
          <div className="w-2 h-2 rounded-full bg-[#F0BF4C]"></div>
        </div>
      </div>

      {/* Terms List (Premium Cards) */}
      <div className="flex flex-col gap-[30px] w-full">
        {terms.map((term) => (
          <div 
            key={term.id} 
            className="flex flex-col md:flex-row gap-6 md:gap-[40px] items-start w-full bg-[#16161E] rounded-[24px] shadow-2xl border border-white/5 hover:border-[#F0BF4C]/40 hover:bg-[#1A1A24] hover:-translate-y-2 transition-all duration-300"
            style={{ padding: 'clamp(20px, 4vw, 40px)' }}
          >
            
            {/* Number Badge */}
            <div className="flex-shrink-0 flex items-center justify-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-2xl bg-[#F0BF4C]/10 border border-[#F0BF4C]/30">
              <span className="font-poppins font-bold text-[20px] md:text-[24px] text-[#F0BF4C]">
                {term.id}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col items-start text-left gap-4 w-full pt-1">
              <h3 className="font-poppins font-semibold text-[22px] md:text-[26px] leading-tight text-white m-0 text-left">
                {term.title}
              </h3>
              <p className="font-poppins font-normal text-[15px] md:text-[17px] leading-[1.85] text-white/60 whitespace-pre-line m-0 text-left">
                {term.content}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

import React from 'react';

const privacyIntro = "NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY) we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n\nPlease read this Privacy Policy carefully to understand our views and practices regarding your personal data and how we will treat it. By accessing or using our website and services, you agree to the collection and use of information in accordance with this policy.";

const privacySections = [
  {
    id: '1',
    title: 'Information We Collect',
    content: 'We may collect and process the following types of information: Personal data/ information in this context shall include all data such as: any means of information relating to an identified or identifiable natural person who can be identified by:\n\n1, a name;\n2, an identification number;\n3, location data, an online identifier;\n4, address, a photo, an email address;\n5, facial recognition data;\n6, bank details and any other sensitive personal information\n\n1.1 Personal data Information:\nWe collect personal information you voluntarily provide to us, such as your name, bank account, facial recognition data, bank verification number, national identification number, international passport number, means of identification, guarantors contact details, bank statements, usernames, password, your preferences, interests, feedback and survey responses, preference in receiving marketing information from us and our third parties and your communication preferences, email address, phone number, and other contact information when you create an account, sign up for our newsletter, or contact us.\n\n1.2 Usage Data:\nWe automatically collect information about your activity on our website, such as IP address, browser type, operating system, referring URLs, page views, and other usage statistics.\n\n1.3 Cookies and Tracking Technologies:\nWe use cookies, web beacons, and other tracking technologies to collect information about your interactions with our website to personalize your experience and for analytics purposes.'
  },
  {
    id: '2',
    title: 'How We Use Your Information',
    content: 'We use your information for various purposes, including to:\n\n• Provide, maintain, and improve our website and services.\n• Process and manage your account.\n• Communicate with you about updates, promotions, and other information that may be of interest to you.\n• Analyze usage trends and track user engagement.\n• Comply with legal obligations and enforce our policies.'
  },
  {
    id: '3',
    title: 'Sharing Your Information',
    content: 'We may share your information with third parties in the following circumstances:\n\n• With Service Providers: We may share your information with trusted service providers who perform functions on our behalf, such as website hosting, data analysis, customer service, etc.\n• With Legal Authorities: We may disclose your information to comply with legal obligations or protect the rights, property, or safety of our company, our users, or others.\n• For Business Transfers: If we undergo a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.'
  },
  {
    id: '4',
    title: 'Data Security',
    content: 'We take reasonable measures to protect your information from unauthorized access, disclosure, or destruction. However, no data transmission over the Internet is entirely secure, so we cannot guarantee absolute security.'
  },
  {
    id: '5',
    title: 'Your Rights and Choices',
    content: 'Depending on your location, you may have certain rights regarding your personal data, such as the right to:\n\n• Access, update, or delete your information.\n• Object to or restrict processing of your information.\n• Withdraw consent where applicable.\n\nTo exercise any of these rights, please contact us at support@nattypay.com\nCall: +2348134146906'
  },
  {
    id: '6',
    title: 'Third-Party Links',
    content: 'Our website may contain links to third-party websites. This Privacy Policy does not apply to those third parties, and we encourage you to review their privacy policies.'
  },
  {
    id: '7',
    title: 'Changes to This Privacy Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on our website and updating the “Last Updated” 10th November 2024.'
  },
  {
    id: '8',
    title: 'Retention of your data',
    content: 'We will not retain your personal data for longer than is necessary for the purposes for which such personal data is processed. This means that your personal data will only be retained for as long as it is still required to provide you with the Services or is necessary for legal reasons. When calculating the appropriate retention period of your personal data we consider the nature and sensitivity of the personal data, the purposes for which we are processing such personal data, and any applicable statutory/regulatory retention periods. Using these criteria, we regularly review the personal data that we hold and the purposes for which such is held and processed. Our Payment Card Industry Data Security Standard (“PCIDSS”) obligation means that we are obliged to retain personal data since the end date of our business relationship with you.'
  },
  {
    id: '9',
    title: 'Contact Us',
    content: 'If you have any questions or concerns about this privacy policy, please contact us at:\n\nNATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY)\n\nHead office: C3&C4 Suite Second Floor Ejison Plaza 9a new market road main market onitsha Anambra state\n\nEmail: support@nattypay.com\nCall: +2348134146906'
  }
];

export default function PrivacyPolicyContentSection() {
  return (
    <section 
      className="w-full max-w-[1240px] px-6 lg:px-12 flex flex-col items-center text-left gap-[60px]"
      style={{ paddingTop: 'clamp(60px, 8vw, 100px)', paddingBottom: 'clamp(80px, 8vw, 120px)' }}
    >
      
      {/* Introduction Card */}
      <div 
        className="w-full bg-[#16161E] rounded-[24px] shadow-2xl border border-white/5"
        style={{ padding: 'clamp(30px, 5vw, 50px)' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 w-full border-b border-white/5">
          <h2 className="font-poppins font-bold text-[28px] md:text-[36px] leading-tight text-white m-0">
            Privacy Policy Overview
          </h2>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#F0BF4C]/10 border border-[#F0BF4C]/20">
            <svg className="w-5 h-5 text-[#F0BF4C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-poppins font-semibold text-[14px] text-white/80 m-0 tracking-wide uppercase">
              Last Updated: 10 Nov 2024
            </p>
          </div>
        </div>
        <p className="font-poppins font-normal text-[16px] md:text-[18px] leading-[1.8] text-white/60 whitespace-pre-line m-0 mt-6">
          {privacyIntro}
        </p>
      </div>

      {/* Split Layout for Privacy Terms */}
      <div className="flex flex-col gap-12 w-full mt-4">
        {privacySections.map((section) => (
          <div 
            key={section.id} 
            className="flex flex-col lg:flex-row items-start w-full gap-6 lg:gap-16 border-l-4 border-transparent hover:border-[#F0BF4C] pl-0 lg:pl-6 transition-all duration-300"
          >
            
            {/* Left Column: Number & Title */}
            <div className="flex-shrink-0 w-full lg:w-[350px] flex flex-col gap-2 relative pl-2 lg:pl-0">
              <span className="absolute -top-6 lg:-top-8 -left-2 lg:-left-4 text-[60px] lg:text-[80px] font-bold text-white/5 select-none z-0 leading-none">
                0{section.id}
              </span>
              <div className="relative z-10 flex flex-col gap-2 pt-3 lg:pt-4">
                <h3 className="font-poppins font-semibold text-[20px] md:text-[28px] leading-tight text-white m-0">
                  {section.title}
                </h3>
                <div className="w-12 h-1 bg-[#F0BF4C] rounded-full mb-2 lg:mb-0"></div>
              </div>
            </div>

            {/* Right Column: Detailed Content */}
            <div 
              className="flex-grow w-full bg-[#16161E] rounded-[20px] shadow-2xl border border-white/5 hover:border-[#F0BF4C]/40 hover:bg-[#1A1A24] transition-all duration-300"
              style={{ padding: 'clamp(24px, 4vw, 40px)' }}
            >
              <p className="font-poppins font-normal text-[15px] md:text-[17px] leading-[1.8] text-white/60 whitespace-pre-line m-0 text-left">
                {section.content}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

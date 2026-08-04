import React from 'react';

const terms = [
  {
    id: '1',
    title: 'Acceptance',
    content: 'By using our website, mobile app, and services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.\n\n1.1 By accessing and using our services, you confirm that you have read, understood, and agree to abide by these terms.\n\n1.2 If you do not agree to these Terms and Conditions, please do not use our services.'
  },
  {
    id: '2',
    title: 'Eligibility',
    content: '2.1 To use our services, you must be at least 18 years old or the age of legal majority in your jurisdiction.\n\n2.2 You confirm that any information you provide to us is accurate and current.'
  },
  {
    id: '3',
    title: 'Description of Service',
    content: '3.1 Describe of services & Features offered by NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY) digital personal & Business account, Bill Payments, NGN card, USD card, Saving, investment, international transactions E.T.C.\n\n3.2 We reserve the right to modify, update, or discontinue any part of our services without prior notice.'
  },
  {
    id: '4',
    title: 'Account Registration and Security',
    content: '4.1 Users must register an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.\n\n4.2 You agree to notify us immediately of any unauthorized use of your account or any other breach of security.'
  },
  {
    id: '5',
    title: 'User Conduct',
    content: '5.1 You agree not to use our services for any unlawful purpose or in violation of these Terms.\n\n5.2 You must not engage in activities that harm our systems, such as attempting unauthorized access or distributing viruses.'
  },
  {
    id: '6',
    title: 'Fees and Payments',
    content: '6.1 Our services may include fees. You agree to pay all fees and charges associated with your account.\n\n6.2 We may update fees at our discretion, with prior notice to users.'
  },
  {
    id: '7',
    title: 'Transaction Processing',
    content: '7.1 Describe how financial transactions are processed, anytime and no delay on transactions.\n\n7.2 We are not liable for any transaction errors or delays caused by third-party financial institutions.'
  },
  {
    id: '8',
    title: 'Privacy Policy',
    content: '8.1 Our Privacy Policy explains how we collect, use, and protect your information. By using our services, you consent to our Privacy Policy.\n\n8.2 Link to privacy policy'
  },
  {
    id: '9',
    title: 'Intellectual Property',
    content: '9.1 All content, trademarks, Logo, designer and services provided are owned by or licensed to NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY).\n\n9.2 You may not reproduce, distribute, or create derivative works from our intellectual property without our permission by Cook Island Trust.'
  },
  {
    id: '10',
    title: 'Limitation of Liability',
    content: '10.1 NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY) is not liable for any indirect, incidental, or consequential damages arising from your use of our services.\n\n10.2 Our liability for any claim related to the use of our services is limited to the fees paid by the user in the six months preceding the incident.'
  },
  {
    id: '11',
    title: 'Indemnification',
    content: '11.1 You agree to indemnify and hold harmless NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY) from any claims, damages, losses, or expenses arising from your use of our services.'
  },
  {
    id: '12',
    title: 'Termination',
    content: '12.1 We may suspend or terminate your access to our services at any time if you violate these Terms.\n\n12.2 You may terminate your account by following the instructions in your account settings.'
  },
  {
    id: '13',
    title: 'Changes to Terms',
    content: '13.1 We may modify these Terms and Conditions at any time. We will notify users of significant changes by email or through our platform.'
  },
  {
    id: '14',
    title: 'Governing Law',
    content: '14.1 These Terms and Conditions are governed by the laws of Cook Island Trust. Any disputes will be resolved exclusively in the courts of Cook Island Trust.'
  },
  {
    id: '15',
    title: 'Alteration',
    content: 'No alteration, variation or agreed cancellation of this agreement, and this product, shall be of any effect unless directed so by us.'
  },
  {
    id: '16',
    title: 'Binding',
    content: 'Any decision, exercise of discretion, judgement or opinion or approval of any matter mentioned in this Agreement or arising from it shall be binding on the parties only if in writing unless otherwise expressly provided in this Agreement.'
  },
  {
    id: '17',
    title: 'Notice',
    content: 'Any notice pursuant to this Agreement shall be given by fax, electronic mail or letter and the onus of confirmation of receipt of such notices shall be on the sender.'
  },
  {
    id: '18',
    title: 'Contact Us',
    content: 'If you have any questions regarding these Terms and Conditions, please contact us at:\n\nEmail: support@nattypay.com\nHead office: C3 & C4 Suite Second Floor Ejison Plaza 9a new market road main market onitsha Anambra state'
  }
];

export default function TermsConditionContentSection() {
  return (
    <section 
      className="w-full max-w-[1240px] px-6 lg:px-12 flex flex-col items-center text-left gap-[40px]"
      style={{ paddingTop: 'clamp(80px, 8vw, 120px)', paddingBottom: 'clamp(80px, 8vw, 120px)' }}
    >
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 w-full border-b border-white/10">
        <h2 className="font-poppins font-bold text-[32px] md:text-[42px] leading-tight text-white m-0">
          Terms & Conditions
        </h2>
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
          <svg className="w-5 h-5 text-[#F0BF4C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-poppins font-medium text-[14px] text-white/80 m-0 tracking-wide uppercase">
            Updated: 11 Nov 2024
          </p>
        </div>
      </div>

      {/* Terms Grid (Premium Dark Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full mt-4">
        {terms.map((term) => (
          <div 
            key={term.id} 
            className="flex flex-col gap-5 items-start w-full bg-[#16161E] rounded-[24px] shadow-2xl border border-white/5 hover:border-[#F0BF4C]/40 hover:bg-[#1A1A24] hover:-translate-y-2 transition-all duration-300"
            style={{ padding: 'clamp(24px, 4vw, 40px)' }}
          >
            
            {/* Header: Number & Title */}
            <div className="flex flex-row items-center gap-4 w-full border-b border-white/5 pb-4">
              <div className="flex-shrink-0 flex items-center justify-center w-[45px] h-[45px] rounded-xl bg-[#F0BF4C]/10 border border-[#F0BF4C]/30">
                <span className="font-poppins font-bold text-[18px] text-[#F0BF4C]">
                  {term.id}
                </span>
              </div>
              <h3 className="font-poppins font-semibold text-[18px] md:text-[22px] leading-tight text-white m-0">
                {term.title}
              </h3>
            </div>

            {/* Content */}
            <p className="font-poppins font-normal text-[14px] md:text-[16px] leading-[1.8] text-white/60 whitespace-pre-line m-0 text-left">
              {term.content}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}

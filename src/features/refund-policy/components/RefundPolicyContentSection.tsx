import React from 'react';

const refundIntro = "At NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY)\nWe are committed to providing transparent and reliable financial services. This Refund Policy outlines the conditions under which refunds may be issued to ensure clarity for our customers.";

const refundSections = [
  {
    id: '1',
    title: 'Eligibility for Refunds',
    content: 'Refunds will only be processed under the following circumstances:\n\n• Unauthorized Transactions: If you identify a transaction on your account that you did not authorize, please report it to us immediately. Upon verification, a refund will be processed as per regulatory guidelines.\n• Service Errors: If there is a technical or operational error on our part that results in an incorrect charge, we will investigate and issue a refund if deemed appropriate.\n• Cancellation of Subscription Services: If you cancel a subscription within the allowed grace period (as specified in the subscription terms), a prorated or full refund may be issued depending on the policy.'
  },
  {
    id: '2',
    title: 'Refund Request Process',
    content: 'To request a refund, Contact our Support Team at Support@Nattypay.com or Call +2348134146906 within 24 hours of the transaction.\n\nProvide the following details:\n• Full name and registered account details.\n• Transaction ID and date.\n• Reason for the refund request.\n\nWe will acknowledge your request within 24 hours and may require additional documentation or evidence for verification.'
  },
  {
    id: '3',
    title: 'Non-Refundable',
    content: 'Transactions of certain amounts are non-refundable, including:\n\n• Transactions where the service or product has already been delivered as agreed.\n• Situations where a refund request is made beyond the stipulated timeline.\n• Fees or charges explicitly stated as non-refundable in the terms of service.'
  },
  {
    id: '4',
    title: 'Processing Time',
    content: 'Approved refunds will be processed within 24 hours. Depending on your payment method, it may take additional time for the refund to appear in your account.'
  },
  {
    id: '5',
    title: 'Fraud Prevention',
    content: 'Refunds will only be processed after thorough verification to prevent fraudulent claims. If any suspicious activity is detected, we reserve the right to deny the refund request and take further action if necessary.'
  },
  {
    id: '6',
    title: 'Amendments to This Policy',
    content: 'We may update this Refund Policy periodically. Any changes will be communicated to users via email, website, or app notification. Please review this policy regularly for updates.'
  },
  {
    id: '7',
    title: 'Contact & Support',
    content: 'For further assistance, please reach out to our support team:\n\nEmail: Support@Nattypay.com\nCall: +2348134146906\nHead office: C3&C4 Suite Second Floor Ejison Plaza 9a new market road main market onitsha Anambra state'
  }
];

export default function RefundPolicyContentSection() {
  return (
    <section 
      className="w-full flex flex-col items-center bg-transparent"
      style={{ paddingTop: 'clamp(60px, 8vw, 120px)', paddingBottom: 'clamp(80px, 8vw, 120px)' }}
    >
      <div className="w-full max-w-[1240px] px-6 lg:px-12 flex flex-col items-start text-left">
        
        {/* Intro */}
        <div className="w-full pb-10 border-b border-white/5 mb-12">
          <p className="font-poppins font-medium text-[13px] tracking-[0.2em] text-[#F0BF4C] uppercase mb-4">
            Last Updated: 10 Nov 2024
          </p>
          <h2 className="font-poppins font-bold text-[32px] md:text-[48px] leading-[1.2] text-white mb-6">
            Refund Policy Overview
          </h2>
          <p className="font-poppins font-normal text-[18px] md:text-[22px] leading-[1.6] text-white/60 whitespace-pre-line">
            {refundIntro}
          </p>
        </div>

        {/* Elegant Editorial List */}
        <div className="flex flex-col w-full">
          {refundSections.map((section, idx) => (
            <div 
              key={section.id} 
              className="flex flex-col lg:flex-row items-start w-full gap-4 lg:gap-10 py-10 px-4 lg:px-8 border-b border-white/5 group hover:bg-[#16161E] transition-colors duration-500 rounded-2xl"
            >
              <div className="w-[80px] flex-shrink-0 pt-1">
                <span className="font-poppins font-light text-[40px] md:text-[48px] leading-none text-white/20 group-hover:text-[#F0BF4C] transition-colors duration-500">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="font-poppins font-semibold text-[22px] md:text-[26px] leading-tight text-white">
                  {section.title}
                </h3>
                <p className="font-poppins font-normal text-[16px] md:text-[18px] leading-[1.8] text-white/60 whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

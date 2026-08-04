"use client";

import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 0,
    question: "What is Nattypay?",
    answer: "Experience seamless financial transactions with Nattypay, a leading financial service provider locally and globally. We make banking easy and convenient by allowing you to pay for multiple services in one place, access financial tools, and even earn through our agent program."
  },
  {
    id: 1,
    question: "How can I download the Nattypay app?",
    answer: "You can download the Nattypay app from the Google Play Store for Android devices or the Apple App Store for iOS devices. Simply search for 'Nattypay' and click install."
  },
  {
    id: 2,
    question: "Is Nattypay secure?",
    answer: "Yes, Nattypay uses industry-standard encryption and security protocols to ensure that your financial data and transactions are completely secure."
  },
  {
    id: 3,
    question: "How do I create a Nattypay account?",
    answer: "To create an account, download the app or visit our website, click on 'Sign Up', and follow the prompts to register with your email, phone number, and password."
  },
  {
    id: 4,
    question: "I forgot my password. How do I reset it?",
    answer: "Click on 'Forgot Password' on the login screen, enter your registered email or phone number, and follow the instructions sent to reset your password."
  },
  {
    id: 5,
    question: "What bills can I pay using Nattypay?",
    answer: "You can pay utility bills, airtime, data subscriptions, school fees, cable TV, and other merchant payments directly from your Nattypay wallet."
  },
  {
    id: 6,
    question: "What are virtual cards?",
    answer: "Virtual cards are digital debit cards that you can generate instantly in the app for secure online shopping and subscriptions, protecting your main account details."
  },
  {
    id: 7,
    question: "How do I create a virtual card?",
    answer: "Go to the 'Cards' section in your Nattypay dashboard, select 'Create Virtual Card', choose your card type, and fund it from your main wallet."
  }
];

interface AccordionItemProps {
  item: FaqItem;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(item.id === 0); // Default open first item like in design

  return (
    <div
      className={`bg-[#FFCE65] rounded-[30px] md:rounded-[40.5px] transition-all duration-300 w-full ${isOpen ? 'flex flex-col' : 'flex justify-between items-center'
        }`}
      style={{
        padding: isOpen ? '32px' : '24px 32px',
        gap: isOpen ? '16px' : '16px',
      }}
    >
      {isOpen ? (
        <>
          <div className="flex justify-between items-start w-full" style={{ gap: '16px' }}>
            <h4 className="text-black font-semibold font-poppins" style={{ fontSize: '18px', lineHeight: '28px' }}>
              {item.question}
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-black text-white rounded-md flex-shrink-0 hover:bg-black/80 transition-colors"
              style={{ padding: '4px' }}
            >
              <MinusIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-black font-poppins" style={{ fontSize: '15px', lineHeight: '26px', paddingTop: '4px' }}>
            {item.answer}
          </p>
        </>
      ) : (
        <>
          <h4 className="text-black font-semibold font-poppins" style={{ fontSize: '18px', lineHeight: '28px' }}>
            {item.question}
          </h4>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white flex-shrink-0 rounded-md hover:bg-black/80 transition-colors"
            style={{ padding: '4px' }}
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default function FaqAccordionSection() {
  // Split into left and right for desktop layout to match Figma columns
  const leftColumnItems = faqData.filter((_, idx) => idx % 2 === 0);
  const rightColumnItems = faqData.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="w-full mt-6 md:mt-10">
      {/* Desktop Layout: Two Columns */}
      <div className="hidden md:flex gap-6 md:gap-8 w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          {leftColumnItems.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          {rightColumnItems.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Mobile Layout: Interleaved Single Column */}
      <div className="flex flex-col md:hidden gap-6 w-full" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        {faqData.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

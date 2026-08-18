"use client";

import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionItemProps {
  item: FaqItem;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

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
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`/api/content/nattypay/faqs`);
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full mt-6 md:mt-10 flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFCE65]"></div>
      </div>
    );
  }

  if (faqData.length === 0) {
    return null;
  }

  // Split into left and right for desktop layout to match Figma columns
  const leftColumnItems = faqData.filter((_, idx) => idx % 2 === 0);
  const rightColumnItems = faqData.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="w-full mt-6 md:mt-10">
      {/* Desktop Layout: Two Columns */}
      <div className="hidden md:flex gap-6 md:gap-8 w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-6 md:gap-8 flex-1">
          {leftColumnItems.map((item, idx) => (
            <AccordionItem key={item.id} item={item} defaultOpen={idx === 0} />
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
        {faqData.map((item, idx) => (
          <AccordionItem key={item.id} item={item} defaultOpen={idx === 0} />
        ))}
      </div>
    </div>
  );
}

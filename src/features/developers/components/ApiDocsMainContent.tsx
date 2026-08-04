'use client';

import React, { useState } from 'react';
import { DocPage } from '../data/apiDocsData';

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-[10px] overflow-hidden bg-[#1E2433] shadow-md">
      {/* Header */}
      <div
        className="flex justify-between items-center bg-[#2C3344] border-b border-white/10"
        style={{ padding: '10px 16px' }}
      >
        <span className="text-gray-400 text-[12px] font-mono uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="text-[12px] font-medium transition-colors"
          style={{ color: copied ? '#22c55e' : '#9ca3af' }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      {/* Body */}
      <div style={{ padding: '20px 24px' }}>
        <pre className="text-[13px] leading-[22px] font-mono text-[#9CDCFE] whitespace-pre-wrap overflow-x-auto">
          {code}
        </pre>
      </div>
    </div>
  );
};

interface Props {
  page: DocPage;
}

export default function ApiDocsMainContent({ page }: Props) {
  return (
    <div
      className="flex-1 bg-[#F9F9FB] flex justify-center lg:justify-start"
      style={{ paddingTop: '60px', paddingBottom: '100px', paddingLeft: '60px', paddingRight: '60px' }}
    >
      <div className="flex flex-col max-w-[860px] w-full gap-10">

        {/* Page title */}
        <div className="flex flex-col gap-2">
          <h1 className="font-roboto text-[32px] font-bold leading-tight text-black">{page.title}</h1>
          <p className="font-roboto text-[16px] text-[#6b7280] leading-relaxed">{page.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200" />

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {page.sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-4">
              <h2 className="font-roboto text-[20px] font-bold text-[#23252F]">{section.heading}</h2>
              <p className="font-roboto text-[15px] leading-[26px] text-[#4B5563] whitespace-pre-line">
                {section.body}
              </p>
              {section.codeExample && (
                <CodeBlock
                  language={section.codeExample.language}
                  code={section.codeExample.code}
                />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

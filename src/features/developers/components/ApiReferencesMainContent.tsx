'use client';

import React, { useState } from 'react';
import { ApiEndpoint } from '../data/apiReferencesData';

const methodColors: Record<string, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
  PATCH: '#8b5cf6',
};

const CodeBlock = ({ title, badge, badgeColor, endpoint, code, language }: {
  title: string;
  badge?: string;
  badgeColor?: string;
  endpoint?: string;
  code: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <h3 className="font-roboto font-bold text-[16px] text-[#23252F]">{title}</h3>
      <div className="w-full rounded-[10px] overflow-hidden bg-[#1E2433] shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#2C3344] border-b border-white/10" style={{ padding: '10px 16px' }}>
          <div className="flex items-center gap-3">
            {badge && (
              <span
                className="text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider"
                style={{ backgroundColor: badgeColor ?? '#3b82f6' }}
              >
                {badge}
              </span>
            )}
            {endpoint && (
              <span className="text-gray-300 text-[12px] font-mono">{endpoint}</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {language && <span className="text-gray-400 text-[12px]">{language}</span>}
            <button
              onClick={handleCopy}
              className="text-[12px] font-medium flex items-center gap-1 transition-colors"
              style={{ color: copied ? '#22c55e' : '#9ca3af' }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
        {/* Body */}
        <div style={{ padding: '20px 20px' }}>
          <pre className="text-[13px] leading-[22px] font-mono text-[#9CDCFE] whitespace-pre-wrap overflow-x-auto">
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
};

interface Props {
  endpoint: ApiEndpoint;
}

export default function ApiReferencesMainContent({ endpoint }: Props) {
  return (
    <div
      className="flex-1 bg-white flex justify-center lg:justify-start"
      style={{ paddingTop: '60px', paddingBottom: '100px', paddingLeft: '60px', paddingRight: '40px' }}
    >
      <div className="flex flex-col xl:flex-row w-full max-w-[1200px] gap-12 lg:gap-16">

        {/* Left: Info */}
        <div className="flex flex-col flex-1 gap-10">

          {/* Title & description */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-white text-[12px] font-bold px-3 py-1 rounded-[6px] uppercase tracking-wider"
                style={{ backgroundColor: methodColors[endpoint.method] ?? '#6b7280' }}
              >
                {endpoint.method}
              </span>
              <code className="font-mono text-[14px] text-[#6b7280] bg-gray-100 px-3 py-1 rounded-[6px]">
                {endpoint.endpoint}
              </code>
            </div>
            <h1 className="font-roboto text-[28px] font-bold text-[#1a1c23]">{endpoint.title}</h1>
            <p className="font-roboto text-[16px] text-[#6b7280] leading-relaxed">{endpoint.description}</p>
          </div>

          {/* Headers */}
          <div className="flex flex-col gap-4">
            <h3 className="font-roboto font-bold text-[18px] text-[#23252F]">Headers</h3>
            <div className="flex flex-col gap-0 rounded-[10px] overflow-hidden border border-gray-200">
              {endpoint.headers.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 border-b border-gray-100 last:border-0"
                  style={{ padding: '14px 20px', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}
                >
                  <div className="flex flex-col w-[160px] shrink-0">
                    <span className="font-mono font-bold text-[13px] text-[#23252F]">{h.name}</span>
                    <span className="font-roboto text-[11px] text-gray-400">{h.type}</span>
                  </div>
                  <div className="flex-1 flex items-start gap-2">
                    <span className="font-roboto text-[13px] text-gray-600">{h.description}</span>
                    {h.required && (
                      <span className="text-red-500 text-[11px] font-medium shrink-0 mt-0.5">required</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Query Params */}
          {endpoint.queryParams && endpoint.queryParams.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-roboto font-bold text-[18px] text-[#23252F]">Query Parameters</h3>
              <div className="flex flex-col gap-0 rounded-[10px] overflow-hidden border border-gray-200">
                {endpoint.queryParams.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 border-b border-gray-100 last:border-0"
                    style={{ padding: '14px 20px', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}
                  >
                    <div className="flex flex-col w-[160px] shrink-0">
                      <span className="font-mono font-bold text-[13px] text-[#23252F]">{p.name}</span>
                      <span className="font-roboto text-[11px] text-gray-400">{p.type}</span>
                    </div>
                    <div className="flex-1 flex items-start gap-2">
                      <span className="font-roboto text-[13px] text-gray-600">{p.description}</span>
                      {p.required && (
                        <span className="text-red-500 text-[11px] font-medium shrink-0 mt-0.5">required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body Params */}
          {endpoint.bodyParams && endpoint.bodyParams.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-roboto font-bold text-[18px] text-[#23252F]">Body Parameters</h3>
              <div className="flex flex-col gap-0 rounded-[10px] overflow-hidden border border-gray-200">
                {endpoint.bodyParams.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 border-b border-gray-100 last:border-0"
                    style={{ padding: '14px 20px', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}
                  >
                    <div className="flex flex-col w-[160px] shrink-0">
                      <span className="font-mono font-bold text-[13px] text-[#23252F]">{p.name}</span>
                      <span className="font-roboto text-[11px] text-gray-400">{p.type}</span>
                    </div>
                    <div className="flex-1 flex items-start gap-2">
                      <span className="font-roboto text-[13px] text-gray-600">{p.description}</span>
                      {p.required && (
                        <span className="text-red-500 text-[11px] font-medium shrink-0 mt-0.5">required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Code blocks */}
        <div className="flex flex-col flex-1 gap-8 max-w-[580px]">
          <CodeBlock
            title="cURL Request"
            badge={endpoint.method}
            badgeColor={methodColors[endpoint.method]}
            endpoint={endpoint.endpoint}
            language="cURL"
            code={endpoint.curlExample}
          />
          <CodeBlock
            title="Sample Response"
            badge="200 OK"
            badgeColor="#22c55e"
            code={endpoint.sampleResponse}
            language="JSON"
          />
        </div>

      </div>
    </div>
  );
}

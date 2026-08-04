'use client';

import React, { useState } from 'react';
import { apiReferencesData, ApiEndpoint } from '../data/apiReferencesData';

interface Props {
  selectedId: string;
  onSelect: (endpoint: ApiEndpoint) => void;
}

const methodColors: Record<string, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
  PATCH: '#8b5cf6',
};

export default function ApiReferencesSidebar({ selectedId, onSelect }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(apiReferencesData.map((s) => [s.title, true]))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleSelect = (endpoint: ApiEndpoint) => {
    onSelect(endpoint);
    setMobileOpen(false);
  };

  const selectedTitle = apiReferencesData
    .flatMap((s) => s.items)
    .find((item) => item.id === selectedId)?.title ?? 'Menu';

  const selectedMethod = apiReferencesData
    .flatMap((s) => s.items)
    .find((item) => item.id === selectedId)?.method ?? 'POST';

  const SidebarContent = () => (
    <>
      {apiReferencesData.map((section) => (
        <div key={section.title} className="flex flex-col items-start gap-3 w-full">
          <button
            onClick={() => toggleSection(section.title)}
            className="flex items-center justify-between w-full pr-2 pl-1"
          >
            <span className="font-roboto text-[15px] font-semibold text-black tracking-[0.0015em]">
              {section.title}
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${openSections[section.title] ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openSections[section.title] && (
            <div className="flex flex-col gap-1 w-full">
              {section.items.map((item) => {
                const isActive = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center gap-2 w-full text-left rounded-lg transition-colors"
                    style={{
                      padding: '8px 12px',
                      backgroundColor: isActive ? '#FFF8E7' : 'transparent',
                      borderLeft: isActive ? '3px solid #FFCE65' : '3px solid transparent',
                    }}
                  >
                    <span
                      className="text-[10px] font-bold shrink-0"
                      style={{ color: methodColors[item.method] ?? '#6b7280', minWidth: '32px' }}
                    >
                      {item.method}
                    </span>
                    <span
                      className="font-roboto text-[13px] tracking-[0.005em] leading-tight"
                      style={{ color: isActive ? '#D4A000' : '#444655', fontWeight: isActive ? 600 : 400 }}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* ── MOBILE TOGGLE BAR ── */}
      <div className="lg:hidden w-full bg-white border-b border-gray-200 sticky top-0 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full"
          style={{ padding: '14px 24px' }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <path d="M3 6h18M3 12h18M3 18h18" />
              }
            </svg>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold"
                style={{ color: methodColors[selectedMethod] }}
              >
                {selectedMethod}
              </span>
              <span className="font-roboto text-[14px] font-medium text-black">
                {mobileOpen ? 'Close Menu' : selectedTitle}
              </span>
            </div>
          </div>
          <div
            className="text-[11px] font-medium px-2 py-0.5 rounded"
            style={{ backgroundColor: '#EFF6FF', color: '#3b82f6' }}
          >
            API Ref
          </div>
        </button>

        {/* Mobile dropdown panel */}
        {mobileOpen && (
          <div
            className="w-full bg-white border-t border-gray-100 flex flex-col gap-6 overflow-y-auto"
            style={{ padding: '20px 24px', maxHeight: '60vh' }}
          >
            <SidebarContent />
          </div>
        )}
      </div>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden lg:flex lg:w-[320px] bg-white flex-col pt-[50px] pb-[50px] gap-12 border-r border-gray-200 flex-shrink-0"
        style={{ paddingLeft: '40px', paddingRight: '24px' }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

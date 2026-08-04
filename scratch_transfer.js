const fs = require('fs');

const originalTransfer = `'use client';

import React, { useState, useRef, useEffect } from 'react';

const currencies = [
  { code: 'USD', label: 'US Dollar', flag: 'https://flagcdn.com/w80/us.png' },
  { code: 'GBP', label: 'British Pound', flag: 'https://flagcdn.com/w80/gb.png' },
  { code: 'EUR', label: 'Euro', flag: 'https://flagcdn.com/w80/eu.png' },
  { code: 'NGN', label: 'Nigerian Naira', flag: 'https://flagcdn.com/w80/ng.png' },
  { code: 'GHS', label: 'Ghanaian Cedi', flag: 'https://flagcdn.com/w80/gh.png' },
  { code: 'ZAR', label: 'South African Rand', flag: 'https://flagcdn.com/w80/za.png' },
  { code: 'AOA', label: 'Angolan Kwanza', flag: 'https://flagcdn.com/w80/ao.png' },
  { code: 'KES', label: 'Kenyan Shilling', flag: 'https://flagcdn.com/w80/ke.png' },
  { code: 'CAD', label: 'Canadian Dollar', flag: 'https://flagcdn.com/w80/ca.png' },
  { code: 'AUD', label: 'Australian Dollar', flag: 'https://flagcdn.com/w80/au.png' },
];

function CurrencyDropdown({
  selected,
  onSelect,
}: {
  selected: (typeof currencies)[0];
  onSelect: (c: (typeof currencies)[0]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger */}
      <button
        className="max-md:!p-0 max-md:!bg-transparent max-md:!gap-[4px]"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px',
          backgroundColor: '#FFFFFF', borderRadius: '26px', padding: '8px 14px',
          border: 'none', cursor: 'pointer',
        }}
      >
        {/* Flag */}
        <div className="max-md:!w-[27px] max-md:!h-[22px] max-md:!rounded-[4.3px]" style={{ width: '44px', height: '36px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#ccc' }}>
          <div style={{ width: '100%', height: '100%', backgroundImage: \`url(\${selected.flag})\`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        {/* Code */}
        <span className="max-md:!text-[8.7px] max-md:!font-figtree" style={{ fontFamily: 'Figtree, Poppins, sans-serif', fontWeight: 500, fontSize: '18px', color: '#FFCE65', whiteSpace: 'nowrap' }}>
          {selected.code}
        </span>
        {/* Arrow */}
        <svg className="max-md:!w-[15px] max-md:!h-[15px]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFCE65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 100,
          backgroundColor: '#1a1a1a', borderRadius: '16px', padding: '8px',
          minWidth: '220px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          maxHeight: '300px', overflowY: 'auto',
        }}>
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => { onSelect(c); setOpen(false); }}
              style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px',
                width: '100%', padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                backgroundColor: selected.code === c.code ? '#333' : 'transparent',
                textAlign: 'left',
              }}
            >
              <div style={{ width: '36px', height: '28px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#555' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: \`url(\${c.flag})\`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '15px', color: '#FFCE65' }}>{c.code}</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#888' }}>{c.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const features = [
  {
    label: 'Lower Fee',
    icon: (
      <svg className="max-md:!w-[17.7px] max-md:!h-[17.7px]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3L4 7l4 4" /><path d="M4 7h16" /><path d="M16 21l4-4-4-4" /><path d="M20 17H4" />
      </svg>
    ),
  },
  {
    label: 'Best Rate',
    icon: (
      <svg className="max-md:!w-[17.7px] max-md:!h-[17.7px]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3L4 7l4 4" /><path d="M4 7h16" /><path d="M16 21l4-4-4-4" /><path d="M20 17H4" />
      </svg>
    ),
  },
  {
    label: 'Fast Transfer',
    icon: (
      <svg className="max-md:!w-[17.7px] max-md:!h-[17.7px]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3L4 7l4 4" /><path d="M4 7h16" /><path d="M16 21l4-4-4-4" /><path d="M20 17H4" />
      </svg>
    ),
  },
];

export default function UsdTransferSection() {
  const [sendCurrency, setSendCurrency] = useState(currencies[0]); // USD
  const [receiveCurrency, setReceiveCurrency] = useState(currencies[3]); // NGN
  const [sendAmount, setSendAmount] = useState('200.00');
  const [receiveAmount, setReceiveAmount] = useState('2000.00');

  return (
    <section className="max-md:!p-[10px]" style={{ width: '100%', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', padding: '0' }}>
      <div className="max-md:!p-[0px]" style={{ width: '100%', maxWidth: '1440px', padding: '80px 100px', boxSizing: 'border-box' }}>
        <div className="max-md:!gap-[21.4px]" style={{ display: 'flex', flexDirection: 'column', gap: '47px', maxWidth: '1206px', margin: '0 auto' }}>

          {/* ─── Transfer Box ─── */}
          <div className="max-md:!gap-[10px]" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Row 1: You Send */}
            <div className="max-md:!p-[0] max-md:!items-end max-md:!h-[44px]" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <span className="max-md:!text-[10px] max-md:!leading-[15px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '20px', color: '#FFFFFF', lineHeight: 1.5 }}>
                  You send
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span className="max-md:!text-[10px]" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', color: '#FFFFFF', fontWeight: 400, opacity: 0.7 }}>
                    {sendCurrency.code === 'USD' ? '$' : sendCurrency.code === 'GBP' ? '£' : sendCurrency.code === 'EUR' ? '€' : ''}
                  </span>
                  <input
                    type="text"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="max-md:!text-[19px] max-md:!leading-[29px] max-md:!w-[100px]"
                    style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '42px', color: '#FFFFFF',
                      background: 'transparent', border: 'none', outline: 'none', width: '240px',
                    }}
                  />
                </div>
              </div>
              <CurrencyDropdown selected={sendCurrency} onSelect={setSendCurrency} />
            </div>

            {/* Divider */}
            <div className="max-md:!h-[1px] max-md:!bg-[rgba(255,255,255,0.2)]" style={{ width: '100%', height: '2px', backgroundColor: '#FFFFFF' }} />

            {/* Row 2: Recipient Gets */}
            <div className="max-md:!p-[0] max-md:!items-end max-md:!h-[44px]" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0 16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                <span className="max-md:!text-[10px] max-md:!leading-[15px]" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '20px', color: '#FFFFFF', lineHeight: 1.5 }}>
                  Recipient gets
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span className="max-md:!text-[10px]" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', color: '#FFFFFF', fontWeight: 400, opacity: 0.7 }}>
                    {receiveCurrency.code === 'NGN' ? '₦' : receiveCurrency.code === 'GHS' ? 'GH₵' : ''}
                  </span>
                  <input
                    type="text"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    className="max-md:!text-[19px] max-md:!leading-[29px] max-md:!w-[120px]"
                    style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '42px', color: '#FFFFFF',
                      background: 'transparent', border: 'none', outline: 'none', width: '280px',
                    }}
                  />
                </div>
              </div>
              <CurrencyDropdown selected={receiveCurrency} onSelect={setReceiveCurrency} />
            </div>

            {/* Divider */}
            <div className="max-md:!h-[1px] max-md:!bg-[rgba(255,255,255,0.2)]" style={{ width: '100%', height: '2px', backgroundColor: '#FFFFFF' }} />
          </div>

          {/* ─── Get Started Button ─── */}
          <button
            className="max-md:!h-[39px] max-md:!rounded-[3.6px] max-md:!gap-[3.6px] max-md:!p-[5.4px]"
            style={{
              width: '100%', height: '86px', backgroundColor: '#F0BF4C', borderRadius: '8px',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}
          >
            <span className="max-md:!text-[12.2px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '24px', color: '#000000' }}>
              Get started
            </span>
            <svg className="max-md:!w-[7.2px] max-md:!h-[7.2px]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* ─── Feature Badges ─── */}
          <div className="flex flex-row justify-center max-md:!gap-[9px]" style={{ gap: '20px' }}>
            {features.map((f) => (
              <div
                key={f.label}
                className="max-md:!h-[42.5px] max-md:!p-[8.8px_14px] max-md:!rounded-[10.6px] max-md:!gap-[7px]"
                style={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                  gap: '14px', backgroundColor: '#FFFFFF', borderRadius: '26px',
                  padding: '18px 28px', flex: '1 1 0', maxWidth: '340px',
                }}
              >
                {f.icon}
                <span className="max-md:!text-[12.4px]" style={{ fontFamily: 'Roboto, Poppins, sans-serif', fontWeight: 500, fontSize: '22px', color: '#000000' }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('src/features/landing/components/UsdTransferSection.tsx', originalTransfer);

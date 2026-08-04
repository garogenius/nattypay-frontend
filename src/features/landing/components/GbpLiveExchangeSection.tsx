import React from 'react';

const rates = [
  { pair: 'USD/NGN', flag1: 'https://flagcdn.com/w80/us.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
  { pair: 'GBP/NGN', flag1: 'https://flagcdn.com/w80/gb.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
  { pair: 'EUR/NGN', flag1: 'https://flagcdn.com/w80/eu.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'down' },
  { pair: 'GCD/NGN', flag1: 'https://flagcdn.com/w80/gh.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
  { pair: 'SAC/NGN', flag1: 'https://flagcdn.com/w80/za.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'down' },
  { pair: 'AGC/NGN', flag1: 'https://flagcdn.com/w80/ao.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
];

const featuredServices = [
  {
    label: 'International\nTransfer',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/>
      </svg>
    ),
  },
  {
    label: 'Virtual Cards',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F0BF4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'USSD Banking',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Savings Goals',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.76 1.6 5.15 3.93 6.34L8 21h8l-1.93-2.66A6.992 6.992 0 0019 12z"/>
        <line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="15" x2="12.01" y2="15"/>
      </svg>
    ),
  },
];

export default function GbpLiveExchangeSection() {
  return (
    <section
      className="w-full flex justify-center"
      style={{ padding: '60px 20px', backgroundColor: '#F1F1EB' }}
    >
      <div
        className="w-full flex flex-col lg:flex-row lg:items-start items-center"
        style={{ maxWidth: '1324px', gap: '35px' }}
      >

        {/* ─── Left Card: Red background ─── */}
        <div
          className="w-full"
          style={{
            maxWidth: '503px',
            backgroundColor: '#FF0000',
            borderRadius: '40px',
            padding: '30px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flexShrink: 0,
          }}
        >
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '26px', lineHeight: 1.5, color: '#FFFFFF', margin: 0 }}>
            Live Exchange Rate
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {rates.map((item, index) => (
              <React.Fragment key={index}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 0' }}>

                  {/* Flags + Pair */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', flex: '1 1 0', minWidth: 0 }}>
                    <div style={{ position: 'relative', width: '34px', height: '34px', flexShrink: 0 }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundImage: `url(${item.flag1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd', border: '1px solid white' }} />
                      <div style={{ position: 'absolute', bottom: 0, right: '-6px', width: '16px', height: '16px', borderRadius: '50%', backgroundImage: `url(${item.flag2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd', border: '2px solid white' }} />
                    </div>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '15px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                      {item.pair}
                    </span>
                  </div>

                  {/* Rate */}
                  <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'center', minWidth: 0 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '15px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                      {item.rate}
                    </span>
                  </div>

                  {/* Button */}
                  <div style={{ flex: '1 1 0', display: 'flex', justifyContent: 'flex-end', minWidth: 0 }}>
                    <div style={{
                      display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '5px',
                      padding: '5px 10px', borderRadius: '8px', minWidth: '75px', height: '30px',
                      backgroundColor: item.trend === 'up' ? '#46B900' : '#000000',
                      flexShrink: 0,
                    }}>
                      {item.trend === 'up' ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                        </svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="7" x2="17" y2="17"/><polyline points="17 7 17 17 7 17"/>
                        </svg>
                      )}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: item.trend === 'up' ? '#000' : '#F5F5F5', whiteSpace: 'nowrap' }}>Button</span>
                    </div>
                  </div>
                </div>

                {index < rates.length - 1 && (
                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ─── Right Card: Featured Services ─── */}
        <div
          className="w-full hidden lg:flex"
          style={{
            flex: '1 1 400px',
            maxWidth: '786px',
            minHeight: '492px',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, #FFCE65 0%, #FFFFFF 100%)',
            padding: '32px 40px 48px 48px',
            boxSizing: 'border-box',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '34px', lineHeight: 1.5, color: '#000', margin: 0 }}>
            Featured Services
          </h2>

          {/* 2×2 grid of service cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: '10px' }}
          >
            {featuredServices.map((service) => (
              <div
                key={service.label}
                style={{
                  backgroundColor: '#000000',
                  borderRadius: '36px',
                  padding: '20px 20px 20px 18px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '20px',
                  minHeight: '120px',
                }}
              >
                <div style={{ flexShrink: 0 }}>{service.icon}</div>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '20px', lineHeight: 1.4, color: '#FFCE65', whiteSpace: 'pre-line' }}>
                  {service.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';

const rates = [
  { pair: 'USD/NGN', flag1: 'https://flagcdn.com/w80/us.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
  { pair: 'GBP/NGN', flag1: 'https://flagcdn.com/w80/gb.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
  { pair: 'EUR/NGN', flag1: 'https://flagcdn.com/w80/eu.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'down' },
  { pair: 'GCD/NGN', flag1: 'https://flagcdn.com/w80/gh.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
  { pair: 'SAC/NGN', flag1: 'https://flagcdn.com/w80/za.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'down' },
  { pair: 'AGC/NGN', flag1: 'https://flagcdn.com/w80/ao.png', flag2: 'https://flagcdn.com/w80/ng.png', rate: 'N1,350.00', trend: 'up' },
];

const steps = [
  { number: '1', title: 'Create Account', subtitle: 'Sign up and verify your account' },
  { number: '2', title: 'Fund Wallet', subtitle: 'Add fund via bank transfer or card' },
  { number: '3', title: 'Send payment', subtitle: 'Send money globally in minute' },
];

export default function EurLiveExchangeSection() {
  return (
    <section
      className="w-full flex justify-center"
      style={{ padding: '60px 20px', backgroundColor: '#F1F1EB' }}
    >
      <div
        className="w-full flex flex-col lg:flex-row lg:items-start items-center"
        style={{ maxWidth: '1324px', gap: '35px' }}
      >

        {/* ─── Left Card: How it Works (yellow gradient) ─── */}
        <div
          style={{
            flex: '1 1 400px',
            maxWidth: '786px',
            minHeight: '492px',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, #FFCE65 0%, #FFFFFF 100%)',
            padding: '32px 40px 48px 52px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '34px', lineHeight: 1.5, color: '#000', margin: 0 }}>
            How it Works
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {steps.map((step) => (
              <div
                key={step.number}
                className={step.number === '3' ? 'hidden md:flex' : 'flex'}
                style={{
                  backgroundColor: '#000000',
                  borderRadius: '36px',
                  padding: '20px 24px',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '24px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Number Circle */}
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  backgroundColor: '#FFCE65',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '32px', lineHeight: 1, color: '#000' }}>
                    {step.number}
                  </span>
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '20px', color: '#FFCE65', lineHeight: 1.4 }}>
                    {step.title}
                  </span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '13px', color: '#FFCE65', lineHeight: 1.5, opacity: 0.85 }}>
                    {step.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right Card: Blue Exchange Rate ─── */}
        <div
          className="w-full"
          style={{
            maxWidth: '503px',
            backgroundColor: '#003399',
            borderRadius: '40px',
            padding: '30px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flexShrink: 0,
          }}
        >
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '26px', lineHeight: 1.5, color: '#F0BF4C', margin: 0 }}>
            Live Exchange Rate
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {rates.map((item, index) => (
              <React.Fragment key={index}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 0' }}>

                  {/* Flags + Pair */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', flex: '1 1 0', minWidth: 0 }}>
                    <div style={{ position: 'relative', width: '34px', height: '34px', flexShrink: 0 }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundImage: `url(${item.flag1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }} />
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
                      backgroundColor: item.trend === 'up' ? 'rgba(70, 185, 0, 0.52)' : 'rgba(255, 0, 0, 0.45)',
                      flexShrink: 0,
                    }}>
                      {item.trend === 'up' ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                        </svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="7" x2="17" y2="17" /><polyline points="17 7 17 17 7 17" />
                        </svg>
                      )}
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#F5F5F5', whiteSpace: 'nowrap' }}>Button</span>
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

      </div>
    </section>
  );
}

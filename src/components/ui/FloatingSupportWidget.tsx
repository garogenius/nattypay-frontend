"use client";

import React, { useState, useEffect, useRef } from 'react';

// Icons
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export default function FloatingSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<'menu' | 'ai'>('menu');
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: 'Hello! I am NattyAI. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleWidget = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setActiveView('menu'), 300); // Reset after close
    } else {
      setIsOpen(true);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/2348134146906', '_blank');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeView === 'ai') {
      scrollToBottom();
    }
  }, [messages, activeView]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      
      const data = await response.json();
      
      if (response.ok && data.role === 'ai') {
        setMessages((prev) => [...prev, { role: 'ai', content: data.content }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting right now. Please try again later or contact us on WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-poppins">
      {/* Popup Container */}
      <div 
        className={`absolute bottom-[70px] right-0 w-[300px] md:w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {activeView === 'menu' && (
          <div className="p-6" style={{ padding: '24px' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-500 mb-6">Choose how you'd like to reach out to us.</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setActiveView('ai')}
                className="flex items-center gap-4 w-full rounded-xl bg-[#0B0B0F] hover:bg-[#16161E] text-white transition-colors group"
                style={{ padding: '16px' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <AIIcon />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold">Chat with NattyAI</span>
                  <span className="text-xs text-white/60">Instant AI support</span>
                </div>
              </button>

              <button 
                onClick={handleWhatsAppClick}
                className="flex items-center gap-4 w-full rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors group"
                style={{ padding: '16px' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <WhatsAppIcon />
                </div>
                <div className="flex flex-col items-start text-gray-900">
                  <span className="font-semibold text-gray-900">WhatsApp Support</span>
                  <span className="text-xs text-gray-500">Typical reply in minutes</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeView === 'ai' && (
          <div className="flex flex-col h-[450px]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#0B0B0F] text-white border-b border-white/10" style={{ padding: '16px' }}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveView('menu')}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F0BF4C] flex items-center justify-center">
                    <AIIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">NattyAI</h3>
                    <span className="text-[10px] text-white/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F9F9FB] flex flex-col gap-4" style={{ padding: '16px' }}>
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#0B0B0F] text-white rounded-br-sm' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
                    }`}
                    style={{ padding: '12px 16px' }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex w-full justify-start">
                  <div className="bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center h-[44px]" style={{ padding: '12px 16px' }}>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100" style={{ padding: '16px' }}>
              <div className="flex items-center gap-2 bg-[#F9F9FB] border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#F0BF4C] focus-within:ring-1 focus-within:ring-[#F0BF4C] transition-all" style={{ padding: '8px 16px' }}>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NattyAI..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 py-1"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 rounded-full bg-[#0B0B0F] text-white flex items-center justify-center hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={toggleWidget}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-red-500 text-white' : 'bg-[#0B0B0F] text-white'}`}
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </div>
      </button>
    </div>
  );
}

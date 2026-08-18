"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface BlogPostContentProps {
  post: {
    title: string;
    content?: string;
    excerpt: string;
  };
  recentPosts: {
    slug: string;
    title: string;
    category: string;
    date: string;
    imageUrl: string;
  }[];
}

export default function BlogPostContent({ post, recentPosts }: BlogPostContentProps) {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [subscribeMsg, setSubscribeMsg] = useState('');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setSubscribeStatus('error');
      setSubscribeMsg('Please enter a valid email.');
      return;
    }

    setIsSubscribing(true);
    setSubscribeStatus('idle');
    setSubscribeMsg('');

    try {
      const response = await fetch('/api/content/nattypay/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setSubscribeStatus('success');
        setSubscribeMsg('Subscribed successfully!');
        setEmail('');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubscribeStatus('error');
        setSubscribeMsg(errorData.message || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setSubscribeStatus('error');
      setSubscribeMsg('An error occurred. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };
  
  // If the post has HTML content, we'll render it safely.
  // Otherwise, we just fall back to the excerpt.
  const contentToRender = post.content || `<p>${post.excerpt}</p><p><em>Full article content coming soon...</em></p>`;

  return (
    <section 
      className="w-full flex justify-center bg-transparent"
      style={{ paddingTop: 'clamp(60px, 8vw, 100px)', paddingBottom: 'clamp(80px, 8vw, 120px)' }}
    >
      <div 
        className="w-full max-w-[1240px] flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
        style={{ paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}
      >
        
        {/* LEFT COLUMN: Main Content */}
        <div className="flex-1 w-full flex flex-col items-start text-left">
          
          {/* Social Share / Author Row */}
          <div className="w-full flex items-center justify-between pb-8 mb-10 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#16161E] border border-white/10 flex items-center justify-center overflow-hidden">
                <svg className="w-6 h-6 text-[#999999]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-semibold text-[16px] text-white">NattyPay Editorial Team</span>
                <span className="font-poppins font-normal text-[14px] text-white/60">Fintech Insights</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                  }
                }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#F0BF4C] hover:border-[#F0BF4C] hover:text-black transition-colors"
                title="Share on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(post.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
                  }
                }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#F0BF4C] hover:border-[#F0BF4C] hover:text-black transition-colors"
                title="Share on Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Dynamic HTML Content */}
          <div 
            className="blog-post-content font-poppins w-full"
            dangerouslySetInnerHTML={{ __html: contentToRender }}
          />

          {/* Scoped Styles */}
          <style dangerouslySetInnerHTML={{ __html: `
            .blog-post-content h2 {
              font-size: 28px;
              font-weight: 700;
              color: #FFFFFF;
              margin-top: 48px;
              margin-bottom: 24px;
              line-height: 1.3;
            }
            @media (min-width: 768px) {
              .blog-post-content h2 { font-size: 32px; }
            }
            .blog-post-content h3 {
              font-size: 24px;
              font-weight: 600;
              color: #FFFFFF;
              margin-top: 32px;
              margin-bottom: 16px;
            }
            .blog-post-content p {
              font-size: 18px;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.6);
              line-height: 1.8;
              margin-bottom: 24px;
            }
            .blog-post-content blockquote {
              border-left: 6px solid #F0BF4C;
              background-color: #16161E;
              padding: 16px 20px;
              margin: 24px 0;
              font-size: 18px;
              font-style: italic;
              font-weight: 500;
              color: #FFFFFF;
              border-radius: 0 12px 12px 0;
            }
            @media (min-width: 768px) {
              .blog-post-content blockquote {
                padding: 24px 32px;
                margin: 40px 0;
                font-size: 22px;
              }
            }
            .blog-post-content ul, .blog-post-content ol {
              margin-bottom: 24px;
              padding-left: 24px;
            }
            .blog-post-content li {
              font-size: 18px;
              color: rgba(255, 255, 255, 0.6);
              line-height: 1.8;
              margin-bottom: 12px;
            }
          `}} />
        </div>

        {/* RIGHT COLUMN: Sidebar (Recent News) */}
        <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col font-['Poppins'] lg:sticky lg:top-[120px]">
          <h3 className="text-[22px] font-bold text-white border-b border-white/5 pb-4" style={{ marginBottom: '24px' }}>
            Recent News
          </h3>
          
          <div className="flex flex-col" style={{ gap: '24px' }}>
            {recentPosts && recentPosts.length > 0 ? (
              recentPosts.map((rp) => (
                <Link 
                  href={`/blog/${rp.slug}`} 
                  key={rp.slug}
                  className="flex items-start group"
                  style={{ gap: '16px' }}
                >
                  {/* Tiny Thumbnail */}
                  <div 
                    className="w-[100px] h-[75px] rounded-xl flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${rp.imageUrl})` }}
                  />
                  <div className="flex flex-col" style={{ gap: '4px' }}>
                    <span className="text-[#F0BF4C] font-semibold text-[11px] uppercase tracking-wider">
                      {rp.category}
                    </span>
                    <h4 className="text-white font-semibold text-[14px] leading-[1.4] line-clamp-2 group-hover:text-[#F0BF4C] transition-colors">
                      {rp.title}
                    </h4>
                    <span className="text-white/60 font-medium text-[12px]">
                      {rp.date}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <span className="text-white/60 text-[14px]">No recent news available.</span>
            )}
          </div>

          <div className="border-t border-white/5" style={{ marginTop: '32px', paddingTop: '32px' }}>
            <div 
              className="bg-[#16161E] rounded-2xl border border-[#F0BF4C]/20 flex flex-col items-start"
              style={{ padding: '24px', gap: '16px' }}
            >
              <h4 className="text-white font-bold text-[18px] m-0">Stay Updated</h4>
              <p className="text-white/60 text-[14px] leading-relaxed m-0">
                Get the latest NattyPay news, product updates, and financial tips delivered directly to your inbox.
              </p>
              <div className="w-full flex" style={{ marginTop: '8px' }}>
                <input 
                  type="email" 
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                  className="w-full bg-[#0B0B0F] text-white placeholder-white/40 border border-white/10 rounded-l-lg text-[14px] outline-none focus:border-[#F0BF4C] disabled:opacity-50"
                  style={{ padding: '12px 16px' }}
                />
                <button 
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="bg-[#F0BF4C] hover:bg-[#d4a844] text-black transition-colors font-medium text-[14px] rounded-r-lg disabled:opacity-50 min-w-[80px]"
                  style={{ padding: '0 16px' }}
                >
                  {isSubscribing ? '...' : 'Join'}
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <p className="text-green-500 text-[12px] m-0 mt-2">{subscribeMsg}</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-500 text-[12px] m-0 mt-2">{subscribeMsg}</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

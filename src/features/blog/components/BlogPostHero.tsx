import React from 'react';
import { BlogPost } from '../data/mockPosts';
import Link from 'next/link';

interface BlogPostHeroProps {
  post: BlogPost;
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <section 
      className="relative w-full bg-cover bg-center flex flex-col justify-end"
      style={{
        height: 'clamp(320px, 40vw, 450px)',
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(${post.imageUrl})`,
        paddingBottom: 'clamp(40px, 6vw, 80px)'
      }}
    >
      <div 
        className="max-w-[900px] w-full mx-auto flex flex-col items-start gap-4 md:gap-6 relative z-10"
        style={{ paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)' }}
      >
        
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[#F0BF4C] hover:text-white font-medium text-[14px] md:text-[16px] transition-colors mb-4 md:mb-8"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to all articles
        </Link>
        
        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-4 text-white/90 text-[14px] md:text-[16px] font-medium">
          <span className="bg-[#F0BF4C] text-black px-4 py-1.5 rounded-full text-[12px] md:text-[13px] uppercase tracking-wider font-bold">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#EBBB4D]"></span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-white font-bold text-[32px] md:text-[48px] lg:text-[56px] leading-[1.15] font-poppins m-0">
          {post.title}
        </h1>
        
      </div>
    </section>
  );
}

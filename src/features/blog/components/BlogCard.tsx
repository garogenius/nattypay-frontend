import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export default function BlogCard({ slug, title, excerpt, category, date, readTime, imageUrl }: BlogCardProps) {
  return (
    <article className="flex flex-col bg-white rounded-[24px] border border-[#EEEEEE] overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer h-full">
      
      {/* Thumbnail */}
      <div className="w-full relative bg-gray-100 overflow-hidden" style={{ height: '240px' }}>
        {/* Placeholder image background if no image is loaded */}
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md rounded-full" style={{ padding: '6px 16px' }}>
          <span className="text-[#F0BF4C] font-semibold text-[12px] uppercase tracking-wider">{category}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow gap-4 font-['Poppins']" style={{ padding: 'clamp(24px, 4vw, 32px)' }}>
        
        {/* Meta */}
        <div className="flex items-center text-[#666666] text-[14px] font-medium gap-3">
          <span>{date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#EBBB4D]"></span>
          <span>{readTime}</span>
        </div>
        
        {/* Title & Excerpt */}
        <div className="flex flex-col gap-3 flex-grow">
          <h3 className="text-black font-bold text-[22px] md:text-[26px] leading-[1.3] group-hover:text-[#EBBB4D] transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-[#555555] text-[15px] md:text-[16px] leading-[1.6] line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        {/* Action */}
        <div className="border-t border-[#F5F5F5]" style={{ marginTop: '16px', paddingTop: '16px' }}>
          <Link href={`/blog/${slug}`} className="inline-flex items-center gap-2 text-black font-semibold text-[16px] hover:text-[#EBBB4D] transition-colors">
            Read Article
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
        
      </div>
    </article>
  );
}

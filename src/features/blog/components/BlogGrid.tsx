"use client";

import React, { useState } from 'react';
import BlogCard from './BlogCard';

import { MOCK_POSTS } from '../data/mockPosts';

const CATEGORIES = ['All Articles', 'Product News', 'Financial Tips', 'Industry Trends'];

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState('All Articles');

  const filteredPosts = activeCategory === 'All Articles'
    ? MOCK_POSTS
    : MOCK_POSTS.filter((post) => post.category === activeCategory);

  return (
    <section className="w-full bg-[#F5F5F0] flex flex-col items-center justify-center font-['Poppins'] px-6 md:px-12" style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingBottom: 'clamp(80px, 12vw, 120px)' }}>

      {/* Filters */}
      <div
        className="w-full max-w-[1240px] flex flex-wrap"
        style={{ gap: '16px', marginBottom: '48px' }}
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full text-[15px] font-medium transition-colors ${
                isActive
                  ? 'bg-black text-white hover:bg-black/80'
                  : 'bg-white border border-[#DDDDDD] text-[#555555] hover:border-black hover:text-black'
              }`}
              style={{ padding: '10px 24px' }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="w-full max-w-[1240px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>

      {/* Load More */}
      {/* <div className="mt-16">
        <button className="bg-transparent border-2 border-black text-black font-semibold text-[16px] rounded-full hover:bg-black hover:text-white transition-colors" style={{ padding: '16px 40px' }}>
          Load More Articles
        </button>
      </div> */}

    </section>
  );
}

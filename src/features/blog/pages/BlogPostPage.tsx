"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPostHero from '../components/BlogPostHero';
import BlogPostContent from '../components/BlogPostContent';
import { MOCK_POSTS } from '../data/mockPosts';

interface BlogPostPageProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col bg-[#F5F5F0] overflow-x-hidden font-['Poppins']">
        <Header currentCurrency="NGN" />
        <div className="w-full flex-grow flex items-center justify-center">
          <h1 className="text-3xl font-bold">Blog post not found.</h1>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F9F9FB] overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />
      
      {/* Blog Post Hero */}
      <BlogPostHero post={post} />

      {/* Main Content Area */}
      <div className="w-full flex justify-center bg-white">
        <BlogPostContent post={post} />
      </div>

      <Footer />
    </main>
  );
}

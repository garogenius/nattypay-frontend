"use client";

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogHero from '../components/BlogHero';
import BlogGrid from '../components/BlogGrid';

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="flex min-h-screen flex-col bg-[#0B0B0F]">
      <Header />
      <BlogHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogGrid searchQuery={searchQuery} />
      <Footer />
    </main>
  );
}

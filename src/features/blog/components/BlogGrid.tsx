"use client";

import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All Articles']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/content/nattypay/news`);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();

        // Map API response to match BlogCard format
        const mappedPosts = data.map((apiPost: any) => {
          // Excerpt from content
          let textContent = "";
          if (typeof document !== 'undefined') {
            const tmp = document.createElement("DIV");
            tmp.innerHTML = apiPost.content || "";
            textContent = tmp.textContent || tmp.innerText || "";
          } else {
            // Basic fallback for SSR/Node environment before hydration
            textContent = (apiPost.content || "").replace(/<[^>]*>?/gm, '');
          }
          const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");

          // Read time
          const wordCount = textContent.split(/\\s+/).length;
          const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));

          // Date format
          const dateObj = new Date(apiPost.createdAt);
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return {
            slug: apiPost.id,
            title: apiPost.title,
            excerpt: excerpt,
            category: apiPost.tags && apiPost.tags.length > 0 ? apiPost.tags[0] : 'News',
            date: formattedDate,
            readTime: `${readTimeMins} min read`,
            imageUrl: apiPost.thumbnail || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
            content: apiPost.content
          };
        });

        setPosts(mappedPosts);

        // Extract unique categories from tags
        const uniqueCategories = Array.from(
          new Set(mappedPosts.map((post: any) => post.category))
        ) as string[];

        setCategories(['All Articles', ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredPosts = activeCategory === 'All Articles'
    ? posts
    : posts.filter((post) => post.category === activeCategory);

  if (isLoading) {
    return (
      <section className="w-full bg-transparent flex flex-col items-center justify-center font-['Poppins'] px-6 md:px-12" style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingBottom: 'clamp(80px, 12vw, 120px)' }}>
        {/* Shimmer Filters */}
        <div className="w-full max-w-[1240px] flex flex-wrap" style={{ gap: '16px', marginBottom: '48px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-11 w-32 bg-white/10 rounded-full animate-pulse"></div>
          ))}
        </div>
        {/* Shimmer Grid */}
        <div className="w-full max-w-[1240px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col bg-[#16161E] rounded-[24px] overflow-hidden h-[450px] animate-pulse border border-white/5">
              <div className="h-[220px] bg-white/5"></div>
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="h-4 w-24 bg-white/10 rounded"></div>
                <div className="h-8 w-full bg-white/10 rounded mt-2"></div>
                <div className="h-16 w-full bg-white/10 rounded"></div>
                <div className="mt-auto h-4 w-32 bg-white/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-transparent flex flex-col items-center justify-center font-['Poppins'] px-6 md:px-12" style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingBottom: 'clamp(80px, 12vw, 120px)' }}>

      {/* Filters */}
      <div
        className="w-full max-w-[1240px] flex flex-wrap"
        style={{ gap: '16px', marginBottom: '48px' }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full text-[15px] font-medium transition-colors ${isActive
                  ? 'bg-[#F0BF4C] text-black'
                  : 'bg-[#16161E] border border-white/5 text-white/60 hover:text-white hover:border-white/20'
                }`}
              style={{ padding: '10px 24px' }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="w-full max-w-[1240px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-[1240px] text-center text-white/60 py-12">
          No articles found.
        </div>
      )}

    </section>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPostHero from '../components/BlogPostHero';
import BlogPostContent from '../components/BlogPostContent';

interface BlogPostPageProps {
  slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const [post, setPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Fetch single post
        const postRes = await fetch(`/api/content/nattypay/news/${slug}`);
        if (!postRes.ok) throw new Error('Failed to fetch post');
        const apiPost = await postRes.json();

        // Format post
        let textContent = "";
        if (typeof document !== 'undefined') {
          const tmp = document.createElement("DIV");
          tmp.innerHTML = apiPost.content || "";
          textContent = tmp.textContent || tmp.innerText || "";
        } else {
          textContent = (apiPost.content || "").replace(/<[^>]*>?/gm, '');
        }

        const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");
        const wordCount = textContent.split(/\\s+/).length;
        const readTimeMins = Math.max(1, Math.ceil(wordCount / 200));

        const dateObj = new Date(apiPost.createdAt);
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const formattedPost = {
          slug: apiPost.id,
          title: apiPost.title,
          excerpt: excerpt,
          category: apiPost.tags && apiPost.tags.length > 0 ? apiPost.tags[0] : 'News',
          date: formattedDate,
          readTime: `${readTimeMins} min read`,
          imageUrl: apiPost.thumbnail || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
          content: apiPost.content
        };

        setPost(formattedPost);

        // Fetch all posts for recent posts sidebar
        const newsRes = await fetch('/api/content/nattypay/news');
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          const mappedRecent = newsData
            .filter((p: any) => p.id !== slug)
            .slice(0, 3)
            .map((p: any) => {
              const d = new Date(p.createdAt);
              return {
                slug: p.id,
                title: p.title,
                category: p.tags && p.tags.length > 0 ? p.tags[0] : 'News',
                date: d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                imageUrl: p.thumbnail || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200'
              };
            });
          setRecentPosts(mappedRecent);
        }

      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col bg-[#0B0B0F] overflow-x-hidden font-['Poppins']">
        <Header currentCurrency="NGN" />
        <div className="w-full flex-grow max-w-[1240px] mx-auto px-6 md:px-12 pt-[120px] pb-20">
          {/* Hero Shimmer */}
          <div className="w-full h-8 w-24 bg-white/10 rounded-full animate-pulse mb-6"></div>
          <div className="w-full md:w-3/4 h-12 md:h-16 bg-white/10 rounded animate-pulse mb-6"></div>
          <div className="flex gap-4 mb-12">
            <div className="w-32 h-6 bg-white/10 rounded animate-pulse"></div>
            <div className="w-32 h-6 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="w-full h-[300px] md:h-[500px] bg-white/5 rounded-[24px] animate-pulse mb-16"></div>
          
          {/* Content Shimmer */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div className="w-full h-6 bg-white/10 rounded animate-pulse"></div>
            <div className="w-full h-6 bg-white/10 rounded animate-pulse"></div>
            <div className="w-3/4 h-6 bg-white/10 rounded animate-pulse"></div>
            <div className="w-full h-6 bg-white/10 rounded animate-pulse mt-8"></div>
            <div className="w-5/6 h-6 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col bg-[#0B0B0F] overflow-x-hidden font-['Poppins'] text-white">
        <Header currentCurrency="NGN" />
        <div className="w-full flex-grow flex items-center justify-center">
          <h1 className="text-3xl font-bold">Article not found.</h1>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#0B0B0F] overflow-x-hidden font-['Poppins']">
      <Header currentCurrency="NGN" />
      
      {/* Blog Post Hero */}
      <BlogPostHero post={post} />

      {/* Main Content Area */}
      <div className="w-full flex justify-center bg-[#0B0B0F]">
        <BlogPostContent post={post} recentPosts={recentPosts} />
      </div>

      <Footer />
    </main>
  );
}

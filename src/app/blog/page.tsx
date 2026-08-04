import BlogListingPage from '@/features/blog/pages/BlogListingPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Updates | NattyPay',
  description: 'Discover the latest news, financial tips, and product updates to help you navigate your journey to financial freedom.',
};

export default function Page() {
  return <BlogListingPage />;
}

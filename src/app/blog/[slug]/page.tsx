import BlogPostPage from '@/features/blog/pages/BlogPostPage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <BlogPostPage slug={resolvedParams.slug} />;
}

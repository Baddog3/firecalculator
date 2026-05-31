import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/BlogArticle";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  const siteUrl = getSiteUrl();

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article"
    }
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div>
      <Link href="/blog" className="mb-6 inline-block text-sm text-text-muted underline">
        ← Все статьи
      </Link>

      <header className="mb-8 border-b border-border pb-6">
        <p className="mb-2 font-mono text-sm text-text-muted">{post.date}</p>
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="mt-3 text-text-muted">{post.description}</p>
      </header>

      <BlogArticle content={post.content} />

      <div id="ad-bottom" className="mt-8 min-h-10 border border-dashed border-border bg-bg-secondary p-2 text-xs text-text-muted">
        Рекламный блок
      </div>

      {related.length > 0 ? (
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="mb-4 text-xl font-medium">Читайте также</h2>
          <ul className="space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

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
      <Link
        href="/blog"
        className="mb-6 inline-block text-sm font-medium text-red-600 transition-colors hover:text-red-700"
      >
        ← Все статьи
      </Link>

      <header className="card-fintech mb-8 p-6">
        <p className="mb-2 font-mono text-xs text-text-muted">{post.date}</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{post.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{post.description}</p>
      </header>

      <BlogArticle content={post.content} />

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-3 text-base font-semibold">Читайте также</h2>
          <ul className="grid gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="card-fintech group block p-4 transition-shadow hover:border-red-100 hover:shadow-md"
                >
                  <p className="text-sm font-medium transition-colors group-hover:text-red-600">{item.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

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
    <div className="container-main page-shell">
      <Link href="/blog" className="nav-link mb-block inline-flex">
        ← Все статьи
      </Link>

      <header className="card mx-auto mb-block max-w-prose p-card text-center">
        <p className="font-mono text-xs text-text-subtle">{post.date}</p>
        <h1 className="type-h1 mt-4">{post.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-text-muted">{post.description}</p>
      </header>

      <BlogArticle content={post.content} />

      {related.length > 0 ? (
        <section className="mt-block max-w-prose">
          <h2 className="type-h2 mb-6">Читайте также</h2>
          <ul className="divide-y divide-border border-y border-border">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="group block py-5 transition-colors hover:bg-surface"
                >
                  <p className="font-semibold leading-snug group-hover:text-text">{item.title}</p>
                  <p className="mt-2 text-sm text-text-muted">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

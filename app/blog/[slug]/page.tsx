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
      <Link
        href="/blog"
        className="mb-block inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-text-muted"
      >
        ← Все статьи
      </Link>

      <header className="card-fintech mx-auto mb-block max-w-3xl p-card text-center">
        <p className="mb-4 font-mono text-xs font-semibold text-text-muted">{post.date}</p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-5 text-base leading-relaxed text-text-muted">{post.description}</p>
      </header>

      <BlogArticle content={post.content} />

      {related.length > 0 ? (
        <section className="mt-block">
          <h2 className="section-head section-title text-center">Читайте также</h2>
          <ul className="grid-symmetric grid sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="flex">
                <Link href={`/blog/${item.slug}`} className="card-fintech-hover group flex w-full flex-col p-card">
                  <p className="font-bold leading-snug">{item.title}</p>
                  <p className="mt-3 flex-1 text-sm text-text-muted">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

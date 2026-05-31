import type { Metadata } from "next";
import BlogPostList from "@/components/BlogPostList";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Блог для инвесторов — статьи и разборы",
  description: "Практические материалы по инвестициям, FIRE и личным финансам для русскоязычных инвесторов.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "Блог для инвесторов — статьи и разборы",
    description: "Практические материалы по инвестициям, FIRE и личным финансам для русскоязычных инвесторов.",
    url: `${siteUrl}/blog`
  }
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-semibold">Блог</h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        Статьи об инвестициях, FIRE, ETF и личных финансах для России и Европы.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-medium">Все статьи</h2>
        <BlogPostList posts={posts} />
      </section>
    </div>
  );
}

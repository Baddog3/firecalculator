import type { Metadata } from "next";
import BlogPostList from "@/components/BlogPostList";
import PageHeader from "@/components/PageHeader";
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
    <div className="container-main page-shell">
      <PageHeader
        badge="Блог"
        title="Статьи для инвесторов"
        description="Материалы об инвестициях, FIRE, ETF и личных финансах для России и Европы."
        centered
      />
      <BlogPostList posts={posts} />
    </div>
  );
}

import type { Metadata } from "next";
import BlogPostList from "@/components/BlogPostList";
import PageHeader from "@/components/PageHeader";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Блог для инвесторов — статьи и разборы",
  description: "Практические материалы по инвестициям, FIRE, БПИФам и личным финансам для России.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "Блог для инвесторов — статьи и разборы",
    description: "Практические материалы по инвестициям, FIRE, БПИФам и личным финансам для России.",
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
        description="Практические материалы по инвестициям, FIRE, БПИФам и личным финансам для России."
        centered
      />
      <BlogPostList posts={posts} />
    </div>
  );
}

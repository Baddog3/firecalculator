import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

type BlogPostListProps = {
  posts: BlogPost[];
};

export default function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return <p className="text-text-muted">Статьи скоро появятся.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-border py-4">
          <Link href={`/blog/${post.slug}`} className="block">
            <p className="text-lg font-medium">{post.title}</p>
            <p className="mt-1 text-sm text-text-muted">{post.description}</p>
            <p className="mt-2 font-mono text-xs text-text-muted">{post.date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

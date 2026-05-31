import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

type BlogPostListProps = {
  posts: BlogPost[];
};

export default function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return <p className="text-sm text-text-muted">Статьи скоро появятся.</p>;
  }

  return (
    <ul className="grid gap-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="card-fintech group block p-5 transition-shadow hover:border-red-100 hover:shadow-md"
          >
            <p className="font-semibold transition-colors group-hover:text-red-600">{post.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{post.description}</p>
            <p className="mt-3 font-mono text-xs text-text-muted">{post.date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

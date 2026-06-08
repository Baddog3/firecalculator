import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

type BlogPostListProps = {
  posts: BlogPost[];
  compact?: boolean;
};

export default function BlogPostList({ posts, compact = false }: BlogPostListProps) {
  if (posts.length === 0) {
    return <p className="text-text-muted">Статьи скоро появятся.</p>;
  }

  if (compact) {
    return (
      <ul className="grid-symmetric grid sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="card-calculator group block p-4">
              <p className="font-mono text-xs text-text-subtle">{post.date}</p>
              <p className="mt-2 line-clamp-2 font-display text-sm font-semibold leading-snug">{post.title}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-text-muted group-hover:text-accent">
                Читать →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group block py-6 transition-colors hover:bg-accent-muted/30 first:pt-6"
          >
            <p className="font-mono text-xs text-text-subtle">{post.date}</p>
            <p className="mt-2 font-display text-xl font-semibold leading-snug group-hover:text-accent">
              {post.title}
            </p>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">{post.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

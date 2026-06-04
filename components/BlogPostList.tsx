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
            <Link
              href={`/blog/${post.slug}`}
              className="card-calculator-compact group block p-4"
            >
              <p className="font-mono text-[11px] font-medium text-text-muted">{post.date}</p>
              <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug">{post.title}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-text-muted group-hover:text-text">
                Читать →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid-symmetric grid sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.slug} className="flex">
          <Link href={`/blog/${post.slug}`} className="card-fintech-hover group flex w-full flex-col p-card">
            <p className="font-mono text-xs font-semibold text-text-muted">{post.date}</p>
            <p className="mt-4 text-xl font-extrabold leading-snug">{post.title}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{post.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
              Читать
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

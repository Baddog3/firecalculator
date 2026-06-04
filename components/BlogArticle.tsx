import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogArticleProps = {
  content: string;
};

export default function BlogArticle({ content }: BlogArticleProps) {
  return (
    <article className="blog-content mx-auto max-w-3xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null,
          h2: ({ children }) => (
            <h2 className="mb-4 mt-12 text-2xl font-extrabold tracking-tight">{children}</h2>
          ),
          h3: ({ children }) => <h3 className="mb-3 mt-8 text-lg font-bold">{children}</h3>,
          p: ({ children }) => <p className="mb-6 text-base leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 list-decimal space-y-2 pl-6 text-base leading-relaxed">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          hr: () => <hr className="my-12 border-t-2 border-border" />,
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          a: ({ href, children }) => {
            const isInternal = href?.startsWith("/");
            if (isInternal && href) {
              return (
                <Link href={href} className="link-fintech">
                  {children}
                </Link>
              );
            }

            return (
              <a href={href} className="link-fintech" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="mb-6 rounded-2xl border-l-4 border-accent bg-accent/10 p-6 text-base text-text-muted">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded-lg border-2 border-border bg-accent/10 px-2 py-0.5 font-mono text-sm">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="card-fintech mb-6 overflow-x-auto p-card font-mono text-sm">{children}</pre>
          ),
          table: ({ children }) => (
            <div className="table-fintech mb-6">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-accent/10">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b-2 border-border px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="border-b border-border px-4 py-3">{children}</td>
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

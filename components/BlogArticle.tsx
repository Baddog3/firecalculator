import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogArticleProps = {
  content: string;
};

export default function BlogArticle({ content }: BlogArticleProps) {
  return (
    <article className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null,
          h2: ({ children }) => (
            <h2 className="mb-3 mt-8 text-base font-semibold tracking-tight">{children}</h2>
          ),
          h3: ({ children }) => <h3 className="mb-2 mt-6 text-sm font-semibold">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-sm leading-relaxed">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          hr: () => <hr className="my-8 border-border" />,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
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
            <blockquote className="card-fintech mb-4 border-l-4 border-red-200 bg-red-50/50 p-4 text-sm text-text-muted">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded-md border border-border bg-stone-50 px-1.5 py-0.5 font-mono text-sm">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="card-fintech mb-4 overflow-x-auto p-4 font-mono text-sm">{children}</pre>
          ),
          table: ({ children }) => (
            <div className="table-fintech mb-4">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-stone-50">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold">{children}</th>
          ),
          td: ({ children }) => <td className="border-b border-border px-3 py-2">{children}</td>
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

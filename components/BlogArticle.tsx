import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogArticleProps = {
  content: string;
};

export default function BlogArticle({ content }: BlogArticleProps) {
  return (
    <article className="prose-blog mx-auto max-w-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul>{children}</ul>,
          ol: ({ children }) => <ol>{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          hr: () => <hr className="my-12 border-t border-border" />,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          a: ({ href, children }) => {
            const isInternal = href?.startsWith("/");
            if (isInternal && href) {
              return (
                <Link href={href} className="link">
                  {children}
                </Link>
              );
            }

            return (
              <a href={href} className="link" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="mb-6 rounded-md border-l-2 border-border-strong bg-bg py-1 pl-4 text-text-muted">
              {children}
            </blockquote>
          ),
          code: ({ children }) => <code>{children}</code>,
          pre: ({ children }) => (
            <pre className="card mb-6 overflow-x-auto p-4 font-mono text-sm">{children}</pre>
          ),
          table: ({ children }) => (
            <div className="table-wrap mb-6">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-bg">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-border px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
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

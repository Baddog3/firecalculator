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
          h2: ({ children }) => <h2 className="mb-3 mt-8 text-xl font-medium">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-2 mt-6 text-lg font-medium">{children}</h3>,
          p: ({ children }) => <p className="mb-4">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          hr: () => <hr className="my-8 border-border" />,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          a: ({ href, children }) => {
            const isInternal = href?.startsWith("/");
            if (isInternal && href) {
              return (
                <Link href={href} className="underline">
                  {children}
                </Link>
              );
            }

            return (
              <a href={href} className="underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-2 border-border pl-4 text-text-muted">{children}</blockquote>
          ),
          code: ({ children }) => (
            <code className="border border-border bg-bg-secondary px-1 py-0.5 font-mono text-sm">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="mb-4 overflow-x-auto border border-border bg-bg-secondary p-4 font-mono text-sm">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-bg-secondary">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-border px-3 py-2 text-left font-medium">{children}</th>
          ),
          td: ({ children }) => <td className="border-b border-border px-3 py-2">{children}</td>
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

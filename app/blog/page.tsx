import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог для инвесторов — статьи и разборы",
  description: "Практические материалы по инвестициям, FIRE и личным финансам для русскоязычных инвесторов.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "Блог для инвесторов — статьи и разборы",
    description: "Практические материалы по инвестициям, FIRE и личным финансам для русскоязычных инвесторов.",
    url: "https://yourdomain.com/blog"
  }
};

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Блог</h1>
      <p className="mt-3 text-text-muted">Раздел готовится. Скоро здесь появятся статьи и разборы.</p>
    </div>
  );
}

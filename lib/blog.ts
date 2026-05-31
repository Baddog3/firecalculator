import fs from "fs";
import matter from "gray-matter";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const SLUG_BY_FILENAME: Record<string, string> = {
  "статья_FIRE_и_правило_4%.md": "fire-i-pravilo-4",
  "статья_сложный_процент (1).md": "slozhnyj-procent",
  "статья_сложный_процент (1).md": "slozhnyj-procent",
  "статья_сравнение_брокеров_Европа.md": "sravnenie-brokerov-evropa",
  "статья_аренда_vs_ипотека.md": "arenda-vs-ipoteka",
  "статья_подушка_безопасности.md": "podushka-bezopasnosti",
  "статья_с_чего_начать_инвестировать.md": "s-chego-nachat-investirovat",
  "статья_что_такое_ETF.md": "chto-takoe-etf"
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
};

function isBlogFile(filename: string): boolean {
  return filename.endsWith(".md") && !filename.startsWith("ТЗ_");
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "Статья";
}

function extractDescription(content: string): string {
  const withoutTitle = content.replace(/^#\s+.+\n+/, "");
  const paragraphs = withoutTitle
    .split("\n\n")
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith("#") && !block.startsWith("---"));

  const first = paragraphs[0] ?? "";
  const plain = first.replace(/\*\*/g, "").replace(/\n/g, " ").trim();
  return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
}

function getSlug(filename: string): string | null {
  if (SLUG_BY_FILENAME[filename]) {
    return SLUG_BY_FILENAME[filename];
  }

  return null;
}

function parsePost(filename: string): BlogPost | null {
  const slug = getSlug(filename);
  if (!slug) {
    return null;
  }

  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content: body } = matter(raw);

  const content = body.trim() || raw.trim();
  const title = typeof data.title === "string" ? data.title : extractTitle(content);
  const description =
    typeof data.description === "string" ? data.description : extractDescription(content);
  const date =
    typeof data.date === "string"
      ? data.date
      : fs.statSync(filePath).mtime.toISOString().slice(0, 10);

  return {
    slug: typeof data.slug === "string" ? data.slug : slug,
    title,
    description,
    date,
    content
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter(isBlogFile)
    .map(parsePost)
    .filter((post): post is BlogPost => post !== null);

  const uniqueBySlug = new Map<string, BlogPost>();
  for (const post of posts) {
    uniqueBySlug.set(post.slug, post);
  }

  return Array.from(uniqueBySlug.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

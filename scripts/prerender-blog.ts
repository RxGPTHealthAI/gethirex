// Postbuild: prerender per-blog-post index.html with real meta tags into dist/blog/<slug>/index.html
// so non-JS crawlers (LinkedIn, Slack, Facebook, some AI crawlers) see per-post title/description/canonical/OG.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://hirexai.space";
const DIST = resolve("dist");
const TEMPLATE_PATH = resolve(DIST, "index.html");

function stripHtml(html: string): string {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractFaq(html: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  // Look for h3 followed by p (matches article structure)
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  const faqStart = html.toLowerCase().indexOf("frequently asked");
  if (faqStart === -1) return faqs;
  const region = html.slice(faqStart);
  let m: RegExpExecArray | null;
  while ((m = re.exec(region))) {
    const q = stripHtml(m[1]);
    const a = stripHtml(m[2]);
    if (q.endsWith("?")) faqs.push({ q, a });
  }
  return faqs;
}

async function fetchPosts() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.warn("[prerender-blog] Missing Supabase env — skipping");
    return [];
  }
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, content, cover_image, category, author, published_at, updated_at, created_at")
    .eq("published", true);
  if (error) {
    console.warn("[prerender-blog] fetch error", error.message);
    return [];
  }
  return data ?? [];
}

function buildHead(post: any): string {
  const title = `${post.title} | HIREXAI Blog`;
  const rawDesc = post.excerpt || stripHtml(post.content).slice(0, 160);
  const description = rawDesc.slice(0, 160);
  const url = `${BASE_URL}/blog/${post.slug}`;
  const image = post.cover_image
    ? (post.cover_image.startsWith("http") ? post.cover_image : `${BASE_URL}${post.cover_image}`)
    : `${BASE_URL}/hirexai-og.jpg`;
  const published = post.published_at || post.created_at;
  const modified = post.updated_at || published;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: [image],
    datePublished: published,
    dateModified: modified,
    author: { "@type": "Person", name: post.author || "HIREXAI Editorial" },
    publisher: {
      "@type": "Organization",
      name: "HIREXAI",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png` },
    },
    mainEntityOfPage: url,
    articleSection: post.category || "AI Recruitment",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqs = extractFaq(post.content || "");
  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const jsonLd = [article, breadcrumb, ...(faqSchema ? [faqSchema] : [])]
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n    ");

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="article:published_time" content="${published}" />
    <meta property="article:modified_time" content="${modified}" />
    ${post.author ? `<meta property="article:author" content="${escapeHtml(post.author)}" />` : ""}
    ${post.category ? `<meta property="article:section" content="${escapeHtml(post.category)}" />` : ""}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />
    ${jsonLd}
  `.trim();
}

function injectHead(template: string, head: string): string {
  // Replace existing title & description; then inject additional tags before </head>
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace(/<meta\s+property=["']og:(title|description|url|type|image)["'][^>]*>/gi, "")
    .replace(/<meta\s+name=["']twitter:(title|description|image|card)["'][^>]*>/gi, "");
  return html.replace(/<\/head>/i, `    ${head}\n  </head>`);
}

(async () => {
  if (!existsSync(TEMPLATE_PATH)) {
    console.warn("[prerender-blog] dist/index.html not found — skipping");
    return;
  }
  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  const posts = await fetchPosts();
  let n = 0;
  for (const post of posts) {
    const head = buildHead(post);
    const html = injectHead(template, head);
    const outPath = resolve(DIST, "blog", post.slug, "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    n++;
  }
  console.log(`[prerender-blog] wrote ${n} prerendered blog pages`);
})();

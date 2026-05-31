// Generates public/sitemap.xml. Runs via predev/prebuild.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://hirexai.space";

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const staticEntries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/business", changefreq: "weekly", priority: "0.9" },
  { path: "/candidate", changefreq: "weekly", priority: "0.9" },
  { path: "/agents", changefreq: "monthly", priority: "0.8" },
  { path: "/how-it-works", changefreq: "monthly", priority: "0.8" },
  { path: "/process", changefreq: "monthly", priority: "0.7" },
  { path: "/customer-stories", changefreq: "monthly", priority: "0.8" },
  { path: "/team", changefreq: "monthly", priority: "0.6" },
  { path: "/demo", changefreq: "monthly", priority: "0.8" },
  { path: "/pricing", changefreq: "weekly", priority: "0.9" },
  { path: "/integrations", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/hr-faq", changefreq: "monthly", priority: "0.7" },
  { path: "/candidates-faq", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/refund", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/security", changefreq: "yearly", priority: "0.4" },
  { path: "/gdpr", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
];

async function fetchBlogPosts(): Promise<Entry[]> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const supabase = createClient(url, key);
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("published", true);
    return (data ?? []).map((p: any) => ({
      path: `/blog/${p.slug}`,
      lastmod: (p.updated_at ?? p.published_at ?? "").split("T")[0] || undefined,
      changefreq: "monthly",
      priority: "0.7",
    }));
  } catch {
    return [];
  }
}

function render(entries: Entry[]) {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ].filter(Boolean).join("\n")
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

(async () => {
  const posts = await fetchBlogPosts();
  const entries = [...staticEntries, ...posts];
  writeFileSync(resolve("public/sitemap.xml"), render(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();

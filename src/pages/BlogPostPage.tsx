import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
  updated_at: string | null;
  created_at: string;
}

const SITE_URL = "https://hirexai.space";

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractFaqs(html: string) {
  const start = (html || "").toLowerCase().indexOf("frequently asked");
  if (start === -1) return [] as { q: string; a: string }[];
  const region = html.slice(start);
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  const out: { q: string; a: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(region))) {
    const q = stripHtml(m[1]);
    const a = stripHtml(m[2]);
    if (q.endsWith("?")) out.push({ q, a });
  }
  return out;
}

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      setPost(data as BlogPost | null);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const jsonLd = useMemo(() => {
    if (!post) return undefined;
    const url = `${SITE_URL}/blog/${slug}`;
    const published = post.published_at || post.created_at;
    const modified = post.updated_at || published;
    const image = post.cover_image
      ? (post.cover_image.startsWith("http") ? post.cover_image : `${SITE_URL}${post.cover_image}`)
      : undefined;
    const article = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || stripHtml(post.content).slice(0, 160),
      image: image ? [image] : undefined,
      datePublished: published,
      dateModified: modified,
      author: { "@type": "Person", name: post.author || "HIREXAI Editorial" },
      publisher: {
        "@type": "Organization",
        name: "HIREXAI",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
      },
      mainEntityOfPage: url,
      articleSection: post.category || "AI Recruitment",
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    };
    const faqs = extractFaqs(post.content || "");
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
    return faqSchema ? [article, breadcrumb, faqSchema] : [article, breadcrumb];
  }, [post, slug]);

  if (loading) {
    return (
      <div className="pt-[140px] pb-20">
        <div className="container max-w-[780px] animate-pulse">
          <div className="h-8 bg-hirex-bg3 rounded mb-4 w-2/3" />
          <div className="h-4 bg-hirex-bg3 rounded mb-8 w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-hirex-bg3 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-[140px] pb-20 text-center">
        <div className="container">
          <h1 className="font-display text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary-light no-underline hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const published = post.published_at || post.created_at;
  const modified = post.updated_at || published;
  const showUpdated = modified && new Date(modified).getTime() - new Date(published).getTime() > 24 * 60 * 60 * 1000;
  const authorName = post.author || "HIREXAI Editorial";
  const coverAlt = post.excerpt || `${post.title} — HIREXAI blog cover`;

  return (
    <div className="animate-fade-in">
      <SEO
        title={`${post.title} | HIREXAI Blog`}
        description={(post.excerpt || stripHtml(post.content).slice(0, 155)) || post.title}
        path={`/blog/${slug}`}
        type="article"
        image={post.cover_image || undefined}
        jsonLd={jsonLd}
      />
      <section className="pt-[140px] pb-20 bg-hirex-bg2">
        <div className="container max-w-[780px]">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-hirex-text3">
            <Link to="/" className="no-underline hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="no-underline hover:text-foreground">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.category || "Article"}</span>
          </nav>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-hirex-text3 no-underline hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
            {post.category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-light">{post.category}</span>
            )}
            <span className="text-xs text-hirex-text3">
              Published {format(new Date(published), "MMM d, yyyy")}
            </span>
            {showUpdated && (
              <span className="text-xs text-hirex-text3">
                · Updated {format(new Date(modified), "MMM d, yyyy")}
              </span>
            )}
            <span className="text-xs text-hirex-text3">· by {authorName}</span>
          </div>
          <h1 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-hirex-text2 leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </section>

      {post.cover_image && (
        <div className="container max-w-[780px] -mt-4">
          <img
            src={post.cover_image}
            alt={coverAlt}
            width={1280}
            height={720}
            loading="eager"
            className="w-full rounded-lg object-cover max-h-[400px]"
          />
        </div>
      )}

      <section className="py-16">
        <article
          className="container max-w-[780px] prose prose-invert prose-lg max-w-none [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:font-bold [&_p]:text-hirex-text2 [&_p]:leading-relaxed [&_a]:text-primary-light [&_li]:text-hirex-text2 [&_strong]:text-foreground [&_blockquote]:border-l-primary [&_blockquote]:text-hirex-text2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="container max-w-[780px] mt-12 pt-8 border-t border-hirex-bg3">
          <p className="text-xs text-hirex-text3 mb-6">
            Written by <span className="text-foreground font-semibold">{authorName}</span> · HIREXAI Editorial ·
            {" "}Last updated {format(new Date(modified), "MMMM d, yyyy")}.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/blog" className="px-4 py-2 rounded-full border border-hirex-bg3 text-sm no-underline hover:border-primary transition-colors">← More articles</Link>
            <Link to="/business" className="px-4 py-2 rounded-full bg-primary text-white text-sm no-underline hover:opacity-90">HIREXAI for Employers</Link>
            <Link to="/pricing" className="px-4 py-2 rounded-full border border-hirex-bg3 text-sm no-underline hover:border-primary transition-colors">See Pricing</Link>
            <Link to="/demo" className="px-4 py-2 rounded-full border border-hirex-bg3 text-sm no-underline hover:border-primary transition-colors">Book a Demo</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;

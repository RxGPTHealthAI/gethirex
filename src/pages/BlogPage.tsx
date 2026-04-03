import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, category, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-hirex-bg2 relative overflow-hidden">
        <div className="absolute -top-[100px] -right-[200px] w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[80px]" />
        <div className="container text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-primary/10 border border-primary/25 text-primary-light mb-6">
            Insights & Updates
          </div>
          <h1 className="font-display text-[clamp(48px,7vw,88px)] font-extrabold mb-5">
            The HireX <span className="grad-text">Blog</span>
          </h1>
          <p className="text-hirex-text2 max-w-[520px] mx-auto text-[17px] leading-relaxed">
            Expert insights on AI-powered HR automation, recruitment strategies, and the future of work.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-hirex-surface border border-border rounded-lg overflow-hidden animate-pulse">
                  <div className="h-[200px] bg-hirex-bg3" />
                  <div className="p-6">
                    <div className="h-4 bg-hirex-bg3 rounded mb-3 w-1/3" />
                    <div className="h-6 bg-hirex-bg3 rounded mb-3" />
                    <div className="h-4 bg-hirex-bg3 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-display text-2xl font-bold mb-3">No posts yet</h3>
              <p className="text-hirex-text2">Stay tuned! Blog posts will appear here soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-hirex-surface border border-border rounded-lg overflow-hidden no-underline text-foreground transition-all hover:-translate-y-1 hover:border-hirex-border2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group"
                >
                  {post.cover_image && (
                    <div className="h-[200px] bg-hirex-bg3 overflow-hidden">
                      <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-light">{post.category}</span>
                      )}
                      <span className="text-xs text-hirex-text3">
                        {format(new Date(post.published_at || post.created_at), "MMM d, yyyy")}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary-light transition-colors">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-sm text-hirex-text3 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;

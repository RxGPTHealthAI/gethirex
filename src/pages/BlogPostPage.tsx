import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
  created_at: string;
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
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

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

  return (
    <div className="animate-fade-in">
      <section className="pt-[140px] pb-20 bg-hirex-bg2">
        <div className="container max-w-[780px]">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-hirex-text3 no-underline hover:text-foreground mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-light">{post.category}</span>
            )}
            <span className="text-xs text-hirex-text3">
              {format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
            </span>
            {post.author && <span className="text-xs text-hirex-text3">by {post.author}</span>}
          </div>
          <h1 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-tight">{post.title}</h1>
        </div>
      </section>

      {post.cover_image && (
        <div className="container max-w-[780px] -mt-4">
          <img src={post.cover_image} alt={post.title} className="w-full rounded-lg object-cover max-h-[400px]" />
        </div>
      )}

      <section className="py-16">
        <div
          className="container max-w-[780px] prose prose-invert prose-lg max-w-none [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:font-bold [&_p]:text-hirex-text2 [&_p]:leading-relaxed [&_a]:text-primary-light [&_li]:text-hirex-text2 [&_strong]:text-foreground [&_blockquote]:border-l-primary [&_blockquote]:text-hirex-text2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>
    </div>
  );
};

export default BlogPostPage;

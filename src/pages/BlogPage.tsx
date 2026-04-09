import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string | null;
  category: string | null;
  published_at: string | null;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image, author, category, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false });
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            HireX <span className="text-cyan-cta">Blog</span>
          </h1>
          <p className="text-white/70 font-inter text-lg">Insights on AI recruitment, hiring trends, and more.</p>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main">
          {posts.length === 0 ? (
            <p className="text-center text-white/50 font-inter">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card overflow-hidden"
                >
                  {post.cover_image && (
                    <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="text-cyan-cta text-xs font-inter font-semibold">{post.category}</span>
                    )}
                    <h3 className="font-syne text-lg font-bold text-white mt-2 mb-2">{post.title}</h3>
                    <p className="text-white/50 text-sm font-inter line-clamp-3">{post.excerpt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;

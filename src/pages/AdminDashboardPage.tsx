import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  category: string | null;
}

const AdminDashboardPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, published, published_at, created_at, category")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const togglePublish = async (post: BlogPost) => {
    const updates = post.published
      ? { published: false, published_at: null }
      : { published: true, published_at: new Date().toISOString() };
    const { error } = await supabase.from("blog_posts").update(updates).eq("id", post.id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success(post.published ? "Unpublished" : "Published");
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Post deleted");
    fetchPosts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">Blog Admin</h1>
          <div className="flex gap-3">
            <Link to="/admin/posts/new">
              <Button><Plus className="w-4 h-4 mr-2" /> New Post</Button>
            </Link>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-hirex-surface border border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Link to="/admin/posts/new"><Button>Create your first post</Button></Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between bg-hirex-surface border border-border rounded-lg p-4 gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${post.published ? "bg-hirex-success" : "bg-muted-foreground"}`} />
                    <h3 className="font-semibold truncate">{post.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {post.category && <span className="text-primary-light mr-2">{post.category}</span>}
                    {format(new Date(post.created_at), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(post)} title={post.published ? "Unpublish" : "Publish"}>
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Link to={`/admin/posts/${post.id}`}>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;

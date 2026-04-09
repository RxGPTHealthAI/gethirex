import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

const AdminPostEditorPage = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAuth();
    if (!isNew && id) fetchPost(id);
  }, [id]);

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

  const fetchPost = async (postId: string) => {
    const { data } = await supabase.from("blog_posts").select("*").eq("id", postId).single();
    if (!data) { navigate("/admin"); return; }
    setTitle(data.title);
    setSlug(data.slug);
    setExcerpt(data.excerpt || "");
    setContent(data.content);
    setCategory(data.category || "");
    setCoverImage(data.cover_image || "");
    setAuthor(data.author || "");
    setPublished(data.published);
  };

  const generateSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const handleSave = async (shouldPublish?: boolean) => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    const pub = shouldPublish !== undefined ? shouldPublish : published;
    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      category: category.trim() || null,
      cover_image: coverImage.trim() || null,
      author: author.trim() || null,
      published: pub,
      published_at: pub ? new Date().toISOString() : null,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("blog_posts").insert(postData));
    } else {
      ({ error } = await supabase.from("blog_posts").update(postData).eq("id", id));
    }

    if (error) {
      toast.error(error.message);
      setSaving(false);
      return;
    }
    toast.success(isNew ? "Post created!" : "Post saved!");
    navigate("/admin");
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>

        <h1 className="font-display text-2xl font-bold mb-6">{isNew ? "New Post" : "Edit Post"}</h1>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Title</label>
            <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title" className="bg-background border-border" />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Slug</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" className="bg-background border-border" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Category</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. AI, Recruitment" className="bg-background border-border" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Author</label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" className="bg-background border-border" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Cover Image URL</label>
            <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." className="bg-background border-border" />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Excerpt</label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary..." rows={2} className="bg-background border-border" />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Content (Markdown)</label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your blog post content..." rows={16} className="bg-background border-border font-mono text-sm" />
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={() => handleSave(false)} variant="outline" disabled={saving}>
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving}>
              {published ? "Update & Publish" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPostEditorPage;

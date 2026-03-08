import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, MessageCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Community = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["community-posts"],
    queryFn: async () => {
      const { data: postsData, error } = await supabase
        .from("community_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      // Fetch profile names for post authors
      const userIds = [...new Set(postsData.map(p => p.user_id))];
      const { data: profilesData } = await supabase.from("profiles").select("user_id, full_name").in("user_id", userIds);
      const profileMap = new Map((profilesData || []).map(p => [p.user_id, p.full_name]));
      return postsData.map(p => ({ ...p, author_name: profileMap.get(p.user_id) || "Anonymous" }));
    },
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["post-comments", selectedPost],
    queryFn: async () => {
      if (!selectedPost) return [];
      const { data, error } = await supabase
        .from("post_comments")
        .select("*, profiles!inner(full_name)")
        .eq("post_id", selectedPost)
        .order("created_at");
      if (error) throw error;
      return data;
    },
    enabled: !!selectedPost,
  });

  const { data: myLikes = [] } = useQuery({
    queryKey: ["my-likes"],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("post_likes").select("post_id").eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const likedPostIds = new Set(myLikes.map((l) => l.post_id));

  const createPostMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const tags = newTags.split(",").map((t) => t.trim()).filter(Boolean);
      const { error } = await supabase.from("community_posts").insert({
        user_id: user.id,
        title: newTitle,
        content: newContent,
        tags,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      toast.success("Post created!");
      setShowNewPost(false);
      setNewTitle("");
      setNewContent("");
      setNewTags("");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error("Not authenticated");
      if (likedPostIds.has(postId)) {
        const { error } = await supabase.from("post_likes").delete().eq("user_id", user.id).eq("post_id", postId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("post_likes").insert({ user_id: user.id, post_id: postId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({ queryKey: ["my-likes"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      if (!user || !selectedPost) throw new Error("Not authenticated");
      const { error } = await supabase.from("post_comments").insert({
        user_id: user.id,
        post_id: selectedPost,
        content: commentText,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-comments"] });
      setCommentText("");
      toast.success("Comment added!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Community <span className="text-gradient-teal">Forum</span></h1>
                <p className="text-muted-foreground text-lg">Discuss, collaborate, and support each other.</p>
              </div>
              {user && (
                <Button onClick={() => setShowNewPost(true)}>
                  <MessageSquare className="mr-2 w-4 h-4" /> New Post
                </Button>
              )}
            </div>
          </motion.div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl bg-card border border-border shadow-card p-5 animate-pulse h-24" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No posts yet. Be the first to start a discussion!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post: any, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl bg-card border border-border shadow-card p-5 hover:shadow-elevated transition-all cursor-pointer"
                  onClick={() => setSelectedPost(post.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm flex-shrink-0">
                      {(post.profiles?.full_name || "U").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold mb-1 hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span>{post.profiles?.full_name || "Anonymous"}</span>
                        <span>•</span>
                        <span>{formatTime(post.created_at)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {(post.tags || []).map((t: string) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <button
                            onClick={(e) => { e.stopPropagation(); user && likeMutation.mutate(post.id); }}
                            className={`flex items-center gap-1 hover:text-primary transition-colors ${likedPostIds.has(post.id) ? "text-primary" : ""}`}
                          >
                            <ThumbsUp className="w-3 h-3" />{post.likes || 0}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* New Post Dialog */}
      <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's on your mind?" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Share your thoughts..." rows={4} />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="AI, Career Advice, Discussion" />
            </div>
            <Button onClick={() => createPostMutation.mutate()} disabled={!newTitle || !newContent || createPostMutation.isPending} className="w-full">
              <Send className="w-4 h-4 mr-2" /> Publish Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Post Detail / Comments Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedPost && (() => {
            const post = posts.find((p: any) => p.id === selectedPost);
            if (!post) return null;
            return (
              <>
                <DialogHeader>
                  <DialogTitle>{post.title}</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground mb-4">{post.content}</p>
                <div className="text-xs text-muted-foreground mb-4">
                  By {post.profiles?.full_name || "Anonymous"} • {formatTime(post.created_at)}
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold mb-3">Comments</h4>
                  <div className="space-y-3 mb-4">
                    {comments.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No comments yet.</p>
                    ) : (
                      comments.map((c: any) => (
                        <div key={c.id} className="p-3 rounded-lg bg-muted/50">
                          <div className="text-xs text-muted-foreground mb-1">{c.profiles?.full_name || "Anonymous"} • {formatTime(c.created_at)}</div>
                          <p className="text-sm">{c.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                  {user && (
                    <div className="flex gap-2">
                      <Input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." />
                      <Button size="sm" onClick={() => commentMutation.mutate()} disabled={!commentText || commentMutation.isPending}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;

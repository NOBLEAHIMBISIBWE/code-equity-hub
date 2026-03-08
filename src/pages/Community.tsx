import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, MessageCircle, Tag, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const posts = [
  { title: "Tips for women transitioning into cybersecurity", author: "Sarah Chen", avatar: "SC", time: "2h ago", replies: 24, likes: 87, tags: ["Cybersecurity", "Career Advice"] },
  { title: "Open source project: Inclusive coding challenge platform", author: "James Mwangi", avatar: "JM", time: "5h ago", replies: 18, likes: 56, tags: ["Open Source", "Collaboration"] },
  { title: "How I landed my first data science internship", author: "Priya Patel", avatar: "PP", time: "8h ago", replies: 42, likes: 134, tags: ["Data Science", "Success Story"] },
  { title: "Resources for learning React Native in 2026", author: "Fatima Al-Rashid", avatar: "FA", time: "1d ago", replies: 31, likes: 92, tags: ["Mobile Dev", "Resources"] },
  { title: "Discussion: Bias in AI hiring tools", author: "Dr. Oluwaseun Adeyemi", avatar: "OA", time: "1d ago", replies: 67, likes: 201, tags: ["AI Ethics", "Discussion"] },
  { title: "Hackathon team formation — looking for designers!", author: "Kim Nguyen", avatar: "KN", time: "2d ago", replies: 15, likes: 43, tags: ["Hackathon", "Team Building"] },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Community <span className="text-gradient-teal">Forum</span></h1>
                <p className="text-muted-foreground text-lg">Discuss, collaborate, and support each other in an inclusive tech space.</p>
              </div>
              <Button>
                <MessageSquare className="mr-2 w-4 h-4" /> New Post
              </Button>
            </div>
          </motion.div>

          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl bg-card border border-border shadow-card p-5 hover:shadow-elevated transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold mb-1 hover:text-primary transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {post.tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{post.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.replies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;

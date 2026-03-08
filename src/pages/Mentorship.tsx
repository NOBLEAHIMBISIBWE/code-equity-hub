import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, ArrowRight, Star, GraduationCap, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Mentorship = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const { data: mentors = [], isLoading } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("mentors").select("*").eq("is_active", true);
      if (error) throw error;
      return data;
    },
  });

  const { data: myRequests = [] } = useQuery({
    queryKey: ["mentorship-requests"],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("mentorship_requests").select("mentor_id, status").eq("mentee_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const requestedMentorIds = new Map(myRequests.map((r) => [r.mentor_id, r.status]));

  const requestMutation = useMutation({
    mutationFn: async ({ mentorId, msg }: { mentorId: string; msg: string }) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("mentorship_requests").insert({
        mentee_id: user.id,
        mentor_id: mentorId,
        message: msg,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentorship-requests"] });
      toast.success("Mentorship request sent!");
      setSelectedMentor(null);
      setMessage("");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const handleRequest = (mentorId: string) => {
    if (!user) {
      toast.error("Please sign in to request a mentor");
      navigate("/auth");
      return;
    }
    setSelectedMentor(mentorId);
  };

  const submitRequest = () => {
    if (selectedMentor) {
      requestMutation.mutate({ mentorId: selectedMentor, msg: message });
    }
  };

  const stats = {
    total: mentors.length,
    female: mentors.filter((m) => m.gender === "Female").length,
    avgRating: mentors.length > 0 ? (mentors.reduce((acc, m) => acc + (Number(m.rating) || 0), 0) / mentors.length).toFixed(1) : "0",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Mentorship <span className="text-gradient-coral">Matching</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Connect with experienced professionals who align with your goals, ensuring gender-inclusive mentorship.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold font-display">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Active Mentors</div>
            </div>
            <div className="p-6 rounded-xl bg-secondary/5 border border-secondary/20 text-center">
              <GraduationCap className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold font-display">{stats.female}</div>
              <div className="text-sm text-muted-foreground">Female Mentors</div>
            </div>
            <div className="p-6 rounded-xl bg-success/5 border border-success/20 text-center">
              <Star className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold font-display">{stats.avgRating}/5</div>
              <div className="text-sm text-muted-foreground">Avg. Rating</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Available Mentors</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl bg-card border border-border shadow-card p-6 animate-pulse h-56" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, i) => {
                const status = requestedMentorIds.get(mentor.id);
                return (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl bg-card border border-border shadow-card p-6 hover:shadow-elevated transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                        {mentor.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-gold" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-semibold">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{mentor.role}</p>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(mentor.expertise || []).map((e) => (
                        <Badge key={e} variant="secondary" className="text-xs">{e}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{mentor.gender}</Badge>
                      {status ? (
                        <Button size="sm" variant="outline" disabled>
                          {status === "pending" ? "Pending" : status === "accepted" ? "✓ Matched" : "Declined"}
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleRequest(mentor.id)}>
                          Request Match <ArrowRight className="ml-1 w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Dialog open={!!selectedMentor} onOpenChange={() => setSelectedMentor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Mentorship</DialogTitle>
            <DialogDescription>Introduce yourself and share your goals with the mentor.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Hi! I'm interested in learning more about..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <Button onClick={submitRequest} disabled={requestMutation.isPending}>
            <Send className="w-4 h-4 mr-2" /> Send Request
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mentorship;

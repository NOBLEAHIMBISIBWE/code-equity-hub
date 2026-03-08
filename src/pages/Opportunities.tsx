import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, ExternalLink, Bookmark, BookmarkCheck, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const typeIcons: Record<string, any> = { Internship: Briefcase, Scholarship: GraduationCap, Hackathon: Trophy, Job: Briefcase };
const typeColors: Record<string, string> = { Internship: "border-primary", Scholarship: "border-secondary", Hackathon: "border-accent", Job: "border-success" };
const typeFilters = ["All", "Internship", "Scholarship", "Hackathon", "Job"];

const Opportunities = () => {
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("opportunities").select("*").order("deadline");
      if (error) throw error;
      return data;
    },
  });

  const { data: saved = [] } = useQuery({
    queryKey: ["saved-opportunities"],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("saved_opportunities").select("opportunity_id").eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const savedIds = new Set(saved.map((s) => s.opportunity_id));

  const saveMutation = useMutation({
    mutationFn: async (oppId: string) => {
      if (!user) throw new Error("Not authenticated");
      if (savedIds.has(oppId)) {
        const { error } = await supabase.from("saved_opportunities").delete().eq("user_id", user.id).eq("opportunity_id", oppId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("saved_opportunities").insert({ user_id: user.id, opportunity_id: oppId });
        if (error) throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["saved-opportunities"] }),
    onError: (err: any) => toast.error(err.message),
  });

  const filtered = opportunities.filter((o) => {
    const matchType = activeType === "All" || o.type === activeType;
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase()) || o.organization.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Opportunity <span className="text-gradient-coral">Engine</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Internships, scholarships, hackathons, and jobs tailored to your skills.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search opportunities..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {typeFilters.map((t) => (
                <Button key={t} size="sm" variant={activeType === t ? "default" : "outline"} onClick={() => setActiveType(t)}>
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl bg-card border border-border shadow-card p-6 animate-pulse h-56" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((opp, i) => {
                const Icon = typeIcons[opp.type] || Briefcase;
                return (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-xl bg-card border-l-4 ${typeColors[opp.type] || ""} border border-border shadow-card p-6 hover:shadow-elevated transition-all`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{opp.type}</Badge>
                      <div className="flex items-center gap-2">
                        {user && (
                          <button onClick={() => saveMutation.mutate(opp.id)} className="text-muted-foreground hover:text-primary transition-colors">
                            {savedIds.has(opp.id) ? <BookmarkCheck className="w-5 h-5 text-primary" /> : <Bookmark className="w-5 h-5" />}
                          </button>
                        )}
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="font-display font-semibold mb-1">{opp.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{opp.organization}</p>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{opp.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{opp.deadline}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(opp.tags || []).map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <a href={opp.apply_url || "#"} target="_blank" rel="noopener noreferrer">
                        Apply Now <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;

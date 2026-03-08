import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldAlert, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const categories = [
  { value: "discrimination", label: "Discrimination" },
  { value: "harassment", label: "Harassment" },
  { value: "bias", label: "Bias" },
  { value: "other", label: "Other" },
];

const severities = [
  { value: "low", label: "Low", color: "bg-muted text-foreground" },
  { value: "medium", label: "Medium", color: "bg-gold/10 text-gold" },
  { value: "high", label: "High", color: "bg-secondary/10 text-secondary" },
  { value: "critical", label: "Critical", color: "bg-destructive/10 text-destructive" },
];

const Report = () => {
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("reports").insert({
        category,
        severity,
        description,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Report submitted anonymously");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Safe <span className="text-gradient-coral">Reporting</span></h1>
            <p className="text-muted-foreground text-lg">Anonymously report discrimination or bias in tech environments. Your identity is never stored.</p>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl bg-success/5 border border-success/20 p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
              <p className="text-muted-foreground mb-6">Thank you for reporting. Your submission is completely anonymous and will be reviewed by our team.</p>
              <Button onClick={() => { setSubmitted(false); setCategory(""); setSeverity(""); setDescription(""); }}>
                Submit Another Report
              </Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl bg-card border border-border shadow-card p-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Category</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          category === cat.value
                            ? "bg-primary/10 border-primary text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Severity</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {severities.map((sev) => (
                      <button
                        key={sev.value}
                        onClick={() => setSeverity(sev.value)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          severity === sev.value
                            ? "bg-primary/10 border-primary text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {sev.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what happened. Be as detailed as possible. Your identity is not recorded."
                    rows={6}
                  />
                </div>

                <Button
                  onClick={() => submitMutation.mutate()}
                  disabled={!category || !severity || !description || submitMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" /> Submit Anonymous Report
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  🔒 This report is fully anonymous. No account, IP address, or identifying information is stored.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;

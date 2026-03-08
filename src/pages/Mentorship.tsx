import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, ArrowRight, Star, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mentors = [
  { name: "Dr. Amina Osei", role: "Senior Data Scientist at Google", expertise: ["Data Science", "Python", "ML"], rating: 4.9, mentees: 23, gender: "Female" },
  { name: "Carlos Rivera", role: "Staff Engineer at Meta", expertise: ["React", "System Design", "TypeScript"], rating: 4.8, mentees: 18, gender: "Male" },
  { name: "Sarah Chen", role: "CISO at Cloudflare", expertise: ["Cybersecurity", "Cloud Security", "Compliance"], rating: 4.9, mentees: 15, gender: "Female" },
  { name: "James Mwangi", role: "Engineering Manager at Microsoft", expertise: ["Leadership", "Cloud", "DevOps"], rating: 4.7, mentees: 20, gender: "Male" },
  { name: "Fatima Al-Rashid", role: "Mobile Lead at Spotify", expertise: ["React Native", "iOS", "UX"], rating: 4.8, mentees: 12, gender: "Female" },
  { name: "Dr. Oluwaseun Adeyemi", role: "AI Research Lead at DeepMind", expertise: ["NLP", "Deep Learning", "Research"], rating: 4.9, mentees: 10, gender: "Male" },
];

const Mentorship = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Mentorship <span className="text-gradient-coral">Matching</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl">AI-powered matching connects you with mentors who align with your goals, ensuring gender-inclusive mentorship for everyone.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold font-display">500+</div>
              <div className="text-sm text-muted-foreground">Active Mentors</div>
            </div>
            <div className="p-6 rounded-xl bg-secondary/5 border border-secondary/20 text-center">
              <GraduationCap className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold font-display">3,200+</div>
              <div className="text-sm text-muted-foreground">Mentees Paired</div>
            </div>
            <div className="p-6 rounded-xl bg-success/5 border border-success/20 text-center">
              <Star className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold font-display">4.8/5</div>
              <div className="text-sm text-muted-foreground">Avg. Satisfaction</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Featured Mentors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor, i) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl bg-card border border-border shadow-card p-6 hover:shadow-elevated transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                    {mentor.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="font-medium">{mentor.rating}</span>
                  </div>
                </div>
                <h3 className="font-display font-semibold">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{mentor.role}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.expertise.map(e => (
                    <Badge key={e} variant="secondary" className="text-xs">{e}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{mentor.mentees} mentees</span>
                  <Button size="sm" variant="outline">Request Match <ArrowRight className="ml-1 w-3 h-3" /></Button>
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

export default Mentorship;

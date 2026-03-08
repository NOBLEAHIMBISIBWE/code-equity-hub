import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const opportunities = [
  { type: "Internship", title: "Software Engineering Intern", org: "Google", location: "Remote / Mountain View", deadline: "Apr 15, 2026", tags: ["Python", "ML", "Cloud"], icon: Briefcase, color: "border-primary" },
  { type: "Scholarship", title: "Women in Tech Scholarship 2026", org: "Ada Lovelace Foundation", location: "Global", deadline: "May 1, 2026", tags: ["STEM", "Full Tuition", "Mentorship"], icon: GraduationCap, color: "border-secondary" },
  { type: "Hackathon", title: "Global Gender-Balanced Hackathon", org: "EquiTech & MLH", location: "Virtual", deadline: "Mar 30, 2026", tags: ["Teams", "48 Hours", "Prizes"], icon: Trophy, color: "border-accent" },
  { type: "Job", title: "Junior Data Analyst", org: "Spotify", location: "Stockholm / Remote", deadline: "Apr 20, 2026", tags: ["SQL", "Python", "Tableau"], icon: Briefcase, color: "border-success" },
  { type: "Scholarship", title: "Cybersecurity Bootcamp Grant", org: "CyberSafe Initiative", location: "Online", deadline: "Apr 10, 2026", tags: ["Cybersecurity", "Beginner", "Free"], icon: GraduationCap, color: "border-secondary" },
  { type: "Hackathon", title: "AI for Good Challenge", org: "United Nations", location: "Hybrid", deadline: "May 15, 2026", tags: ["AI", "Social Impact", "Teams"], icon: Trophy, color: "border-gold" },
];

const Opportunities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Opportunity <span className="text-gradient-coral">Engine</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl">AI-curated internships, scholarships, hackathons, and jobs tailored to your skills and interests.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, i) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl bg-card border-l-4 ${opp.color} border border-border shadow-card p-6 hover:shadow-elevated transition-all`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{opp.type}</Badge>
                  <opp.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-1">{opp.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{opp.org}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{opp.deadline}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                </div>
                <Button size="sm" className="w-full">Apply Now <ExternalLink className="ml-1 w-3 h-3" /></Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;

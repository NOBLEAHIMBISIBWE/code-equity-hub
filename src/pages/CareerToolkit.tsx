import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Code2, Palette, Mic, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create ATS-optimized resumes with AI-powered suggestions tailored for tech roles. Choose from modern templates.",
    features: ["AI content suggestions", "ATS optimization", "Multiple templates", "PDF export"],
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    icon: Code2,
    title: "Coding Challenges",
    description: "Practice with 500+ coding problems across difficulty levels. Track your progress and compete on leaderboards.",
    features: ["500+ problems", "Multiple languages", "Difficulty tiers", "Progress tracking"],
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    icon: Palette,
    title: "Portfolio Creator",
    description: "Showcase your projects with a beautiful, customizable portfolio. Deploy instantly with a shareable link.",
    features: ["Drag & drop editor", "Project showcases", "Custom domains", "Analytics"],
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    icon: Mic,
    title: "Interview Prep",
    description: "Practice with AI-simulated interviews. Get real-time feedback on technical and behavioral questions.",
    features: ["AI mock interviews", "Technical questions", "Behavioral prep", "Feedback reports"],
    color: "bg-gold/10 text-gold border-gold/20",
  },
];

const CareerToolkit = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Career <span className="text-gradient-coral">Toolkit</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Everything you need to land your dream tech role — from resume to interview.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border ${tool.color} p-8`}
              >
                <tool.icon className="w-10 h-10 mb-4" />
                <h3 className="font-display font-bold text-xl mb-2">{tool.title}</h3>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <ul className="space-y-2 mb-6">
                  {tool.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" onClick={() => toast.info("Coming soon! This feature is under development.")}>
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerToolkit;

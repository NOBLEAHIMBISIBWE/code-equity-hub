import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.png";

const stats = [
  { icon: Users, label: "Active Learners", value: "12,500+" },
  { icon: BookOpen, label: "Courses Available", value: "350+" },
  { icon: TrendingUp, label: "Career Placements", value: "4,200+" },
];

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              Bridging the Gender Gap in Tech
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Equal Access to{" "}
              <span className="text-gradient-teal">Tech Education</span>{" "}
              & <span className="text-gradient-coral">Opportunities</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              EquiTech empowers everyone with inclusive tech education, mentorship, 
              and career pathways — ensuring no one is left behind because of gender.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-glow-teal">
                Start Learning <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Find a Mentor
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Diverse people connected through technology network"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-secondary/20 animate-float" />
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 animate-float" style={{ animationDelay: "1s" }} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 p-6 rounded-xl bg-card shadow-card border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

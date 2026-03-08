import { motion } from "framer-motion";
import {
  BookOpen, Users, BarChart3, Briefcase,
  MessageSquare, ShieldAlert, Wrench, Trophy,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Learning Hub",
    description: "Access 350+ courses in programming, AI, cybersecurity, and data science — designed for inclusive learning.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Mentorship Matching",
    description: "AI-powered matching connects you with experienced professionals while ensuring gender-balanced mentorship.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track gender participation across programs, events, and internships with real-time visualizations.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Briefcase,
    title: "Opportunity Engine",
    description: "Personalized recommendations for internships, scholarships, hackathons, and jobs based on your skills.",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Collaborate on projects, discuss tech topics, and support peers in a safe, inclusive space.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldAlert,
    title: "Safe Reporting",
    description: "Anonymously report discrimination or bias — every voice matters in building an equitable tech world.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: Wrench,
    title: "Career Toolkit",
    description: "Resume builder, coding challenges, portfolio creator, and interview prep — all in one place.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Trophy,
    title: "Hackathon Manager",
    description: "Organize and join hackathons with balanced team composition for equal representation.",
    color: "bg-violet/10 text-violet",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-gradient-teal">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive platform addressing every aspect of gender equity in tech — 
            from education to employment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

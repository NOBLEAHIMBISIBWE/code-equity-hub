import { motion } from "framer-motion";
import { Monitor, Server, Database, Brain, Shield, Cloud } from "lucide-react";

const layers = [
  {
    icon: Monitor,
    title: "Frontend (Presentation Layer)",
    items: ["React + TypeScript SPA", "Responsive Design with Tailwind CSS", "Interactive Charts with Recharts", "Framer Motion Animations"],
    color: "border-primary bg-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Server,
    title: "Backend (Application Layer)",
    items: ["Supabase Edge Functions", "RESTful API Architecture", "Real-time Subscriptions", "Role-Based Access Control"],
    color: "border-secondary bg-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Database,
    title: "Data Layer",
    items: ["PostgreSQL Database", "Row-Level Security", "Optimized Queries & Indexes", "Automated Backups"],
    color: "border-accent bg-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Brain,
    title: "AI/ML Services",
    items: ["Lovable AI Gateway", "Recommendation Engine", "NLP for Content Matching", "Predictive Analytics"],
    color: "border-gold bg-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: Shield,
    title: "Security Layer",
    items: ["End-to-End Encryption", "Anonymous Reporting", "GDPR Compliance", "Secure Authentication"],
    color: "border-success bg-success/5",
    iconColor: "text-success",
  },
  {
    icon: Cloud,
    title: "Infrastructure",
    items: ["Lovable Cloud Hosting", "CDN for Global Access", "Auto-Scaling", "99.9% Uptime SLA"],
    color: "border-primary bg-primary/5",
    iconColor: "text-primary",
  },
];

const ArchitectureSection = () => {
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
            System <span className="text-gradient-teal">Architecture</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built on a modern, scalable architecture designed for security, performance, and accessibility.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border-2 ${layer.color} p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <layer.icon className={`w-6 h-6 ${layer.iconColor}`} />
                <h3 className="font-display font-semibold">{layer.title}</h3>
              </div>
              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

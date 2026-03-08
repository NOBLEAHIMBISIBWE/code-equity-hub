import { motion } from "framer-motion";

const categories = [
  {
    title: "Frontend",
    techs: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "Shadcn/UI"],
    color: "bg-primary/10 border-primary/20",
  },
  {
    title: "Backend & Database",
    techs: ["Supabase (PostgreSQL)", "Edge Functions (Deno)", "Row-Level Security", "Real-time Subscriptions"],
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    title: "AI & Analytics",
    techs: ["Lovable AI Gateway", "Google Gemini", "Predictive Analytics", "NLP Matching"],
    color: "bg-accent/10 border-accent/20",
  },
  {
    title: "DevOps & Security",
    techs: ["Lovable Cloud", "CI/CD Pipeline", "E2E Encryption", "GDPR Compliance"],
    color: "bg-success/10 border-success/20",
  },
];

const TechStackSection = () => {
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
            Technologies <span className="text-gradient-teal">Required</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A modern, battle-tested stack chosen for performance, scalability, and developer experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border ${cat.color} p-6`}
            >
              <h3 className="font-display font-semibold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;

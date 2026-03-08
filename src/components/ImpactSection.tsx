import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const impacts = [
  "Increase female enrollment in STEM courses by 40%",
  "Connect 5,000+ mentees with experienced professionals annually",
  "Place 2,000+ women in tech internships and jobs yearly",
  "Build 500+ gender-balanced hackathon teams per quarter",
  "Reduce reported discrimination incidents by 60%",
  "Provide free access to 100+ scholarship opportunities",
];

const ImpactSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Measurable <span className="text-gradient-coral">Impact</span> on Gender Equity
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              EquiTech isn't just a platform — it's a movement. We measure our success 
              by the real-world change we create in closing the gender gap in technology.
            </p>
            <div className="space-y-4">
              {impacts.map((impact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{impact}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl bg-card border border-border shadow-elevated p-8">
              <h3 className="font-display font-bold text-xl mb-6">The Problem We Solve</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Women in Tech Workforce (Global)</span>
                    <span className="font-semibold text-secondary">26%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "26%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-secondary"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">CS Degree Holders (Female)</span>
                    <span className="font-semibold text-accent">18%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "18%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full bg-accent"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tech Leadership Roles (Female)</span>
                    <span className="font-semibold text-primary">11%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "11%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                These gaps represent lost innovation and potential. EquiTech aims to change these numbers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

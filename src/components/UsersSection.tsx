import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Building2, HeartHandshake } from "lucide-react";

const users = [
  {
    icon: GraduationCap,
    title: "Students & Learners",
    description: "Aspiring technologists seeking courses, mentors, and hands-on experience regardless of gender.",
    color: "text-primary",
  },
  {
    icon: Briefcase,
    title: "Tech Professionals",
    description: "Experienced developers, engineers, and leaders who mentor, teach, and champion inclusivity.",
    color: "text-secondary",
  },
  {
    icon: Building2,
    title: "Organizations & Employers",
    description: "Companies committed to diverse hiring and building inclusive tech teams.",
    color: "text-accent",
  },
  {
    icon: HeartHandshake,
    title: "NGOs & Advocates",
    description: "Non-profits and advocates working to close the gender gap in technology worldwide.",
    color: "text-success",
  },
];

const UsersSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Is <span className="text-gradient-coral">EquiTech</span> For?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform serves everyone committed to building a more equitable tech industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user, i) => (
            <motion.div
              key={user.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-xl bg-card border border-border shadow-card"
            >
              <user.icon className={`w-10 h-10 ${user.color} mx-auto mb-4`} />
              <h3 className="font-display font-semibold mb-2">{user.title}</h3>
              <p className="text-sm text-muted-foreground">{user.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsersSection;

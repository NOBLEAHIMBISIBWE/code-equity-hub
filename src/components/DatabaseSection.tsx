import { motion } from "framer-motion";
import { Database, Key, Link as LinkIcon, Shield } from "lucide-react";

const tables = [
  {
    name: "users",
    fields: ["id (UUID, PK)", "email", "full_name", "gender", "role", "avatar_url", "bio", "skills[]", "created_at"],
    color: "border-primary",
  },
  {
    name: "courses",
    fields: ["id (UUID, PK)", "title", "category", "difficulty", "instructor_id (FK)", "description", "duration_hours", "thumbnail_url"],
    color: "border-secondary",
  },
  {
    name: "enrollments",
    fields: ["id (UUID, PK)", "user_id (FK)", "course_id (FK)", "progress", "completed_at", "enrolled_at"],
    color: "border-accent",
  },
  {
    name: "mentorship_matches",
    fields: ["id (UUID, PK)", "mentor_id (FK)", "mentee_id (FK)", "status", "matched_at", "focus_areas[]"],
    color: "border-gold",
  },
  {
    name: "opportunities",
    fields: ["id (UUID, PK)", "title", "type (enum)", "organization", "deadline", "requirements[]", "url", "tags[]"],
    color: "border-success",
  },
  {
    name: "reports",
    fields: ["id (UUID, PK)", "reporter_id (FK, nullable)", "category", "description", "status", "is_anonymous", "created_at"],
    color: "border-destructive",
  },
  {
    name: "forum_posts",
    fields: ["id (UUID, PK)", "author_id (FK)", "title", "content", "tags[]", "upvotes", "created_at"],
    color: "border-primary",
  },
  {
    name: "hackathons",
    fields: ["id (UUID, PK)", "name", "start_date", "end_date", "max_team_size", "gender_balance_target", "status"],
    color: "border-violet",
  },
];

const DatabaseSection = () => {
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
            Database <span className="text-gradient-coral">Design</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A normalized PostgreSQL schema with Row-Level Security, optimized for gender analytics and inclusive access.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tables.map((table, i) => (
            <motion.div
              key={table.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-lg border-l-4 ${table.color} bg-card border border-border p-4 shadow-card`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="font-display font-semibold text-sm">{table.name}</span>
              </div>
              <ul className="space-y-1">
                {table.fields.map((field) => (
                  <li key={field} className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                    {field.includes("PK") ? (
                      <Key className="w-3 h-3 text-gold flex-shrink-0" />
                    ) : field.includes("FK") ? (
                      <LinkIcon className="w-3 h-3 text-primary flex-shrink-0" />
                    ) : (
                      <div className="w-3 h-3 flex-shrink-0" />
                    )}
                    {field}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-gold" /> Primary Key
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-primary" /> Foreign Key
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" /> RLS Protected
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DatabaseSection;

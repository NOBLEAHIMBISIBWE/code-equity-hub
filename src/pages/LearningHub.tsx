import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const courses = [
  { id: 1, title: "Python for Data Science", category: "Data Science", level: "Beginner", duration: "8 weeks", enrolled: 2340, rating: 4.8, instructor: "Dr. Amina Osei" },
  { id: 2, title: "Full-Stack Web Development", category: "Programming", level: "Intermediate", duration: "12 weeks", enrolled: 1890, rating: 4.7, instructor: "Carlos Rivera" },
  { id: 3, title: "Introduction to Cybersecurity", category: "Cybersecurity", level: "Beginner", duration: "6 weeks", enrolled: 1560, rating: 4.9, instructor: "Sarah Chen" },
  { id: 4, title: "Machine Learning Fundamentals", category: "AI", level: "Intermediate", duration: "10 weeks", enrolled: 2100, rating: 4.6, instructor: "Dr. Priya Patel" },
  { id: 5, title: "Cloud Computing with AWS", category: "Cloud", level: "Advanced", duration: "8 weeks", enrolled: 980, rating: 4.5, instructor: "James Mwangi" },
  { id: 6, title: "Mobile App Development (React Native)", category: "Programming", level: "Intermediate", duration: "10 weeks", enrolled: 1450, rating: 4.7, instructor: "Fatima Al-Rashid" },
  { id: 7, title: "Ethical Hacking & Penetration Testing", category: "Cybersecurity", level: "Advanced", duration: "8 weeks", enrolled: 870, rating: 4.8, instructor: "Kim Nguyen" },
  { id: 8, title: "Natural Language Processing", category: "AI", level: "Advanced", duration: "10 weeks", enrolled: 760, rating: 4.6, instructor: "Dr. Oluwaseun Adeyemi" },
];

const categories = ["All", "Programming", "AI", "Cybersecurity", "Data Science", "Cloud"];
const levelColors: Record<string, string> = {
  Beginner: "bg-success/10 text-success",
  Intermediate: "bg-gold/10 text-gold",
  Advanced: "bg-secondary/10 text-secondary",
};

const LearningHub = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Learning <span className="text-gradient-teal">Hub</span></h1>
            <p className="text-muted-foreground text-lg">350+ inclusive courses in programming, AI, cybersecurity, and data science.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button key={cat} size="sm" variant={activeCategory === cat ? "default" : "outline"} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl bg-card border border-border shadow-card p-5 hover:shadow-elevated transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[course.level]}`}>{course.level}</span>
                </div>
                <h3 className="font-display font-semibold mb-2 leading-tight">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.enrolled.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold" />{course.rating}</span>
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

export default LearningHub;

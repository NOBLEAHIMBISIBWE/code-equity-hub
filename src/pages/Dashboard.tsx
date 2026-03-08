import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Users, Target, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const { data: profiles = [] } = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("gender");
      if (error) throw error;
      return data;
    },
  });

  const { data: myEnrollments = [] } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("enrollments").select("*, courses(*)").eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: myRequests = [] } = useQuery({
    queryKey: ["my-mentorship-status"],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("mentorship_requests").select("*, mentors(*)").eq("mentee_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["courses-for-dashboard"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("category");
      if (error) throw error;
      return data;
    },
  });

  // Gender distribution from real profiles
  const genderCounts = profiles.reduce((acc, p) => {
    const g = p.gender || "Not specified";
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderData = Object.entries(genderCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: name === "female" ? "hsl(12, 80%, 62%)" : name === "male" ? "hsl(174, 62%, 38%)" : "hsl(260, 55%, 58%)",
  }));

  // Courses by category
  const categoryCounts = courses.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));

  const totalUsers = profiles.length;
  const femaleCount = genderCounts["female"] || 0;
  const parityIndex = totalUsers > 0 ? (femaleCount / totalUsers).toFixed(2) : "N/A";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Your <span className="text-gradient-teal">Dashboard</span></h1>
            <p className="text-muted-foreground text-lg">Track your progress and see platform-wide gender analytics.</p>
          </motion.div>

          {/* Personal stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="p-5 rounded-xl bg-card border border-border shadow-card">
              <BookOpen className="w-5 h-5 text-primary mb-2" />
              <div className="text-2xl font-bold font-display">{myEnrollments.length}</div>
              <div className="text-sm text-muted-foreground">Courses Enrolled</div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border shadow-card">
              <Users className="w-5 h-5 text-secondary mb-2" />
              <div className="text-2xl font-bold font-display">{myRequests.length}</div>
              <div className="text-sm text-muted-foreground">Mentor Requests</div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border shadow-card">
              <Target className="w-5 h-5 text-accent mb-2" />
              <div className="text-2xl font-bold font-display">{totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="p-5 rounded-xl bg-card border border-border shadow-card">
              <TrendingUp className="w-5 h-5 text-success mb-2" />
              <div className="text-2xl font-bold font-display">{parityIndex}</div>
              <div className="text-sm text-muted-foreground">Gender Parity Index</div>
            </div>
          </div>

          {/* My Enrollments */}
          {myEnrollments.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-card border border-border shadow-card p-6 mb-6">
              <h3 className="font-display font-semibold mb-4">My Enrolled Courses</h3>
              <div className="space-y-3">
                {myEnrollments.map((enrollment: any) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">{enrollment.courses?.title}</div>
                      <div className="text-xs text-muted-foreground">{enrollment.courses?.category} • {enrollment.courses?.level}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Progress: {enrollment.progress || 0}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* My Mentorship Requests */}
          {myRequests.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-card border border-border shadow-card p-6 mb-6">
              <h3 className="font-display font-semibold mb-4">My Mentorship Requests</h3>
              <div className="space-y-3">
                {myRequests.map((req: any) => (
                  <div key={req.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">{req.mentors?.name}</div>
                      <div className="text-xs text-muted-foreground">{req.mentors?.role}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      req.status === "pending" ? "bg-gold/10 text-gold" :
                      req.status === "accepted" ? "bg-success/10 text-success" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl bg-card border border-border shadow-card p-6">
              <h3 className="font-display font-semibold mb-4">Gender Distribution (Users)</h3>
              {genderData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {genderData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">No user data yet</div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl bg-card border border-border shadow-card p-6">
              <h3 className="font-display font-semibold mb-4">Courses by Category</h3>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 10%, 88%)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(174, 62%, 38%)" radius={[4, 4, 0, 0]} name="Courses" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">No course data yet</div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

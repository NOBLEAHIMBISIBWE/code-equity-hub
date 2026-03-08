import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";

const participationData = [
  { program: "Web Dev", male: 145, female: 120 },
  { program: "Data Science", male: 110, female: 135 },
  { program: "Cybersecurity", male: 160, female: 85 },
  { program: "AI/ML", male: 130, female: 100 },
  { program: "Cloud", male: 95, female: 70 },
  { program: "Mobile Dev", male: 105, female: 110 },
];

const genderSplit = [
  { name: "Male", value: 52, color: "hsl(174, 62%, 38%)" },
  { name: "Female", value: 44, color: "hsl(12, 80%, 62%)" },
  { name: "Non-binary", value: 4, color: "hsl(260, 55%, 58%)" },
];

const trendData = [
  { month: "Jan", female: 320, male: 380 },
  { month: "Feb", female: 350, male: 370 },
  { month: "Mar", female: 380, male: 365 },
  { month: "Apr", female: 410, male: 390 },
  { month: "May", female: 450, male: 400 },
  { month: "Jun", female: 490, male: 410 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Analytics <span className="text-gradient-teal">Dashboard</span></h1>
            <p className="text-muted-foreground text-lg">Track gender participation across all programs and initiatives in real-time.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Participants", value: "12,540", change: "+12%" },
              { label: "Female Enrollment", value: "5,520", change: "+18%" },
              { label: "Active Mentorships", value: "1,840", change: "+9%" },
              { label: "Gender Parity Index", value: "0.87", change: "+0.05" },
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl bg-card border border-border shadow-card">
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <div className="text-xs text-success font-medium mt-1">{stat.change} vs last quarter</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl bg-card border border-border shadow-card p-6"
            >
              <h3 className="font-display font-semibold mb-4">Participation by Program</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={participationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 10%, 88%)" />
                  <XAxis dataKey="program" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" fill="hsl(174, 62%, 38%)" radius={[4, 4, 0, 0]} name="Male" />
                  <Bar dataKey="female" fill="hsl(12, 80%, 62%)" radius={[4, 4, 0, 0]} name="Female" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl bg-card border border-border shadow-card p-6"
            >
              <h3 className="font-display font-semibold mb-4">Overall Gender Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={genderSplit} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {genderSplit.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-card border border-border shadow-card p-6"
          >
            <h3 className="font-display font-semibold mb-4">Enrollment Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 10%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="female" stroke="hsl(12, 80%, 62%)" strokeWidth={2} dot={{ r: 4 }} name="Female" />
                <Line type="monotone" dataKey="male" stroke="hsl(174, 62%, 38%)" strokeWidth={2} dot={{ r: 4 }} name="Male" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

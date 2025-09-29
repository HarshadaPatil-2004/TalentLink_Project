import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import API from "./axiosInstance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await API.get("projects/");
        const messagesRes = await API.get("messages/");
        setProjects(projectsRes.data);
        setMessages(messagesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const projectStatusData = [
    { name: "Completed", value: projects.filter(p => p.status === "Completed").length },
    { name: "In Progress", value: projects.filter(p => p.status === "In Progress").length },
    { name: "Pending", value: projects.filter(p => p.status === "Pending").length },
  ];
  const COLORS = ["#4f46e5", "#6366f1", "#a78bfa"];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={{color: "#4f46e5", textAlign:"center"}}>TalentLink</h2>
        <nav style={styles.navMenu}>
          <a href="/dashboard" style={styles.navItem}>🏠 Dashboard</a>
          <a href="/projects" style={styles.navItem}>📁 Projects</a>
          <a href="/messages" style={styles.navItem}>✉️ Messages</a>
          <a href="/profile" style={styles.navItem}>👤 Profile</a>
        </nav>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        <h2>Welcome, {user?.username || "User"}!</h2>

        {/* Stats cards */}
        <div style={styles.cardsContainer}>
          <div style={{...styles.card, background: "#e0e7ff"}}>Projects: {projects.length}</div>
          <div style={{...styles.card, background: "#ede9fe"}}>Messages: {messages.length}</div>
        </div>

        {/* Project status chart */}
        <div style={styles.chartContainer}>
          <h3>Project Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={projectStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent messages */}
        <div style={styles.messagesContainer}>
          <h3>Recent Messages</h3>
          {messages.slice(0, 5).map(msg => (
            <div key={msg.id} style={styles.messageCard}>
              <strong>{msg.sender}</strong>
              <p>{msg.content.slice(0, 50)}...</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: { display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" },
  sidebar: { width: "220px", background: "#f3f4f6", padding: "20px", display: "flex", flexDirection: "column" },
  navMenu: { marginTop: "40px", display: "flex", flexDirection: "column", gap: "15px" },
  navItem: { textDecoration: "none", color: "#4f46e5", fontWeight: "500", padding: "8px 10px", borderRadius: "8px", transition: "0.3s", cursor: "pointer" },
  main: { flex: 1, padding: "30px", background: "#f9fafb" },
  cardsContainer: { display: "flex", gap: "20px", marginBottom: "30px" },
  card: { flex: 1, padding: "20px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)", fontWeight: "600", textAlign: "center" },
  chartContainer: { background: "white", padding: "20px", borderRadius: "12px", marginBottom: "30px", boxShadow: "0 8px 20px rgba(0,0,0,0.05)" },
  messagesContainer: { display: "flex", flexDirection: "column", gap: "15px" },
  messageCard: { background: "white", padding: "15px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" },
};

export default Dashboard;

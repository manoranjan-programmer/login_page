import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) navigate("/");
    else setUser(JSON.parse(storedUser));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  /* ======================
     DATA (Mock / Demo)
  ====================== */

  const attackData = [
    { name: "Malware", count: 120 },
    { name: "Phishing", count: 90 },
    { name: "DDoS", count: 60 },
    { name: "Ransomware", count: 30 },
  ];

  const accuracyData = [
    { epoch: "Day 1", accuracy: 82 },
    { epoch: "Day 2", accuracy: 85 },
    { epoch: "Day 3", accuracy: 88 },
    { epoch: "Day 4", accuracy: 91 },
    { epoch: "Day 5", accuracy: 94 },
  ];

  const threatPie = [
    { name: "Safe", value: 65 },
    { name: "Suspicious", value: 20 },
    { name: "Critical", value: 15 },
  ];

  const COLORS = ["#00ff99", "#ffaa00", "#ff0044"];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🛡️ Cyber AI Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <p className="welcome">
        Welcome, <span>{user?.name}</span>
      </p>

      {/* ======================
          VISUALIZATIONS
      ====================== */}

      <div className="charts-grid">

        {/* 🔐 Cyber Attacks */}
        <div className="chart-card">
          <h3>Cyber Attacks Detected</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attackData}>
              <XAxis dataKey="name" stroke="#00ffff" />
              <YAxis stroke="#00ffff" />
              <Tooltip />
              <Bar dataKey="count" fill="#00ffff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🤖 ML Accuracy */}
        <div className="chart-card">
          <h3>ML Model Accuracy (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyData}>
              <XAxis dataKey="epoch" stroke="#00ffff" />
              <YAxis stroke="#00ffff" />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#00ff99" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🚨 Threat Distribution */}
        <div className="chart-card">
          <h3>Threat Severity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={threatPie}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {threatPie.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

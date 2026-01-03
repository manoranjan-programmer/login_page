import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = document.getElementById("matrix-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "01AISECURITYML0123456789".split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ffff";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login");
        setIsLoading(false);
        return;
      }

      // ✅ Save user session
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <canvas id="matrix-bg" className="matrix-bg"></canvas>

      <div className="login-container">
        <div className="login-card">
          <h1 className="title">Secure AI Access</h1>
          <p className="subtitle">Machine Learning • Cyber Security</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="login-btn" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Login"}
            </button>
          </form>

          <div className="login-links">
            <Link to="/signup" className="link">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

export default function Signup() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;


  const [name, setName] = useState(""); // ✅ ADD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,      // ✅ SEND NAME
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      navigate("/"); // go to login
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          <div className="logo">
            <h1 className="title">Create Account</h1>
            <p className="subtitle">Secure access to Cyber AI Platform</p>
          </div>

          <form className="login-form" onSubmit={handleSignup}>

            {/* ✅ NAME FIELD */}
            <div className="input-group">
              <input
                type="text"
                required
                placeholder=" "
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                required
                placeholder=" "
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                required
                placeholder=" "
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            {error && (
              <p style={{ color: "red", marginBottom: "12px" }}>
                {error}
              </p>
            )}

            <button className="login-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="login-links">
            <Link to="/" className="link">
              Already have an account? Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

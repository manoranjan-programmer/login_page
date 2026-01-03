import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

export default function Signup() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  /* ======================
     STATE
  ====================== */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ======================
     SUBMIT HANDLER
  ====================== */
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!API_URL) {
      setError("API URL not configured");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        credentials: "include", // ✅ REQUIRED FOR CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Signup failed");
        return;
      }

      navigate("/"); // redirect to login
    } catch (err) {
      console.error("Signup error:", err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">

          <div className="logo">
            <h1 className="title">Create Account</h1>
            <p className="subtitle">Secure access to Cyber AI Platform</p>
          </div>

          <form className="login-form" onSubmit={handleSignup}>

            {/* NAME */}
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

            {/* EMAIL */}
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

            {/* PASSWORD */}
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

            {/* ERROR */}
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

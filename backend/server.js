const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

/* ======================
   LOAD ENV
====================== */
dotenv.config();

const app = express();

/* ======================
   DB CONNECTION
====================== */
connectDB();

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());

app.use(
  cors({
    origin: process.env.API_URL, // frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ❌ DO NOT ADD app.options() IN NODE 22 */
/* CORS middleware already handles preflight */

/* ======================
   ROUTES
====================== */
app.use("/api/auth", require("./routes/authRoutes"));

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

/* ======================
   SAFE 404 (NO WILDCARDS)
====================== */
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

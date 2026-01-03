const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

/* ======================
   LOAD ENV FIRST
====================== */
dotenv.config();

const app = express();

/* ======================
   DB CONNECTION
====================== */
connectDB();

/* ======================
   MIDDLEWARE (ORDER MATTERS)
====================== */
app.use(express.json());

app.use(
  cors({
    origin: process.env.API_URL, // ✅ FRONTEND URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

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
   SAFE 404
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

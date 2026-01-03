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
   MIDDLEWARE
====================== */
app.use(express.json());

app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* ======================
   ROUTES
====================== */
app.use("/api/auth", require("./routes/authRoutes"));

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

/* ======================
   SAFE 404 (Node 22 FIX)
====================== */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

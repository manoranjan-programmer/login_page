const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

/* ======================
   DATABASE CONNECTION
====================== */
connectDB();

/* ======================
   MIDDLEWARE
====================== */
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json()); // 👈 REQUIRED for req.body

/* ======================
   ROUTES
====================== */
app.use("/api/auth", require("./routes/authRoutes"));

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

// connect db
connectDB();

// health route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

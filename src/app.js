const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");

const app = express();   

app.use(cors());        
app.use(express.json());

// connect db
connectDB();

// routes
app.use("/tasks", taskRoutes);

// health route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const logger = require("./middleware/logger.js");
const studentRoutes = require("./routes/studentRoutes.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware (parses incoming JSON payloads)
app.use(express.json());

// Apply Custom Logger Middleware globally
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management API! Use /students endpoint.");
});

// Modular student routes
app.use("/students", studentRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
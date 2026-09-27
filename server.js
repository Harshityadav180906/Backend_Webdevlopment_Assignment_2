const express = require("express");
const studentRoutes = require("./routes/studentRoutes.js");

const app = express();
const PORT = process.env.PORT || 5000;

// IMPORTANT: Must be placed BEFORE app.use("/students", ...)
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Student routes
app.use("/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
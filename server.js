const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const authRoutes = require("./routes/authRoutes")
const googleRoutes = require("./routes/googleRoutes")
const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(30000);
  res.setTimeout(30000);
  next();
});

const PORT = process.env.PORT

// Routes MUST come before error handlers
app.use("/api/auth", authRoutes)
app.use("/api/google", googleRoutes)

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" })
})

// Error handling middleware MUST be AFTER all routes
app.use((err, req, res, next) => {
  if (err.type === 'request.aborted') {
    console.log('⚠️ Client aborted request');
    return;
  }
  
  console.error('❌ Auth Service Error:', err);
  if (!res.headersSent) {
    res.status(500).json({ 
      success: false,
      message: err.message || 'Internal server error' 
    });
  }
});

app.listen(PORT, () => {
    console.log("auth port is running on port 3000 ")
})
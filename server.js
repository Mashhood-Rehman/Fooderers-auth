const express = require("express")

const dotenv = require("dotenv")
dotenv.config()
const authRoutes = require("./routes/authRoutes")
const googleRoutes = require("./routes/googleRoutes")
const app = express()
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/api/google", googleRoutes)
app.get("/", (req, res) => {
    res.send(`
        <h1>OAuth Test</h1>
        <a href="/api/google/auth">Login with Google</a>
    `);
});

app.listen(3000, () => {
    console.log("port is running on port 3000 ")
})
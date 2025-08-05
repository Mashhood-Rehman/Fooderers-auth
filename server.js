const express = require("express")

const dotenv = require("dotenv")
dotenv.config()
const authRoutes = require("./routes/authRoutes")
const googleRoutes = require("./routes/googleRoutes")
const app = express()
app.use(express.json())
const PORT = process.env.PORT
app.use("/api/auth", authRoutes)
app.use("/api/google", googleRoutes)

app.listen(PORT, () => {
    console.log("port is running on port 3000 ")
})
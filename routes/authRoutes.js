const express = require("express")
const { Login, Signup } = require("../controllers/authController")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/login", Login)
router.post("/signup", (req, res, next) => {
    console.log("🟢 /signup route hit");
    console.log("Body:", req.body);
    Signup(req, res, next);
})

module.exports = router
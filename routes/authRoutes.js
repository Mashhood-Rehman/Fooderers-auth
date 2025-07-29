const exress = require("express")
const { Login, Signup } = require("../controllers/authController")
const router = exress.Router()

router.get("/login", Login)
router.post("/signup", Signup)

module.exports = router
const exress = require("express")
const { Login, Signup } = require("../controllers/authController")
const { protect } = require("../middleware/authMiddleware")
const router = exress.Router()

router.get("/login",protect ,  Login)
router.post("/signup", Signup)

module.exports = router
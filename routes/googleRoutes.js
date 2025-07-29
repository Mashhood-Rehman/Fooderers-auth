    const express = require("express")
    const {redirectToGoogle , googleCallbackController} = require("../controllers/googleController")
    const router = express.Router()
    router.get("/" , redirectToGoogle)
    router.get("/callback" , googleCallbackController)

    module.exports = router
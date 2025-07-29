    const express = require("express")
    const { createUser, getAllUsers, updateUserById, deleteUserById } = require("../controllers/userController")
    const router = express.Router()


    router.post("/createUser", createUser)
    router.get("/getAllUsers", getAllUsers)
    router.patch("/updateuserbyid/:id", updateUserById)
    router.delete("/deleteUserById/:id", deleteUserById)
    

    module.exports = router
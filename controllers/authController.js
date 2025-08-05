const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const checkUser = await prisma.user.findUnique({ where: { email } })
        if (!checkUser) {
            return res.status(400).json({ message: "User not found" })
        }
        const comparePassword = await bcrypt.compare(password, checkUser.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign(
            { id: checkUser.id, email: checkUser.email ,role : checkUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(200).json({ message: "User logged in successfully" ,   token,
 })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}


const Signup = async (req, res) => {
    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const checkUser = await prisma.user.findUnique({ where: { email } })
        if (checkUser) {
            return res.status(409).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        return res.status(201).json({ message: "User created succesfully", newUser })
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { Login, Signup }
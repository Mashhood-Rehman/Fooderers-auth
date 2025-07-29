const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        console.log("Incoming req.body:", req.body)
        const cjeckUser = await prisma.user.findUnique({
            where: { email }
        });

        if (cjeckUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("Hashed password:", hashedPassword);

        const newUser = await prisma.user.create({
            data: { email, name, password: hashedPassword }
        });
        return res.status(200).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.log("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const getUsers = await prisma.user.findMany()
        return res.status(200).json({ message: "All users fetched successfully", getUsers })
    } catch (error) {
        console.log("error", error)
        return res.status(400).json({ message: "error", error })
    }

}


const updateUserById = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const getUser = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });

        if (!getUser) {
            return res.status(404).json({ message: "No user found" }); // Changed to 404
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: data

        })

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });




    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user", error });
    }
}

const deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await prisma.user.delete({ where: { id: parseInt(id) } })
        if(!deleteUser) {
            return res.status(400).json({message : "User not found"})
        }
        return res.status(200).json({message: "User deleted successfully" , deleteUser})
    } catch (error) {
console.log(error.message)
return res.status(500).json({message:"errror deleting user" , error:error.message})
    }
}


module.exports = { createUser, getAllUsers, updateUserById , deleteUserById };

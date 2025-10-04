const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testConnection() {
    try {
        console.log("Testing database connection...");
        const result = await prisma.$queryRaw`SELECT 1`;
        console.log("✅ Database connected successfully");
        await prisma.$disconnect();
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
}

testConnection();
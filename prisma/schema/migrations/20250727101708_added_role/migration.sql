-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superadmin', 'manager', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';

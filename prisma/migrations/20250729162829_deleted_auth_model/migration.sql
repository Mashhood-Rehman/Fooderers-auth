-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superadmin', 'manager', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImg" TEXT DEFAULT 'dummyImage.webp',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';

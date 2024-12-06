/*
  Warnings:

  - You are about to drop the column `Email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `FotoProfil` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Nama` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_Email_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "Email",
DROP COLUMN "FotoProfil",
DROP COLUMN "Nama",
DROP COLUMN "Password",
DROP COLUMN "Status",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fotoProfil" TEXT,
ADD COLUMN     "nama" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

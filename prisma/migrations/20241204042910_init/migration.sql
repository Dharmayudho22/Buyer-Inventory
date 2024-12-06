/*
  Warnings:

  - Added the required column `Password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "Password" TEXT NOT NULL,
ALTER COLUMN "Email" DROP NOT NULL,
ALTER COLUMN "Status" DROP NOT NULL;

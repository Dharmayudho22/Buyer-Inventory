/*
  Warnings:

  - Made the column `Email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "Nama" DROP NOT NULL,
ALTER COLUMN "Email" SET NOT NULL;

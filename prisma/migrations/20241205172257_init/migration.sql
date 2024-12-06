/*
  Warnings:

  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "barang" ADD COLUMN     "deskripsi" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "status",
ADD COLUMN     "deskripsi" TEXT;

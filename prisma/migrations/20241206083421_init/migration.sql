-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Diterima', 'Ditolak');

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "barangId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "nama" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "fotoProfil" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

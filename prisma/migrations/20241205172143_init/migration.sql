-- CreateTable
CREATE TABLE "barang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlah" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "barang_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "barang" ADD CONSTRAINT "barang_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

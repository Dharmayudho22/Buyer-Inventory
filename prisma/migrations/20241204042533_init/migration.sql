-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(10) NOT NULL,
    "Nama" VARCHAR(50) NOT NULL,
    "Email" VARCHAR(50) NOT NULL,
    "Status" SMALLINT NOT NULL,
    "FotoProfil" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");

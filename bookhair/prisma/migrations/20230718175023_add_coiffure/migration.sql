/*
  Warnings:

  - Added the required column `coupe_id` to the `ServiceDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Categorie" AS ENUM ('CHEVEUX', 'BARBE', 'VISAGE');

-- AlterTable
ALTER TABLE "ServiceDetails" ADD COLUMN     "coupe_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Coupe" (
    "id" TEXT NOT NULL,
    "categorie" "Categorie" NOT NULL,
    "name" TEXT NOT NULL,
    "sdId" TEXT NOT NULL,

    CONSTRAINT "Coupe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupe_sdId_key" ON "Coupe"("sdId");

-- AddForeignKey
ALTER TABLE "Coupe" ADD CONSTRAINT "Coupe_sdId_fkey" FOREIGN KEY ("sdId") REFERENCES "ServiceDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

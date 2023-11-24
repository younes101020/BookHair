/*
  Warnings:

  - You are about to drop the column `clientId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `Commentaire` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Commentaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Commentaire" DROP CONSTRAINT "Commentaire_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_clientId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "clientId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Commentaire" DROP COLUMN "client_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "client_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "clientId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentaire" ADD CONSTRAINT "Commentaire_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

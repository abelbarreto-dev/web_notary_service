/*
  Warnings:

  - You are about to drop the column `userId` on the `Notary` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notary" DROP CONSTRAINT "Notary_userId_fkey";

-- AlterTable
ALTER TABLE "Notary" DROP COLUMN "userId";

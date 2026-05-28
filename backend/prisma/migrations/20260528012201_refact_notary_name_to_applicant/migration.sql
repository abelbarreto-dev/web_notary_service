/*
  Warnings:

  - You are about to drop the column `name` on the `Notary` table. All the data in the column will be lost.
  - Added the required column `applicant` to the `Notary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Notary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notary" DROP COLUMN "name",
ADD COLUMN     "applicant" VARCHAR(255) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notary" ADD CONSTRAINT "Notary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

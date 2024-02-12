/*
  Warnings:

  - You are about to drop the `UserTarget` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `targetId` to the `UserShot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTarget" DROP CONSTRAINT "UserTarget_targetId_fkey";

-- DropForeignKey
ALTER TABLE "UserTarget" DROP CONSTRAINT "UserTarget_userId_fkey";

-- AlterTable
ALTER TABLE "UserShot" ADD COLUMN     "targetId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserTarget";

-- AddForeignKey
ALTER TABLE "UserShot" ADD CONSTRAINT "UserShot_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

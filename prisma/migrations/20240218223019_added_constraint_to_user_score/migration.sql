/*
  Warnings:

  - A unique constraint covering the columns `[userId,shotId]` on the table `UserShot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserShot_userId_shotId_key" ON "UserShot"("userId", "shotId");

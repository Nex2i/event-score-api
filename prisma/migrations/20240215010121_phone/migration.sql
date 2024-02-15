/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserAuth` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserAuth" ADD COLUMN     "phoneNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_email_key" ON "UserAuth"("email");

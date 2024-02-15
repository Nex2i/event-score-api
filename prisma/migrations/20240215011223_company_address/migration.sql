/*
  Warnings:

  - A unique constraint covering the columns `[streetAddress1]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "streetAddress1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "streetAddress2" TEXT,
ADD COLUMN     "zip" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Company_streetAddress1_key" ON "Company"("streetAddress1");

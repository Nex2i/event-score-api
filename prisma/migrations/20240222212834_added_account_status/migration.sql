/*
  Warnings:

  - You are about to drop the column `isActive` on the `CompanyPayment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ONBOARDING', 'DELINQUENT');

-- AlterTable
ALTER TABLE "CompanyPayment" DROP COLUMN "isActive",
ADD COLUMN     "accountStatus" "AccountStatus" NOT NULL DEFAULT 'ONBOARDING';

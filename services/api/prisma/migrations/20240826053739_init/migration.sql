/*
  Warnings:

  - You are about to drop the column `endDatetime` on the `UserStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserStatus" DROP COLUMN "endDatetime",
ADD COLUMN     "endTime" TEXT;

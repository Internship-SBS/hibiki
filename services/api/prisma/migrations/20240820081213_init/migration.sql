/*
  Warnings:

  - Added the required column `bgColor` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "bgColor" TEXT NOT NULL,
ADD COLUMN     "textColor" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `cover` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `cover`,
    ADD COLUMN `image` VARCHAR(191) NULL;

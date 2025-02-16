/*
  Warnings:

  - You are about to drop the column `quantity` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `quantity`,
    ADD COLUMN `current_qty` INTEGER NOT NULL DEFAULT 0;

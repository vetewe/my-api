/*
  Warnings:

  - You are about to drop the column `username` on the `admins` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `admins_username_key` ON `admins`;

-- AlterTable
ALTER TABLE `admins` DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(75) NOT NULL,
    ADD COLUMN `name` VARCHAR(50) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `admins_email_key` ON `admins`(`email`);

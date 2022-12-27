/*
  Warnings:

  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatar` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slack_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_user_id_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar` VARCHAR(1024) NOT NULL,
    ADD COLUMN `name` VARCHAR(256) NOT NULL,
    ADD COLUMN `slack_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `profiles`;

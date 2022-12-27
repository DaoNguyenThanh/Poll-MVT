/*
  Warnings:

  - You are about to drop the column `userId` on the `polls` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `polls` DROP FOREIGN KEY `polls_userId_fkey`;

-- AlterTable
ALTER TABLE `polls` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `polls` ADD CONSTRAINT `polls_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `userId` on the `answers` table. All the data in the column will be lost.
  - Made the column `answer_id` on table `results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `results` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `results` DROP FOREIGN KEY `results_answer_id_fkey`;

-- DropForeignKey
ALTER TABLE `results` DROP FOREIGN KEY `results_user_id_fkey`;

-- AlterTable
ALTER TABLE `answers` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `results` MODIFY `answer_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `answers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

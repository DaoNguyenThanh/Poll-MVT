/*
  Warnings:

  - You are about to drop the column `questions_id` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `answers_id` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `results` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_questions_id_fkey`;

-- DropForeignKey
ALTER TABLE `results` DROP FOREIGN KEY `results_answers_id_fkey`;

-- DropForeignKey
ALTER TABLE `results` DROP FOREIGN KEY `results_users_id_fkey`;

-- AlterTable
ALTER TABLE `answers` DROP COLUMN `questions_id`,
    ADD COLUMN `question_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `results` DROP COLUMN `answers_id`,
    DROP COLUMN `users_id`,
    ADD COLUMN `answer_id` INTEGER NULL,
    ADD COLUMN `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `results` ADD CONSTRAINT `results_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `answers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

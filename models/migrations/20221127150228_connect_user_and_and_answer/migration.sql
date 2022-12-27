-- AlterTable
ALTER TABLE `answers` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

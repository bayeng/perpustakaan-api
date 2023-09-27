/*
  Warnings:

  - You are about to drop the column `authorId` on the `BookLoan` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BookLoan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BookLoan` DROP FOREIGN KEY `BookLoan_authorId_fkey`;

-- AlterTable
ALTER TABLE `BookLoan` DROP COLUMN `authorId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BookLoan` ADD CONSTRAINT `BookLoan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `userId` on the `BookLoan` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `BookLoan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BookLoan` DROP FOREIGN KEY `BookLoan_userId_fkey`;

-- AlterTable
ALTER TABLE `BookLoan` DROP COLUMN `userId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BookLoan` ADD CONSTRAINT `BookLoan_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookLoan` ADD CONSTRAINT `BookLoan_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

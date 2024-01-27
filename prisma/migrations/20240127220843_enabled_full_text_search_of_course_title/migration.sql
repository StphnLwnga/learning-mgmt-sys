-- AlterTable
ALTER TABLE `attachment` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `category` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE FULLTEXT INDEX `Course_title_idx` ON `Course`(`title`);

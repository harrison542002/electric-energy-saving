-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_current_hidp_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `current_hidp` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_current_hidp_fkey` FOREIGN KEY (`current_hidp`) REFERENCES `Household`(`hidp`) ON DELETE SET NULL ON UPDATE CASCADE;

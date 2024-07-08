/*
  Warnings:

  - You are about to alter the column `status` on the `reward` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `reward` MODIFY `status` ENUM('PENDING', 'EXPIRED', 'CLAIMED') NOT NULL DEFAULT 'PENDING';
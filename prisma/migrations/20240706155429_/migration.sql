/*
  Warnings:

  - Added the required column `granted_date` to the `RankReward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rankPlace` to the `RankReward` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rankreward` ADD COLUMN `granted_date` DATETIME(3) NOT NULL,
    ADD COLUMN `rankPlace` INTEGER NOT NULL;

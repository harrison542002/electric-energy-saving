/*
  Warnings:

  - You are about to drop the column `size_in_square_foot` on the `household` table. All the data in the column will be lost.
  - You are about to drop the column `amount_kWh` on the `monthlyusage` table. All the data in the column will be lost.
  - You are about to drop the column `bill` on the `monthlyusage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `household` DROP COLUMN `size_in_square_foot`;

-- AlterTable
ALTER TABLE `monthlyusage` DROP COLUMN `amount_kWh`,
    DROP COLUMN `bill`,
    ADD COLUMN `electric_kWh` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `gas_kWh` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `total_energy_bill` DOUBLE NOT NULL DEFAULT 0;

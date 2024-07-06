-- CreateTable
CREATE TABLE `User` (
    `identity_number` VARCHAR(191) NOT NULL,
    `username` VARCHAR(200) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `current_hidp` VARCHAR(191) NOT NULL,
    `type` ENUM('LANDLORD', 'TENANT') NOT NULL,

    UNIQUE INDEX `User_identity_number_key`(`identity_number`),
    PRIMARY KEY (`identity_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Household` (
    `hidp` VARCHAR(191) NOT NULL,
    `number_of_occupants` INTEGER NOT NULL DEFAULT 0,
    `size_in_square_foot` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`hidp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonthlyUsage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount_kWh` INTEGER NOT NULL DEFAULT 0,
    `bill` INTEGER NOT NULL DEFAULT 0,
    `household_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PENING', 'EXPIRED', 'CLAIMED') NOT NULL DEFAULT 'PENING',
    `expired_date` DATETIME(3) NOT NULL,
    `monthly_usage_id` INTEGER NOT NULL,
    `total_saving` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RankReward` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_current_hidp_fkey` FOREIGN KEY (`current_hidp`) REFERENCES `Household`(`hidp`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonthlyUsage` ADD CONSTRAINT `MonthlyUsage_household_id_fkey` FOREIGN KEY (`household_id`) REFERENCES `Household`(`hidp`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reward` ADD CONSTRAINT `Reward_monthly_usage_id_fkey` FOREIGN KEY (`monthly_usage_id`) REFERENCES `MonthlyUsage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

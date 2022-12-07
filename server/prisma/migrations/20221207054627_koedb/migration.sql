-- AlterTable
ALTER TABLE `orderdetail` ADD COLUMN `cuponId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Cupon` (
    `id` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descuento` DOUBLE NOT NULL,
    `idOrderDetail` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_cuponId_fkey` FOREIGN KEY (`cuponId`) REFERENCES `Cupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL,
    `userType` ENUM('ADMIN', 'USER', 'WAITER') NOT NULL DEFAULT 'USER',
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `idRestaurant` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TableReservation` (
    `idRestaurantTable` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `reservationDate` DATETIME(3) NOT NULL,
    `idWaiter` INTEGER NOT NULL,

    PRIMARY KEY (`idRestaurantTable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantTable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `state` ENUM('FREE', 'NOTFREE', 'RESERVED', 'ORDERREGISTERED', 'BYPAY', 'INACTIVE') NOT NULL,
    `idRestaurant` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ubication` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subTotal` DOUBLE NOT NULL,
    `iva` DOUBLE NOT NULL,
    `clientPaymentInCash` DOUBLE NOT NULL,
    `clientPaymentInCard` DOUBLE NOT NULL,
    `orderTotal` DOUBLE NOT NULL,
    `idUser` INTEGER NOT NULL,
    `idRestaurant` INTEGER NOT NULL,
    `idTable` INTEGER NOT NULL,
    `state` ENUM('REGISTERED', 'INPROCESS', 'PENDING', 'DELIVERED', 'TOPAY') NOT NULL,
    `paymentOption` ENUM('CASH', 'CARD', 'BOTH') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductToRestaurant` (
    `idRestaurant` INTEGER NOT NULL,
    `idProduct` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`idRestaurant`, `idProduct`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idOrder` INTEGER NOT NULL,
    `idProduct` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `ingredients` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `idCategory` INTEGER NOT NULL,
    `state` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_idRestaurant_fkey` FOREIGN KEY (`idRestaurant`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableReservation` ADD CONSTRAINT `TableReservation_idRestaurantTable_fkey` FOREIGN KEY (`idRestaurantTable`) REFERENCES `RestaurantTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableReservation` ADD CONSTRAINT `TableReservation_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableReservation` ADD CONSTRAINT `TableReservation_idWaiter_fkey` FOREIGN KEY (`idWaiter`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantTable` ADD CONSTRAINT `RestaurantTable_idRestaurant_fkey` FOREIGN KEY (`idRestaurant`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_idRestaurant_fkey` FOREIGN KEY (`idRestaurant`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_idTable_fkey` FOREIGN KEY (`idTable`) REFERENCES `RestaurantTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductToRestaurant` ADD CONSTRAINT `ProductToRestaurant_idRestaurant_fkey` FOREIGN KEY (`idRestaurant`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductToRestaurant` ADD CONSTRAINT `ProductToRestaurant_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_idOrder_fkey` FOREIGN KEY (`idOrder`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_idProduct_fkey` FOREIGN KEY (`idProduct`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_idCategory_fkey` FOREIGN KEY (`idCategory`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

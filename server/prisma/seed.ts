import { PrismaClient } from '@prisma/client';
import { order } from './seeds/order';
import { product } from './seeds/product';
import { productCategory } from './seeds/productCategory';
import { productToRestaurant } from './seeds/productToRestaurant';
import { restaurant } from './seeds/restaurant';
import { restaurantTable } from './seeds/restaurantTable';
import { user } from './seeds/user';
import { orderDetail } from './seeds/orderDetail';
const prisma = new PrismaClient();

async function main() {
    await prisma.restaurant.createMany({
        data: restaurant
    });
    await prisma.productCategory.createMany({
        data: productCategory
    });
    await prisma.product.createMany({
        data: product
    });
    await prisma.restaurantTable.createMany({
        data: restaurantTable
    });
    await prisma.productToRestaurant.createMany({
        data: productToRestaurant
    });
    await prisma.user.createMany({
        data: user
    });
    await prisma.order.createMany({
        data: order
    });
    await prisma.orderDetail.createMany({
        data: orderDetail
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    });
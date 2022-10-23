import { PrismaClient } from '@prisma/client';
import { product } from './seeds/product';
import { productCategory } from './seeds/productCategory';
import { restaurant } from './seeds/restaurant';
import { restaurantTable } from './seeds/restaurantTable';


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
    })
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    });
import { PrismaClient } from '@prisma/client';
import { order } from './seeds/order';
import { product } from './seeds/product';
import { productCategory } from './seeds/productCategory';
//import { productToRestaurant } from './seeds/productToRestaurant';
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
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Arroz con camarones',
            description: 'Rico arroz con camarones, acompañado con un sofrito de ajo delicioso',
            ingredients: 'Arroz,Camarones,Sofrito,Ajo,Cebolla,Tomate,Sal,Pimienta',
            price: 5000,
            idCategory: 1,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Arroz con kiwi',
            description: 'Delicioso arroz con kiwis, acompañado de un sofrito.',
            ingredients: 'Arroz,Kiwis,Cebollas,Sal,Pimienta',
            price: 4500,
            idCategory: 1,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Donburi',
            description: 'Exquisito arroz frito con caldo de verduras y carne de cerdo con salsa de soya al gusto.',
            ingredients: 'Pollo,Arroz,Cebollas,Salsa de soja,Dashi,Mirin,Huevos',
            price: 6000,
            idCategory: 1,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Maki',
            description: 'Delicioso sushi de rollo de pescado con verdura',
            ingredients: 'Arroz,Aguacate,Salmón,Lechuga,Algas',
            price: 6000,
            idCategory: 2,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Futomaki',
            description: 'Rollo grueso de sushi, con un grosor de 2cm y 3cm más 4cm o 5cm de largo.',
            ingredients: 'Algas,Cebolla,Bambú,Arroz,Aguacate,Tomate,Frutas',
            price: 8000,
            idCategory: 2,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });

    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Kazari Sushi',
            description: 'Disfruta de nuestro sushi decordo de diferentes figuras',
            ingredients: 'Arroz,Aguacate,Salmmón,Algas,Tempura,Bambú',
            price: 8000,
            idCategory: 2,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Hakata Ramen',
            description: 'Delicioso caldo de cerdo',
            ingredients: 'Fideos,Maíz,Bambú,Sopa miso,Huevos,Cerdo,Chasu,Cebolla,Setas',
            price: 10000,
            idCategory: 3,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Kioto Ramen',
            description: 'Exquisito caldo de pollo',
            ingredients: 'Judías,Pollo,Fideos,Cebollas,Hongos',
            price: 12000,
            idCategory: 3,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Sapporo ramen',
            description: 'Sopa con fideos gruesos más una carne a elegir',
            ingredients: 'Fideos gruesos,Cerdo-Pescado-Pollo,Sopa miso,Chasu,Huevos,Jengibre,Maíz',
            price: 8500,
            idCategory: 3,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Ochazuke',
            description: 'Arroz empapado en té verde',
            ingredients: 'Té verde,Arroz,Algas nori,Salmón,Ciruelas',
            price: 10000,
            idCategory: 5,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Tsukemono',
            description: 'Encurtido con base en distintos vegetales o jengibre ',
            ingredients: 'Sopa miso,Arroz,Curry,Vinagre,Sake,Jengibre',
            price: 12000,
            idCategory: 5,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Tonkatsu',
            description: 'Chuleta de cerdo troceada y empanizada',
            ingredients: 'Cerdo,Cebolla,Ajo',
            price: 9500,
            idCategory: 5,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Horchata',
            description: 'Horchata',
            ingredients: 'Horchata',
            price: 900,
            idCategory: 6,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Fresco de jamaica',
            description: 'Fresco de jamaica',
            ingredients: 'Fresco de jamaica',
            price: 2500,
            idCategory: 6,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
            }
        }
    });
    await prisma.product.create({
        //Instancia de videojuego 1
        data: {
            name: 'Hierbabuena',
            description: 'Hierbabuena',
            ingredients: 'Hierbabuena',
            price: 1300,
            idCategory: 6,
            state: true,
            restaurants: {
                connect: [{ id: 1 }, { id: 2 }]
            }
        }
    });
    await prisma.restaurantTable.createMany({
        data: restaurantTable
    });
    await prisma.user.createMany({
        data: user
    });
    await prisma.orden.createMany({
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
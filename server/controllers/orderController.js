const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const orders = await prisma.order.findMany({
        orderBy: {
            date: 'asc',
        },
        include: {
            orderUser: true,
            orderWaiter: true,
            orderRestaurant: true,
            orderTable: true,
            OrderDetail: true
        }
    });
    response.json(orders);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const order = await prisma.order.findUnique({
        where: { id: id },
        include: {
            orderUser: true,
            orderWaiter: true,
            orderRestaurant: true,
            orderTable: true,
            OrderDetail: true
        }
    });
    response.json(order);
};

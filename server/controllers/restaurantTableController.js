const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const restaurantTables = await prisma.restaurantTable.findMany({
        orderBy: {
            id: 'asc',
        },
        include: {
            restaurantRestaurantTable: true
        },
    });
    response.json(restaurantTables);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const restaurantTable = await prisma.restaurantTable.findUnique({
        where: { id: id },
        include: {
            restaurantRestaurantTable: true
        },
    });
    response.json(restaurantTable);
};

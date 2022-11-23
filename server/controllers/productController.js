const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const products = await prisma.product.findMany({
        orderBy: {
            name: 'asc',
        },
        include: {
            restaurants: true,
            productToRestaurantProduct: {
                select: {
                    description: true,
                    id: true,
                }
            }
        }
    });
    response.json(products);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const productbyid = await prisma.product.findUnique({
        where: { id: id },
        include: {
            restaurants: true,
            productToRestaurantProduct: {
                select: {
                    description: true,
                    id: true,
                }
            }
        },
    });
    response.json(productbyid);
};

//Crear un videojuego
module.exports.create = async (request, response, next) => {
    let product = request.body;
    const newProduct = await prisma.product.create({
        data: {
            name: product.name,
            description: product.description,
            ingredients: product.ingredients,
            price: product.price,
            idCategory: product.idCategory,
            state: product.state,
            restaurants: { connect: product.restaurants }
        },
    });
    response.json(newProduct);
};

//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
    let product = request.body;
    let idProduct = parseInt(request.params.id);
    //Obtener videojuego viejo
    const productOld = await prisma.product.findUnique({
        where: { id: idProduct },
        include: {
            restaurants: { select: { id: true } },
            productToRestaurantProduct: {
                select: {
                    description: true,
                    id: true,
                }
            }
        },
    });

    const newProduct = await prisma.product.update({
        where: {
            id: idProduct,
        },
        data: {
            name: product.name,
            description: product.description,
            ingredients: product.ingredients,
            price: product.price,
            idCategory: product.idCategory,
            state: product.state,
            restaurants: { disconnect: productOld.restaurants, connect: product.restaurants }
        },
    });
    response.json(newProduct);
};
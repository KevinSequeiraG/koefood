const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
    const productsCategory = await prisma.productCategory.findMany();
    response.json(productsCategory);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const productCategoryByID = await prisma.productCategory.findUnique({
        where: { id: id },

    });
    response.json(productCategoryByID);
};

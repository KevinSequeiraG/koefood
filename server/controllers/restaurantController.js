const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      name: "asc",
    },
  });
  response.json(restaurants);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: id,
    }
  });
  response.json(restaurant);
};


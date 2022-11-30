const { PrismaClient, TABLESTATE } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const restaurantTables = await prisma.restaurantTable.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      restaurantRestaurantTable: true,
    },
  });
  response.json(restaurantTables);
};

//Obtener por restaurante
module.exports.getByRestaurant = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const restaurantTables = await prisma.restaurantTable.findMany({
    orderBy: {
      id: "asc",
    },
    where: { idRestaurant: id },
    include: {
      restaurantRestaurantTable: true,
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
      restaurantRestaurantTable: true,
    },
  });
  response.json(restaurantTable);
};

//Obtener cuántos hay
// module.exports.get = async (request, response, next) => {
//     const restaurantTablesCount = await prisma.restaurantTable.count();
//     response.json(restaurantTablesCount);
// };

//Crear una mesa
module.exports.create = async (request, response, next) => {
  let restaurantTable = request.body;
  const newRestaurantTable = await prisma.restaurantTable.create({
    data: {
      code: restaurantTable.code,
      capacity: restaurantTable.capacity,
      state: restaurantTable.state,
      idRestaurant: restaurantTable.idRestaurant,
    },
  });
  response.json(newRestaurantTable);
};

//Actualizar una mesa
module.exports.update = async (request, response, next) => {
  let restaurantTable = request.body;
  let idRestaurantTable = parseInt(request.params.id);
  //Obtener videojuego viejo
  // const restaurantTableViejo = await prisma.restaurantTable.findUnique({
  //     where: { id: idRestaurantTable }
  // });

  const newRestaurantTable = await prisma.restaurantTable.update({
    where: {
      id: idRestaurantTable,
    },
    data: {
      code: restaurantTable.code,
      capacity: restaurantTable.capacity,
      state: restaurantTable.state,
      idRestaurant: restaurantTable.idRestaurant,
    },
  });
  response.json(newRestaurantTable);
};

//Actualizar una mesa
module.exports.updateStateNotFree = async (request, response, next) => {  
  let idRestaurantTable = parseInt(request.body);
  //Obtener videojuego viejo
  // const restaurantTableViejo = await prisma.restaurantTable.findUnique({
  //     where: { id: idRestaurantTable }
  // });
  console.log(idRestaurantTable);
  const newRestaurantTable = await prisma.restaurantTable.update({
    where: {
      id: idRestaurantTable,
    },
    data: {
      state: TABLESTATE.NOTFREE,
    },
  });
  response.json(newRestaurantTable);
};

//Actualizar una mesa
module.exports.updateStateFree = async (request, response, next) => {  
  let idRestaurantTable = parseInt(request.body);
  console.log(idRestaurantTable);
  //Obtener videojuego viejo
  // const restaurantTableViejo = await prisma.restaurantTable.findUnique({
  //     where: { id: idRestaurantTable }
  // });

  const newRestaurantTable = await prisma.restaurantTable.update({
    where: {
      id: idRestaurantTable,
    },
    data: {
      state: TABLESTATE.FREE,
    },
  });
  response.json(newRestaurantTable);
};

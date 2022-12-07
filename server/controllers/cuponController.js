const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const cupon = await prisma.cupon.findMany({
    orderBy: {
      nombre: "asc",
    },
    include: {
      OrderDetail: { include: { OrderDetailProduct: true } },
    },
  });
  response.json(cupon);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const cupon = await prisma.cupon.findUnique({
    where: { id: id },
    include: {
      OrderDetail: { include: { OrderDetailProduct: true } },
    },
  });
  response.json(cupon);
};

//Método para crear ordenes
module.exports.create = async (req, res, next) => {
  let infoCupon = req.body;

  const newCupon = await prisma.cupon.create({
    data: {
      nombre: infoCupon.nombre,
      descuento: infoCupon.descuento,
      OrderDetail: {
        createMany: {
          data: infoCupon.OrderDetail,
        },
      },
    },
  });
  res.json(newCupon);
};

// //Método para update ordenes
// module.exports.update = async (req, res, next) => {
//   let infoCupon = req.body;

//   const newCupon = await prisma.cupon.update({
//     data: {
//       nombre: infoCupon.nombre,
//       descuento: infoCupon.descuento,
//       OrderDetail: {
//         createMany: {
//           data: infoCupon.OrderDetail,
//         },
//       },
//     },
//   });
//   res.json(newCupon);
// };

//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
  let infoCupon = request.body;
  let idCupon = parseInt(request.params.id);
  //Obtener videojuego viejo
  const cuponOld = await prisma.cupon.findUnique({
    where: { id: idCupon },
    include: {
      OrderDetail: true,
    },
  });

  const newCupon = await prisma.cupon.update({
    where: {
      id: idCupon,
    },
    data: {
      nombre: infoCupon.nombre,
      descuento: infoCupon.descuento,
      OrderDetail: {
        disconnect: cuponOld.OrderDetail,
        connect: infoCupon.OrderDetail,
      },
    },
  });
  response.json(newCupon);
};

module.exports.delete = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const cupon = await prisma.cupon.delete({
    where: { id: id },
  });
  response.json(cupon);
};
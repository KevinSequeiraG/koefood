const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const orders = await prisma.order.findMany({
    orderBy: {
      date: "asc",
    },
    include: {
      orderUser: true,
      orderWaiter: true,
      orderRestaurant: true,
      orderTable: true,
      OrderDetail: { include: { OrderDetailProduct: true } },
    },
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
      OrderDetail: { include: { OrderDetailProduct: true } },
    },
  });
  response.json(order);
};

//Método para crear ordenes
module.exports.create = async (req, res, next) => {
  let infoOrden = req.body;

  const newOrder = await prisma.order.create({
    data: {
      subTotal: infoOrden.subTotal,
      iva: infoOrden.iva,
      clientPaymentInCash: infoOrden.clientPaymentInCash,
      clientPaymentInCard: infoOrden.clientPaymentInCard,
      orderTotal: infoOrden.orderTotal,
      orderUser: {
        connect: { id: infoOrden.idUser },
      },
      orderWaiter: { connect: { id: infoOrden.idWaiter }, },
      orderRestaurant: { connect: { id: infoOrden.idRestaurant }, },
      orderTable: { connect: { id: infoOrden.idTable }, },
      state: infoOrden.state,
      paymentOption: infoOrden.paymentOption,

      OrderDetail: {
        createMany: {
          data: infoOrden.OrderDetail,
        },
      },
    },
  });
  res.json(newOrder);
};

const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const orders = await prisma.orden.findMany({
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
  const order = await prisma.orden.findUnique({
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

  const newOrder = await prisma.orden.create({
    data: {
      subTotal: infoOrden.subTotal,
      iva: infoOrden.iva,
      clientPaymentInCash: infoOrden.clientPaymentInCash,
      clientPaymentInCard: infoOrden.clientPaymentInCard,
      orderTotal: infoOrden.orderTotal,
      orderUser: {
        connect: { id: infoOrden.idUser },
      },
      orderWaiter: { connect: { id: infoOrden.idWaiter } },
      orderRestaurant: { connect: { id: infoOrden.idRestaurant } },
      orderTable: { connect: { id: infoOrden.idTable } },
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

//Método para crear ordenes desde usuario
module.exports.createByUser = async (req, res, next) => {
  let infoOrden = req.body;
  console.log(infoOrden);
  const newOrder = await prisma.orden.create({
    data: {
      subTotal: infoOrden.subTotal,
      iva: infoOrden.iva,
      clientPaymentInCash: infoOrden.clientPaymentInCash,
      clientPaymentInCard: infoOrden.clientPaymentInCard,
      orderTotal: infoOrden.orderTotal,
      orderUser: {
        connect: { id: infoOrden.idUser },
      },
      //orderWaiter: { connect: { id: infoOrden.idWaiter }, },
      orderRestaurant: { connect: { id: infoOrden.idRestaurant } },
      //orderTable: { connect: { id: infoOrden.idTable }, },
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

//Método para crear ordenes desde waiter
module.exports.createByWaiter = async (req, res, next) => {
  let infoOrden = req.body;
  console.log(infoOrden);
  const newOrder = await prisma.orden.create({
    data: {
      subTotal: infoOrden.subTotal,
      iva: infoOrden.iva,
      clientPaymentInCash: infoOrden.clientPaymentInCash,
      clientPaymentInCard: infoOrden.clientPaymentInCard,
      orderTotal: infoOrden.orderTotal,
      orderUser: {
        connect: { id: infoOrden.idUser },
      },
      //orderWaiter: { connect: { id: infoOrden.idWaiter }, },
      orderRestaurant: { connect: { id: infoOrden.idRestaurant } },
      orderTable: { connect: { id: infoOrden.idTable } },
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

//reportes
module.exports.getVentasPorFechas = async (request, response, next) => {
  let fechaIncial = request.params.fechaI.toString();
  let fechaFinal = request.params.fechaF.toString();
  console.log(fechaIncial, fechaFinal);
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT SUM(orderTotal) as Total FROM orden WHERE date BETWEEN ${fechaIncial} AND ${fechaFinal}`
  );
  response.json(result);
};

module.exports.getVentasPorFechasDefault = async (request, response, next) => {
  let fecha = new Date();

  console.log(fecha);
  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT SUM(orderTotal) as Total FROM orden WHERE YEAR(date) = ${fecha.getFullYear()} 
    AND MONTH(date)= ${fecha.getMonth() + 1} 
    AND DAY(date)= ${fecha.getDate()}`
  );
  response.json(result);
};

module.exports.getVentasPorFTipoPago = async (request, response, next) => {
  let fechaIncial = request.params.fechaI.toString();
  let fechaFinal = request.params.fechaF.toString();
  let tipoPago = request.params.tipoP.toString();
  if (tipoPago == "0") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE date BETWEEN ${fechaIncial} AND ${fechaFinal}  GROUP BY paymentOption`
    );
    response.json(result);
  } else if (tipoPago == "1") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE paymentOption = 'CASH' AND date BETWEEN ${fechaIncial} AND ${fechaFinal} GROUP BY paymentOption`
    );
    response.json(result);
  } else if (tipoPago == "2") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE paymentOption = 'CARD' AND date BETWEEN ${fechaIncial} AND ${fechaFinal} GROUP BY paymentOption`
    );
    response.json(result);
  } else if (tipoPago == "3") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE paymentOption = 'BOTH' AND date BETWEEN ${fechaIncial} AND ${fechaFinal} GROUP BY paymentOption`
    );
    response.json(result);
  }
};

module.exports.getVentasPorTipoDePagoDefault = async (
  request,
  response,
  next
) => {
  let fecha = new Date();
  let tipoPago = request.params.tipoP.toString();
  if (tipoPago == "0") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE YEAR(date) = ${fecha.getFullYear()} 
      AND MONTH(date) = ${fecha.getMonth() + 1} 
      AND DAY(date) = ${fecha.getDate()} GROUP BY paymentOption`
    );
    response.json(result);
  } else if (tipoPago == "1") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE paymentOption = 'CASH' AND YEAR(date) = ${fecha.getFullYear()} 
      AND MONTH(date)= ${fecha.getMonth() + 1} 
      AND DAY(date) = ${fecha.getDate()} GROUP BY paymentOption`
    );
    response.json(result);
  } else if (tipoPago == "2") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE paymentOption = 'CARD' AND YEAR(date) = ${fecha.getFullYear()} 
      AND MONTH(date)= ${fecha.getMonth() + 1} 
      AND DAY(date) = ${fecha.getDate()} GROUP BY paymentOption`
    );
    response.json(result);
  } else if (tipoPago == "3") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT SUM(orderTotal) as Total, paymentOption FROM orden WHERE paymentOption = 'BOTH' AND YEAR(date) = ${fecha.getFullYear()} 
      AND MONTH(date)= ${fecha.getMonth() + 1} 
      AND DAY(date) = ${fecha.getDate()} GROUP BY paymentOption`
    );
    response.json(result);
  }
};

module.exports.getVentasPorMultiple = async (request, response, next) => {
  let fechaIncial = request.params.fechaI.toString();
  let fechaFinal = request.params.fechaF.toString();
  let filtro = request.params.filtro.toString();
  if (filtro == "0") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT m.code as Codigo, SUM(o.orderTotal) as Total, r.name AS Caracteristica FROM orden o INNER JOIN restauranttable m ON o.idTable=m.id INNER JOIN restaurant r ON o.idRestaurant = r.id WHERE o.date BETWEEN ${fechaIncial} AND ${fechaFinal} GROUP BY m.code`
    );
    response.json(result);
  } else if (filtro == "1") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT  u.name as Caracteristica,u.id as Codigo, SUM(o.orderTotal) AS Total FROM orden o INNER JOIN user u ON o.idUser = u.id
      WHERE u.userType='WAITER' AND o.date BETWEEN ${fechaIncial} AND ${fechaFinal} GROUP BY u.id`
    );
    response.json(result);
  } else if (filtro == "2") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT p.id as Codigo, p.name as Caracteristica, SUM(o.orderTotal) AS Total FROM orden o INNER JOIN orderdetail d ON o.id= d.idOrder INNER JOIN product p On d.idProduct = p.id WHERE o.date BETWEEN ${fechaIncial} AND ${fechaFinal} GROUP BY p.id`
    );
    response.json(result);
  }
};

module.exports.getVentasPorMultipleDefault = async (
  request,
  response,
  next
) => {
  let filtro = request.params.filtro.toString();
  if (filtro == "0") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT m.code as Codigo, SUM(o.orderTotal) as Total, r.name AS Caracteristica FROM orden o INNER JOIN restauranttable m ON o.idTable=m.id INNER JOIN restaurant r ON o.idRestaurant = r.id GROUP BY m.code`
    );
    response.json(result);
  } else if (filtro == "1") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT  u.name as Caracteristica,u.id as Codigo, SUM(o.orderTotal) AS Total FROM orden o INNER JOIN user u ON o.idUser = u.id
      WHERE u.userType='WAITER' GROUP BY u.id`
    );
    response.json(result);
  } else if (filtro == "2") {
    const result = await prisma.$queryRaw(
      Prisma.sql`SELECT p.id as Codigo, p.name as Caracteristica, SUM(o.orderTotal) AS Total FROM orden o INNER JOIN orderdetail d ON o.id= d.idOrder INNER JOIN product p On d.idProduct = p.id GROUP BY p.id`
    );
    response.json(result);
  }
};

module.exports.getVentasPorMeseroDefault = async (request, response, next) => {
  let fecha = new Date();
  let idMesero = request.params.idMesero;

  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT  u.name as Caracteristica,u.id as Codigo, SUM(o.orderTotal) AS Total FROM orden o INNER JOIN user u ON o.idUser = u.id
      WHERE u.id=${idMesero} AND YEAR(o.date) = ${fecha.getFullYear()} 
      AND MONTH(o.date)= ${fecha.getMonth() + 1} 
      AND DAY(o.date) = ${fecha.getDate()}`
  );
  response.json(result);
};

module.exports.getVentasPorMesero = async (request, response, next) => {
  let fechaIncial = request.params.fechaI.toString();
  let fechaFinal = request.params.fechaF.toString();
  let idMesero = request.params.idMesero;

  const result = await prisma.$queryRaw(
    Prisma.sql`SELECT  u.name as Caracteristica, u.id as Codigo, SUM(o.orderTotal) AS Total FROM orden o INNER JOIN user u ON o.idUser = u.id
      WHERE u.id=${idMesero} AND o.date BETWEEN ${fechaIncial} AND ${fechaFinal}`
  );
  response.json(result);
};

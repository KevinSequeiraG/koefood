const { PrismaClient, PAYMENTTYPE } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listPaymentOption = [];
  for (let element in PAYMENTTYPE) {
    switch (element) {
      case PAYMENTTYPE.CARD:
        listPaymentOption.unshift({
          ["id"]: element,
          ["nombre"]: "Tarjeta",
        });
        break;
      case PAYMENTTYPE.CASH:
        listPaymentOption.unshift({
          ["id"]: element,
          ["nombre"]: "Efectivo",
        });
        break;
      case PAYMENTTYPE.BOTH:
        listPaymentOption.unshift({
          ["id"]: element,
          ["nombre"]: "Ámbos",
        });
        break;
      default:
        listPaymentOption.unshift({
          ["id"]: PAYMENTTYPE.CARD,
          ["nombre"]: "Tarjeta",
        });
        break;
    }
  }

  response.json(listPaymentOption);
};

module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (PAYMENTTYPE[id]) {
    case PAYMENTTYPE.CARD:
      nombre = "Tarjeta";
      break;
    case PAYMENTTYPE.CASH:
      nombre = "Efectivo";
      break;
    case PAYMENTTYPE.BOTH:
      nombre = "Ámbas";
      break;
    default:
      nombre = "Tarjeta";
      break;
  }
  let payOption = { ["id"]: PAYMENTTYPE[id], ["nombre"]: nombre };
  response.json(payOption);
};

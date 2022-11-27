const { PrismaClient, ORDERSTATE } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listOrderState = [];
  for (let element in ORDERSTATE) {
    switch (element) {
      case ORDERSTATE.REGISTERED:
        listOrderState.unshift({
          ["id"]: element,
          ["nombre"]: "Registrada",
        });
        break;
      //   case ORDERSTATE.INPROCESS:
      //     listOrderState.unshift({
      //       ["id"]: element,
      //       ["nombre"]: "En proceso",
      //     });
      //     break;
      //   case ORDERSTATE.PENDING:
      //     listOrderState.unshift({
      //       ["id"]: element,
      //       ["nombre"]: "Pendiente",
      //     });
      //     break;
      case ORDERSTATE.DELIVERED:
        listOrderState.unshift({
          ["id"]: element,
          ["nombre"]: "Enviada",
        });
        break;
      case ORDERSTATE.TOPAY:
        listOrderState.unshift({
          ["id"]: element,
          ["nombre"]: "Por pagar",
        });
        break;
      default:
        listOrderState.unshift({
          ["id"]: ORDERSTATE.REGISTERED,
          ["nombre"]: "Registrada",
        });
        break;
    }
  }

  response.json(listOrderState);
};

module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (ORDERSTATE[id]) {
    case ORDERSTATE.REGISTERED:
      nombre = "Registrada";
      break;
    case ORDERSTATE.TOPAY:
      nombre = "Por pagar";
      break;
    case ORDERSTATE.DELIVERED:
      nombre = "Enviada";
      break;
    default:
      nombre = "Registrada";
      break;
  }
  let payOption = { ["id"]: ORDERSTATE[id], ["nombre"]: nombre };
  response.json(payOption);
};

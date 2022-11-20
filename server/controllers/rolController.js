const { PrismaClient, USERTYPE } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listRoles = [];
  for (let element in USERTYPE) {
    switch (element) {
      case USERTYPE.ADMIN:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
      case USERTYPE.USER:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Usuario",
        });
        break;
      case USERTYPE.WAITER:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Mesero",
        });
        break;
      default:
        listRoles.unshift({ ["id"]: Role.USER, ["nombre"]: "Usuario" });
        break;
    }
  }

  response.json(listRoles);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (USERTYPE[id]) {
    case USERTYPE.ADMIN:
      nombre = "Administrador";
      break;
    case USERTYPE.USER:
      nombre = "Usuario";
      break;
    case USERTYPE.WAITER:
      nombre = "Meseo";
      break;
    default:
      nombre = "Usuario";
      break;
  }
  let rol = { ["id"]: USERTYPE[id], ["nombre"]: nombre };
  response.json(rol);
};

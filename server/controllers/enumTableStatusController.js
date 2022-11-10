const { PrismaClient, TABLESTATE } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    let listEstados = [];
    for (let element in TABLESTATE) {
        switch (element) {
            case TABLESTATE.FREE:
                listEstados.unshift({
                    ["id"]: element,
                    ["nombre"]: "Libre",
                });
                break;
            case TABLESTATE.NOTFREE:
                listEstados.unshift({
                    ["id"]: element,
                    ["nombre"]: "Ocupada",
                });
                break;
            case TABLESTATE.INACTIVE:
                listEstados.unshift({
                    ["id"]: element,
                    ["nombre"]: "Inactiva",
                });
                break;
            default:
                listEstados.unshift({ ["id"]: TABLESTATE.INACTIVE, ["nombre"]: "DESHABILITADO" });
                break;
        }
    }

    response.json(listEstados);
};
module.exports.getById = async (request, response, next) => {
    let id = request.params.id;
    let nombre = "";
    switch (TABLESTATE[id]) {
        case TABLESTATE.FREE:
            nombre = "HABILITADO";
            break;
        case TABLESTATE.NOTFREE:
            nombre = "OCUPADA";
            break;
        default:
            nombre = "DESHABILITADO";
            break;
    }
    let est = { ["id"]: TABLESTATE[id], ["nombre"]: nombre };
    response.json(est);
};
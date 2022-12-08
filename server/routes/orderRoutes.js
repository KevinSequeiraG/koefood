//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const orderController = require("../controllers/orderController");

//Definición de rutas para ordenes

router.post("/", auth.verifyToken, orderController.create);

router.post("/createByUser", auth.verifyToken, orderController.createByUser);

router.post(
  "/createByWaiter",
  auth.verifyToken,
  orderController.createByWaiter
);

router.get("/", auth.verifyToken, orderController.get);

router.get(
  "/vTotal/:fechaI/:fechaF",
  auth.grantRole(["ADMIN"]),
  orderController.getVentasPorFechas
);

router.get(
  "/vTotalDefault",
  auth.grantRole(["ADMIN"]),
  orderController.getVentasPorFechasDefault
);

router.get(
  "/vTotalTP/:fechaI/:fechaF/:tipoP",
  auth.grantRole(["ADMIN"]),
  orderController.getVentasPorFTipoPago
);

router.get(
  "/vTotalTPDefault/:tipoP",
  auth.grantRole(["ADMIN"]),
  orderController.getVentasPorTipoDePagoDefault
);

router.get(
  "/vTotalM/:fechaI/:fechaF/:filtro",
  auth.grantRole(["ADMIN"]),
  orderController.getVentasPorMultiple
);

router.get(
  "/vTotalMDefault/:filtro",
  auth.grantRole(["ADMIN"]),
  orderController.getVentasPorMultipleDefault
);

router.get(
  "/vTotalWaiterDefault/:idMesero",
  auth.grantRole(["WAITER"]),
  orderController.getVentasPorMeseroDefault
);
router.get(
  "/vTotalWaiter/:fechaI/:fechaF/:idMesero",
  auth.grantRole(["WAITER"]),
  orderController.getVentasPorMesero
);

router.get("/:id", auth.verifyToken, orderController.getById);

module.exports = router;

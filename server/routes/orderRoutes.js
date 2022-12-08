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

router.get("/:id", auth.verifyToken, orderController.getById);

module.exports = router;

//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const orderController = require("../controllers/orderController");

//Definición de rutas para ordenes

router.post("/", auth.grantRole(["ADMIN", "WAITER"]), orderController.create);

router.post(
  "/createByUser",
  auth.grantRole(["ADMIN", "WAITER", "USER"]),
  orderController.createByUser
);

router.get("/", auth.grantRole(["ADMIN", "WAITER"]), orderController.get);

router.get(
  "/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  orderController.getById
);

module.exports = router;

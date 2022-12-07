//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const cuponController = require("../controllers/cuponController");

//Definición de rutas para ordenes

router.post("/", auth.grantRole(["ADMIN", "WAITER"]), cuponController.create);

router.get("/", auth.grantRole(["ADMIN", "WAITER"]), cuponController.get);

router.get(
  "/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  cuponController.getById
);

router.put("/:id", auth.grantRole(["ADMIN"]), cuponController.update);

module.exports = router;
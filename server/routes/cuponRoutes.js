//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const cuponController = require("../controllers/cuponController");

//Definición de rutas para ordenes

router.post("/", auth.grantRole(["ADMIN"]), cuponController.create);

//router.get("/", auth.grantRole(["ADMIN", "WAITER", "USER"]), cuponController.get);
router.get("/", auth.verifyToken, cuponController.get);

router.get(
  "/byrestaurant/:id",
  auth.verifyToken,
  cuponController.getByRestaurant
);

router.get("/:id", auth.verifyToken, cuponController.getById);

router.put("/:id", auth.grantRole(["ADMIN"]), cuponController.update);

module.exports = router;

//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const restaurantTableController = require("../controllers/restaurantTableController");

//Definición de rutas para generos
router.get(
  "/",
  auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.get
);

router.get(
  "/alltables",
  auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.getByAdmin
);

router.get(
  "/waiter/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.getByRestaurant
);

router.get(
  "/updateStateSetFree/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.updateStateFree
);

router.get(
  "/updateStateSetNotFree/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.updateStateNotFree
);

router.post("/", auth.grantRole(["ADMIN"]), restaurantTableController.create);

router.get(
  "/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.getById
);

router.put("/:id", auth.grantRole(["ADMIN"]), restaurantTableController.update);

module.exports = router;

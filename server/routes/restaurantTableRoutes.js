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
  "/waiter/:id",
  //auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.getByRestaurant
);

router.post("/", auth.grantRole(["ADMIN"]), restaurantTableController.create);

router.get(
  "/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.getById
);

router.put(
  "/updateStateSetFree",
  //auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.updateStateFree
);

router.put(
  "/updateStateSetNotFree",
  //auth.grantRole(["ADMIN", "WAITER"]),
  restaurantTableController.updateStateNotFree
);
router.put("/:id", auth.grantRole(["ADMIN"]), restaurantTableController.update);


module.exports = router;

//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const productController = require("../controllers/productController");

//Definición de rutas para generos
router.get(
  "/",
  auth.grantRole(["ADMIN", "WAITER", "USER"]),
  productController.get
);

router.get(
  "/restaurant/:id",
  //auth.grantRole(["ADMIN", "WAITER", "USER"]),
  productController.getByRestaurant
);

router.post("/", auth.grantRole(["ADMIN"]), productController.create);

router.get(
  "/:id",
  auth.grantRole(["ADMIN", "WAITER", "USER"]),
  productController.getById
);

router.put(
  "/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  productController.update
);

module.exports = router;

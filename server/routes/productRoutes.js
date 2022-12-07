//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const productController = require("../controllers/productController");

//Definición de rutas para generos
router.get("/", auth.verifyToken, productController.get);

router.get(
  "/restaurant/:id",
  auth.verifyToken,
  productController.getByRestaurant
);

router.get(
  "/restaurantandcat/:id/:cat",
  auth.verifyToken,
  productController.getByCategory
);

router.get(
  "/restaurantandcatadmin/:cat",
  auth.verifyToken,
  productController.getByCategoryAdmin
);

router.get(
  "/updatestateactive/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  productController.updateStateSetActive
);

router.get(
  "/updatestateinactive/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  productController.updateStateSetInactive
);

router.post("/", auth.grantRole(["ADMIN"]), productController.create);

router.get("/:id", auth.verifyToken, productController.getById);

router.put(
  "/:id",
  auth.grantRole(["ADMIN", "WAITER"]),
  productController.update
);

module.exports = router;

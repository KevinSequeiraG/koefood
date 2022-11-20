//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const restaurantController = require("../controllers/restaurantController");

//Definición de rutas para generos
router.get("/", auth.verifyToken, restaurantController.get);

router.get("/:id", auth.verifyToken, restaurantController.getById);

module.exports = router;

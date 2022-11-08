//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const restaurantController = require("../controllers/restaurantController");

//Definición de rutas para generos
router.get("/", restaurantController.get);

router.get("/:id", restaurantController.getById);

module.exports = router; 
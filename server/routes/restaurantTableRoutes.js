//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const restaurantTableController = require("../controllers/restaurantTableController");

//Definición de rutas para generos
router.get("/", restaurantTableController.get);

router.get("/:id", restaurantTableController.getById);

module.exports = router;
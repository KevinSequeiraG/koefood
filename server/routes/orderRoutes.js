//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const orderController = require("../controllers/orderController");

//Definición de rutas para generos
router.get("/", orderController.get);

router.get("/:id", orderController.getById);

module.exports = router; 
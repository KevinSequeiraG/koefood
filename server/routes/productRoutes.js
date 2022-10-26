//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const productController = require("../controllers/productController");

//Definición de rutas para generos
router.get("/", productController.get);

router.get("/:id", productController.getById);

module.exports = router;
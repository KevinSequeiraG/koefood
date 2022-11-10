//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const productCategoryController = require("../controllers/productCategoryController");

//Definición de rutas para generos
router.get("/", productCategoryController.get);

router.get("/:id", productCategoryController.getById);

module.exports = router;
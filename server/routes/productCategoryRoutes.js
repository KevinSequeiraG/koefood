//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const productCategoryController = require("../controllers/productCategoryController");

//Definición de rutas para generos
router.get("/",auth.verifyToken, productCategoryController.get);

router.get("/:id",auth.verifyToken, productCategoryController.getById);

module.exports = router;
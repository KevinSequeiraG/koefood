//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Videojuego controller para los métodos definidos
const tableEnum = require("../controllers/enumTableStatusController");

//Definición de rutas para generos
router.get("/", tableEnum.get);

router.get("/:id", tableEnum.getById);

module.exports = router;
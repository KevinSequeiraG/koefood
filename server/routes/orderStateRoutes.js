//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Rol controller para los métodos definidos
const orderStateController = require("../controllers/orderStateController");

router.get("/", orderStateController.get);

router.get("/:id", orderStateController.getById);

module.exports = router;
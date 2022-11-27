//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Rol controller para los métodos definidos
const payOptionController = require("../controllers/paymentOptionController");

router.get("/", payOptionController.get);

router.get("/:id", payOptionController.getById);

module.exports = router;
//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Rol controller para los métodos definidos
const payOptionController = require("../controllers/paymentOptionController");

router.get("/",auth.verifyToken, payOptionController.get);

router.get("/:id",auth.verifyToken, payOptionController.getById);

module.exports = router;
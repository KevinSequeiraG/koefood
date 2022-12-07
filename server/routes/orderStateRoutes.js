//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Rol controller para los métodos definidos
const orderStateController = require("../controllers/orderStateController");

router.get("/", auth.verifyToken, orderStateController.get);

router.get("/:id", auth.verifyToken, orderStateController.getById);

module.exports = router;

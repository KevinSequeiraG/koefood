//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Rol controller para los métodos definidos
const rolController = require("../controllers/rolController");

router.get("/", rolController.get);

router.get("/:id", rolController.getById);

module.exports = router;
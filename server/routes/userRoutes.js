//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Usuario controller para los métodos definidos
const userController = require("../controllers/userController");

router.get("/", userController.get);

router.post("/login", userController.login);

router.post("/registrar", userController.register);

router.post("/registraradmin", userController.registerByAdmin);

router.get("/:id", userController.getById);

router.delete("/:id", userController.delete);

//router.get("/:email", userController.getByEmail);

module.exports = router;

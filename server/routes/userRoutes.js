//Express para agregar las rutas
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//Usuario controller para los métodos definidos
const userController = require("../controllers/userController");

router.get("/", userController.get);

router.post("/login", userController.login);

router.get("/validateid/:id", userController.getById);

router.get(
  "/validateemail/:id",
  auth.grantRole(["ADMIN"]),
  userController.getByEmail
);

router.get("/updatestateactive/:id", userController.updateStateSetActive);

router.get("/updatestateinactive/:id", userController.updateStateSetInactive);

router.post("/registrar", userController.register);

router.post(
  "/registraradmin",
  auth.grantRole(["ADMIN"]),
  userController.registerByAdmin
);

router.put("/:id", auth.grantRole(["ADMIN"]), userController.update);

//router.delete("/:id", userController.delete);

//router.get("/:email", userController.getByEmail);

module.exports = router;

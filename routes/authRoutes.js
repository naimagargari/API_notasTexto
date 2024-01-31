const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Registro de usuarios
router.post("/register", authController.registro);

// Inicio de sesión de usuarios
router.post("/login", authController.login);

// Cierre de sesión de usuarios
router.post("/logout", authController.logout);

// Ruta protegida para obtener información del usuario autenticado
router.get("/user", authMiddleware, authController.getUserInfo);

module.exports = router;

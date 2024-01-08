const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Registro de usuarios
router.post('/register', authController.register);

//Inicio de sesión de usuarios
router.post('/login', authController.login);

//Cierre de sesión de usuarios
router.post('/logout', authController.logout);

module.exports = router;

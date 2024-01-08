const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware de autenticación para proteger estas rutas
router.use(authMiddleware);

//Obtener todas las notas del usuario autenticado
router.get('/', noteController.getNotes);

//Nota por su ID
router.get('/:id', noteController.getNoteById);

//Crear una nueva nota
router.post('/', noteController.createNote);

//Actualizar una nota por su ID
router.put('/:id', noteController.updateNote);

//Eliminar una nota por su ID
router.delete('/:id', noteController.deleteNote);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const noteController = require("../controllers/noteController");
const router = express.Router();

// Obtener todas las notas del usuario autenticado
router.get("/notes", authMiddleware, noteController.getNotes);

// Obtener detalles de una nota por su ID
router.get("/notes/:id", authMiddleware, noteController.getNoteById);

// Crear una nueva nota
router.post("/notes", authMiddleware, noteController.createNote);

// Actualizar una nota por su ID
router.put("/notes/:id", authMiddleware, noteController.updateNote);

// Eliminar una nota por su ID
router.delete("/notes/:id", authMiddleware, noteController.deleteNote);

module.exports = router;

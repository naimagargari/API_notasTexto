const express = require("express");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

// Obtener todas las categorías del usuario autenticado
router.get("/categories", authMiddleware, categoryController.getCategories);

// Obtener detalles de una categoría por su ID
router.get(
  "/categories/:id",
  authMiddleware,
  categoryController.getCategoryById
);

// Crear una nueva categoría
router.post("/categories", authMiddleware, categoryController.createCategory);

// Actualizar una categoría por su ID
router.put(
  "/categories/:id",
  authMiddleware,
  categoryController.updateCategory
);

// Eliminar una categoría por su ID
router.delete(
  "/categories/:id",
  authMiddleware,
  categoryController.deleteCategory
);

module.exports = router;

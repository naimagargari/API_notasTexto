const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware de autenticación para proteger estas rutas
router.use(authMiddleware);

//Obtener todas las categorías
router.get('/', categoryController.getCategories);

//Categoría por su ID
router.get('/:id', categoryController.getCategoryById);

//Nueva categoría
router.post('/', categoryController.createCategory);

//Actualizar una categoría por su ID
router.put('/:id', categoryController.updateCategory);

//Eliminar una categoría por su ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

const Category = require('../models/Category');

const categoryController = {
  getCategories: (req, res) => {
    Category.getAllCategories((err, categories) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener las categorías' });
      }
      return res.status(200).json(categories);
    });
  },

  createCategory: (req, res) => {
    const newCategory = req.body; 

    Category.createCategory(newCategory, (err, categoryId) => {
      if (err) {
        return res.status(500).json({ error: 'Error al crear la categoría' });
      }
      return res.status(201).json({ message: 'Categoría creada exitosamente', categoryId });
    });
  },

  updateCategory: (req, res) => {
    const categoryId = req.params.id; 
    const updatedData = req.body; 

    Category.updateCategory(categoryId, updatedData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar la categoría' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      return res.status(200).json({ message: 'Categoría actualizada exitosamente' });
    });
  },

  deleteCategory: (req, res) => {
    const categoryId = req.params.id; 
    Category.deleteCategory(categoryId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar la categoría' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
  }
};

module.exports = categoryController;

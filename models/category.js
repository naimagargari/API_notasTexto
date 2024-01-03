const db = require('../db');

const Category = {
  getAllCategories: (callback) => {
    db.query('SELECT * FROM categories', (err, categories) => {
      if (err) {
        return callback(err);
      }
      return callback(null, categories);
    });
  },

  getCategoryById: (categoryId, callback) => {
    db.query('SELECT * FROM categories WHERE id = ?', [categoryId], (err, category) => {
      if (err) {
        return callback(err);
      }
      return callback(null, category[0]);
    });
  },

  createCategory: (newCategory, callback) => {
    const { name } = newCategory;
    const query = 'INSERT INTO categories (name) VALUES (?)';
    const values = [name];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result.insertId);
    });
  },

  updateCategory: (categoryId, updatedData, callback) => {
    const { name } = updatedData;
    const query = 'UPDATE categories SET name = ? WHERE id = ?';
    const values = [name, categoryId];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  deleteCategory: (categoryId, callback) => {
    db.query('DELETE FROM categories WHERE id = ?', [categoryId], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
};

module.exports = Category;


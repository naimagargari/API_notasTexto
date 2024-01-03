const db = require('../db');

const Note = {
  getAllNotes: (userId, callback) => {
    db.query('SELECT * FROM notes WHERE user_id = ?', [userId], (err, notes) => {
      if (err) {
        return callback(err);
      }
      return callback(null, notes);
    });
  },

  getNoteById: (noteId, callback) => {
    db.query('SELECT * FROM notes WHERE id = ?', [noteId], (err, note) => {
      if (err) {
        return callback(err);
      }
      return callback(null, note[0]);
    });
  },

  createNote: (userId, newNote, callback) => {
    const { title, text, category, is_public } = newNote;
    const query = 'INSERT INTO notes (title, text, category, user_id, is_public) VALUES (?, ?, ?, ?, ?)';
    const values = [title, text, category, userId, is_public];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result.insertId);
    });
  },

  updateNote: (noteId, updatedData, callback) => {
    const { title, text, category, is_public } = updatedData;
    const query = 'UPDATE notes SET title = ?, text = ?, category = ?, is_public = ? WHERE id = ?';
    const values = [title, text, category, is_public, noteId];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  deleteNote: (noteId, callback) => {
    db.query('DELETE FROM notes WHERE id = ?', [noteId], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  }
};

module.exports = Note;

const db = require('../db');

const User = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results[0]);
    });
  },

  findById: (userId, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results[0]);
    });
  },

  create: (newUser, callback) => {
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result.insertId);
    });
  },

  updateUser: (userId, updatedData, callback) => {
    db.query('UPDATE users SET ? WHERE id = ?', [updatedData, userId], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  deleteUser: (userId, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  getAllUsers: (callback) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results);
    });
  },

  countUsers: (callback) => {
    db.query('SELECT COUNT(*) AS totalUsers FROM users', (err, results) => {
      if (err) {
        return callback(err);
      }
      return callback(null, results[0].totalUsers);
    });
  }

};

module.exports = User;

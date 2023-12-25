const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const authController = {
  registro: (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe
    User.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      if (user) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      // Crear un nuevo usuario
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error al encriptar la contraseña' });
        }
        
        const newUser = { email, password: hashedPassword };
        User.create(newUser, (err, userId) => {
          if (err) {
            return res.status(500).json({ error: 'Error al crear el usuario' });
          }
          return res.status(201).json({ message: 'Usuario creado con éxito', userId });
        });
      });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por email
    User.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar la contraseña
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign({ userId: user.id }, 'secreto_del_token');
        return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
      });
    });
  }
};

module.exports = authController;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authController = {
  registro: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario ya existe
      const user = await User.findByEmail(email);

      if (user) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      // Crear un nuevo usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { email, password: hashedPassword };
      const userId = await User.create(newUser);

      return res
        .status(201)
        .json({ message: "Usuario creado con éxito", userId });
    } catch (error) {
      console.error("Error en el registro:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar al usuario por email
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Verificar la contraseña
      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Generar token JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "secreto_del_token"
      );
      return res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  logout: (req, res) => {
    res.json({ message: "Cierre de sesión exitoso" });
  },

  getUserInfo: (req, res) => {
    // Obtener información del usuario autenticado desde el token JWT
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto_del_token"
    );

    //Acceder a la información del usuario desde decoded.userId
    const userId = decoded.userId;

    res.json({
      userId,
      message: "Información del usuario obtenida con éxito 👍",
    });
  },
};

module.exports = authController;

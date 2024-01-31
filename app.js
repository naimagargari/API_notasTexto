const express = require("express");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const noteRoutes = require("./routes/noteRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/notes", noteRoutes);

// Obtener todas las categorías
app.get("/api/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, categories) => {
    if (err) {
      console.error("Error al obtener las categorías:", err);
      return res.status(500).json({ error: "Error al obtener las categorías" });
    }
    res.status(200).json(categories);
  });
});

// Obtener todas las notas
app.get("/api/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, notes) => {
    if (err) {
      console.error("Error al obtener las notas:", err);
      return res.status(500).json({ error: "Error al obtener las notas" });
    }
    res.status(200).json(notes);
  });
});

// Ruta para obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      res.status(500).send("Error al obtener usuarios");
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

// Cerrar la conexión a la base de datos cuando se cierra el servidor
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Servidor cerrado y conexión a la base de datos terminada");
  });
});

app.use(errorMiddleware);

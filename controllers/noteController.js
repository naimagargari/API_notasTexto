const Note = require("../models/note");

const noteController = {
  getNotes: (req, res) => {
    const userId = req.user.id;

    Note.getAllNotes(userId, (err, notes) => {
      if (err) {
        return res.status(500).json({ error: "Error al obtener las notas" });
      }
      return res.status(200).json(notes);
    });
  },

  getNoteById: (req, res) => {
    const noteId = req.params.id;

    Note.getNoteById(noteId, (err, note) => {
      if (err) {
        return res.status(500).json({ error: "Error al obtener la nota" });
      }
      if (!note) {
        return res.status(404).json({ error: "Nota no encontrada" });
      }
      return res.status(200).json(note);
    });
  },

  createNote: (req, res) => {
    const userId = req.user.id;
    const newNote = req.body;

    Note.createNote(userId, newNote, (err, noteId) => {
      if (err) {
        return res.status(500).json({ error: "Error al crear la nota" });
      }
      return res
        .status(201)
        .json({ message: "Nota creada exitosamente", noteId });
    });
  },

  updateNote: async (req, res) => {
    try {
      const noteId = req.params.id;
      const updatedData = req.body;

      const result = await Note.updateNote(noteId, updatedData);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Nota no encontrada" });
      }

      return res.status(200).json({ message: "Nota actualizada exitosamente" });
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  deleteNote: (req, res) => {
    const noteId = req.params.id;

    Note.deleteNote(noteId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al eliminar la nota" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Nota no encontrada" });
      }

      return res.status(200).json({ message: "Nota eliminada exitosamente" });
    });
  },
};

module.exports = noteController;

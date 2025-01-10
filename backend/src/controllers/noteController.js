import NoteService from '../services/noteService.js';

const NoteController = {

  // Method to create a note
  async create(req, res) {
    try {
      const note = await NoteService.create(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Method to get all notes
  async getAll(req, res) {
    try {
      const notes = await NoteService.getAll();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Method to get a note by id
  async getById(req, res) {
    try {
      const note = await NoteService.getById(req.params.id);
      if (!note) return res.status(404).json({ error: 'Nota no encontrada' });
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Method to update a note
  async update(req, res) {
    try {
      await NoteService.update(req.params.id, req.body);
      res.json({ message: 'Nota actualizada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Method to delete a note
  async delete(req, res) {
    try {
      await NoteService.delete(req.params.id);
      res.json({ message: 'Nota eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default NoteController;

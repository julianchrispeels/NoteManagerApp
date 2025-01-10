import Note from '../models/note.js';

const NoteRepository = {

  // Method to create a note
  async create(note) {
    return await Note.create(note);
  },

  // Method to get all notes
  async findAll() {
    return await Note.findAll();
  },

  // Method to get a note by id
  async findById(id) {
    return await Note.findByPk(id);
  },

  // Method to update a note
  async update(id, note) {
    return await Note.update(note, { where: { id } });
  },

  // Method to delete a note
  async delete(id) {
    return await Note.destroy({ where: { id } });
  },
};

export default NoteRepository;

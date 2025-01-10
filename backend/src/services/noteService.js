import NoteRepository from '../repositories/noteRepository.js';

const NoteService = {

  // Method to create a note
  async create(note) {
    return await NoteRepository.create(note);
  },

  // Method to get all notes
  async getAll() {
    return await NoteRepository.findAll();
  },

  // Method to get a note by id
  async getById(id) {
    return await NoteRepository.findById(id);
  },

  // Method to update a note
  async update(id, note) {
    return await NoteRepository.update(id, note);
  },

  // Method to delete a note
  async delete(id) {
    return await NoteRepository.delete(id);
  },
};

export default NoteService;

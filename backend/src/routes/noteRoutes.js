import { Router } from 'express';
import NoteController from '../controllers/noteController.js';

const router = Router();

// Routes for the Note entity
router.post('/', NoteController.create);
router.get('/', NoteController.getAll);
router.get('/:id', NoteController.getById);
router.put('/:id', NoteController.update);
router.delete('/:id', NoteController.delete);

export default router;

import express from 'express';
import { createMovie, deleteMovie, getMovies, updateMovie } from '../controller/movie.controller.js';

const router = express.Router();

router.post('/', createMovie)
router.get('/', getMovies)
router.delete('/:id', deleteMovie)
router.put('/:id', updateMovie)

export default router;
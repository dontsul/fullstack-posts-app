import { Router } from 'express';
import { createComment } from '../controllers/comments.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

//Create Comment
// hhtp://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;

import { Router } from 'express';
import { registration, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
const router = new Router();

// Registration
// http://localhost:3002/api/auth/registration
router.post('/registration', registration);

// Login
// http://localhost:3002/api/auth/login
router.post('/login', login);

// Get Me
// http://localhost:3002/api/auth/me
router.post('/me', checkAuth, getMe);

export default router;

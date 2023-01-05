import express from 'express';
import { getSession } from '../middleware/authMiddleware';
import { login, signUp } from '../controllers/authController';
import { getUser } from '../controllers/usersController';

const router = express.Router();

router.post('/auth/signup', signUp);
router.post('/auth/login', login);
router.get('/:username', getUser);
router.get('/auth/session', getSession);

export default router;

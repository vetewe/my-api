import express from 'express';
import { index } from '../controllers/index.controllers.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, index);

export default router;
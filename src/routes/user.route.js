import express from 'express';
import { create, getAll, getOne, update } from '../controllers/user.controllers.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/user', auth, create);
router.get('/user', auth, getAll);
router.get('/user/:id', auth, getOne);
router.put('/user/:id', auth, update);

export default router;
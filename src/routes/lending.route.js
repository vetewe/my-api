import express from 'express';
import { lendingBook, getAllLending, updateLending } from '../controllers/lending.controllers.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/lending', auth, lendingBook);
router.get('/getalllending', auth, getAllLending);
router.put('/lending/:id', auth, updateLending);

export default router;
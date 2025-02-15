import express from 'express';
import { create, getAll, getOne, update } from '../controllers/book.controllers.js';
import { auth } from '../middlewares/auth.js';
import { uploadImage, handleUploadError } from '../middlewares/multer.js';

const router = express.Router();

router.post('/book', auth, uploadImage().single('image'), handleUploadError, create);
router.get('/book', auth, getAll);
router.get('/book/:id', auth, getOne);
router.put('/book/:id', auth, update);

export default router;
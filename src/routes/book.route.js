import express from 'express';
import { create, getAll, getOne, update, destroy } from '../controllers/book.controllers.js';
import { auth } from '../middlewares/auth.js';
import { uploadImage, handleUploadError } from '../middlewares/multer.js';

const router = express.Router();

router.post('/book', auth, uploadImage("./public/images").single('image'), handleUploadError, create);
router.get('/book', auth, getAll);
router.get('/book/:id', auth, getOne);
router.put('/book/:id', auth, update);
router.delete('/book/:id', auth, destroy);

export default router;
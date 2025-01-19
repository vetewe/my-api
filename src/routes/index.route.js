import express from 'express';
import { index } from '../controllers/index.controllers.js';

const router = express.Router();

router.get('/', index );

export default router;
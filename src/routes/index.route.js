import express from 'express';
import { index } from '../controllers/index.controller.js';

const router = express.Router();

router.get('/', index );
// router.get('/about', IndexController.about );

export default router;
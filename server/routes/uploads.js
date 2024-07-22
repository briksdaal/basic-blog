import express from 'express';
const router = express.Router();
import { uploads_get } from '../controllers/uploadsController.js';

/* GET request to get upload */
router.get('/:id', uploads_get);

export default router;

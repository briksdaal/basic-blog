import express from 'express';
const router = express.Router();
import { refresh_get } from '../controllers/refreshController.js';

/* GET request to refresh access token */
router.get('/', refresh_get);

export default router;

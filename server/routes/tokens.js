import express from 'express';
const router = express.Router();
import { refresh_token_post } from '../controllers/tokensController.js';

/* POST request to refresh access token */
router.post('/', refresh_token_post);

export default router;

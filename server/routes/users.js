import express from 'express';
const router = express.Router();
import { register_user_post } from '../controllers/usersController.js';

/* POST request to register new user */
router.post('/', register_user_post);

export default router;

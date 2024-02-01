import express from 'express';
const router = express.Router();
import { login_user_post } from '../controllers/loginController.js';

/* POST request to login user */
router.post('/', login_user_post);

export default router;

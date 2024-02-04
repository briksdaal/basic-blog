import express from 'express';
const router = express.Router();
import {
  login_user_post,
  logout_user_delete,
} from '../controllers/authController.js';

/* POST request to login user */
router.post('/', login_user_post);

/* DELETE request to logout user */
router.delete('/', logout_user_delete);

export default router;

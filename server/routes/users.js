import express from 'express';
const router = express.Router();
import {
  register_user_post,
  user_detail,
  update_user_put,
} from '../controllers/usersController.js';

/* POST request to register new user */
router.post('/', register_user_post);

/* GET request to get specific user */
router.get('/:id', user_detail);

/* PUT request to update specific user */
router.put('/:id', update_user_put);

export default router;

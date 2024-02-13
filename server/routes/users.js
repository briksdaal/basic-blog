import express from 'express';
const router = express.Router();
import {
  register_user_post,
  user_detail,
  update_user_put,
  user_delete,
} from '../controllers/usersController.js';

/* POST request to register new user */
router.post('/', register_user_post);

/* GET request to get specific user */
router.get('/:id', user_detail);

/* PUT request to update specific user */
router.put('/:id', update_user_put);

/* DELETE request to delete specific user */
router.delete('/:id', user_delete);

export default router;

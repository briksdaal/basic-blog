import express from 'express';
const router = express.Router();
import {
  post_list,
  post_create,
  post_detail,
  post_update,
  post_delete,
} from '../controllers/postsController.js';

/* GET request for list of all posts */
router.get('/', post_list);

/* POST request to create new post */
router.post('/', post_create);

/* GET request to get specific post */
router.get('/:id', post_detail);

/* PUT request to update specific post */
router.put('/:id', post_update);

/* DELETE request to delete specific post */
router.delete('/:id', post_delete);

export default router;

import express from 'express';
const router = express.Router();
import {
  comment_list,
  comment_create,
  comment_detail,
  comment_update,
  comment_delete,
} from '../controllers/commentsController.js';

/* GET request for list of comments */
router.get('/', comment_list);

/* POST request to create new comment */
router.post('/', comment_create);

/* GET request to get specific comment */
router.get('/:id', comment_detail);

/* PUT request to update specific comment */
router.put('/:id', comment_update);

/* DELETE request to delete specific comment */
router.delete('/:id', comment_delete);

export default router;

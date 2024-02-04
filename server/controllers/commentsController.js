import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Comment from '../models/comment.js';
import Post from '../models/post.js';

/* Return list of all comments on GET */
export const comment_list = asyncHandler(async function (req, res) {
  res.json({
    msg: `Show all comments ${req.query.post}`,
  });
});

/* Handle create new comment on POST */
export const comment_create = asyncHandler(async function (req, res) {
  res.json({
    msg: 'Create new comment',
  });
});

/* Return specific comment on GET */
export const comment_detail = asyncHandler(async function (req, res) {
  res.json({
    msg: `Show comment ${req.params.id}`,
  });
});

/* Update specific comment on PUT */
export const comment_update = asyncHandler(async function (req, res) {
  res.json({
    msg: `Update comment ${req.params.id}`,
  });
});

/* Delete specific comment on DELETE */
export const comment_delete = asyncHandler(async function (req, res) {
  res.json({
    msg: `Delete comment ${req.params.id}`,
  });
});

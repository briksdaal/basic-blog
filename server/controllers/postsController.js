import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Post from '../models/post.js';

/* Return list of all posts on GET */
export const post_list = asyncHandler(async function (req, res) {
  res.json({
    msg: `All posts`,
  });
});

/* Handle create new post on POST */
export const post_create = asyncHandler(async function (req, res) {
  res.json({
    msg: `Create post`,
  });
});

/* Return specific post on GET */
export const post_detail = asyncHandler(async function (req, res) {
  res.json({
    msg: `Detail of post ${req.params.id}`,
  });
});

/* Update specific post on PUT */
export const post_update = asyncHandler(async function (req, res) {
  res.json({
    msg: `Update of post ${req.params.id}`,
  });
});

/* Delete specific post on DELETE */
export const post_delete = asyncHandler(async function (req, res) {
  res.json({
    msg: `Delete of post ${req.params.id}`,
  });
});

import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Post from '../models/post.js';
import User from '../models/user.js';

/* Return list of all posts on GET */
export const post_list = asyncHandler(async function (req, res) {
  const allPosts = await Post.find()
    .populate('author', { handle: 1 })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    posts: allPosts,
  });
});

/* Handle create new post on POST */
export const post_create = [
  body('author')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Author must contain at least 1 charcters')
    .custom(async (val) => {
      const findAuthor = await User.findById(val);
      if (!findAuthor) {
        throw Error();
      }
    })
    .withMessage('Author is not recognized')
    .escape(),
  body('title', 'Title must contain at least 1 charcters')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Content must contain at least 1 charcters')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('createdAt', 'Created At date format is invalid')
    .optional({ values: 'falsy' })
    .isISO8601()
    .toDate(),
  body('editedAt')
    .optional({ values: 'falsy' })
    .isISO8601()
    .withMessage('Edited At date format is invalid')
    .custom((val, { req }) => {
      // check that editedAt is after createdAt (or after today if no createdAt)
      return (
        (!req.body.createdAt && Date.parse(val) > Date.now()) ||
        Date.parse(val) > Date.parse(req.body.createdAt)
      );
    })
    .withMessage("Edited At can't be before Created At")
    .toDate(),
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors,
      });
    }

    const post = new Post({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body.createdAt,
      editedAt: req.body.editedAt,
    });

    await post.save();

    res.json({
      success: true,
      post: post,
    });
  }),
];

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
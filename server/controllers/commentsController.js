import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Comment from '../models/comment.js';
import Post from '../models/post.js';

/* Return list of all comments on GET */
export const comment_list = asyncHandler(async function (req, res) {
  const filter = {};
  if (req.query.post) {
    filter.post = req.query.post;
  }

  let allComments;

  try {
    allComments = await Comment.find(filter).sort({ createdAt: -1 }).exec();
  } catch (err) {
    allComments = [];
  }

  res.json({
    success: true,
    comments: allComments,
  });
});

/* Handle create new comment on POST */
export const comment_create = [
  body('post')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post must contain at least 1 charcters')
    .custom(async (val) => {
      const foundPost = await Post.findById(val).exec();
      if (!foundPost) {
        throw Error();
      }
    })
    .withMessage('Post is not recognized')
    .escape(),
  body('author', 'Author must contain at least 1 charcters')
    .optional()
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
        (!req.body.createdAt && Date.parse(val) >= Date.now()) ||
        Date.parse(val) >= Date.parse(req.body.createdAt)
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

    const comment = new Comment({
      post: req.body.post,
      author: req.body.author,
      content: req.body.content,
      createdAt: req.body.createdAt,
      editedAt: req.body.editedAt,
    });

    await comment.save();

    res.json({
      success: true,
      comment: comment,
    });
  }),
];

/* Return specific comment on GET */
export const comment_detail = asyncHandler(async function (req, res) {
  let post;
  try {
    post = await Comment.findById(req.params.id).exec();
  } catch (err) {
    post = null;
  }

  if (!post) {
    return res.status(404).json({
      error: 'Comment not found',
    });
  }

  res.json({
    success: true,
    post,
  });
});

/* Update specific comment on PUT */
export const comment_update = [
  body('post')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post must contain at least 1 charcters')
    .custom(async (val) => {
      const foundPost = await Post.findById(val).exec();
      if (!foundPost) {
        throw Error();
      }
    })
    .withMessage('Post is not recognized')
    .escape(),
  body('author', 'Author must contain at least 1 charcters')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Content must contain at least 1 charcters')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('createdAt', 'Created At date format is invalid')
    .optional()
    .isISO8601()
    .toDate(),
  body('editedAt')
    .optional()
    .isISO8601()
    .withMessage('Edited At date format is invalid')
    .custom(async (val, { req }) => {
      // check that editedAt is after createdAt
      if (req.body.createdAt) {
        if (Date.parse(val) < Date.parse(req.body.createdAt)) {
          throw new Error();
        }
      } else {
        const comment = await Comment.findById(req.params.id);
        if (Date.parse(val) < Date.parse(comment.createdAt)) {
          throw new Error();
        }
      }
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

    let comment;
    try {
      comment = await Comment.findById(req.params.id).exec();
    } catch (err) {
      comment = null;
    }

    if (!comment) {
      return res.status(404).json({
        error: 'Comment not found',
      });
    }

    Object.keys(req.body).forEach((e) => {
      comment[e] = req.body[e];
    });

    await comment.save();

    res.json({
      success: true,
      comment,
    });
  }),
];

/* Delete specific comment on DELETE */
export const comment_delete = asyncHandler(async function (req, res) {
  let comment;
  try {
    comment = await Comment.findByIdAndDelete(req.params.id).exec();
  } catch (err) {
    comment = null;
  }

  if (!comment) {
    return res.status(404).json({
      error: 'Comment not found',
    });
  }

  res.json({
    success: true,
    comment,
  });
});

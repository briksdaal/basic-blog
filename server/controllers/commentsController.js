import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Comment from '../models/comment.js';
import Post from '../models/post.js';
import passport from 'passport';
import db from '../config/mongoose.js';

/* Return list of all comments on GET */
export const comment_list = [
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  asyncHandler(async function (req, res) {
    if (!req.query.post && !req.user) {
      res.status(403).json({
        errors: ['All comments forbidden'],
      });
    }

    const filter = {};

    if (req.query.post) {
      let post;
      try {
        post = await Post.findById(req.query.post).exec();
      } catch (err) {
        post = null;
      }

      if (!post) {
        return res.status(404).json({
          errors: ['Post not found'],
        });
      }

      if (!post.published && !req.user) {
        return res.status(403).json({
          errors: ['Post forbidden'],
        });
      }

      filter.post = req.query.post;
    }

    const allComments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      success: true,
      comments: allComments,
    });
  }),
];

/* Handle create new comment on POST */
export const comment_create = [
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  body('post')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post must contain at least 1 characters')
    .custom(async (val) => {
      const foundPost = await Post.findById(val).exec();
      if (!foundPost) {
        throw Error();
      }
    })
    .withMessage('Post is not recognized')
    .escape(),
  body('author', 'Author must contain at least 1 characters')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Content must contain at least 1 characters')
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
      return res.status(400).json(errors);
    }

    const post = await Post.findById(req.body.post);

    if (!post.published && !req.user) {
      return res.status(403).json({
        errors: ['Comment to post is forbidden'],
      });
    }

    const comment = new Comment({
      post: req.body.post,
      author: req.body.author,
      content: req.body.content,
      createdAt: req.body.createdAt,
      editedAt: req.body.editedAt,
    });

    // start a session transaction to update both comment and commentsCount in post
    const session = await db.startSession();
    session.startTransaction();
    await comment.save({ session });
    await Post.findByIdAndUpdate(req.body.post, {
      $inc: { commentsCount: 1 },
    })
      .session(session)
      .exec();

    await session.commitTransaction();
    await session.endSession();
    // end session

    res.json({
      success: true,
      comment: comment,
    });
  }),
];

/* Return specific comment on GET */
export const comment_detail = [
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  asyncHandler(async function (req, res) {
    let comment;
    try {
      comment = await Comment.findById(req.params.id)
        .populate('post', { published: 1, title: 1 })
        .exec();
    } catch (err) {
      comment = null;
    }

    if (!comment) {
      return res.status(404).json({
        errors: ['Comment not found'],
      });
    }

    if (!comment.post.published && !req.user) {
      return res.status(403).json({
        errors: ['Comment forbidden'],
      });
    }

    res.json({
      success: true,
      comment,
    });
  }),
];

/* Update specific comment on PUT */
export const comment_update = [
  passport.authenticate('jwt', { session: false }),
  body('post')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post must contain at least 1 characters')
    .custom(async (val) => {
      const foundPost = await Post.findById(val).exec();
      if (!foundPost) {
        throw Error();
      }
    })
    .withMessage('Post is not recognized')
    .escape(),
  body('author', 'Author must contain at least 1 characters')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Content must contain at least 1 characters')
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
        const comment = await Comment.findById(req.params.id).exec();
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
      return res.status(400).json(errors);
    }

    let comment;
    try {
      comment = await Comment.findById(req.params.id).exec();
    } catch (err) {
      comment = null;
    }

    if (!comment) {
      return res.status(404).json({
        errors: ['Comment not found'],
      });
    }

    Object.keys(req.body).forEach((e) => {
      comment[e] = req.body[e];
    });

    // update editedAt if it isn't in req body
    if (!req.body.editedAt) {
      if (Date.parse(comment.createdAt) >= Date.now()) {
        comment.editedAt = comment.createdAt;
      } else {
        comment.editedAt = Date.now();
      }
    }

    await comment.save();

    res.json({
      success: true,
      comment,
    });
  }),
];

/* Delete specific comment on DELETE */
export const comment_delete = [
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async function (req, res) {
    let comment;

    // start a session transaction to delete comment and decrease commentsCount in post
    const session = await db.startSession();
    session.startTransaction();

    try {
      comment = await Comment.findByIdAndDelete(req.params.id)
        .session(session)
        .exec();
    } catch (err) {
      comment = null;
    }

    const post = await Post.findByIdAndUpdate(comment.post, {
      $inc: { commentsCount: -1 },
    })
      .session(session)
      .exec();

    await session.commitTransaction();
    await session.endSession();
    // end session

    if (!comment) {
      return res.status(404).json({
        errors: ['Comment not found'],
      });
    }

    res.json({
      success: true,
      comment,
    });
  }),
];

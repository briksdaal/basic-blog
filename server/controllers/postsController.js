import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import Post from '../models/post.js';
import User from '../models/user.js';
import Comment from '../models/comment.js';
import { imageUploadAndValidation, deleteImage } from './helpers/image.js';

import passport from 'passport';
import db from '../config/mongoose.js';

/* Return list of all posts on GET */
export const post_list = [
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  asyncHandler(async function (req, res, next) {
    // show only published posts to regular visitors
    const filter = { published: true };
    if (req.user) {
      delete filter.published;
    }

    const allPosts = await Post.find(filter)
      .populate('author', { handle: 1 })
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      success: true,
      posts: allPosts,
    });
  }),
];

/* Handle create new post on POST */
export const post_create = [
  passport.authenticate('jwt', { session: false }),
  imageUploadAndValidation,
  body('author')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Author must contain at least 1 charcters')
    .custom(async (val) => {
      const foundAuthor = await User.findById(val).exec();
      if (!foundAuthor) {
        throw Error();
      }
    })
    .withMessage('Author is not recognized')
    .escape(),
  body('title', 'Title must contain at least 1 charcters')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content').trim().escape(),
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
  body('published', 'Published must be true or false')
    .optional()
    .isBoolean()
    .toBoolean(),
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      deleteImage(req.file?.path);

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
      published: req.body.published,
      image: req.file?.path || null,
    });

    await post.save();

    res.json({
      success: true,
      post: post,
    });
  }),
];

/* Return specific post on GET */
export const post_detail = [
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  asyncHandler(async function (req, res) {
    let post;
    try {
      post = await Post.findById(req.params.id)
        .populate('author', { handle: 1 })
        .exec();
    } catch (err) {
      post = null;
    }

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }

    if (!post.published && !req.user) {
      return res.status(403).json({
        error: 'Post forbidden',
      });
    }

    res.json({
      success: true,
      post,
    });
  }),
];

/* Update specific post on PUT */
export const post_update = [
  passport.authenticate('jwt', { session: false }),
  imageUploadAndValidation,
  body('author')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Author must contain at least 1 charcters')
    .custom(async (val) => {
      const foundAuthor = await User.findById(val).exec();
      if (!foundAuthor) {
        throw Error();
      }
    })
    .withMessage('Author is not recognized')
    .escape(),
  body('title', 'Title must contain at least 1 charcters')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content').optional().trim().escape(),
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
        const post = await Post.findById(req.params.id).exec();
        if (Date.parse(val) < Date.parse(post.createdAt)) {
          throw new Error();
        }
      }
    })
    .withMessage("Edited At can't be before Created At")
    .toDate(),
  body('published', 'Published must be true or false')
    .optional()
    .isBoolean()
    .toBoolean(),
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      deleteImage(req.file?.path);

      return res.status(400).json({
        errors,
      });
    }

    let post;
    try {
      post = await Post.findById(req.params.id).exec();
    } catch (err) {
      post = null;
    }

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }
    Object.keys(req.body).forEach((e) => {
      if (e === 'image') {
        return;
      }
      post[e] = req.body[e];
    });

    // update image if existing
    if (req.file) {
      deleteImage(post.image);
      post.image = req.file.path;
    }
    // if no image file but empty image string remove current image
    else if (req.body.image === '') {
      deleteImage(post.image);
      post.image = null;
    }

    // update editedAt if it isn't in req body
    if (!req.body.editedAt) {
      if (Date.parse(post.createdAt) >= Date.now()) {
        post.editedAt = post.createdAt;
      } else {
        post.editedAt = Date.now();
      }
    }

    await post.save();

    res.json({
      success: true,
      post,
    });
  }),
];

/* Delete specific post on DELETE */
export const post_delete = [
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async function (req, res) {
    let post;

    // start a session transaction to delete post and all its comments
    const session = await db.startSession();
    session.startTransaction();

    try {
      post = await Post.findByIdAndDelete(req.params.id)
        .session(session)
        .exec();
    } catch (err) {
      post = null;
    }
    await Comment.deleteMany({ post: req.params.id }).session(session);

    await session.commitTransaction();
    await session.endSession();
    // end session

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }

    deleteImage(post.image);

    res.json({
      success: true,
      post,
    });
  }),
];

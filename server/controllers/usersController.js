import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Post from '../models/post.js';
import { imageUploadAndValidation, deleteImage } from './helpers/image.js';
import passport from 'passport';
import db from '../config/mongoose.js';

// middle for verifying the requested id is for the same user in the jwt
function verifyUser(req, res, next) {
  if (req.user.email !== req.params.id) {
    return res.status(403).json({
      error: 'Forbidden',
    });
  }
  next();
}

/* Handle register new user on POST */
export const register_user_post = [
  imageUploadAndValidation,
  body('firstname', 'Firstname must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastname', 'Lastname must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email format incorrect')
    .custom(async (val) => {
      const userExists = await User.findOne({ email: val }).exec();
      if (userExists) {
        throw new Error('User with email already exists');
      }
    })
    .escape(),
  body('handle', 'Handle must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password-confirm', "Passwords don't match")
    .trim()
    .custom((val, { req }) => val === req.body.password)
    .escape(),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      deleteImage(req.file?.path);

      return res.status(400).json(errors);
    }

    const { firstname, lastname, email, handle, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      handle,
      password: hashedPassword,
      image: req.file?.path || null,
    });
    await newUser.save();
    res.json({
      success: true,
      message: `New user ${email} saved`,
    });
  }),
];

/* Return specific user on GET */
export const user_detail = [
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async function (req, res) {
    let user;
    try {
      user = await User.findOne(
        { email: req.params.id },
        { password: 0 }
      ).exec();
    } catch (err) {
      user = null;
    }

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      user,
    });
  }),
];

/* Update specific user on PUT */
export const update_user_put = [
  passport.authenticate('jwt', { session: false }),
  verifyUser,
  imageUploadAndValidation,
  body('firstname', 'Firstname must not be empty')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastname', 'Lastname must not be empty')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('handle', 'Handle must not be empty')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password-confirm', "Passwords don't match")
    .trim()
    .custom((val, { req }) => {
      if (!req.body.password) {
        return true;
      }

      return val === req.body.password;
    })
    .escape(),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      deleteImage(req.file?.path);

      return res.status(400).json(errors);
    }

    const user = req.user;

    Object.keys(req.body).forEach((e) => {
      if (
        e === 'email' ||
        e === 'image' ||
        e === 'password' ||
        e === 'password-confirm'
      ) {
        return;
      }
      user[e] = req.body[e];
    });

    // update password if existing
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    // update image if existing
    if (req.file) {
      deleteImage(user.image);
      user.image = req.file.path;
    }
    // if no image file but empty image string remove current image
    else if (req.body.image === '') {
      deleteImage(user.image);
      user.image = null;
    }

    await user.save();

    res.json({
      success: true,
      message: 'User updated',
    });
  }),
];

/* Delete specific user on DELETE */
export const user_delete = [
  passport.authenticate('jwt', { session: false }),
  verifyUser,
  asyncHandler(async function (req, res) {
    let user;

    // start a session transaction to delete user and all its comments
    const session = await db.startSession();
    session.startTransaction();

    try {
      user = await User.findByIdAndDelete(req.user._id, {
        projection: { password: 0 },
      }).session(session);
    } catch (err) {
      user = null;
    }

    await Post.updateMany({ author: req.user._id }, { author: null }).session(
      session
    );

    await session.commitTransaction();
    await session.endSession();
    // end session

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    deleteImage(req.user.image);

    res.json({
      success: true,
      user,
    });
  }),
];

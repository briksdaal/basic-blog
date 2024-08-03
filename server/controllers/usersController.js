import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Post from '../models/post.js';
import Session from '../models/session.js';
import { imageUploadAndValidation, deleteImage } from './helpers/image.js';
import passport from 'passport';
import db from '../config/mongoose.js';
import {
  addImageToGridFS,
  removeImageFromGridFS,
} from './helpers/gridfsPromises.js';

/* Middleware for verifying user is admin or that the requested id is for the same user in the jwt */
function verifyUser(req, res, next) {
  if (!req.user.admin && !req.user._id.equals(req.params.id)) {
    return res.status(403).json({
      errors: ['Forbidden'],
    });
  }
  next();
}

function verifyAdmin(req, res, next) {
  if (!req.user.admin) {
    return res.status(403).json({
      errors: ['Forbidden'],
    });
  }
  next();
}

/* Return list of all users on GET */
export const user_list = [
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async function (req, res) {
    const allUsers = await User.find({}, { password: 0 })
      .sort({ firstname: 1 })
      .exec();

    res.json({
      success: true,
      users: allUsers,
    });
  }),
];

/* Handle register new user on POST */
export const register_user_post = [
  passport.authenticate('jwt', { session: false }),
  verifyAdmin,
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
  body('admin').trim().toBoolean(true).escape(),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      deleteImage(req.file?.path);

      return res.status(400).json(errors);
    }

    const { firstname, lastname, email, handle, password, admin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      handle,
      password: hashedPassword,
      image: req.file?.path || null,
      admin,
    });

    try {
      const gridObj = await addImageToGridFS(req.file);
      newUser.gridfsImage = gridObj.id;
    } catch (err) {
      return res.status(500).json({
        errors: [err],
      });
    }

    await newUser.save();

    res.json({
      success: true,
      message: `New user ${email} saved`,
    });
  }),
];

/* Return specific user on GET */
export const user_detail = [
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  asyncHandler(async function (req, res) {
    let user;

    const projections = req.user ? { password: 0 } : { password: 0, admin: 0 };

    try {
      user = await User.findById(req.params.id, projections).exec();
    } catch (err) {
      user = null;
    }

    if (!user) {
      return res.status(404).json({
        errors: ['User not found'],
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
  body('admin').trim().toBoolean(true).escape(),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      deleteImage(req.file?.path);
      return res.status(400).json(errors);
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        errors: ['User not found'],
      });
    }

    if (req.body.admin === 'false') {
      const adminCount = await User.countDocuments({ admin: true });
      if (adminCount === 1) {
        return res.status(405).json({
          errors: ["Can't remove admin privileges from last admin user"],
        });
      }
    }

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
      try {
        await removeImageFromGridFS(user.gridfsImage);
        const gridObj = await addImageToGridFS(req.file);
        user.gridfsImage = gridObj.id;
      } catch (err) {
        return res.status(500).json({
          errors: [err],
        });
      }
      deleteImage(user.image);
      user.image = req.file.path;
    }
    // if no image file but empty image string remove current image
    else if (req.body.image === '') {
      deleteImage(user.image);
      removeImageFromGridFS(user.gridfsImage);
      user.image = null;
      user.gridfsImage = null;
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
    const user = await User.findById(req.params.id, { password: 0 });

    if (!user) {
      return res.status(404).json({
        errors: ['User not found'],
      });
    }

    if (user.admin) {
      const adminCount = await User.countDocuments({ admin: true });
      if (adminCount === 1) {
        return res.status(405).json({
          errors: ["Can't delete last admin user"],
        });
      }
    }

    // start a session transaction to delete user, remove author association from posts, and remove active session
    const session = await db.startSession();
    session.startTransaction();

    await User.findByIdAndDelete(user._id).session(session);

    await Post.updateMany({ author: user._id }, { author: null }).session(
      session
    );

    await Session.findOneAndDelete({ user: user.email }).session(session);

    await session.commitTransaction();
    await session.endSession();
    // end session

    deleteImage(user.image);
    await removeImageFromGridFS(user.gridfsImage);
    user.image = null;
    user.gridfsImage = null;

    res.json({
      success: true,
      user,
    });
  }),
];

import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const register_user_post = [
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
    });
    await newUser.save();
    res.json({ message: `New user ${email} saved` });
  }),
];

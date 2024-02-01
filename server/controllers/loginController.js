import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Session from '../models/session.js';
import { createRefreshToken, createAccessToken } from '../utils/jwt.js';

export const login_user_post = [
  body('email', 'Email format incorrect').trim().isEmail().escape(),
  body('password', 'Password must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    const foundUser = await User.findOne({ email }).exec();

    let passwordMatch = false;

    if (foundUser) {
      passwordMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(password, foundUser.password, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }

    if (!foundUser || !passwordMatch) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Invalid username or password' }] });
    }

    const refreshToken = createRefreshToken(email);
    const accessToken = createAccessToken(email);

    const session = new Session({ user: foundUser.email });
    await session.save();

    res.cookie('refresh', refreshToken);

    res.json({
      success: true,
      message: `User ${email} logged in`,
      token: accessToken,
    });
  }),
];

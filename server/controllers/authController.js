import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Session from '../models/session.js';
import { createRefreshToken, createAccessToken } from '../utils/jwt.js';
import passport from 'passport';

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

    const refreshToken = createRefreshToken(
      email,
      foundUser.admin,
      foundUser._id
    );
    const accessToken = createAccessToken(
      email,
      foundUser.admin,
      foundUser._id
    );

    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);

    const existingSession = await Session.findOneAndUpdate(
      {
        user: foundUser.email,
      },
      {
        user: foundUser.email,
        expiry,
      },
      {
        upsert: true,
      }
    ).exec();

    const cookieOptions = {
      sameSite: 'None',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, // 1d
      httpOnly: true,
      secure: true,
    };

    res.cookie('refresh', refreshToken, cookieOptions);

    res.json({
      success: true,
      message: `User ${email} logged in`,
      token: accessToken,
      admin: foundUser.admin,
      id: foundUser.id,
    });
  }),
];

export const logout_user_delete = [
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async function (req, res) {
    await Session.findOneAndDelete({ user: req.user.email });

    const cookieOptions = {
      sameSite: 'None',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, // 1d
      httpOnly: true,
      secure: true,
    };

    res.clearCookie('refresh', cookieOptions);
    res.sendStatus(204);
  }),
];

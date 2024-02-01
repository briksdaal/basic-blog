import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Session from '../models/session.js';
import { createAccessToken, verifyRefreshToken } from '../utils/jwt.js';

export const refresh_get = asyncHandler(async function (req, res) {
  const refreshToken = req.cookies.refresh;

  const payload = verifyRefreshToken(refreshToken);

  const activeSession = await Session.findOne({
    user: payload.sub,
  }).exec();

  if (activeSession) {
    const accessToken = createAccessToken(payload.sub);
    return res.json({
      success: true,
      message: `Access for user ${payload.sub} refreshed`,
      token: accessToken,
    });
  }

  res.cookie('refresh', refreshToken, {
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
});

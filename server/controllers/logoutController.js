import asyncHandler from 'express-async-handler';
import Session from '../models/session.js';
import { verifyRefreshToken } from '../utils/jwt.js';

export const logout_get = asyncHandler(async function (req, res) {
  const refreshToken = req.cookies.refresh;

  const payload = verifyRefreshToken(refreshToken);

  await Session.findOneAndDelete({ user: payload.sub });

  const cookieOptions = {
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
    secure: true,
  };

  res.clearCookie('refresh', cookieOptions);
  res.sendStatus(204);
});

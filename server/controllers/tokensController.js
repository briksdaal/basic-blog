import asyncHandler from 'express-async-handler';
import Session from '../models/session.js';
import { createAccessToken, verifyRefreshToken } from '../utils/jwt.js';

export const refresh_token_post = asyncHandler(async function (req, res) {
  const refreshToken = req.cookies.refresh;

  const payload = verifyRefreshToken(refreshToken);

  const activeSession = await Session.findOne({
    user: payload.sub,
  }).exec();

  if (activeSession && Date.now() < activeSession.expiry) {
    const accessToken = createAccessToken(payload.sub);
    return res.json({
      success: true,
      message: `Access for user ${payload.sub} refreshed`,
      token: accessToken,
    });
  }

  const cookieOptions = {
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
    secure: true,
  };

  res.clearCookie('refresh', cookieOptions);
  res.sendStatus(401);
});

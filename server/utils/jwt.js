import jwt from 'jsonwebtoken';

function createToken(username, admin, key, expiresIn) {
  return jwt.sign({ sub: username, admin }, key, {
    expiresIn,
    algorithm: 'RS256',
  });
}

export function createRefreshToken(username, admin) {
  return createToken(username, admin, process.env.REFRESH_PRIVATE_KEY, '1d');
}

export function createAccessToken(username, admin) {
  return createToken(username, admin, process.env.ACCESS_PRIVATE_KEY, '5m');
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_PUBLIC_KEY);
}

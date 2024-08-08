import jwt from 'jsonwebtoken';

function createToken(username, admin, id, key, expiresIn) {
  return jwt.sign({ sub: username, admin, id }, key, {
    expiresIn,
    algorithm: 'RS256',
  });
}

export function createRefreshToken(username, admin, id) {
  return createToken(
    username,
    admin,
    id,
    process.env.REFRESH_PRIVATE_KEY,
    '1d'
  );
}

export function createAccessToken(username, admin, id) {
  return createToken(
    username,
    admin,
    id,
    process.env.ACCESS_PRIVATE_KEY,
    '15m'
  );
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_PUBLIC_KEY);
}

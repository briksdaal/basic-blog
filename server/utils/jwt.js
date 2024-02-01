import jwt from 'jsonwebtoken';

function createToken(username, key, expiresIn) {
  return jwt.sign({ sub: username }, key, {
    expiresIn,
    algorithm: 'RS256',
  });
}

export function createRefreshToken(username) {
  return createToken(username, process.env.REFRESH_PRIVATE_KEY, '1d');
}

export function createAccessToken(username) {
  return createToken(username, process.env.ACCESS_PRIVATE_KEY, '5m');
}

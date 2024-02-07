import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import User from '../models/user.js';
import 'dotenv/config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_PUBLIC_KEY,
  algorithms: ['RS256'],
};

export const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const foundUser = await User.findOne({ email: payload.sub }).exec();

    if (!foundUser) {
      done(null, false, 'No user found');
    } else {
      done(null, foundUser);
    }
  } catch (err) {
    done(err, false);
  }
});

export const anonymousStrategy = new AnonymousStrategy();

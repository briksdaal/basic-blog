import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';
import 'dotenv/config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_PUBLIC_KEY,
  algorithms: ['RS256'],
};

const strategy = new Strategy(options, async (payload, done) => {
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

export default strategy;

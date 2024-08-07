import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import cors from 'cors';
import passport from 'passport';
import { jwtStrategy, anonymousStrategy } from './config/passport.js';
import createError from 'http-errors';

// mongoose configuration
import './config/mongoose.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import tokensRouter from './routes/tokens.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';
import uploadsRouter from './routes/uploads.js';

const app = express();

passport.use(jwtStrategy);
passport.use(anonymousStrategy);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/tokens', tokensRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/gridimages', uploadsRouter);

// catch 404 and forward error
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

export default app;

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import passport from 'passport';
import strategy from './config/passport.js';
import createError from 'http-errors';

// mongoose configuration
import './config/mongoose.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import indexRouter from './routes/index.js';
import protectedRouter from './routes/protected.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import tokensRouter from './routes/tokens.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';

const app = express();

passport.use(strategy);
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/protected', protectedRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/tokens', tokensRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

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

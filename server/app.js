import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import passport from 'passport';
import strategy from './config/passport.js';

// mongoose configuration
import './config/mongoose.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import indexRouter from './routes/index.js';
import protectedRouter from './routes/protected.js';
import registerRouter from './routes/register.js';

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
app.use('/register', registerRouter);

export default app;

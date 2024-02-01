import express from 'express';
import passport from 'passport';

const router = express.Router();

/* Authenticate to access all protected routes */
router.use(passport.authenticate('jwt', { session: false }));

/* GET protected route. */
router.get('/', async function (req, res, next) {
  res.json({ message: 'authorized to view a protected route' });
});

export default router;

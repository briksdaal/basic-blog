import express from 'express';
const router = express.Router();

/* GET protected route. */
router.get('/', async function (req, res, next) {
  res.json({ message: 'authorized to view a protected route' });
});

export default router;

import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.json({ message: 'index' });
});

export default router;

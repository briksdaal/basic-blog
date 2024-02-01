import express from 'express';
const router = express.Router();
import { logout_get } from '../controllers/logoutController.js';

/* GET request to logout user */
router.get('/', logout_get);

export default router;

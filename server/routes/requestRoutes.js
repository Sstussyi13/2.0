import express from 'express';
import { submitRequest } from '../controllers/requestController.js';

const router = express.Router();
router.post('/', submitRequest);

export default router;

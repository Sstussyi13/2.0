// routes/index.js
import express from 'express';
import contentRoutes from './contentRoutes.js';
import requestRoutes from './requestRoutes.js';

const router = express.Router();

router.use('/content', contentRoutes);
router.use('/requests', requestRoutes);

export default router;

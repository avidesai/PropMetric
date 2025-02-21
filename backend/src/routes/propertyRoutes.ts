// backend/src/routes/propertyRoutes.ts

import express from 'express';
import { createPropertyAnalysis } from '../controllers/propertyController';

const router = express.Router();

router.post('/', createPropertyAnalysis);

export default router;

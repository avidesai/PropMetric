// src/routes/propertyRoutes.ts

import { Router } from 'express';
import { validatePropertyInput } from '../middleware/validateProperty';
import {
  createPropertyAnalysis,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController';

const router = Router();

router.post('/', validatePropertyInput, createPropertyAnalysis);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', validatePropertyInput, updateProperty);
router.delete('/:id', deleteProperty);

export default router;
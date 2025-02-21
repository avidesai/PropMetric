// backend/src/controllers/propertyController.ts

import { Request, Response } from 'express';
import Property from '../models/Property';
import { calculateCashFlow } from '../utils/cashFlowCalculations';

export const createPropertyAnalysis = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const calculatedMetrics = calculateCashFlow(formData);
    
    const newProperty = new Property({
      ...formData,
      calculatedMetrics,
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create property analysis', error });
  }
};

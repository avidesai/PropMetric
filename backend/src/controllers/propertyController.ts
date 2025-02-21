// src/controllers/propertyController.ts
import { Request, Response } from 'express';
import Property from '../models/Property';
import { calculateCashFlow } from '../utils/cashFlowCalculations';
import { PropertyInput } from '../types/property';

export const createPropertyAnalysis = async (req: Request, res: Response): Promise<void> => {
  try {
    const formData = req.body as PropertyInput;
    const calculatedMetrics = calculateCashFlow(formData);
    
    const newProperty = new Property({
      ...formData,
      calculatedMetrics
    });
    
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Error creating property analysis:', error);
    res.status(500).json({ error: 'Failed to create property analysis' });
  }
};

export const getProperties = async (_req: Request, res: Response): Promise<void> => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const formData = req.body as PropertyInput;
    const calculatedMetrics = calculateCashFlow(formData);
    
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        ...formData,
        calculatedMetrics
      },
      { new: true }
    );
    
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    
    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
};

export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
};
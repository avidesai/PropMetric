// src/middleware/validateProperty.ts
import { Request, Response, NextFunction } from 'express';
import { PropertyInput } from '../types/property';

export const validatePropertyInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const input = req.body as PropertyInput;
    
    // Validate required fields
    const requiredFields = [
      'address',
      'purchasePrice',
      'squareFeet',
      'monthlyRentPerUnit',
      'numberOfUnits',
      'propertyTaxRate',
      'vacancyRate',
      'propertyManagementRate',
      'maintenanceReserveRate',
      'landlordInsurance',
      'hoaFees',
      'waterAndSewer',
      'gasAndElectricity',
      'garbage',
      'snowRemoval',
      'cablePhoneInternet',
      'pestControl',
      'accountingAdvertisingLegal',
      'desiredCapRate',
      'downPaymentPercentage',
      'lengthOfMortgage',
      'mortgageRate'
    ] as const;

    for (const field of requiredFields) {
      if (!(field in input) || input[field] === null || input[field] === undefined) {
        res.status(400).json({ error: `Missing or invalid required field: ${field}` });
        return;
      }
    }

    // Validate numerical values are numbers and non-negative
    const numericalFields = requiredFields.filter(
      field => typeof input[field] === 'number'
    );

    for (const field of numericalFields) {
      const value = input[field];
      if (typeof value !== 'number' || isNaN(value)) {
        res.status(400).json({ error: `${field} must be a valid number` });
        return;
      }
      if (value < 0) {
        res.status(400).json({ error: `${field} cannot be negative` });
        return;
      }
    }

    // Validate rates (should be between 0 and 1)
    const rateFields = [
      'propertyTaxRate',
      'vacancyRate',
      'propertyManagementRate',
      'maintenanceReserveRate',
      'desiredCapRate',
      'downPaymentPercentage',
      'mortgageRate'
    ] as const;

    for (const field of rateFields) {
      const value = input[field];
      if (typeof value === 'number' && (value < 0 || value > 1)) {
        res.status(400).json({ error: `${field} must be between 0 and 1` });
        return;
      }
    }

    // Validate specific fields
    if (input.numberOfUnits < 1) {
      res.status(400).json({ error: 'Number of units must be at least 1' });
      return;
    }

    if (input.lengthOfMortgage < 1) {
      res.status(400).json({ error: 'Length of mortgage must be at least 1 year' });
      return;
    }

    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ error: 'Invalid input data' });
  }
};
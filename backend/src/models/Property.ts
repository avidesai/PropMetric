// src/models/Property.ts
import mongoose, { Schema, Document } from 'mongoose';
import { PropertyInput, CalculatedMetrics } from '../types/property';

export interface IProperty extends Document {
  address: string;
  purchasePrice: number;
  squareFeet: number;
  monthlyRentPerUnit: number;
  numberOfUnits: number;
  propertyTaxRate: number;
  vacancyRate: number;
  propertyManagementRate: number;
  maintenanceReserveRate: number;
  landlordInsurance: number;
  hoaFees: number;
  waterAndSewer: number;
  gasAndElectricity: number;
  garbage: number;
  snowRemoval: number;
  cablePhoneInternet: number;
  pestControl: number;
  accountingAdvertisingLegal: number;
  desiredCapRate: number;
  downPaymentPercentage: number;
  lengthOfMortgage: number;
  mortgageRate: number;
  calculatedMetrics: CalculatedMetrics;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema({
  address: { type: String, required: true },
  purchasePrice: { type: Number, required: true, min: 0 },
  squareFeet: { type: Number, required: true, min: 0 },
  monthlyRentPerUnit: { type: Number, required: true, min: 0 },
  numberOfUnits: { type: Number, required: true, min: 1 },
  propertyTaxRate: { type: Number, required: true, min: 0, max: 1 },
  vacancyRate: { type: Number, required: true, min: 0, max: 1 },
  propertyManagementRate: { type: Number, required: true, min: 0, max: 1 },
  maintenanceReserveRate: { type: Number, required: true, min: 0, max: 1 },
  landlordInsurance: { type: Number, required: true, min: 0 },
  hoaFees: { type: Number, required: true, min: 0 },
  waterAndSewer: { type: Number, required: true, min: 0 },
  gasAndElectricity: { type: Number, required: true, min: 0 },
  garbage: { type: Number, required: true, min: 0 },
  snowRemoval: { type: Number, required: true, min: 0 },
  cablePhoneInternet: { type: Number, required: true, min: 0 },
  pestControl: { type: Number, required: true, min: 0 },
  accountingAdvertisingLegal: { type: Number, required: true, min: 0 },
  desiredCapRate: { type: Number, required: true, min: 0, max: 1 },
  downPaymentPercentage: { type: Number, required: true, min: 0, max: 1 },
  lengthOfMortgage: { type: Number, required: true, min: 1 },
  mortgageRate: { type: Number, required: true, min: 0, max: 1 },
  calculatedMetrics: {
    capRate: { type: Number, required: true },
    propertyValuation: { type: Number, required: true },
    cashOnCashReturn: { type: Number, required: true },
    monthlyCashFlow: { type: Number, required: true },
    annualCashFlow: { type: Number, required: true },
    monthlyOperatingExpenses: { type: Number, required: true },
    annualOperatingIncome: { type: Number, required: true },
    annualOperatingExpenses: { type: Number, required: true },
    annualNetOperatingIncome: { type: Number, required: true },
    monthlyMortgagePayment: { type: Number, required: true },
    downPayment: { type: Number, required: true },
    loanAmount: { type: Number, required: true },
    propertyManagementFees: { type: Number, required: true },
    propertyTax: { type: Number, required: true },
    maintenanceReserve: { type: Number, required: true },
    monthlyGrossIncome: { type: Number, required: true },
    vacancyLoss: { type: Number, required: true },
    monthlyRentalIncome: { type: Number, required: true },
    dollarPerSquareFoot: { type: Number, required: true },
    grossRentMultiplier: { type: Number, required: true }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model<IProperty>('Property', PropertySchema);
import mongoose, { Schema, Document } from 'mongoose';

interface IProperty extends Document {
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  utilities: number;
  calculatedMetrics: {
    monthlyMortgage: number;
    cashFlow: number;
    capRate: number;
    roi: number;
  };
}

const PropertySchema = new Schema({
  purchasePrice: { type: Number, required: true },
  downPayment: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  loanTerm: { type: Number, required: true },
  monthlyRent: { type: Number, required: true },
  propertyTax: { type: Number, required: true },
  insurance: { type: Number, required: true },
  maintenance: { type: Number, required: true },
  utilities: { type: Number, required: true },
  calculatedMetrics: {
    maintenanceReserve: { type: Number, default: 0 }, // Added maintenance reserve in calculated metrics
    capRate: { type: Number, default: 0 },
    propertyValuation: { type: Number, default: 0 },
    cashOnCashReturn: { type: Number, default: 0 },
    monthlyCashFlow: { type: Number, default: 0 },
    annualCashFlow: { type: Number, default: 0 },
    monthlyOperatingExpenses: { type: Number, default: 0 },
    annualOperatingIncome: { type: Number, default: 0 },
    annualOperatingExpenses: { type: Number, default: 0 },
    annualNetOperatingIncome: { type: Number, default: 0 },
    monthlyMortgagePayment: { type: Number, default: 0 },
    downPayment: { type: Number, default: 0 },
    loanAmount: { type: Number, default: 0 },
    propertyManagementFees: { type: Number, default: 0 },
    propertyTax: { type: Number, default: 0 },
    monthlyGrossIncome: { type: Number, default: 0 },
    vacancyLoss: { type: Number, default: 0 },
    monthlyRentalIncome: { type: Number, default: 0 },
    dollarPerSquareFoot: { type: Number, default: 0 },
    grossRentMultiplier: { type: Number, default: 0 },
  },
});

export default mongoose.model<IProperty>('Property', PropertySchema);

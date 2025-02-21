// src/types/property.ts
export interface PropertyInput {
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
  }
  
  export interface CalculatedMetrics {
    capRate: number;
    propertyValuation: number;
    cashOnCashReturn: number;
    monthlyCashFlow: number;
    annualCashFlow: number;
    monthlyOperatingExpenses: number;
    annualOperatingIncome: number;
    annualOperatingExpenses: number;
    annualNetOperatingIncome: number;
    monthlyMortgagePayment: number;
    downPayment: number;
    loanAmount: number;
    propertyManagementFees: number;
    propertyTax: number;
    maintenanceReserve: number;
    monthlyGrossIncome: number;
    vacancyLoss: number;
    monthlyRentalIncome: number;
    dollarPerSquareFoot: number;
    grossRentMultiplier: number;
  }
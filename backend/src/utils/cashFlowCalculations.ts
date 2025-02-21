// backend/src/utils/cashFlowCalculations.ts

export const calculateCashFlow = (formData: any) => {
    const {
      purchasePrice,
      squareFeet,
      monthlyRentPerUnit,
      numberOfUnits,
      propertyTaxRate,
      vacancyRate,
      propertyManagementRate,
      maintenanceReserveRate, // New addition
      landlordInsurance,
      hoaFees,
      waterAndSewer,
      gasAndElectricity,
      garbage,
      snowRemoval,
      cablePhoneInternet,
      pestControl,
      accountingAdvertisingLegal,
      desiredCapRate,
      downPaymentPercentage,
      lengthOfMortgage,
      mortgageRate,
    } = formData;
  
    // Income Calculations
    const monthlyRentalIncome = monthlyRentPerUnit * numberOfUnits;
    const vacancyLoss = monthlyRentalIncome * vacancyRate;
    const monthlyGrossIncome = monthlyRentalIncome - vacancyLoss;
  
    // Expense Calculations
    const propertyManagementFees = monthlyRentalIncome * propertyManagementRate;
    const propertyTax = (propertyTaxRate * purchasePrice) / 12;
    const maintenanceReserve = monthlyRentalIncome * maintenanceReserveRate; // Maintenance Reserve Calculation
    const monthlyOperatingExpenses =
      propertyManagementFees +
      propertyTax +
      maintenanceReserve + // Added Maintenance Reserve here
      landlordInsurance +
      hoaFees +
      waterAndSewer +
      gasAndElectricity +
      garbage +
      snowRemoval +
      cablePhoneInternet +
      pestControl +
      accountingAdvertisingLegal;
  
    // Annual Income and Expenses
    const annualOperatingIncome = monthlyGrossIncome * 12;
    const annualOperatingExpenses = monthlyOperatingExpenses * 12;
    const annualNetOperatingIncome = annualOperatingIncome - annualOperatingExpenses;
  
    // Mortgage Calculations
    const downPayment = purchasePrice * downPaymentPercentage;
    const loanAmount = purchasePrice - downPayment;
    const monthlyMortgagePayment =
      loanAmount > 0
        ? (loanAmount * mortgageRate / 12 * Math.pow(1 + mortgageRate / 12, lengthOfMortgage * 12)) /
          (Math.pow(1 + mortgageRate / 12, lengthOfMortgage * 12) - 1)
        : 0;
  
    // Final Metrics
    const capRate = annualNetOperatingIncome / purchasePrice;
    const propertyValuation = annualNetOperatingIncome / desiredCapRate;
    const dollarPerSquareFoot = purchasePrice / squareFeet;
    const grossRentMultiplier = purchasePrice / (monthlyRentalIncome * 12);
    const monthlyCashFlow = monthlyGrossIncome - monthlyOperatingExpenses - monthlyMortgagePayment;
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCashReturn = annualCashFlow / downPayment;
  
    return {
      capRate,
      propertyValuation,
      cashOnCashReturn,
      monthlyCashFlow,
      annualCashFlow,
      monthlyOperatingExpenses,
      annualOperatingIncome,
      annualOperatingExpenses,
      annualNetOperatingIncome,
      monthlyMortgagePayment,
      downPayment,
      loanAmount,
      propertyManagementFees,
      propertyTax,
      maintenanceReserve, // Return this for display
      monthlyGrossIncome,
      vacancyLoss,
      monthlyRentalIncome,
      dollarPerSquareFoot,
      grossRentMultiplier,
    };
  };
  
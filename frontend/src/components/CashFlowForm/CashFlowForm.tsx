// frontend/src/components/CashFlowForm/CashFlowForm.tsx

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const CashFlowForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<any>(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      address: '',
      purchasePrice: 0,
      squareFeet: 0,
      monthlyRentPerUnit: 0,
      numberOfUnits: 1,
      propertyTaxRate: 0,
      vacancyRate: 0,
      propertyManagementRate: 0,
      maintenanceReserveRate: 0,
      landlordInsurance: 0,
      desiredCapRate: 0,
      downPaymentPercentage: 0,
      lengthOfMortgage: 30,
      mortgageRate: 0,
    }
  });

  const onSubmit = async (formData: any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/properties', formData);
      setResults(response.data.calculatedMetrics);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <h2>Step {step} of 3</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <h3>Property Information</h3>
            <div>
              <label>Address</label>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => <input type="text" {...field} />}
              />
              {errors.address && <p className="error">{errors.address.message}</p>}
            </div>
            <div>
              <label>Purchase Price</label>
              <Controller
                name="purchasePrice"
                control={control}
                rules={{ required: "Purchase price is required", min: 1 }}
                render={({ field }) => <input type="number" {...field} />}
              />
              {errors.purchasePrice && <p className="error">{errors.purchasePrice.message}</p>}
            </div>
            <div>
              <label>Square Feet</label>
              <Controller
                name="squareFeet"
                control={control}
                rules={{ required: "Square feet is required", min: 1 }}
                render={({ field }) => <input type="number" {...field} />}
              />
              {errors.squareFeet && <p className="error">{errors.squareFeet.message}</p>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Expense Information</h3>
            <div>
              <label>Property Tax Rate (%)</label>
              <Controller
                name="propertyTaxRate"
                control={control}
                rules={{ required: "Property tax rate is required", min: 0 }}
                render={({ field }) => <input type="number" {...field} />}
              />
              {errors.propertyTaxRate && <p className="error">{errors.propertyTaxRate.message}</p>}
            </div>
            <div>
              <label>Maintenance Reserve Rate (%)</label>
              <Controller
                name="maintenanceReserveRate"
                control={control}
                render={({ field }) => <input type="number" {...field} />}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3>Financing Information</h3>
            <div>
              <label>Desired Cap Rate (%)</label>
              <Controller
                name="desiredCapRate"
                control={control}
                rules={{ required: "Cap rate is required", min: 0 }}
                render={({ field }) => <input type="number" {...field} />}
              />
              {errors.desiredCapRate && <p className="error">{errors.desiredCapRate.message}</p>}
            </div>
            <div>
              <label>Down Payment Percentage (%)</label>
              <Controller
                name="downPaymentPercentage"
                control={control}
                rules={{ required: "Down payment percentage is required", min: 0, max: 100 }}
                render={({ field }) => <input type="number" {...field} />}
              />
              {errors.downPaymentPercentage && <p className="error">{errors.downPaymentPercentage.message}</p>}
            </div>
          </>
        )}

        <div>
          {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {step < 3 ? (
            <button type="button" onClick={nextStep}>Next</button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>

      {results && (
        <div>
          <h3>Results Summary</h3>
          <p>Monthly Cash Flow: ${results.monthlyCashFlow.toFixed(2)}</p>
          <p>Annual Cash Flow: ${results.annualCashFlow.toFixed(2)}</p>
          <p>Cap Rate: {(results.capRate * 100).toFixed(2)}%</p>
          <p>Cash on Cash Return: {(results.cashOnCashReturn * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default CashFlowForm;

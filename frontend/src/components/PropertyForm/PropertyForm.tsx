import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Types from your backend
interface PropertyInput {
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

const PropertyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PropertyInput>({
    defaultValues: {
      numberOfUnits: 1,
      propertyTaxRate: 0.02,
      vacancyRate: 0.05,
      propertyManagementRate: 0.1,
      maintenanceReserveRate: 0.05,
      desiredCapRate: 0.06,
      downPaymentPercentage: 0.2,
      lengthOfMortgage: 30,
      mortgageRate: 0.065,
    }
  });

  const onSubmit = async (data: PropertyInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save property');
      }
      
      const result = await response.json();
      console.log('Property saved:', result);
      // Handle success (e.g., redirect to dashboard or show success message)
    } catch (err) {
      setError('Failed to save property. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Property Information */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Property Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Property Address</label>
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Price ($)</label>
              <input
                type="number"
                {...register('purchasePrice', { required: 'Purchase price is required', min: 0 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.purchasePrice && <p className="mt-1 text-sm text-red-600">{errors.purchasePrice.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Square Feet</label>
              <input
                type="number"
                {...register('squareFeet', { required: 'Square feet is required', min: 0 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.squareFeet && <p className="mt-1 text-sm text-red-600">{errors.squareFeet.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Rental Information */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Rental Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Rent per Unit ($)</label>
            <input
              type="number"
              {...register('monthlyRentPerUnit', { required: 'Monthly rent is required', min: 0 })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Units</label>
            <input
              type="number"
              {...register('numberOfUnits', { required: 'Number of units is required', min: 1 })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Operating Expenses */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Operating Expenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'landlordInsurance', label: 'Landlord Insurance ($)' },
            { name: 'hoaFees', label: 'HOA Fees ($)' },
            { name: 'waterAndSewer', label: 'Water & Sewer ($)' },
            { name: 'gasAndElectricity', label: 'Gas & Electricity ($)' },
            { name: 'garbage', label: 'Garbage ($)' },
            { name: 'snowRemoval', label: 'Snow Removal ($)' },
            { name: 'cablePhoneInternet', label: 'Cable/Phone/Internet ($)' },
            { name: 'pestControl', label: 'Pest Control ($)' },
            { name: 'accountingAdvertisingLegal', label: 'Accounting/Advertising/Legal ($)' }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type="number"
                {...register(field.name as keyof PropertyInput, { required: true, min: 0 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rates and Percentages */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Rates and Percentages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'propertyTaxRate', label: 'Property Tax Rate (%)', step: 0.001 },
            { name: 'vacancyRate', label: 'Vacancy Rate (%)', step: 0.001 },
            { name: 'propertyManagementRate', label: 'Property Management Rate (%)', step: 0.001 },
            { name: 'maintenanceReserveRate', label: 'Maintenance Reserve Rate (%)', step: 0.001 },
            { name: 'desiredCapRate', label: 'Desired Cap Rate (%)', step: 0.001 }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type="number"
                step={field.step}
                {...register(field.name as keyof PropertyInput, { required: true, min: 0, max: 1 })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Financing Information */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Financing Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Down Payment (%)</label>
            <input
              type="number"
              step="0.01"
              {...register('downPaymentPercentage', { required: true, min: 0, max: 1 })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mortgage Length (years)</label>
            <input
              type="number"
              {...register('lengthOfMortgage', { required: true, min: 1 })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mortgage Rate (%)</label>
            <input
              type="number"
              step="0.001"
              {...register('mortgageRate', { required: true, min: 0, max: 1 })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Property'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
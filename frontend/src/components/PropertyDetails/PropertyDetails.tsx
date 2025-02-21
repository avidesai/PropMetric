// frontend/src/components/PropertyDetails/PropertyDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Property {
  address: string;
  purchasePrice: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  propertyValuation: number;
  propertyManagementFees: number;
  propertyTax: number;
  maintenanceReserve: number;
  loanAmount: number;
  monthlyMortgagePayment: number;
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Failed to fetch property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Property Details: {property.address}</h2>
      <p><strong>Purchase Price:</strong> ${property.purchasePrice.toFixed(2)}</p>
      <p><strong>Monthly Cash Flow:</strong> ${property.monthlyCashFlow.toFixed(2)}</p>
      <p><strong>Annual Cash Flow:</strong> ${property.annualCashFlow.toFixed(2)}</p>
      <p><strong>Cap Rate:</strong> {(property.capRate * 100).toFixed(2)}%</p>
      <p><strong>Cash on Cash Return:</strong> {(property.cashOnCashReturn * 100).toFixed(2)}%</p>
      <p><strong>Property Valuation:</strong> ${property.propertyValuation.toFixed(2)}</p>
      <p><strong>Loan Amount:</strong> ${property.loanAmount.toFixed(2)}</p>
      <p><strong>Monthly Mortgage Payment:</strong> ${property.monthlyMortgagePayment.toFixed(2)}</p>
      <p><strong>Maintenance Reserve:</strong> ${property.maintenanceReserve.toFixed(2)}</p>
    </div>
  );
};

export default PropertyDetails;

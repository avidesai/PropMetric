// frontend/src/components/SavedProperties/SavedProperties.tsx 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

interface Property {
  _id: string;
  address: string;
  purchasePrice: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  propertyValuation: number;
}

const SavedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Saved Properties Dashboard</h2>
      {properties.length > 0 ? (
        <>
          <div style={{ width: '80%', margin: '20px auto' }}>
            <h3>Monthly and Annual Cash Flow</h3>
            <Bar
              data={{
                labels: properties.map((p) => p.address),
                datasets: [
                  { label: 'Monthly Cash Flow', data: properties.map((p) => p.monthlyCashFlow), backgroundColor: 'rgba(75, 192, 192, 0.6)' },
                  { label: 'Annual Cash Flow', data: properties.map((p) => p.annualCashFlow), backgroundColor: 'rgba(153, 102, 255, 0.6)' },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
            />
          </div>

          <div style={{ width: '80%', margin: '20px auto' }}>
            <h3>Property Valuation Comparison</h3>
            <Line
              data={{
                labels: properties.map((p) => p.address),
                datasets: [
                  { label: 'Property Valuation', data: properties.map((p) => p.propertyValuation), borderColor: 'rgba(255, 99, 132, 0.6)', tension: 0.1 },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
            />
          </div>

          <ul>
            {properties.map((property) => (
              <li key={property._id}>
                <Link to={`/property/${property._id}`}><strong>{property.address}</strong></Link>
                - Monthly Cash Flow: ${property.monthlyCashFlow.toFixed(2)}, Cap Rate: {(property.capRate * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No saved properties yet.</p>
      )}
    </div>
  );
};

export default SavedProperties;

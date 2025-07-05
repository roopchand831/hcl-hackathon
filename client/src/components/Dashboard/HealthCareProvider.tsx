import React from 'react';
import './HealthCareProvider.css';

// Define types for the healthcare provider object
interface HealthCareProviderProps {
  provider: {
    name: string;
  };
}

const HealthCareProvider: React.FC<HealthCareProviderProps> = ({ provider }) => {
  return (
    <div className="provider-card">
      <h2>Healthcare Provider</h2>
      <p><strong>Name:</strong> {provider.name}</p>
    </div>
  );
};

export default HealthCareProvider;

import React from 'react';
import './Patient.css';

// Define types for the patient object
interface PatientProps {
  patient: {
    name: string;
  };
}

const Patient: React.FC<PatientProps> = ({ patient }) => {
  return (
    <div className="patient-card">
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
    </div>
  );
};

export default Patient;

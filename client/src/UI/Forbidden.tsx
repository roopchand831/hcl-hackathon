import React from 'react';
import './Forbidden.css';

const ForbiddenPage: React.FC = () => {
  return (
    <div className="forbidden-container">
      <div className="forbidden-card">
        <h1 className="forbidden-title">403</h1>
        <p className="forbidden-message">Access Forbidden</p>
        <p className="forbidden-description">
          Sorry, you do not have permission to view this page.
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;

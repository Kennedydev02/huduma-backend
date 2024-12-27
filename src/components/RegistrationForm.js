import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

const RegistrationForm = () => {
  return (
    <div className="form-container">
      <div className="form-content">
        <img src="/logo.png" alt="Logo" className="logo" />
        
        {/* Form fields with proper labels */}
        <div className="form-field">
          <label htmlFor="date">Select Date</label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Choose a date"
            className="date-picker-input"
          />
        </div>
        
        {/* Other form fields */}
      </div>
    </div>
  );
};

export default RegistrationForm; 
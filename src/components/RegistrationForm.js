import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

const RegistrationForm = () => {
  return (
    <div className="form-container">
      {/* Your existing form content */}
      <div className="form-field">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Date"
          className="date-picker-input"
        />
      </div>
    </div>
  );
};

export default RegistrationForm; 
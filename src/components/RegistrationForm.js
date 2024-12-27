import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

const RegistrationForm = () => {
  const [date, setDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  return (
    <div className="form-container">
      <div className="form-content">
        <img src="/logo.png" alt="Logo" className="logo" />
        
        <div className="form-field">
          <label htmlFor="date">Select Date</label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => {
              setDate(date);
              setIsDatePickerOpen(false);
            }}
            onCalendarOpen={() => setIsDatePickerOpen(true)}
            onCalendarClose={() => setIsDatePickerOpen(false)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Choose a date"
            className="date-picker-input"
          />
        </div>
        
        {/* Backdrop when date picker is open on mobile */}
        {isDatePickerOpen && (
          <div 
            className="react-datepicker-backdrop"
            onClick={() => setIsDatePickerOpen(false)}
          />
        )}
        
        {/* Other form fields */}
      </div>
    </div>
  );
};

export default RegistrationForm; 
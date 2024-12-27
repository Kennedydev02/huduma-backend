import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import logo from './logo.png'; // Adjust the path based on your logo's location

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    identificationNumber: '',
    
    // Contact Information
    phoneNumber: '',
    email: '',
    address: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    
    // Program
    preferredProgram: '',
    joiningDate: '',
    
    // Accommodation
    requiresAccommodation: false,
    checkInDate: '',
    
    // Airport Pickup
    requiresPickup: false,
    arrivalDate: '',
    arrivalTime: '',
    
    // Additional
    photo: null,
    needsAccommodation: '',
  });

  // Add validation state
  const [errors, setErrors] = useState({});

  // Add error feedback state
  const [showError, setShowError] = useState(false);

  // Add new state for submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Validation patterns
  const validationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[1-9]\d{1,14}$/,
    name: /^[a-zA-Z\s'-]{2,50}$/,
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Enhanced validation function
  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.identificationNumber) newErrors.identificationNumber = 'ID number is required';
        break;

      case 2:
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!validationPatterns.phone.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        }
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!validationPatterns.email.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.address?.trim()) {
          newErrors.address = 'Address is required';
        }
        break;

      case 3:
        if (!formData.emergencyName) {
          newErrors.emergencyName = 'Emergency contact name is required';
        } else if (!validationPatterns.name.test(formData.emergencyName)) {
          newErrors.emergencyName = 'Please enter a valid name';
        }
        if (!formData.emergencyPhone) {
          newErrors.emergencyPhone = 'Emergency contact phone is required';
        } else if (!validationPatterns.phone.test(formData.emergencyPhone)) {
          newErrors.emergencyPhone = 'Please enter a valid phone number';
        }
        if (!formData.emergencyRelation?.trim()) {
          newErrors.emergencyRelation = 'Relationship is required';
        }
        break;

      case 4:
        if (!formData.preferredProgram) {
          newErrors.preferredProgram = 'Please select a program';
        }
        if (!formData.joiningDate) {
          newErrors.joiningDate = 'Start date is required';
        } else {
          const startDate = new Date(formData.joiningDate);
          const today = new Date();
          if (startDate < today) {
            newErrors.joiningDate = 'Start date must be in the future';
          }
        }
        break;

      case 5:
        if (formData.needsAccommodation === '') {
          newErrors.accommodation = 'Please select whether you need accommodation';
        }
        if (formData.needsAccommodation && !formData.checkInDate) {
          newErrors.checkInDate = 'Please select your check-in date';
        }
        break;

      case 6:
        if (formData.needsAirportPickup) {
          if (!formData.arrivalDate) {
            newErrors.arrivalDate = 'Arrival date is required';
          }
          if (!formData.arrivalTime) {
            newErrors.arrivalTime = 'Arrival time is required';
          }
        }
        break;
    }

    setErrors(newErrors);
    setShowError(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Full Name
              </label>
              <input 
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={getInputClassName('fullName')}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Date of Birth
              </label>
              <input 
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={getInputClassName('dateOfBirth')}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Gender
              </label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={getInputClassName('gender')}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                ID/Passport Number
              </label>
              <input 
                type="text"
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleInputChange}
                placeholder="Enter ID/Passport number"
                className={getInputClassName('identificationNumber')}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Phone Number
              </label>
              <input 
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className={getInputClassName('phoneNumber')}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Email Address
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={getInputClassName('email')}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Address
              </label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className={`${getInputClassName('address')} resize-none`}
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Emergency Contact Name
              </label>
              <input 
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleInputChange}
                placeholder="Emergency contact name"
                className={getInputClassName('emergencyName')}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Emergency Contact Phone
              </label>
              <input 
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                placeholder="Emergency contact phone"
                className={getInputClassName('emergencyPhone')}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#1B3168] text-sm font-medium">
                Relationship
              </label>
              <input 
                type="text"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleInputChange}
                placeholder="Relationship to emergency contact"
                className={getInputClassName('emergencyRelation')}
              />
            </div>
          </div>
        );

      case 4:
        return renderProgramStep();

      case 5:
        return renderAccommodationStep();

      case 6:
        return renderAirportPickupStep();

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return "Personal Information";
      case 2: return "Contact Information";
      case 3: return "Emergency Contact";
      case 4: return "Program Enrollment";
      case 5: return "Accommodation";
      case 6: return "Airport Pickup";
      default: return "";
    }
  };

  // Add submission handler
  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        setIsSubmitted(true);
        
        const response = await fetch('https://your-api-domain.com/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }

        setShowThankYou(true);
      } catch (error) {
        console.error('Submission error:', error);
        setIsSubmitted(false);
        alert('There was an error submitting your form. Please try again.');
      }
    }
  };

  // Update your handleContinue function
  const handleContinue = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // If we're on the last step, trigger submit
        handleSubmit();
      }
    }
  };

  // Updated program enrollment step
  const renderProgramStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <label className="block text-[#1B3168] text-lg font-medium mb-4">
            Select Your Program
          </label>
          {[
            { id: '75hrs', name: '75HRS Course', description: 'Comprehensive training program for caregivers' },
            { id: 'firstaid', name: 'FIRST AID & CPR', description: 'Essential life-saving techniques and certification' },
            { id: 'hca', name: 'HCA SKILLS EXAM PRACTICE', description: 'Preparation for HCA certification exam' }
          ].map((program) => (
            <motion.div
              key={program.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all
                ${formData.preferredProgram === program.id 
                  ? 'border-[#4CAF50] bg-[#4CAF50]/5' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'}`}
              onClick={() => handleInputChange({ 
                target: { name: 'preferredProgram', value: program.id }
              })}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${formData.preferredProgram === program.id 
                    ? 'border-[#4CAF50] bg-[#4CAF50]' 
                    : 'border-gray-300'}`}
                >
                  {formData.preferredProgram === program.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1B3168]">{program.name}</h3>
                  <p className="text-gray-600 text-sm">{program.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-[#1B3168] text-sm font-medium">
            Preferred Start Date
          </label>
          <input 
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleInputChange}
            className={getInputClassName('joiningDate')}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.joiningDate && (
            <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAccommodationStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-[#1B3168] text-lg font-medium">
          Do you need accommodation?
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleInputChange({
              target: { name: 'needsAccommodation', value: true }
            })}
            className={`p-4 rounded-xl border-2 transition-all
              ${formData.needsAccommodation === true
                ? 'border-[#4CAF50] bg-[#4CAF50]/5'
                : 'border-gray-200'}`}
          >
            <span className="text-lg font-medium text-[#1B3168]">Yes</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleInputChange({
              target: { name: 'needsAccommodation', value: false }
            })}
            className={`p-4 rounded-xl border-2 transition-all
              ${formData.needsAccommodation === false
                ? 'border-[#4CAF50] bg-[#4CAF50]/5'
                : 'border-gray-200'}`}
          >
            <span className="text-lg font-medium text-[#1B3168]">No</span>
          </button>
        </div>
      </div>

      {formData.needsAccommodation && (
        <div className="space-y-4 mt-6">
          <label className="block text-[#1B3168] text-lg font-medium">
            Preferred Check-in Date
          </label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full p-4 border-2 rounded-xl ${
              errors.checkInDate ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.checkInDate && (
            <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>
          )}
        </div>
      )}
    </div>
  );

  const renderAirportPickupStep = () => (
    <div className="space-y-8">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="space-y-4">
          <label className="block text-[#1B3168] text-lg font-medium">
            Do you need airport pickup?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Yes', 'No'].map((option) => (
              <motion.div
                key={option}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all
                  ${formData.needsAirportPickup === (option === 'Yes')
                    ? 'border-[#4CAF50] bg-[#4CAF50]/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                onClick={() => handleInputChange({
                  target: { name: 'needsAirportPickup', value: option === 'Yes' }
                })}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${formData.needsAirportPickup === (option === 'Yes')
                      ? 'border-[#4CAF50] bg-[#4CAF50]'
                      : 'border-gray-300'}`}
                  >
                    {formData.needsAirportPickup === (option === 'Yes') && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-white rounded-full"
                      />
                    )}
                  </div>
                  <span className="text-lg font-medium text-[#1B3168]">{option}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {formData.needsAirportPickup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-[#1B3168] text-sm font-medium">
                  Arrival Date
                </label>
                <DatePicker
                  selected={formData.arrivalDate ? new Date(formData.arrivalDate) : null}
                  onChange={(date) => handleInputChange({
                    target: { name: 'arrivalDate', value: date.toISOString().split('T')[0] }
                  })}
                  minDate={new Date()}
                  placeholderText="Select arrival date"
                  className={getInputClassName('arrivalDate')}
                  dateFormat="MMMM d, yyyy"
                  calendarClassName="border-2 border-gray-200 rounded-lg shadow-lg"
                />
                {errors.arrivalDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.arrivalDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#1B3168] text-sm font-medium">
                  Arrival Time
                </label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  className={getInputClassName('arrivalTime')}
                />
                {errors.arrivalTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.arrivalTime}</p>
                )}
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-600">
                  Airport pickup is available for Seattle-Tacoma International Airport (SEA) only.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  // Update the inputClassName to be a function that takes a fieldName parameter
  const getInputClassName = (fieldName) => `
    w-full px-6 py-4 
    bg-white 
    border-2 border-gray-200 
    rounded-2xl
    text-[#1B3168] 
    placeholder-[#1B3168]/40
    focus:outline-none 
    focus:border-[#4CAF50] 
    focus:ring-2 
    focus:ring-[#4CAF50]/20
    transition-all 
    duration-300
    shadow-sm
    hover:border-gray-300
    ${errors[fieldName] ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
  `;

  // Add Thank You component
  const ThankYouMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-8"
    >
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#1B3168] mb-4">
        Thank You for Your Registration!
      </h2>
      
      <div className="space-y-4 text-gray-600">
        <p>
          Your application has been successfully submitted.
        </p>
        <p>
          A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
        </p>
        <p>
          Our team will review your application and contact you within 24-48 hours.
        </p>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-start space-x-3">
          <svg 
            className="w-5 h-5 text-blue-500 mt-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p className="text-sm text-blue-600 text-left">
            If you don't receive the confirmation email, please check your spam folder 
            or contact us at support@hudumacenter.com
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => window.location.reload()}
        className="mt-8 px-8 py-3 bg-[#4CAF50] text-white rounded-xl
                   hover:bg-[#45a049] transition-all duration-300"
      >
        Submit Another Application
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-white p-4 pt-8">
      {/* Error Popup */}
      {showError && Object.keys(errors).length > 0 && (
        <div className="fixed inset-0 flex items-start justify-center z-50 pt-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white rounded-lg shadow-2xl p-6 mx-4 w-full max-w-md pointer-events-auto"
            style={{
              background: 'linear-gradient(to right, #FFF5F5, #FFF)',
              borderRadius: '12px'
            }}
          >
            <div className="flex items-start space-x-4">
              {/* Error Icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg 
                    className="h-5 w-5 text-red-500" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  Please correct the following errors:
                </h3>
                <ul className="space-y-2">
                  {Object.values(errors).map((error, index) => (
                    <li 
                      key={index}
                      className="text-red-700 flex items-center"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowError(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-500 
                         transition-colors duration-150 focus:outline-none"
              >
                <svg 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="relative w-full max-w-4xl mx-auto mb-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <img 
            src={logo} 
            alt="Huduma Center Logo" 
            className="h-16 md:h-20 lg:h-24 w-auto object-contain"
          />
          <h1 className="text-[#1B3168] text-xl md:text-2xl lg:text-3xl font-semibold text-center">
            Student Registration
          </h1>
        </div>

        {/* Form Card with Enhanced Shadow */}
        <div className="rounded-2xl overflow-hidden
                      shadow-[rgba(0,_0,_0,_0.15)_0px_20px_60px_-10px,_rgba(27,_49,_104,_0.15)_0px_12px_36px_-18px]
                      hover:shadow-[rgba(0,_0,_0,_0.2)_0px_25px_70px_-12px,_rgba(27,_49,_104,_0.2)_0px_15px_40px_-20px]
                      transition-shadow duration-500 ease-in-out
                      transform hover:-translate-y-1
                      bg-white
                      relative">
          {/* Decorative top glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-[#4CAF50] blur-3xl opacity-20"></div>
          
          {/* Progress Steps */}
          <div className="p-6 bg-gradient-to-r from-[#1B3168] to-[#2A4580]
                        relative z-10">
            <div className="flex items-center justify-between gap-2">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full ${
                    index + 1 <= currentStep
                      ? 'bg-[#4CAF50]'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-white text-lg md:text-xl font-medium">
                {getStepTitle()}
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 bg-white relative z-10">
            {showThankYou ? (
              <ThankYouMessage />
            ) : (
              <>
                {renderStepContent()}
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <button 
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 
                                bg-[#1B3168] 
                                hover:bg-[#2A4580] 
                                text-white 
                                font-semibold 
                                rounded-xl
                                transition-all 
                                duration-300 
                                shadow-lg
                                hover:shadow-xl
                                flex items-center 
                                space-x-2"
                      disabled={isSubmitted}
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span>Previous</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={handleContinue}
                    className={`px-8 py-3 
                              bg-[#4CAF50] 
                              hover:bg-[#45a049] 
                              text-white 
                              font-semibold 
                              rounded-xl
                              transition-all 
                              duration-300 
                              shadow-lg
                              hover:shadow-xl
                              flex items-center 
                              space-x-2
                              ${currentStep === 1 ? 'ml-auto' : ''}`}
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      <>
                        <span>{currentStep === totalSteps ? 'Submit' : 'Continue'}</span>
                        {currentStep !== totalSteps && (
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] 
                        p-4 text-white text-center relative z-10">
            <p className="text-sm">
              © 2024 Huduma Center. All rights reserved.
            </p>
          </div>

          {/* Decorative bottom shadow - reduced spread */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/20 blur-xl rounded-full"></div>
        </div>

        {/* Adjusted ambient glow */}
        <div className="absolute -inset-20 bg-gradient-to-r from-[#1B3168]/5 via-[#4CAF50]/5 to-[#1B3168]/5 blur-3xl -z-10 rounded-full"></div>
      </div>
    </div>
  );
}

export default App;

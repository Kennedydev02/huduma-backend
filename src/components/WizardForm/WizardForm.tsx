import React, { useState } from 'react';
import { FormData, FormStep } from '../../types/form.types';

const WizardForm = () => {
  const [currentStep] = useState<FormStep>('personal');

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <form>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default WizardForm; 
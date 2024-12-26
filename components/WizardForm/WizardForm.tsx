import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData, FormStep } from '@/types/form.types';
import StepIndicator from './StepIndicator';
import NavigationButtons from './NavigationButtons';
import useFormAutosave from '@/hooks/useFormAutosave';

const WizardForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [formData, setFormData] = useState<FormData>(() => {
    // Load saved data from localStorage
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : {};
  });

  const { saveForm, isSaving } = useFormAutosave();

  const handleUpdateForm = (updates: Partial<FormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      saveForm(newData);
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl">
        <div className="p-6 md:p-8">
          <StepIndicator currentStep={currentStep} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {/* Render current step component */}
              {renderStep(currentStep, formData, handleUpdateForm)}
            </motion.div>
          </AnimatePresence>

          <NavigationButtons
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default WizardForm; 
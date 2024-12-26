import { FormStep, FormData } from '@/types/form.types';

interface NavigationButtonsProps {
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
  formData: FormData;
  isSaving: boolean;
}

const NavigationButtons = ({
  currentStep,
  setCurrentStep,
  formData,
  isSaving,
}: NavigationButtonsProps) => {
  const steps: FormStep[] = [
    'personal',
    'contact',
    'emergency',
    'program',
    'accommodation',
    'airport',
    'additional',
  ];

  const currentIndex = steps.indexOf(currentStep);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="mt-8 flex justify-between">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`px-6 py-2 rounded-lg ${
          currentIndex === 0
            ? 'bg-gray-200 text-gray-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentIndex === steps.length - 1 || isSaving}
        className={`px-6 py-2 rounded-lg ${
          currentIndex === steps.length - 1 || isSaving
            ? 'bg-gray-200 text-gray-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isSaving ? 'Saving...' : 'Next'}
      </button>
    </div>
  );
};

export default NavigationButtons; 
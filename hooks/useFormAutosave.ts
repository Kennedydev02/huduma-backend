import { useState, useCallback } from 'react';
import { FormData } from '@/types/form.types';

const useFormAutosave = () => {
  const [isSaving, setIsSaving] = useState(false);

  const saveForm = useCallback(async (data: FormData) => {
    setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('formData', JSON.stringify(data));
      
      // Simulate API call to save to database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Here you would typically make an API call to save the data
      // await api.saveFormData(data);
      
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { saveForm, isSaving };
};

export default useFormAutosave; 
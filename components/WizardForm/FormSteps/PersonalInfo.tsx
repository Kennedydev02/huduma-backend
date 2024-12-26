import { FormData } from '@/types/form.types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface PersonalInfoProps {
  data: FormData;
  onUpdate: (updates: Partial<FormData>) => void;
}

const PersonalInfo = ({ data, onUpdate }: PersonalInfoProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Personal Information
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Full Name"
          value={data.fullName || ''}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          placeholder="Enter your full name"
          required
        />
        
        <Input
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth || ''}
          onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
          required
        />
        
        <Select
          label="Gender"
          value={data.gender || ''}
          onChange={(e) => onUpdate({ gender: e.target.value as FormData['gender'] })}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]}
          required
        />
        
        <Input
          label="National ID/Passport Number"
          value={data.identificationNumber || ''}
          onChange={(e) => onUpdate({ identificationNumber: e.target.value })}
          placeholder="Enter your ID number"
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfo; 
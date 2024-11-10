import React from 'react';
import { User, Mail } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
}

interface PersonalDetailsFormProps {
  currentValue: FormData;
  onChange: (value: FormData) => void;
}

const FormInput = ({ 
  icon, 
  type, 
  value, 
  onChange, 
  placeholder,
  autoComplete 
}: { 
  icon: React.ReactNode;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
}) => (
  <div className="relative flex-1">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-300 focus:ring focus:ring-blue-100 focus:ring-opacity-50 outline-none transition-all"
    />
  </div>
);

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ currentValue, onChange }) => {
  const handleFieldChange = (field: keyof FormData, value: string) => {
    onChange({
      ...currentValue,
      [field]: value
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormInput
            icon={<User className="w-5 h-5" />}
            type="text"
            value={currentValue.name || ''}
            onChange={(value) => handleFieldChange('name', value)}
            placeholder="Your full name"
            autoComplete="name"
          />
          <FormInput
            icon={<Mail className="w-5 h-5" />}
            type="email"
            value={currentValue.email || ''}
            onChange={(value) => handleFieldChange('email', value)}
            placeholder="Your email address"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-blue-800 font-medium mb-2">Why we need this information</h3>
        <p className="text-blue-600 text-sm">
          We use your details to personalize your learning experience and provide relevant job recommendations. 
          Your information is secure and will never be shared without your permission.
        </p>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
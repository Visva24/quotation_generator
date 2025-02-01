import React from 'react';

interface ToggleSwitchProps {
  options: string[]; 
  value: string; 
  onChange: (value: string) => void; 
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ options, value, onChange }) => {
  return (
    <div className="inline-flex gap-4 px-2 py-1 rounded-full bg-[#EFEFEF]">
      {options.map((option) => (
        <div
          key={option}
          onClick={() => onChange(option)}
          className={`cursor-pointer px-10 py-2 rounded-full ${
            value === option ? 'bg-[#1D1D1D] text-white' : 'text-gray-600'
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default ToggleSwitch;


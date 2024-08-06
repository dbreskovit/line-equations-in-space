import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border rounded-lg py-2 px-3 bg-slate-900 border-indigo-600 placeholder-gray-400 text-white flex-1 min-w-[60px]"
    />
  );
};

export default Input;

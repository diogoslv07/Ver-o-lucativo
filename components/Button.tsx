import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  fullWidth = false
}) => {
  const baseStyles = "font-heading font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 text-lg md:text-xl leading-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-summer-500 to-summer-600 text-acai-900 border-b-4 border-summer-700 active:border-b-0 active:translate-y-1",
    secondary: "bg-white text-acai-800 border-2 border-acai-100 hover:bg-acai-50",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
      <ArrowRight className="w-6 h-6 animate-pulse" />
    </button>
  );
};
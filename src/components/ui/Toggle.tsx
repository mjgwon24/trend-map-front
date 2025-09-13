import React from 'react';

interface ToggleProps {
  isActive: boolean;
  onChange: () => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
}

export default function Toggle({
  isActive,
  onChange,
  size = 'md',
  label,
  activeColor = 'bg-gray-400',
  inactiveColor = 'bg-gray-700',
  className = '',
}: ToggleProps) {
  const sizeStyles = {
    sm: {
      container: 'w-7 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-3',
    },
    md: {
      container: 'w-9 h-5',
      thumb: 'w-3.5 h-3.5',
      translate: 'translate-x-4',
    },
    lg: {
      container: 'w-12 h-6',
      thumb: 'w-4 h-4',
      translate: 'translate-x-6',
    },
  };

  const { container, thumb, translate } = sizeStyles[size];
  const bgColor = isActive ? activeColor : inactiveColor;

  return (
    <button
      onClick={onChange}
      className={`
        ${container} rounded-full p-0.5 
        ${bgColor}
        transition-colors duration-200 ease-in-out
        relative
        ${className}
      `}
      role="switch"
      aria-checked={isActive}
      aria-label={label || 'Toggle'}
    >
      <div
        className={`
          bg-white rounded-full shadow-md transform transition-transform
          ${thumb}
          ${isActive ? translate : ''}
        `}
      />
    </button>
  );
}
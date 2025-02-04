import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;  // Allow `className` to be passed
  onClick?: () => void;
  variant?: "outline" | "ghost" | "filled"; // Button variant
  size?: "sm" | "md" | "lg"; // Button size
  disabled?: boolean; // Button disabled state
};

export const Button = ({
  children,
  className,
  onClick,
  variant = "filled",  // Default variant is "filled"
  size = "md",         // Default size is "md"
  disabled = false,    // Default disabled state is false
}: ButtonProps) => {
  // Set dynamic styles for variant and size
  const variantClasses = {
    outline: 'border-2 border-[#B88E2F] text-[#B88E2F] bg-transparent',
    ghost: 'bg-transparent text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white',
    filled: 'bg-[#B88E2F] text-white hover:bg-[#A37B27]',
  };

  const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  // Combine all classes
  const buttonClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled} // Handle disabled state
    >
      {children}
    </button>
  );
};

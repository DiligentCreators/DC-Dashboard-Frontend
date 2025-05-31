import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-md border border-gray-300 bg-gray-100 px-3 py-2
          text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600
          dark:bg-gray-700 dark:text-white dark:placeholder-gray-500
          ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;

import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { motion } from "framer-motion";

interface InputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  error?: string;
  touched?: boolean;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onPasswordToggle?: () => void;
}

const Input = ({
  label,
  id,
  name,
  type = "text",
  error,
  touched,
  showPasswordToggle,
  showPassword,
  onPasswordToggle,
  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          id={id}
          name={name}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={onPasswordToggle}
          >
            {showPassword ? <Eye size={14}/> : <EyeClosed size={14} />}
          </button>
        )}
      </div>
      {touched && error && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="error"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};

export default Input;
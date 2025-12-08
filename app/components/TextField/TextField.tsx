"use client";

import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
  required = false,
  onChange,
}) => {
  const registered = register(name);

  return (
    <div>
      <label className="block mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...registered}
        onChange={(e) => {
          registered.onChange(e);
          onChange && onChange(e);
        }}
        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 mt-1 focus:border-yellow-400 outline-none transition"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

import React from "react";

const FormSelect = ({
  value,
  onChange,
  options = [],
  placeholder,
  allowEmpty = false,
  emptyLabel = "All",
  className = "",
}) => {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 text-sm py-2 rounded-lg bg-white/10 text-white border border-white/20 
                  outline-none transition-all 
                  ${className}`}
    >
      {allowEmpty ? (
        <option value="" className="bg-gray-800/90 text-white">
          {emptyLabel}
        </option>
      ) : (
        <option value="" disabled className="bg-gray-800/90 text-white">
          {placeholder || "Select an option"}
        </option>
      )}

      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="bg-gray-800/90 text-white"
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;

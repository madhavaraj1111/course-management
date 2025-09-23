import React from "react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full sm:w-60 px-4 py-2 rounded-lg text-white text-sm bg-white/10 backdrop-blur-md shadow-sm placeholder-white/50 outline-none ${className}`}
    />
  );
};

export default SearchInput;

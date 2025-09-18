import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary = cyan, danger = red, glass = gray
  size = "md", // sm, md, lg
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "rounded transition-transform duration-200 hover:scale-110 text-white font-medium cursor-pointer backdrop-blur-md border border-transparent border-t border-t-white/30 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-white/30";

  const variants = {
    primary:
      "hover:text-amber-200 hover:border-t-amber-500 hover:shadow-amber-800",
    danger: "hover:text-red-300 hover:border-t-red-400 hover:shadow-red-500",
    glass: "hover:text-gray-300 hover:border-t-gray-400 hover:shadow-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

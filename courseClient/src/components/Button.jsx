import React from "react";

// Enhanced Button Component with active state colors
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const baseStyles =
    "rounded transition-all duration-200 hover:scale-110 font-medium cursor-pointer backdrop-blur-md border border-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-md inline-flex items-center justify-center gap-2";

  const variants = {
    // Primary - Amber (Active by default, intensifies on hover)
    primary:
      "text-amber-200 border-t border-t-amber-500 shadow-amber-800/50 hover:text-amber-100 hover:border-t-amber-400 hover:shadow-amber-700",

    // Success - Green (Active by default)
    success:
      "text-green-200 border-t border-t-green-500 shadow-green-800/50 hover:text-green-100 hover:border-t-green-400 hover:shadow-green-700",

    // Danger - Red (Active by default)
    danger:
      "text-red-300 border-t border-t-red-400 shadow-red-500/50 hover:text-red-200 hover:border-t-red-300 hover:shadow-red-400",

    // Warning - Orange (Active by default)
    warning:
      "text-orange-200 border-t border-t-orange-500 shadow-orange-800/50 hover:text-orange-100 hover:border-t-orange-400 hover:shadow-orange-700",

    // Info - Blue (Active by default)
    info: "text-blue-200 border-t border-t-blue-500 shadow-blue-800/50 hover:text-blue-100 hover:border-t-blue-400 hover:shadow-blue-700",

    // Purple (Active by default)
    purple:
      "text-purple-200 border-t border-t-purple-500 shadow-purple-800/50 hover:text-purple-100 hover:border-t-purple-400 hover:shadow-purple-700",

    // Pink (Active by default)
    pink: "text-pink-200 border-t border-t-pink-500 shadow-pink-800/50 hover:text-pink-100 hover:border-t-pink-400 hover:shadow-pink-700",

    // Cyan (Active by default)
    cyan: "text-cyan-200 border-t border-t-cyan-500 shadow-cyan-800/50 hover:text-cyan-100 hover:border-t-cyan-400 hover:shadow-cyan-700",

    // Glass - Gray (Active by default)
    glass:
      "text-gray-300 border-t border-t-gray-400 shadow-gray-400/50 hover:text-gray-200 hover:border-t-gray-300 hover:shadow-gray-300",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base font-semibold",
    xl: "px-8 py-4 text-lg font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;

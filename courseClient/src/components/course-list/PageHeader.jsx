import React from "react";

const PageHeader = ({ title, children, className = "" }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-16 sm:items-center">
        {title && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          </div>
        )}

        <div className="flex-shrink-0">{children}</div>
      </div>
    </div>
  );
};

export default PageHeader;

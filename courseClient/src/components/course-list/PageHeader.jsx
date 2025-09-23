import React from "react";

const PageHeader = ({ title, children, className = "" }) => {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-2  rounded-lg shadow-lg  ${className}`}
    >
      {children}
    </div>
  );
};

export default PageHeader;

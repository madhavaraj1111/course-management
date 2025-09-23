import React from 'react';

const PageHeader = ({ title, children, className = "" }) => {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-2 p-4 py-8 rounded-lg shadow-lg bg-gray-500/10 ${className}`}>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/40 drop-shadow-lg">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default PageHeader;
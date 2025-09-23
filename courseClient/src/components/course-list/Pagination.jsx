import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = "" 
}) => {
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center gap-3 mt-10 ${className}`}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 transition-colors"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => goToPage(i + 1)}
          className={`px-4 py-2 rounded transition-colors ${
            currentPage === i + 1
              ? "bg-cyan-500/40 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
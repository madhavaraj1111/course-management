import { useState, useMemo } from 'react';

export const usePagination = (items, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalItems = items?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem) || [];

    return {
      currentItems,
      totalPages,
      totalItems,
      currentPage,
      itemsPerPage,
      indexOfFirstItem,
      indexOfLastItem
    };
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= paginationData.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    goToPage(currentPage - 1);
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  // Reset to first page when items change
  const resetToFirstPage = () => {
    if (currentPage > paginationData.totalPages && paginationData.totalPages > 0) {
      setCurrentPage(1);
    }
  };

  return {
    ...paginationData,
    goToPage,
    goToNextPage,
    goToPrevPage,
    resetPagination,
    resetToFirstPage,
    setCurrentPage
  };
};
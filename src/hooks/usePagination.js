import { useState, useMemo, useCallback } from 'react';

export function usePagination({
  totalItems = 0,
  initialPage = 0,
  initialItemsPerPage = 10,
  onPageChange = () => {},
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  // Ensure current page is within bounds
  const safePage = useMemo(() => {
    const maxPage = Math.max(0, totalPages - 1);
    return Math.min(Math.max(0, currentPage), maxPage);
  }, [currentPage, totalPages]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    const page = Math.max(0, Math.min(newPage, totalPages - 1));
    setCurrentPage(page);
    onPageChange(page);
  }, [totalPages, onPageChange]);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);  // Reset to first page when changing items per page
    onPageChange(0);
  }, [onPageChange]);

  // Get array of page numbers to display
  const pageNumbers = useMemo(() => {
    const pageArray = [];
    
    // Always show first page
    pageArray.push(0);
    
    // Add ellipsis after first page if not close to it
    if (safePage > 3) {
      pageArray.push('...');
    }
    
    // Add pages around current page
    for (let i = Math.max(1, safePage - 1); i <= Math.min(totalPages - 2, safePage + 1); i++) {
      pageArray.push(i);
    }
    
    // Add ellipsis before last page if not close to it
    if (safePage < totalPages - 4) {
      pageArray.push('...');
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageArray.push(totalPages - 1);
    }
    
    return pageArray;
  }, [safePage, totalPages]);

  return {
    currentPage: safePage,
    itemsPerPage,
    totalPages,
    pageNumbers,
    handlePageChange,
    handleItemsPerPageChange,
    nextPage: () => handlePageChange(safePage + 1),
    prevPage: () => handlePageChange(safePage - 1),
    canNextPage: safePage < totalPages - 1,
    canPrevPage: safePage > 0,
  };
}

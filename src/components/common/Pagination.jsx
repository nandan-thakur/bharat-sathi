import React from 'react';
import Button from './Button';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageNumbers, 
  onPageChange,
  onItemsPerPageChange,
  nextPage,
  prevPage,
  canNextPage,
  canPrevPage
}) => {
  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <Button 
          onClick={prevPage} 
          disabled={!canPrevPage}
          variant="outline"
        >
          Previous
        </Button>
        
        <div className="pagination-numbers">
          {pageNumbers.map((pageNum, index) => 
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
            ) : (
              <Button 
                key={`page-${pageNum}`}
                variant={pageNum === currentPage ? 'primary' : 'outline'}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum + 1}
              </Button>
            )
          )}
        </div>
        
        <Button 
          onClick={nextPage} 
          disabled={!canNextPage}
          variant="outline"
        >
          Next
        </Button>
      </div>
      
      <div className="pagination-items-per-page">
        <label htmlFor="items-per-page">Items per page:</label>
        <select 
          id="items-per-page" 
          value={10}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;

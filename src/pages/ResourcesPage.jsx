import React, { useState, useEffect } from 'react';
import { useFilters } from '../context/FilterContext';
import FilterBar from '../components/filters/FilterBar';
import ResourceTable from '../components/resource/ResourceTable';
import Pagination from '../components/common/Pagination';
import Loading from '../components/common/Loading';
import { usePagination } from '../hooks/usePagination';
import { useResourcesList } from '../hooks/useApi';

// Import this at the top level of your component file
let resourcesData = [];

// Dynamically import the large JSON data
const loadData = async () => {
  try {
    const module = await import('../../data.json');
    resourcesData = module.default;
    return resourcesData;
  } catch (error) {
    console.error('Failed to load data.json:', error);
    return [];
  }
};

const ResourcesPage = () => {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { filters, setPage, setLimit } = useFilters();
  
  // Load the data when the component mounts
  useEffect(() => {
    const loadResourcesData = async () => {
      const loadedData = await loadData();
      setData(loadedData);
      setDataLoaded(true);
    };
    
    loadResourcesData();
  }, []);
  
  // Use custom hooks for data fetching and pagination
  const { 
    resources, 
    loading, 
    error, 
    totalItems 
  } = useResourcesList(data, filters, filters.page, filters.limit);
  
  const pagination = usePagination({
    totalItems,
    initialPage: filters.page,
    initialItemsPerPage: filters.limit,
    onPageChange: setPage
  });
  
  if (!dataLoaded) {
    return <Loading message="Loading resources data..." />;
  }
  
  return (
    <div className="resources-page">
      <h1>Data Resources</h1>
      
      <FilterBar data={data} />
      
      <div className="results-summary">
        Showing {resources.length} of {totalItems} resources
      </div>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <ResourceTable resources={resources} />
          
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageNumbers={pagination.pageNumbers}
            onPageChange={pagination.handlePageChange}
            onItemsPerPageChange={(newLimit) => {
              setLimit(newLimit);
              pagination.handleItemsPerPageChange(newLimit);
            }}
            nextPage={pagination.nextPage}
            prevPage={pagination.prevPage}
            canNextPage={pagination.canNextPage}
            canPrevPage={pagination.canPrevPage}
          />
        </>
      )}
    </div>
  );
};

export default ResourcesPage;

// src/pages/ResourcesPage.jsx

import React, { useState, useEffect } from 'react';
import { useFilters } from '../context/FilterContext';
import FilterBar from '../components/filters/FilterBar';
import ResourceTable from '../components/resource/ResourceTable';
import Pagination from '../components/common/Pagination';
import Loading from '../components/common/Loading';
import { usePagination } from '../hooks/usePagination';
import { loadAllData } from '../utils/dataLoader';
import { filterResources } from '../services/api';

const ResourcesPage = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filters, setPage, setLimit } = useFilters();

  // Load all data parts when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const data = await loadAllData();
        setAllData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load resource data');
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters whenever filters or data changes
  useEffect(() => {
    const applyFilters = async () => {
      if (!allData.length) return;
      
      setLoading(true);
      try {
        // Filter data client-side
        const { filteredItems, total } = filterResources(
          allData, 
          filters.page, 
          filters.limit, 
          {
            orgType: filters.orgType,
            orgs: filters.orgs,
            source: filters.source,
            sectors: filters.sectors,
            search: filters.search
          }
        );
        
        setFilteredData(filteredItems);
        setTotalItems(total);
      } catch (err) {
        setError('Error filtering resources');
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [allData, filters]);

  // Pagination state
  const [totalItems, setTotalItems] = useState(0);
  
  const pagination = usePagination({
    totalItems,
    initialPage: filters.page,
    initialItemsPerPage: filters.limit,
    onPageChange: setPage
  });

  // Show loading state while initially loading data
  if (dataLoading) {
    return <Loading message="Loading resource data files..." />;
  }

  return (
    <div className="resources-page">
      <h1>Data Resources</h1>
      
      <FilterBar data={allData} />
      
      <div className="results-summary">
        Showing {filteredData.length} of {totalItems} resources
      </div>
      
      {loading ? (
        <Loading message="Applying filters..." />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <ResourceTable resources={filteredData} />
          
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

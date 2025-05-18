import React, { useState, useEffect } from 'react';
import { useFilters } from '../../context/FilterContext';
import Button from '../common/Button';
import FilterDropdown from './FilterDropdown';

const FilterBar = ({ data }) => {
  const { 
    filters, 
    setOrgType, 
    setOrgs, 
    setSource, 
    setSectors, 
    setSearch,
    resetFilters 
  } = useFilters();

  // Extract unique filter options from data
  const [filterOptions, setFilterOptions] = useState({
    orgTypes: [],
    organizations: [],
    sources: [],
    sectors: []
  });

  // Process data to extract unique filter options
  useEffect(() => {
    if (data && data.length > 0) {
      const orgTypes = [...new Set(data.map(item => item.org_type))];
      
      let allOrgs = [];
      let allSectors = [];
      
      // Parse JSON strings and flatten arrays
      data.forEach(item => {
        try {
          const orgs = JSON.parse(item.orgs.replace(/'/g, '"'));
          const sectors = JSON.parse(item.sectors.replace(/'/g, '"'));
          
          allOrgs.push(...orgs);
          allSectors.push(...sectors);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
      
      const uniqueOrgs = [...new Set(allOrgs)];
      const uniqueSectors = [...new Set(allSectors)];
      const sources = [...new Set(data.map(item => item.source))];
      
      setFilterOptions({
        orgTypes,
        organizations: uniqueOrgs,
        sources,
        sectors: uniqueSectors
      });
    }
  }, [data]);

  return (
    <div className="filter-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search resources..."
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filters-container">
        <FilterDropdown
          label="Organization Type"
          options={filterOptions.orgTypes}
          value={filters.orgType}
          onChange={setOrgType}
          placeholder="All Organization Types"
        />
        
        <FilterDropdown
          label="Organizations"
          options={filterOptions.organizations}
          value={filters.orgs}
          onChange={setOrgs}
          multiple={true}
        />
        
        <FilterDropdown
          label="Source"
          options={filterOptions.sources}
          value={filters.source}
          onChange={setSource}
          placeholder="All Sources"
        />
        
        <FilterDropdown
          label="Sectors"
          options={filterOptions.sectors}
          value={filters.sectors}
          onChange={setSectors}
          multiple={true}
        />
      </div>
      
      <Button onClick={resetFilters} variant="secondary">
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterBar;

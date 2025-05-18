import axios from 'axios';

const BASE_URL = 'https://api.data.gov.in';

export async function fetchResourcesList(data, filters, page, limit) {
  try {
    // Since we already have the full data in data.json, we'll filter it here
    let filteredData = [...data];
    
    // Apply filters
    if (filters.orgType) {
      filteredData = filteredData.filter(
        item => item.org_type === filters.orgType
      );
    }
    
    if (filters.orgs && filters.orgs.length > 0) {
      filteredData = filteredData.filter(item => {
        const orgs = JSON.parse(item.orgs.replace(/'/g, '"'));
        return filters.orgs.some(org => orgs.includes(org));
      });
    }
    
    if (filters.source) {
      filteredData = filteredData.filter(
        item => item.source === filters.source
      );
    }
    
    if (filters.sectors && filters.sectors.length > 0) {
      filteredData = filteredData.filter(item => {
        const sectors = JSON.parse(item.sectors.replace(/'/g, '"'));
        return filters.sectors.some(sector => sectors.includes(sector));
      });
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        item => item.title.toLowerCase().includes(searchLower) || 
               item.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate total results
    const total = filteredData.length;
    
    // Apply pagination
    const startIndex = page * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);
    
    return {
      data: paginatedData,
      total,
      page,
      limit
    };
  } catch (error) {
    console.error('Error filtering resources:', error);
    throw error;
  }
}

export async function fetchResourceDetails(resourceId, apiKey) {
  try {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    
    const response = await axios.get(`${BASE_URL}/resource/${resourceId}`, {
      params: {
        'api-key': apiKey,
        format: 'json'
      },
      headers: {
        accept: 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching resource details:', error);
    throw error;
  }
}

// src/services/api.js

// Add this function to your existing api.js file

export function filterResources(data, page = 0, limit = 10, filters = {}) {
  try {
    // Apply filters
    let filteredData = [...data];
    
    if (filters.orgType) {
      filteredData = filteredData.filter(
        item => item.org_type === filters.orgType
      );
    }
    
    if (filters.orgs && filters.orgs.length > 0) {
      filteredData = filteredData.filter(item => {
        try {
          const orgs = typeof item.orgs === 'string' 
            ? JSON.parse(item.orgs.replace(/'/g, '"')) 
            : item.orgs;
          return filters.orgs.some(org => orgs.includes(org));
        } catch (e) {
          console.error('Error fetching resource details:', e);
          return false;
        }
      });
    }
    
    if (filters.source) {
      filteredData = filteredData.filter(
        item => item.source === filters.source
      );
    }
    
    if (filters.sectors && filters.sectors.length > 0) {
      filteredData = filteredData.filter(item => {
        try {
          const sectors = typeof item.sectors === 'string'
            ? JSON.parse(item.sectors.replace(/'/g, '"'))
            : item.sectors;
          return filters.sectors.some(sector => sectors.includes(sector));
        } catch (e) {
          console.error('Error fetching resource details:', e);
          return false;
        }
      });
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        item => (item.title && item.title.toLowerCase().includes(searchLower)) || 
               (item.description && item.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Calculate total results
    const total = filteredData.length;
    
    // Apply pagination
    const startIndex = page * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);
    
    return {
      filteredItems: paginatedData,
      total
    };
  } catch (error) {
    console.error('Error filtering resources:', error);
    throw error;
  }
}


import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../common/Table';

const ResourceTable = ({ resources }) => {
  const navigate = useNavigate();
  
  const handleRowClick = (resource) => {
    navigate(`/resources/${resource.resource_id}`);
  };
  
  // Define table columns
  const columns = [
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Organization Type',
      accessor: 'org_type'
    },
    {
      header: 'Organizations',
      accessor: 'orgs',
      cell: (row) => {
        try {
          const orgs = typeof row.orgs === 'string' 
            ? JSON.parse(row.orgs.replace(/'/g, '"'))
            : row.orgs;
          
          return (
            <div className="org-tags">
              {orgs.map((org, index) => (
                <span key={index} className="tag">
                  {org}
                </span>
              ))}
            </div>
          );
        } catch (error) {
          console.error('Error parsing orgs:', error);
          return <span>Error parsing data</span>;
        }
      }
    },
    {
      header: 'Sectors',
      accessor: 'sectors',
      cell: (row) => {
        try {
          const sectors = typeof row.sectors === 'string'
            ? JSON.parse(row.sectors.replace(/'/g, '"'))
            : row.sectors;
          
          return (
            <div className="sector-tags">
              {sectors.map((sector, index) => (
                <span key={index} className="tag">
                  {sector}
                </span>
              ))}
            </div>
          );
        } catch (error) {
          console.error('Error parsing sectors:', error);
          return <span>Error parsing data</span>;
        }
      }
    },
    {
      header: 'Last Updated',
      accessor: 'date_updated',
      cell: (row) => {
        const date = new Date(row.date_updated);
        return date.toLocaleDateString();
      }
    }
  ];
  
  return (
    <Table 
      columns={columns} 
      data={resources} 
      onRowClick={handleRowClick}
      emptyMessage="No resources found matching your criteria."
    />
  );
};

export default ResourceTable;

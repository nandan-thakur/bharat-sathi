import React from 'react';
import Table from '../common/Table';

const ResourceDetail = ({ resource }) => {
  if (!resource) {
    return <div className="error-message">Resource data not available</div>;
  }
  
  // Create columns based on the resource fields
  const createColumnsFromData = () => {
    if (!resource.field || !resource.records || resource.records.length === 0) {
      return [];
    }
    
    return resource.field.map(field => ({
      header: field.name,
      accessor: field.id,
    }));
  };
  
  const columns = createColumnsFromData();
  
  return (
    <div className="resource-detail">
      <div className="resource-header">
        <h1>{resource.title}</h1>
        <p className="resource-description">{resource.desc}</p>
      </div>
      
      <div className="resource-metadata">
        <div className="metadata-item">
          <strong>Organization Type:</strong> {resource.org_type}
        </div>
        {resource.org && (
          <div className="metadata-item">
            <strong>Organizations:</strong> {resource.org.join(', ')}
          </div>
        )}
        {resource.sector && (
          <div className="metadata-item">
            <strong>Sectors:</strong> {resource.sector.join(', ')}
          </div>
        )}
        <div className="metadata-item">
          <strong>Created:</strong> {new Date(resource.created_date).toLocaleDateString()}
        </div>
        <div className="metadata-item">
          <strong>Updated:</strong> {new Date(resource.updated_date).toLocaleDateString()}
        </div>
      </div>
      
      {columns.length > 0 && resource.records && (
        <div className="resource-data">
          <h2>Data Records</h2>
          <Table 
            columns={columns} 
            data={resource.records} 
            emptyMessage="No data records available"
          />
        </div>
      )}
    </div>
  );
};

export default ResourceDetail;

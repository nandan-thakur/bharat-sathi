import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiKey } from '../context/ApiKeyContext';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import ResourceDetail from '../components/resource/ResourceDetail';
import { fetchResourceDetails } from '../services/api';

const ResourceDetailsPage = () => {
  const { resourceId } = useParams();
  const { apiKey } = useApiKey();
  const navigate = useNavigate();
  
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getResourceDetails = async () => {
      setLoading(true);
      try {
        if (!apiKey) {
          setError('API key is required to view resource details');
          setLoading(false);
          return;
        }
        
        const data = await fetchResourceDetails(resourceId, apiKey);
        setResource(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching resource details:', err);
        setError(
          err.message === 'API key is required' 
            ? 'Please enter an API key in the header to view this resource'
            : 'Failed to load resource details'
        );
      } finally {
        setLoading(false);
      }
    };
    
    getResourceDetails();
  }, [resourceId, apiKey]);
  
  return (
    <div className="resource-details-page">
      <div className="page-header">
        <Button variant="outline" onClick={() => navigate('/resources')}>
          ← Back to Resources
        </Button>
        <h1>Resource Details</h1>
      </div>
      
      {loading ? (
        <Loading message="Loading resource details..." />
      ) : error ? (
        <div className="error-container">
          <div className="error-message">{error}</div>
          {!apiKey && (
            <p className="error-help-text">
              Enter your API key in the input field at the top right corner of the page.
            </p>
          )}
        </div>
      ) : (
        <ResourceDetail resource={resource} />
      )}
    </div>
  );
};

export default ResourceDetailsPage;

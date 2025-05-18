import { useState, useEffect, useCallback } from 'react';
import { fetchResourcesList } from '../services/api';

export function useResourcesList(data, filters, page, limit) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchResourcesList(data, filters, page, limit);
      setResources(result.data);
      setTotalItems(result.total);
      setError(null);
    } catch (err) {
      setError('Failed to load resources');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [data, filters, page, limit]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return { resources, loading, error, totalItems, refetch: fetchResources };
}

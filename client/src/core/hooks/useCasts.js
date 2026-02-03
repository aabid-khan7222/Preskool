import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';

export const useCasts = () => {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCasts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching casts...');
      const response = await apiService.getCasts();
      console.log('Casts response:', response);
      setCasts(response.data);
    } catch (err) {
      console.error('Error fetching casts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch casts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCasts();
  }, []);

  return {
    casts,
    loading,
    error,
    refetch: fetchCasts,
  };
};

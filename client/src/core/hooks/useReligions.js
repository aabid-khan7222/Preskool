import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';

export const useReligions = () => {
  const [religions, setReligions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReligions = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching religions...');
      const response = await apiService.getReligions();
      console.log('Religions response:', response);
      setReligions(response.data);
    } catch (err) {
      console.error('Error fetching religions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch religions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReligions();
  }, []);

  return {
    religions,
    loading,
    error,
    refetch: fetchReligions,
  };
};

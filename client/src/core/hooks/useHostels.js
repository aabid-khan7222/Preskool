import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export const useHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getHostels();
      
      if (response.status === 'SUCCESS') {
        // Transform the API data to match the expected format
        const transformedData = response.data.map((hostel, index) => ({
          key: (index + 1).toString(),
          id: `H${hostel.id}` || `H${index + 1}`,
          hostelName: hostel.hostel_name || 'N/A',
          hostelType: hostel.hostel_type || 'N/A',
          address: hostel.address || 'N/A',
          inTake: hostel.intake ? String(hostel.intake) : 'N/A',
          description: hostel.description || 'N/A',
        }));
        
        setHostels(transformedData);
      } else {
        setError('Failed to fetch hostels data');
      }
    } catch (err) {
      console.error('Error fetching hostels:', err);
      setError(err.message || 'Failed to fetch hostels data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  return {
    hostels,
    loading,
    error,
    refetch: fetchHostels
  };
};

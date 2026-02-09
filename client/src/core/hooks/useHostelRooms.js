import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export const useHostelRooms = () => {
  const [hostelRooms, setHostelRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHostelRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getHostelRooms();
      
      if (response.status === 'SUCCESS') {
        // Transform the API data to match the expected format
        const transformedData = response.data.map((room, index) => {
          const costValue = room.cost_per_bed || room.amount;
          const formattedAmount = costValue 
            ? (typeof costValue === 'number' ? `$${costValue}` : (costValue.toString().startsWith('$') ? costValue.toString() : `$${costValue}`))
            : 'N/A';
          
          return {
            key: (index + 1).toString(),
            id: `HR${room.id}` || `HR${index + 1}`,
            roomNo: room.room_number || 'N/A',
            hostelName: room.hostel_name || 'N/A',
            roomType: room.room_type || 'N/A',
            noofBed: room.no_of_bed ? String(room.no_of_bed) : 'N/A',
            amount: formattedAmount,
          };
        });
        
        setHostelRooms(transformedData);
      } else {
        setError('Failed to fetch hostel rooms data');
      }
    } catch (err) {
      console.error('Error fetching hostel rooms:', err);
      setError(err.message || 'Failed to fetch hostel rooms data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostelRooms();
  }, []);

  return {
    hostelRooms,
    loading,
    error,
    refetch: fetchHostelRooms
  };
};

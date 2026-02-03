import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export const useGuardians = () => {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGuardians = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getGuardians();
      
      if (response.status === 'SUCCESS') {
        // Transform the API data to match the expected format
        const transformedData = response.data.map((guardian, index) => ({
          key: (index + 1).toString(),
          id: `G${guardian.id}`,
          name: `${guardian.first_name || ''} ${guardian.last_name || ''}`.trim() || 'N/A', // Guardian Name
          Addedon: 'Added on 25 Mar 2024', // Since guardians table doesn't have created_at, using default
          Child: `${guardian.student_first_name || ''} ${guardian.student_last_name || ''}`.trim() || 'N/A',
          class: `${guardian.class_name || ''}, ${guardian.section_name || ''}`.replace(/^,\s*/, '').replace(/,\s*$/, '') || 'N/A',
          phone: guardian.phone || 'N/A',
          email: guardian.email || 'N/A',
          // Default images for now
          GuardianImage: "assets/img/guardians/guardian-01.jpg",
          ChildImage: "assets/img/students/student-01.jpg",
          // Additional data for modal
          student_admission_number: guardian.admission_number,
          student_roll_number: guardian.roll_number,
          guardian_type: guardian.guardian_type,
          relation: guardian.relation,
          occupation: guardian.occupation,
          student_id: guardian.student_id
        }));
        
        setGuardians(transformedData);
      } else {
        setError('Failed to fetch guardians data');
      }
    } catch (err) {
      console.error('Error fetching guardians:', err);
      setError(err.message || 'Failed to fetch guardians data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuardians();
  }, []);

  return {
    guardians,
    loading,
    error,
    refetch: fetchGuardians
  };
};

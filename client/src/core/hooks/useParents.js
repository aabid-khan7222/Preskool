import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

export const useParents = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getParents();
      
      if (response.status === 'SUCCESS') {
        // Transform the API data to match the expected format
        const transformedData = response.data.map((parent, index) => ({
          key: (index + 1).toString(),
          id: `P${parent.id}`,
          name: parent.father_name || 'N/A', // Use father_name as Parent Name
          Addedon: parent.created_at ? `Added on ${new Date(parent.created_at).toLocaleDateString('en-GB')}` : 'N/A',
          Child: `${parent.student_first_name || ''} ${parent.student_last_name || ''}`.trim() || 'N/A',
          class: `${parent.class_name || ''}, ${parent.section_name || ''}`.replace(/^,\s*/, '').replace(/,\s*$/, '') || 'N/A',
          phone: parent.father_phone || 'N/A',
          email: parent.father_email || 'N/A',
          // Default images for now
          ParentImage: "assets/img/parents/parent-01.jpg",
          ChildImage: "assets/img/students/student-01.jpg",
          // Additional data for modal
          student_admission_number: parent.admission_number,
          student_roll_number: parent.roll_number,
          mother_name: parent.mother_name,
          mother_email: parent.mother_email,
          mother_phone: parent.mother_phone,
          father_occupation: parent.father_occupation,
          mother_occupation: parent.mother_occupation,
          student_id: parent.student_id
        }));
        
        setParents(transformedData);
      } else {
        setError('Failed to fetch parents data');
      }
    } catch (err) {
      console.error('Error fetching parents:', err);
      setError(err.message || 'Failed to fetch parents data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  return {
    parents,
    loading,
    error,
    refetch: fetchParents
  };
};

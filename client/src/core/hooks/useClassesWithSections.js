import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';

export const useClassesWithSections = () => {
  const [classesWithSections, setClassesWithSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClassesWithSections = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching classes with sections...');
      
      // Fetch both classes and sections
      const [classesResponse, sectionsResponse] = await Promise.all([
        apiService.getClasses(),
        apiService.getSections()
      ]);
      
      console.log('Classes response:', classesResponse);
      console.log('Sections response:', sectionsResponse);
      
      // Combine classes with their sections
      const classes = classesResponse.data || [];
      const sections = sectionsResponse.data || [];
      
      const combinedData = [];
      
      classes.forEach(classItem => {
        // Find sections for this class
        const classSections = sections.filter(section => section.class_id === classItem.id);
        
        if (classSections.length > 0) {
          // Create a row for each section
          classSections.forEach(section => {
            combinedData.push({
              classId: classItem.id,
              classCode: classItem.class_code,
              className: classItem.class_name,
              sectionId: section.id,
              sectionName: section.section_name,
              noOfStudents: section.no_of_students || 0,
              noOfSubjects: 0, // Placeholder for future implementation
              status: section.is_active ? 'Active' : 'Inactive',
              classStatus: classItem.is_active,
              teacherFirstName: section.teacher_first_name,
              teacherLastName: section.teacher_last_name,
              roomNumber: section.room_number
            });
          });
        } else {
          // If no sections, still show the class
          combinedData.push({
            classId: classItem.id,
            classCode: classItem.class_code,
            className: classItem.class_name,
            sectionId: null,
            sectionName: 'N/A',
            noOfStudents: classItem.no_of_students || 0,
            noOfSubjects: 0,
            status: classItem.is_active ? 'Active' : 'Inactive',
            classStatus: classItem.is_active,
            teacherFirstName: classItem.teacher_first_name,
            teacherLastName: classItem.teacher_last_name,
            roomNumber: null
          });
        }
      });
      
      setClassesWithSections(combinedData);
    } catch (err) {
      console.error('Error fetching classes with sections:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch classes with sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesWithSections();
  }, []);

  return {
    classesWithSections,
    loading,
    error,
    refetch: fetchClassesWithSections,
  };
};

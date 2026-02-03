const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('Making API request to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        ...options,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // Academic Years
  async getAcademicYears() {
    return this.makeRequest('/academic-years');
  }

  async getAcademicYearById(id) {
    return this.makeRequest(`/academic-years/${id}`);
  }

  // Classes
  async getClasses() {
    return this.makeRequest('/classes');
  }

  async getClassById(id) {
    return this.makeRequest(`/classes/${id}`);
  }

  async getClassesByAcademicYear(academicYearId) {
    return this.makeRequest(`/classes/academic-year/${academicYearId}`);
  }

  // Sections
  async getSections() {
    return this.makeRequest('/sections');
  }

  async getSectionById(id) {
    return this.makeRequest(`/sections/${id}`);
  }

  async getSectionsByClass(classId) {
    return this.makeRequest(`/sections/class/${classId}`);
  }

  // Students
  async getStudents() {
    return this.makeRequest('/students');
  }

  async createStudent(studentData) {
    return this.makeRequest('/students', {
      method: 'POST',
      body: JSON.stringify(studentData)
    });
  }

  async updateStudent(id, studentData) {
    return this.makeRequest(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData)
    });
  }

  async getStudentById(id) {
    return this.makeRequest(`/students/${id}`);
  }

  async getStudentsByClass(classId) {
    return this.makeRequest(`/students/class/${classId}`);
  }

  // Blood Groups
  async getBloodGroups() {
    return this.makeRequest('/blood-groups');
  }

  async getBloodGroupById(id) {
    return this.makeRequest(`/blood-groups/${id}`);
  }

  // Religions
  async getReligions() {
    return this.makeRequest('/religions');
  }

  async getReligionById(id) {
    return this.makeRequest(`/religions/${id}`);
  }

  // Casts
  async getCasts() {
    return this.makeRequest('/casts');
  }

  async getCastById(id) {
    return this.makeRequest(`/casts/${id}`);
  }

  // Mother Tongues
  async getMotherTongues() {
    return this.makeRequest('/mother-tongues');
  }

  async getMotherTongueById(id) {
    return this.makeRequest(`/mother-tongues/${id}`);
  }

  // Houses
  async getHouses() {
    return this.makeRequest('/houses');
  }

  async getHouseById(id) {
    return this.makeRequest(`/houses/${id}`);
  }

  // Parents
  async getParents() {
    return this.makeRequest('/parents');
  }

  async getParentById(id) {
    return this.makeRequest(`/parents/${id}`);
  }

  async getParentByStudentId(studentId) {
    return this.makeRequest(`/parents/student/${studentId}`);
  }

  async createParent(parentData) {
    return this.makeRequest('/parents', {
      method: 'POST',
      body: JSON.stringify(parentData)
    });
  }

  async updateParent(id, parentData) {
    return this.makeRequest(`/parents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(parentData)
    });
  }

  // Guardians
  async getGuardians() {
    return this.makeRequest('/guardians');
  }

  async getGuardianById(id) {
    return this.makeRequest(`/guardians/${id}`);
  }

  async getGuardianByStudentId(studentId) {
    return this.makeRequest(`/guardians/student/${studentId}`);
  }

  // Teachers
  async getTeachers() {
    return this.makeRequest('/teachers');
  }

  async getTeacherById(id) {
    return this.makeRequest(`/teachers/${id}`);
  }

  async getTeachersByClass(classId) {
    return this.makeRequest(`/teachers/class/${classId}`);
  }

  // Health check
  async getHealthStatus() {
    return this.makeRequest('/health');
  }
}

export const apiService = new ApiService();

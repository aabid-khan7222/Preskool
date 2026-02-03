const { query } = require('../config/database');

// Create new student
const createStudent = async (req, res) => {
  try {
    const {
      academic_year_id, admission_number, admission_date, roll_number, status,
      first_name, last_name, class_id, section_id, gender, date_of_birth,
      blood_group_id, house_id, religion_id, cast_id, phone, email, mother_tongue_id,
      // Parent fields
      father_name, father_email, father_phone, father_occupation, father_image_url,
      mother_name, mother_email, mother_phone, mother_occupation, mother_image_url
    } = req.body;

    // Validate required fields
    if (!admission_number || !first_name || !last_name) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Admission number, first name, and last name are required'
      });
    }

    // Check if admission number already exists
    const existingStudent = await query(
      'SELECT id FROM students WHERE admission_number = $1 AND is_active = true',
      [admission_number]
    );

    if (existingStudent.rows.length > 0) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Student with this admission number already exists'
      });
    }

    const result = await query(`
      INSERT INTO students (
        academic_year_id, admission_number, admission_date, roll_number,
        first_name, last_name, class_id, section_id, gender, date_of_birth,
        blood_group_id, house_id, religion_id, cast_id, phone, email,
        mother_tongue_id, is_active, created_at, modified_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, NOW(), NOW())
      RETURNING *
    `, [
      academic_year_id || null, admission_number, admission_date || null, roll_number || null,
      first_name, last_name, class_id || null, section_id || null, gender || null,
      date_of_birth || null, blood_group_id || null, house_id || null, religion_id || null,
      cast_id || null, phone || null, email || null, mother_tongue_id || null,
      status === 'Active' ? true : false
    ]);

    const student = result.rows[0];

    // Check if any parent information is provided
    const hasParentInfo = father_name || father_email || father_phone || father_occupation ||
                         mother_name || mother_email || mother_phone || mother_occupation;

    if (hasParentInfo) {
      // Create parent record
      const parentResult = await query(`
        INSERT INTO parents (
          student_id, father_name, father_email, father_phone, father_occupation, father_image_url,
          mother_name, mother_email, mother_phone, mother_occupation, mother_image_url,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
        RETURNING id
      `, [
        student.id, father_name || null, father_email || null, father_phone || null,
        father_occupation || null, father_image_url || null, mother_name || null,
        mother_email || null, mother_phone || null, mother_occupation || null,
        mother_image_url || null
      ]);

      // Update student's parent_id to point to the newly created parent record
      await query(`
        UPDATE students SET parent_id = $1, modified_at = NOW() WHERE id = $2
      `, [parentResult.rows[0].id, student.id]);

      // Update the student object to include the parent_id
      student.parent_id = parentResult.rows[0].id;
    }

    res.status(201).json({
      status: 'SUCCESS',
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Failed to create student',
      error: error.message
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      academic_year_id, admission_number, admission_date, roll_number, status,
      first_name, last_name, class_id, section_id, gender, date_of_birth,
      blood_group_id, house_id, religion_id, cast_id, phone, email, mother_tongue_id,
      // Parent fields
      father_name, father_email, father_phone, father_occupation, father_image_url,
      mother_name, mother_email, mother_phone, mother_occupation, mother_image_url
    } = req.body;

    // Validate required fields
    if (!admission_number || !first_name || !last_name) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Admission number, first name, and last name are required'
      });
    }

    // Check if admission number already exists for another student
    const existingStudent = await query(
      'SELECT id FROM students WHERE admission_number = $1 AND id != $2 AND is_active = true',
      [admission_number, id]
    );

    if (existingStudent.rows.length > 0) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'Student with this admission number already exists'
      });
    }

    const result = await query(`
      UPDATE students SET
        academic_year_id = $1,
        admission_number = $2,
        admission_date = $3,
        roll_number = $4,
        first_name = $5,
        last_name = $6,
        class_id = $7,
        section_id = $8,
        gender = $9,
        date_of_birth = $10,
        blood_group_id = $11,
        house_id = $12,
        religion_id = $13,
        cast_id = $14,
        phone = $15,
        email = $16,
        mother_tongue_id = $17,
        is_active = $18,
        modified_at = NOW()
      WHERE id = $19
      RETURNING *
    `, [
      academic_year_id || null, admission_number, admission_date || null, roll_number || null,
      first_name, last_name, class_id || null, section_id || null, gender || null,
      date_of_birth || null, blood_group_id || null, house_id || null, religion_id || null,
      cast_id || null, phone || null, email || null, mother_tongue_id || null,
      status === 'Active' ? true : false, id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'ERROR',
        message: 'Student not found'
      });
    }

    const student = result.rows[0];

    // Check if any parent information is provided
    const hasParentInfo = father_name || father_email || father_phone || father_occupation ||
                         mother_name || mother_email || mother_phone || mother_occupation;

    if (hasParentInfo) {
      // Check if parent record already exists for this student
      const existingParent = await query(
        'SELECT id FROM parents WHERE student_id = $1',
        [student.id]
      );

      if (existingParent.rows.length > 0) {
        // Update existing parent record
        await query(`
          UPDATE parents SET
            father_name = $1,
            father_email = $2,
            father_phone = $3,
            father_occupation = $4,
            father_image_url = $5,
            mother_name = $6,
            mother_email = $7,
            mother_phone = $8,
            mother_occupation = $9,
            mother_image_url = $10,
            updated_at = NOW()
          WHERE student_id = $11
        `, [
          father_name || null, father_email || null, father_phone || null,
          father_occupation || null, father_image_url || null, mother_name || null,
          mother_email || null, mother_phone || null, mother_occupation || null,
          mother_image_url || null, student.id
        ]);

        // Update student's parent_id if it's not set
        if (!student.parent_id) {
          await query(`
            UPDATE students SET parent_id = $1, modified_at = NOW() WHERE id = $2
          `, [existingParent.rows[0].id, student.id]);
          student.parent_id = existingParent.rows[0].id;
        }
      } else {
        // Create new parent record
        const parentResult = await query(`
          INSERT INTO parents (
            student_id, father_name, father_email, father_phone, father_occupation, father_image_url,
            mother_name, mother_email, mother_phone, mother_occupation, mother_image_url,
            created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
          RETURNING id
        `, [
          student.id, father_name || null, father_email || null, father_phone || null,
          father_occupation || null, father_image_url || null, mother_name || null,
          mother_email || null, mother_phone || null, mother_occupation || null,
          mother_image_url || null
        ]);

        // Update student's parent_id to point to the newly created parent record
        await query(`
          UPDATE students SET parent_id = $1, modified_at = NOW() WHERE id = $2
        `, [parentResult.rows[0].id, student.id]);

        // Update the student object to include the parent_id
        student.parent_id = parentResult.rows[0].id;
      }
    }

    res.status(200).json({
      status: 'SUCCESS',
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Failed to update student',
      error: error.message
    });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const result = await query(`
      SELECT
        s.id,
        s.admission_number,
        s.roll_number,
        s.first_name,
        s.last_name,
        s.gender,
        s.date_of_birth,
        s.place_of_birth,
        s.blood_group_id,
        s.religion_id,
        s.cast_id,
        s.mother_tongue_id,
        s.nationality,
        s.phone,
        s.email,
        s.address,
        s.user_id,
        s.academic_year_id,
        s.class_id,
        s.section_id,
        s.house_id,
        s.admission_date,
        s.previous_school,
        s.photo_url,
        s.is_transport_required,
        s.route_id,
        s.pickup_point_id,
        s.is_hostel_required,
        s.hostel_room_id,
        s.parent_id,
        s.guardian_id,
        s.is_active,
        s.created_at,
        c.class_name,
        sec.section_name,
        p.father_name,
        p.father_email,
        p.father_phone,
        p.father_occupation,
        p.mother_name,
        p.mother_email,
        p.mother_phone,
        p.mother_occupation,
        g.first_name as guardian_first_name,
        g.last_name as guardian_last_name,
        g.phone as guardian_phone,
        g.email as guardian_email,
        g.occupation as guardian_occupation,
        g.relation as guardian_relation,
        addr.current_address,
        addr.permanent_address
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN parents p ON s.parent_id = p.id
      LEFT JOIN guardians g ON s.guardian_id = g.id
      LEFT JOIN addresses addr ON s.user_id = addr.user_id
      WHERE s.is_active = true
      ORDER BY s.first_name ASC, s.last_name ASC
    `);
    
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Students fetched successfully',
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch students',
      error: error.message
    });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching student with ID:', id);
    
    const result = await query(`
      SELECT
        s.id,
        s.admission_number,
        s.roll_number,
        s.first_name,
        s.last_name,
        s.gender,
        s.date_of_birth,
        s.place_of_birth,
        s.blood_group_id,
        s.religion_id,
        s.cast_id,
        s.mother_tongue_id,
        s.nationality,
        s.phone,
        s.email,
        s.address,
        s.user_id,
        s.academic_year_id,
        s.class_id,
        s.section_id,
        s.house_id,
        s.admission_date,
        s.previous_school,
        s.photo_url,
        s.is_transport_required,
        s.route_id,
        s.pickup_point_id,
        s.is_hostel_required,
        s.hostel_room_id,
        s.parent_id,
        s.guardian_id,
        s.is_active,
        s.created_at,
        c.class_name,
        sec.section_name,
        p.father_name,
        p.father_email,
        p.father_phone,
        p.father_occupation,
        p.mother_name,
        p.mother_email,
        p.mother_phone,
        p.mother_occupation,
        g.first_name as guardian_first_name,
        g.last_name as guardian_last_name,
        g.phone as guardian_phone,
        g.email as guardian_email,
        g.occupation as guardian_occupation,
        g.relation as guardian_relation,
        addr.current_address,
        addr.permanent_address
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN parents p ON s.parent_id = p.id
      LEFT JOIN guardians g ON s.guardian_id = g.id
      LEFT JOIN addresses addr ON s.user_id = addr.user_id
      WHERE s.id = $1 AND s.is_active = true
    `, [id]);
    
    console.log('Query result for student', id, ':', JSON.stringify(result.rows[0], null, 2));
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'ERROR',
        message: 'Student not found'
      });
    }
    
    const studentData = result.rows[0];
    console.log('Sending response with user_id:', studentData.user_id);
    console.log('Sending response with current_address:', studentData.current_address);
    console.log('Sending response with permanent_address:', studentData.permanent_address);
    
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Student fetched successfully',
      data: studentData
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch student',
      error: error.message
    });
  }
};

// Get students by class
const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    
    const result = await query(`
      SELECT
        s.id,
        s.admission_number,
        s.roll_number,
        s.first_name,
        s.last_name,
        s.gender,
        s.date_of_birth,
        s.place_of_birth,
        s.blood_group_id,
        s.religion_id,
        s.cast_id,
        s.mother_tongue_id,
        s.nationality,
        s.phone,
        s.email,
        s.address,
        s.user_id,
        s.academic_year_id,
        s.class_id,
        s.section_id,
        s.house_id,
        s.admission_date,
        s.previous_school,
        s.photo_url,
        s.is_transport_required,
        s.route_id,
        s.pickup_point_id,
        s.is_hostel_required,
        s.hostel_room_id,
        s.parent_id,
        s.guardian_id,
        s.is_active,
        s.created_at,
        c.class_name,
        sec.section_name,
        p.father_name,
        p.father_email,
        p.father_phone,
        p.father_occupation,
        p.mother_name,
        p.mother_email,
        p.mother_phone,
        p.mother_occupation,
        g.first_name as guardian_first_name,
        g.last_name as guardian_last_name,
        g.phone as guardian_phone,
        g.email as guardian_email,
        g.occupation as guardian_occupation,
        g.relation as guardian_relation,
        addr.current_address,
        addr.permanent_address
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN sections sec ON s.section_id = sec.id
      LEFT JOIN parents p ON s.parent_id = p.id
      LEFT JOIN guardians g ON s.guardian_id = g.id
      LEFT JOIN addresses addr ON s.user_id = addr.user_id
      WHERE s.class_id = $1 AND s.is_active = true
      ORDER BY s.first_name ASC, s.last_name ASC
    `, [classId]);
    
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Students fetched successfully',
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching students by class:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch students',
      error: error.message
    });
  }
};

module.exports = {
  createStudent,
  updateStudent,
  getAllStudents,
  getStudentById,
  getStudentsByClass
};

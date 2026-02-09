const { query } = require('../config/database');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    // Use exact table name: users (plural)
    // JOIN with classes and sections if user is a student
    const result = await query(`
      SELECT 
        u.*,
        c.class_name,
        sec.section_name
      FROM users u
      LEFT JOIN students s ON u.id = s.user_id
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN sections sec ON s.section_id = sec.id
      WHERE u.is_active = true
      ORDER BY u.id ASC
    `);

    res.status(200).json({
      status: 'SUCCESS',
      message: 'Users fetched successfully',
      data: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Use exact table name: users (plural)
    const result = await query(
      `
      SELECT 
        u.*,
        c.class_name,
        sec.section_name
      FROM users u
      LEFT JOIN students s ON u.id = s.user_id
      LEFT JOIN classes c ON s.class_id = c.id
      LEFT JOIN sections sec ON s.section_id = sec.id
      WHERE u.id = $1 AND u.is_active = true
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'ERROR',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'SUCCESS',
      message: 'User fetched successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch user',
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};

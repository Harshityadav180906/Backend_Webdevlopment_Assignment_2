let students = require("../data/students.js");

// GET /students - Retrieve all students
const getStudent = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};

// GET /students/:id - Retrieve a student by ID
const getStudentById = (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found"
      });
    }

    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};

// POST /students - Create a new student
const addStudent = (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Request body is missing"
      });
    }

    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Name and Course are required fields"
      });
    }

    if (!Array.isArray(students)) {
      students = [];
    }

    const newId =
      students.length > 0
        ? Math.max(...students.map((s) => Number(s.id) || 0)) + 1
        : 1;

    const newStudent = {
      id: newId,
      name,
      course
    };

    students.push(newStudent);

    return res.status(201).json({
      success: true,
      message: "New Student Created",
      data: newStudent
    });
  } catch (error) {
    console.error("ADD STUDENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};

// PUT /students/:id - Update an existing student
const updateStudent = (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const { name, course } = req.body || {};

    const studentIndex = students.findIndex((s) => s.id === studentId);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found"
      });
    }

    if (!name && !course) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Provide at least name or course to update"
      });
    }

    students[studentIndex] = {
      ...students[studentIndex],
      ...(name && { name }),
      ...(course && { course })
    };

    return res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      data: students[studentIndex]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};

// DELETE /students/:id - Delete a student
const deleteStudent = (req, res) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const studentIndex = students.findIndex((s) => s.id === studentId);

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found"
      });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    return res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
      data: deletedStudent[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error"
    });
  }
};

module.exports = {
  getStudent,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};
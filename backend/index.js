require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Student } = require("./models/students.model");
const { students } = require("./data/students.data");

app.use(express.json());
app.use(cors());

// ========================================
// Database initialization
// ========================================

let databaseInitialized = false;

const connectDatabase = async () => {
  if (databaseInitialized) {
    return;
  }

  await initializeDatabase();

  databaseInitialized = true;
};

// ========================================
// Seed initial student data
// ========================================

const seedStudents = async () => {
  try {
    const studentCount = await Student.countDocuments();

    if (studentCount === 0) {
      await Student.insertMany(students);

      console.log("Initial student data inserted successfully.");
    } else {
      console.log("Student data already exists. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding student data:", error);
  }
};

// ========================================
// Root route
// ========================================

app.get("/", async (req, res) => {
  try {
    await connectDatabase();

    res.status(200).json({
      message: "Student Management API is running",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Database connection failed",
    });
  }
});

// ========================================
// GET all students
// ========================================

app.get("/students", async (req, res) => {
  try {
    await connectDatabase();

    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// ========================================
// POST create student
// ========================================

app.post("/students", async (req, res) => {
  try {
    await connectDatabase();

    const { name, age, gender, grade, attendance, marks } = req.body;

    const student = new Student({
      name,
      age,
      gender,
      grade,
      attendance,
      marks,
    });

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// ========================================
// PUT update student
// ========================================

app.put("/students/:id", async (req, res) => {
  try {
    await connectDatabase();

    const studentId = req.params.id;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ========================================
// DELETE student
// ========================================

app.delete("/students/:id", async (req, res) => {
  try {
    await connectDatabase();

    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// ========================================
// Export Express app for Vercel
// ========================================

module.exports = app;
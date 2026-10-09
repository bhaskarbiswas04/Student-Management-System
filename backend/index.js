require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Student } = require("./models/students.model");
const { students } = require("./data/students.data");

const allowedOrigins = [
  "http://localhost:5173",
  // "https://task-sync-client.vercel.app",
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: false
  }),
);
app.use(express.json());

// ========================================
// Seed initial data
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
// Root Route
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management API is running",
  });
});

// ========================================
// GET all students
// ========================================

app.get("/students", async (req, res) => {
  try {
    await initializeDatabase();

    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// ========================================
// POST student
// ========================================

app.post("/students", async (req, res) => {
  try {
    await initializeDatabase();

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
    console.error("Error creating student:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// ========================================
// PUT student
// ========================================

app.put("/students/:id", async (req, res) => {
  try {
    await initializeDatabase();

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
    console.error("Error updating student:", error);

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
    await initializeDatabase();

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
    console.error("Error deleting student:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// ========================================
// Local development
// ========================================

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  const startServer = async () => {
    try {
      await initializeDatabase();

      await seedStudents();

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
    }
  };

  startServer();
}

// ========================================
// Vercel
// ========================================

module.exports = app;
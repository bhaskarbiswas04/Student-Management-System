import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ========================================
// Fetch Students
// ========================================

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/students`);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ========================================
// Add Student
// ========================================

export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (newStudent, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.error || "Failed to add student");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ========================================
// Update Student
// ========================================

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedStudent }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || "Failed to update student");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ========================================
// Initial State
// ========================================

const initialState = {
  students: [],
  status: "idle",
  error: null,

  // Status specifically for add/update operations
  addStatus: "idle",
  updateStatus: "idle",
};

// ========================================
// Students Slice
// ========================================

const studentsSlice = createSlice({
  name: "students",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==================================
      // Fetch Students
      // ==================================

      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })

      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch students";
      })

      // ==================================
      // Add Student
      // ==================================

      .addCase(addStudentAsync.pending, (state) => {
        state.addStatus = "loading";
        state.error = null;
      })

      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.addStatus = "succeeded";

        // Add newly created student to Redux store
        state.students.push(action.payload);
      })

      .addCase(addStudentAsync.rejected, (state, action) => {
        state.addStatus = "failed";

        state.error = action.payload || "Failed to add student";
      })

      // ==================================
      // Update Student
      // ==================================

      .addCase(updateStudentAsync.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })

      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";

        const index = state.students.findIndex(
          (student) => student._id === action.payload._id,
        );

        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })

      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.updateStatus = "failed";

        state.error = action.payload || "Failed to update student";
      });
  },
});

export default studentsSlice.reducer;
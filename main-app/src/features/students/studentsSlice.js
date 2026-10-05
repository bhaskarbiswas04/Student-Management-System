import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API URL
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://student-management-system-ten-ashy.vercel.app";

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

      const data = await response.json();

      return data;
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

      // Fetch pending
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // Fetch fulfilled
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })

      // Fetch rejected
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default studentsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalStudents: 0,
  averageAttendance: 0,
  averageMarks: 0,
  topStudent: null,
};

const schoolSlice = createSlice({
  name: "school",

  initialState,

  reducers: {
    updateSchoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageAttendance = action.payload.averageAttendance;
      state.averageMarks = action.payload.averageMarks;
      state.topStudent = action.payload.topStudent;
    },

    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
});

export const { updateSchoolStats, setTopStudent } = schoolSlice.actions;

export default schoolSlice.reducer;
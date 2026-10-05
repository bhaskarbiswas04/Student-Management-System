import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../features/students/studentsSlice";
// import { schoolSlice } from "../features/school/schoolSlice";

export default configureStore({
  reducer: {
    students: studentsReducer,
    // school: schoolSlice.reducer,
  },
});

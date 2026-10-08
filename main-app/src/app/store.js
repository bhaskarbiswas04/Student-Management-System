import { configureStore } from "@reduxjs/toolkit";

import studentsReducer from "../features/students/studentsSlice";
import schoolReducer from "../features/school/schoolSlice";

export default configureStore({
  reducer: {
    students: studentsReducer,
    school: schoolReducer,
  },
});

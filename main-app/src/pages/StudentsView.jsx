import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentsSlice";
import StudentList from "../components/StudentList";

const StudentView = () => {
  const dispatch = useDispatch();

  // Extract state from the Redux store
  const { students, status, error } = useSelector((state) => state.students);

  // Fetch students when the component mounts
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Student View</h1>
      <button
        style={{
          backgroundColor: "#FFCC00",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add student
      </button>

      <h2>Student List</h2>

      {/* Handle Loading State */}
      {status === "loading" && <p>Loading...</p>}

      {/* Handle Error State */}
      {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Handle Success State and pass data to StudentList */}
      {status === "succeeded" && <StudentList students={students} />}
    </div>
  );
};

export default StudentView;

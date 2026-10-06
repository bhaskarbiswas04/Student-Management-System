import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchStudents } from "../features/students/studentsSlice";
import StudentList from "../components/StudentList";

const StudentView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students, status, error } = useSelector((state) => state.students);

  // Fetch students when page loads
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Student Management
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Student View
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage all students in the system.
          </p>
        </div>

        {/* Add Student Button */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/students/add")}
            className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            + Add New Student
          </button>
        </div>

        {/* Student List Container */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Student List
              </h2>

              {status === "succeeded" && (
                <p className="mt-1 text-sm text-gray-500">
                  {students.length} students found
                </p>
              )}
            </div>
          </div>

          {/* Loading State */}
          {status === "loading" && (
            <div className="flex min-h-40 items-center justify-center">
              <div className="flex items-center gap-3 text-gray-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />

                <span>Loading students...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === "failed" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-medium">Failed to load students</p>

              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {/* Success State */}
          {status === "succeeded" &&
            (students.length > 0 ? (
              <StudentList students={students} />
            ) : (
              <div className="py-12 text-center text-gray-500">
                No students found.
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
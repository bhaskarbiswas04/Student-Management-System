import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

import { deleteStudentAsync } from "../features/students/studentsSlice";

const StudentDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students, deleteStatus } = useSelector((state) => state.students);

  // Find student
  const student = students.find((student) => student._id === id);

  // ========================================
  // Delete Student
  // ========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteStudentAsync(student._id)).unwrap();

      toast.success("Student deleted successfully!");

      navigate("/students");
    } catch (error) {
      toast.error(error || "Failed to delete student.");
    }
  };

  // ========================================
  // Student Not Found
  // ========================================

  if (!student) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl">🔍</div>

          <h2 className="text-2xl font-bold text-gray-900">
            Student Not Found
          </h2>

          <p className="mt-2 text-gray-500">
            The student you're looking for doesn't exist.
          </p>

          <Link
            to="/students"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back */}
      <Link
        to="/students"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
      >
        ← Back to Students
      </Link>

      {/* Student Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-8 text-white">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold backdrop-blur-sm">
              {student.name.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <div>
              <p className="mb-1 text-sm font-medium text-indigo-100">
                Student Details
              </p>

              <h1 className="text-3xl font-bold">{student.name}</h1>

              <p className="mt-1 text-sm text-indigo-100">
                {student.gender} · {student.age} years old
              </p>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Age */}
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Age</p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {student.age}
              </p>
            </div>

            {/* Gender */}
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Gender</p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {student.gender}
              </p>
            </div>

            {/* Grade */}
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Grade</p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {student.grade}
              </p>
            </div>

            {/* Marks */}
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Marks</p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {student.marks}%
              </p>
            </div>

            {/* Attendance */}
            <div className="rounded-xl bg-gray-50 p-5 sm:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>

                  <p className="mt-1 text-xl font-semibold text-gray-900">
                    {student.attendance}%
                  </p>
                </div>

                <div className="w-48">
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${student.attendance}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
            {/* Edit */}
            <Link
              to={`/students/${student._id}/edit`}
              state={{ student }}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Edit Details
            </Link>

            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteStatus === "loading"}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleteStatus === "loading" ? "Deleting..." : "Delete"}
            </button>

            {/* Back */}
            <Link
              to="/students"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
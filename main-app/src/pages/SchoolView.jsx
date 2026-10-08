import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateSchoolStats,
  setTopStudent,
} from "../features/school/schoolSlice";

const SchoolView = () => {
  const dispatch = useDispatch();

  const { students, status } = useSelector((state) => state.students);

  const { totalStudents, averageAttendance, averageMarks, topStudent } =
    useSelector((state) => state.school);

  // Calculate school statistics
  useEffect(() => {
    if (!students.length) {
      dispatch(
        updateSchoolStats({
          totalStudents: 0,
          averageAttendance: 0,
          averageMarks: 0,
          topStudent: null,
        }),
      );

      dispatch(setTopStudent(null));

      return;
    }

    const totalStudents = students.length;

    const totalAttendance = students.reduce(
      (sum, student) => sum + (Number(student.attendance) || 0),
      0,
    );

    const totalMarks = students.reduce(
      (sum, student) => sum + (Number(student.marks) || 0),
      0,
    );

    const averageAttendance = totalAttendance / totalStudents;

    const averageMarks = totalMarks / totalStudents;

    const topStudent = students.reduce((top, student) => {
      if (!top) {
        return student;
      }

      return (Number(student.marks) || 0) > (Number(top.marks) || 0)
        ? student
        : top;
    }, null);

    dispatch(
      updateSchoolStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent,
      }),
    );

    dispatch(setTopStudent(topStudent));
  }, [students, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
          Loading school statistics...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Student Management
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            School View
          </h1>

          <p className="mt-2 text-gray-500">
            Overview of student performance and attendance.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Students */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Students</p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {totalStudents}
            </p>
          </div>

          {/* Average Attendance */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Average Attendance
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {Number(averageAttendance).toFixed(2)}%
            </p>
          </div>

          {/* Average Marks */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Average Marks</p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {Number(averageMarks).toFixed(2)}
            </p>
          </div>

          {/* Top Student */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Top Student</p>

            <p className="mt-3 truncate text-xl font-bold text-gray-900">
              {topStudent?.name || "-"}
            </p>

            {topStudent && (
              <p className="mt-1 text-sm text-gray-500">
                Marks: {topStudent.marks}
              </p>
            )}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            School Performance
          </h2>

          <div className="mt-6 space-y-6">
            {/* Attendance */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Average Attendance
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {Number(averageAttendance).toFixed(2)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-indigo-600"
                  style={{
                    width: `${Math.min(averageAttendance, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Marks */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Average Marks
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {Number(averageMarks).toFixed(2)}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${Math.min(averageMarks, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
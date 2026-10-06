import { Link } from "react-router-dom";

const StudentList = ({ students }) => {
  return (
    <div className="space-y-3">
      {students.map((student) => (
        <div
          key={student._id}
          className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
        >
          {/* Student Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {student.name.charAt(0).toUpperCase()}
            </div>

            {/* Name */}
            <div>
              <h3 className="font-semibold text-gray-900">{student.name}</h3>

              <p className="text-sm text-gray-500">
                Age: {student.age} · {student.gender}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 sm:block">
              Grade {student.grade}
            </div>

            <Link
              to={`/students/${student._id}`}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
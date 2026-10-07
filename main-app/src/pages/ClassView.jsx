import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "../features/students/studentsSlice";

const ClassView = () => {
  const dispatch = useDispatch();

  const { students, filter, sortBy, status } = useSelector(
    (state) => state.students,
  );

  // ========================================
  // Filter Students
  // ========================================

  const filteredStudents = students.filter((student) => {
    if (filter === "All") {
      return true;
    }

    if (filter === "Boys") {
      return student.gender === "Male";
    }

    if (filter === "Girls") {
      return student.gender === "Female";
    }

    return true;
  });

  // ========================================
  // Sort Students
  // ========================================

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "marks") {
      return (b.marks ?? 0) - (a.marks ?? 0);
    }

    if (sortBy === "attendance") {
      return (b.attendance ?? 0) - (a.attendance ?? 0);
    }

    return 0;
  });

  // ========================================
  // Filter Change
  // ========================================

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  // ========================================
  // Sort Change
  // ========================================

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Student Management
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Class View
          </h1>

          <p className="mt-2 text-gray-500">
            Filter and sort students by their academic information.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {/* Gender Filter */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <label
              htmlFor="gender-filter"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Filter by Gender
            </label>

            <select
              id="gender-filter"
              value={filter}
              onChange={handleFilterChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All Students</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>
          </div>

          {/* Sort */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <label
              htmlFor="sort-students"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Sort Students
            </label>

            <select
              id="sort-students"
              value={sortBy}
              onChange={handleSortChange}
              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="name">Name</option>
              <option value="marks">Marks</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Results Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Students</h2>

              <p className="mt-1 text-sm text-gray-500">
                {sortedStudents.length} students found
              </p>
            </div>

            <div className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600">
              {filter}
            </div>
          </div>

          {/* Loading */}
          {status === "loading" && (
            <div className="flex min-h-40 items-center justify-center text-gray-500">
              Loading students...
            </div>
          )}

          {/* Student List */}
          {status !== "loading" && sortedStudents.length > 0 && (
            <div className="divide-y divide-gray-100">
              {sortedStudents.map((student) => (
                <div
                  key={student._id}
                  className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Student */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                      {student.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {student.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {student.gender}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:flex">
                    <div className="rounded-lg bg-gray-50 px-4 py-2 text-center">
                      <p className="text-xs text-gray-400">Marks</p>

                      <p className="font-semibold text-gray-900">
                        {student.marks ?? "Unknown"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 px-4 py-2 text-center">
                      <p className="text-xs text-gray-400">Attendance</p>

                      <p className="font-semibold text-gray-900">
                        {student.attendance ?? "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {status !== "loading" && sortedStudents.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mb-3 text-4xl">🎓</div>

              <h3 className="font-semibold text-gray-900">No students found</h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing the gender filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassView;
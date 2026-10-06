import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  addStudentAsync,
  updateStudentAsync,
} from "../features/students/studentsSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Student data passed through Link state when editing
  const existingStudent = location.state?.student;

  // Determines whether this is Add or Edit mode
  const isEditing = Boolean(existingStudent);

  const { addStatus, updateStatus, error } = useSelector(
    (state) => state.students,
  );

  const [formData, setFormData] = useState({
    name: existingStudent?.name || "",
    age: existingStudent?.age || "",
    grade: existingStudent?.grade || "",
    gender: existingStudent?.gender || "Male",
    attendance: existingStudent?.attendance ?? "",
    marks: existingStudent?.marks ?? "",
  });

//   const [validationError, setValidationError] = useState("");

  // ========================================
  // Handle Input Changes
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ========================================
  // Handle Submit
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!formData.age) {
      toast.error("Age is required.");
      return;
    }

    if (Number(formData.age) <= 0) {
      toast.error("Age must be greater than 0.");
      return;
    }

    if (!formData.grade.trim()) {
      toast.error("Grade is required.");
      return;
    }

    if (!formData.gender) {
      toast.error("Please select a gender.");
      return;
    }

    if (
      formData.attendance !== "" &&
      (Number(formData.attendance) < 0 || Number(formData.attendance) > 100)
    ) {
      toast.error("Attendance must be between 0 and 100.");
      return;
    }

    if (
      formData.marks !== "" &&
      (Number(formData.marks) < 0 || Number(formData.marks) > 100)
    ) {
      toast.error("Marks must be between 0 and 100.");
      return;
    }

    // Student object
    const studentData = {
      name: formData.name.trim(),
      age: Number(formData.age),
      grade: formData.grade.trim(),
      gender: formData.gender,
      attendance: Number(formData.attendance) || 0,
      marks: Number(formData.marks) || 0,
    };

    try {
      // ========================================
      // EDIT STUDENT
      // ========================================

      if (isEditing) {
        await dispatch(
          updateStudentAsync({
            id: existingStudent._id,
            updatedStudent: studentData,
          }),
        ).unwrap();

        toast.success("Student updated successfully!");

        navigate(`/students/${existingStudent._id}`);

        return;
      }

      // ========================================
      // ADD STUDENT
      // ========================================

      await dispatch(addStudentAsync(studentData)).unwrap();

      toast.success("Student added successfully!");

      navigate("/students");
    } catch (error) {
      toast.error(
        error ||
          (isEditing ? "Failed to update student." : "Failed to add student."),
      );
    }
  };

  const isSubmitting = addStatus === "loading" || updateStatus === "loading";

  return (
    <div className="mx-auto max-w-2xl">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
      >
        ← Back
      </button>

      {/* Form Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-6 text-white sm:px-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {isEditing ? "Edit Student" : "Add Student"}
          </h1>

          <p className="mt-1 text-sm text-indigo-100">
            {isEditing
              ? "Update the student's information below."
              : "Enter the student's information below."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8">
          {/* Redux Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Age + Grade */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="age"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Age
              </label>

              <input
                id="age"
                name="age"
                type="number"
                min="1"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="grade"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Grade
              </label>

              <input
                id="grade"
                name="grade"
                type="text"
                value={formData.grade}
                onChange={handleChange}
                placeholder="e.g. 10th"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Gender</p>

            <div className="flex gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="h-4 w-4 accent-indigo-600"
                />
                Male
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="h-4 w-4 accent-indigo-600"
                />
                Female
              </label>
            </div>
          </div>

          {/* Attendance + Marks */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="attendance"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Attendance
              </label>

              <input
                id="attendance"
                name="attendance"
                type="number"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={handleChange}
                placeholder="0 - 100"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="marks"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Marks
              </label>

              <input
                id="marks"
                name="marks"
                type="number"
                min="0"
                max="100"
                value={formData.marks}
                onChange={handleChange}
                placeholder="0 - 100"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update Student"
                  : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
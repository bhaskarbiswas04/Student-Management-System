import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudentAsync } from "../features/students/studentsSlice";
import { toast } from "sonner";

const StudentForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const { addStatus, error } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "Male",
    attendance: "",
    marks: "",
  });

  const [validationError, setValidationError] = useState("");

  // ========================================
  // Handle Input Changes
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setValidationError("");
  };

  // ========================================
  // Handle Submit
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setValidationError("Name is required.");
      return;
    }

    if (!formData.age) {
      setValidationError("Age is required.");
      return;
    }

    if (Number(formData.age) <= 0) {
      setValidationError("Age must be greater than 0.");
      return;
    }

    if (!formData.grade.trim()) {
      setValidationError("Grade is required.");
      return;
    }

    if (!formData.gender) {
      setValidationError("Please select a gender.");
      return;
    }

    // Convert number fields from strings to numbers
    const newStudent = {
      name: formData.name.trim(),
      age: Number(formData.age),
      grade: formData.grade.trim(),
      gender: formData.gender,
      attendance: formData.attendance ? Number(formData.attendance) : 0,
      marks: formData.marks ? Number(formData.marks) : 0,
    };

    try {
      await dispatch(addStudentAsync(newStudent)).unwrap();

      toast.success("Student added successfully!");

      // Reset form
      setFormData({
        name: "",
        age: "",
        grade: "",
        gender: "Male",
        attendance: "",
        marks: "",
      });

      // Close form
      onClose();
    } catch (error) {
      toast.error(error || "Failed to add student.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add Student</h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the student's information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          {/* Validation Error */}
          {(validationError || error) && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {validationError || error}
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
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={addStatus === "loading"}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {addStatus === "loading" ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
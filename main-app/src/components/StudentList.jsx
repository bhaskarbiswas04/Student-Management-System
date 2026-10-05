const StudentList = ({ students }) => {
  if (students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id} style={{ marginBottom: "8px" }}>
          <a
            href={`/students/${student.id}`}
            style={{ color: "#0066cc", textDecoration: "underline" }}
          >
            {student.name} (Age: {student.age})
          </a>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;

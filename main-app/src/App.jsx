import "./App.css";
import StudentView from "./pages/StudentsView";

function App() {
  return (
    <div className="app-container">
      {/* Navigation Header matching the wireframe mock */}
      <header className="nav-header">
        <span className="brand">Student Management System</span>
        <nav>
          <a href="#students" className="nav-link active">
            Students
          </a>
          <a href="#classes" className="nav-link">
            Classes
          </a>
          <a href="#school" className="nav-link">
            School
          </a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <StudentView />
      </main>
    </div>
  );
}

export default App;

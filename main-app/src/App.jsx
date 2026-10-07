import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import { Toaster } from "sonner";

import StudentView from "./pages/StudentsView";
import StudentDetail from "./pages/StudentDetail";
import StudentForm from "./components/StudentForm";
import ClassView from "./pages/ClassView";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* =========================
            Navigation
        ========================== */}

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
            {/* Brand */}
            <Link to="/students" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                SM
              </div>

              <div>
                <h1 className="text-base font-bold tracking-tight text-slate-900">
                  Student Management
                </h1>

                <p className="hidden text-[11px] font-medium text-slate-400 sm:block">
                  Administration Portal
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                to="/students"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Students
              </Link>

              <Link
                to="/classes"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Classes
              </Link>

              <a
                href="#school"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                School
              </a>
            </nav>

            {/* User */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              A
            </div>
          </div>
        </header>

        {/* =========================
            Routes
        ========================== */}

        <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
          <Routes>
            {/* Student List */}
            <Route path="/students" element={<StudentView />} />

            {/* Student Detail */}
            <Route path="/students/:id" element={<StudentDetail />} />

            {/* Add Student */}
            <Route path="/students/add" element={<StudentForm />} />

            {/* Edit Student */}
            <Route path="/students/:id/edit" element={<StudentForm />} />

            {/* Class View */}
            <Route path="/classes" element={<ClassView />} />

            {/* Default */}
            <Route path="*" element={<Navigate to="/students" replace />} />
          </Routes>
        </main>

        {/* Toast */}
        <Toaster position="top-right" richColors closeButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
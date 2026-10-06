import StudentView from "./pages/StudentsView";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================
          Navigation Header
      ========================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
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
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 sm:flex">
            <a
              href="#students"
              className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
            >
              Students
            </a>

            <a
              href="#classes"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Classes
            </a>

            <a
              href="#school"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              School
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 sm:flex"
              aria-label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.7"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 1-5.714 0M18 8.25a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
                />
              </svg>
            </button>

            {/* User Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              A
            </div>
          </div>
        </div>
      </header>

      {/* =========================
          Main Content
      ========================== */}
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <StudentView />
      </main>
    </div>
  );
}

export default App;
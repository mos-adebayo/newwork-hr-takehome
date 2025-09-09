import { User, LogOut, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { clearSession, getSession } from "./lib/auth.ts";

function App() {
  const nav = useNavigate();
  const session = getSession();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-semibold">
            NEWWORK HR
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              <User className="size-4" />
              Profile
            </Link>
            <Link
              to="/absences"
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              <Calendar className="size-4" />
              Absences
            </Link>
            {session ? (
              <button
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                onClick={() => {
                  clearSession();
                  nav("/login");
                }}
              >
                <LogOut className="size-4" /> Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default App;

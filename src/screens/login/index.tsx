import { roles } from "../../utils/constant.ts";
import { setSession } from "../../lib/auth.ts";
import type { Role } from "../../types/user.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  const handleLogin = (role: Role) => {
    setSession(role);
    nav("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="rounded-2xl border bg-white p-6 shadow-sm w-4/5 lg:w-1/4">
        <h1 className="mb-2 text-xl font-semibold">Sign in</h1>
        <p className="mb-6 text-sm text-gray-600">
          Pick a role to simulate access levels.
        </p>
        <div className="grid gap-3">
          {roles.map((role) => (
            <button
              key={role}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
              onClick={() => {
                handleLogin(role);
              }}
            >
              Continue as {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;

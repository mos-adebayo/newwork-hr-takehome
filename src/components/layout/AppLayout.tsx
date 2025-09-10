import Header from "../header";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSession } from "../../lib/auth.ts";

const AppLayout = () => {
  const session = getSession();
  const nav = useNavigate();

  useEffect(() => {
    if (!session) {
      nav("/login");
    }
  }, [nav, session]);

  return session ? (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-5xl p-4">
        <Outlet />
      </div>
    </div>
  ) : null;
};

export default AppLayout;

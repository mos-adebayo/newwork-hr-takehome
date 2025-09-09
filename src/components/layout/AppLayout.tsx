import Header from "../header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-5xl p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import RolesPage from "./pages/RolesPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  return (
    <main className="font-body">
      <nav className="w-screen  px-8 py-4 flex justify-between bg-base-200">
        <div>LOGO</div>
        <div className="flex gap-4">
          <NavLink to={PATHS.userRoute}>Users</NavLink>
          <NavLink to={PATHS.roleRoute}>Roles</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path={PATHS.userRoute} element={<UsersPage />} />
        <Route path={PATHS.roleRoute} element={<RolesPage />} />
      </Routes>
    </main>
  );
};

export default App;

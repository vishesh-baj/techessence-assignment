import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import RolesPage from "./pages/RolesPage";
import UsersPage from "./pages/UsersPage";
import { CgDarkMode } from "react-icons/cg";

const App = () => {
  const [themeToggle, setThemeToggle] = useState(false);
  return (
    <main
      data-theme={themeToggle ? "forest" : "lemonade"}
      className="font-body"
    >
      <nav className="w-screen  px-8 py-4 flex justify-between bg-base-200">
        <div className="tooltip tooltip-right" data-tip="Toggle Theme">
          <button
            onClick={() => setThemeToggle((prevState) => !prevState)}
            className="btn btn-circle btn-outline "
          >
            <CgDarkMode className="animate-spin text-xl" />
          </button>
        </div>
        <div className="flex gap-4">
          <NavLink
            className={({ isActive }) => `${isActive && "btn-accent"} btn`}
            to={PATHS.userRoute}
          >
            Users
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive && "btn-accent"} btn`}
            to={PATHS.roleRoute}
          >
            Roles
          </NavLink>
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

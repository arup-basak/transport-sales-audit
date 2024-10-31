import React from "react";
import ToogleThemeButton from "./ToogleThemeButton";
import CollapsableNavbar from "./CollapsableNavbar";

const NavBar = () => {
  return (
    <nav className="border-b dark:border-gray-800 text-gray-500 p-4 h-[7vh] flex justify-between">
      <span>Logo</span>
      <div className="flex items-center gap-2">
        <ToogleThemeButton />
        <CollapsableNavbar />
      </div>
    </nav>
  );
};

export default NavBar;

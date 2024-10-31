"use client";

import React from "react";
import sidebar_data from "@/constants";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block max-w-96 float-start">
      <ul className="space-y-2 p-4 min-w-[200px]">
        {sidebar_data.map((item, index) => (
          <SidebarItem
            key={index}
            isActive={pathname === item.href}
            {...item}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

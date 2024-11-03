"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import sidebar_data from "@/constants";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Logout from "@/modules/Buttons/Logout";

const MotionLi = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.li
    className={twMerge([`transition-colors duration-200`, className])}
    whileHover={{
      scale: 1.02,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.li>
);

const CollapsableNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-full"
        whileHover={{ scale: 1.1 }}
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-b-lg overflow-hidden z-20"
          >
            {sidebar_data.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <MotionLi
                  key={index}
                  className={`${
                    isActive
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 p-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "stroke-2" : "stroke-1"
                      }`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </MotionLi>
              );
            })}
            <MotionLi className="hover:bg-red-100 dark:hover:bg-red-900/30">
              <Logout className="p-3" icon/>
            </MotionLi>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsableNavbar;

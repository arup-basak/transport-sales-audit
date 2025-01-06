"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
}

const SidebarItem = ({ label, icon, isActive = false, href }: Props) => {
  const Icon = icon;

  return (
    <motion.li
      className={twMerge([
        `rounded-lg transition-colors duration-200`,
        isActive
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
          : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
      ])}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={href} className="flex items-center gap-3 p-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5,
          }}
        >
          <Icon className={`w-5 h-5 ${isActive ? "stroke-2" : "stroke-1"}`} />
        </motion.div>

        <motion.span
          className="text-sm font-medium"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
            duration: 0.5,
          }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.li>
  );
};

export default SidebarItem;
